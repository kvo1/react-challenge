import express from 'express';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import Loadable from 'react-loadable';

const PORT = process.env.WWW_PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const app = express();

// Configure Express
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, '..', '/public')));

// Compile webpack bundle in development
if (NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const config = require('../setup/webpack/webpack.config');
  const compiler = webpack(config);

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const devMiddleware = webpackDevMiddleware(compiler, {
    contentBase: __dirname,
    noInfo: true,
    silent: false,
    stats: {
      colors: true,
      progress: false
    },
    hot: true,
    historyApiFallback: true,
    publicPath: config.output.publicPath
  });

  const hotMiddleware = webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  });

  app.use(devMiddleware);
  app.use(hotMiddleware);

  const fs = devMiddleware.fileSystem;

  // Send index.html when root url is requested
  console.log(path.join(process.cwd(), '/public/index.html'));
  app.get('*', (request, response) => {
    fs.readFile(path.join(process.cwd(), '/public/index.html'), (error, file) => {
      (error) ? response.sendStatus(404) : response.send(file.toString());
    });
  });
}

app.get('*.js', (request, response, next) => {
  request.url = `${request.url}.gz`;
  response.set('Content-Encoding', 'gzip');
  next();
});

Loadable.preloadAll().then(() => {
  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(JSON.stringify({
      'React Web': 'Loaded',
      'URL:': `http://localhost:${PORT}`,
      'NODE_ENV:': NODE_ENV,
    }, null, 2));
  });
});
