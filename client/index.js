import '!!file-loader?name=[name].[ext]!./assets/images/favicon.ico';

// Require CSS
import '!!style-loader!css-loader!normalize.css/normalize.css';
import '!!style-loader!css-loader!../client/assets/styles/scss/font-awesome.min.css';
import '!!style-loader!css-loader!../client/assets/styles/scss/App.css';

// Require App Bootstrap
require('./bootstrap');
