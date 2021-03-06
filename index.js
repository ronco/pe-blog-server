global.env = process.env.NODE_ENV || 'development';

var express = require('express');
var app = express();
var url = require('url');
var redisConfig = {
  host: 'localhost',
  port: 6379,
  database: 0
};

if (env === 'production') {
  var redisURL = url.parse(process.env.REDIS_URL);
  redisConfig = {
    port: redisURL.port,
    host: redisURL.hostname,
    password: redisURL.auth.split(":")[1]
  };
  app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN));
}

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var nodeEmberCliDeployRedis = require('node-ember-cli-deploy-redis');
app.use('/*', nodeEmberCliDeployRedis('pe-blog', redisConfig));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
