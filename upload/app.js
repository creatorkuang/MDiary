var express=require('express');
var multipart = require('connect-multipart-gridform');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://localhost:27017/jizhiopen', function (err, db) {
  if (err) throw err;
  createApp(db);
});

function createApp (db) {
  var app = express();

  app.configure(function(){
    app.set('port', process.env.PORT || 5000);
    app.use(multipart({
      db : db,
      mongo : mongodb
    })); 
   //  cross domain middleware
   app.use(express.methodOverride());

	// ## CORS middleware
	// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
	var allowCrossDomain = function(req, res, next) {
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	    // intercept OPTIONS method
	    if ('OPTIONS' == req.method) {
	      res.send(200);
	    }
	    else {
	      next();
	    }
	};
	app.use(allowCrossDomain);

    app.use(app.router);
    var router = require('./router')(db);
     
	  app.get('/read/:fileId', router.read);
	  app.post('/upload',router.upload);
	  app.get('/download/:fileId',router.download);
	  app.get('/remove/:fileId',router.remove);

	  app.listen(app.get('port'), function(){
	    console.log('Upload server listening on port ' + app.get('port'));
	  });
 });
}