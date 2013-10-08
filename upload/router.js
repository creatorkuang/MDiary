var mongodb = require('mongodb')
var multipart = require('connect-multipart-gridform')

module.exports = exports = function (db) {
  return {
    getFiles : function(req, res, next){
      req.locals = {};
      db.collection('fs.files', function(err, collection){
        if (err) return next(err);
        collection.find({}, function(err, cursor){
          if (err) return next(err);
          cursor.sort({uploadDate:-1}).limit(100);
          cursor.toArray(function(err, items){
            if (err) return next(err);
            req.locals.files = items;
            next();
          });
        });
      });
    },
    upload : function(req, res,next){
       //console.log('Upload files : ',req.files.file);
       res.send({fileId:req.files.file.id});
    },
    download : function(req, res, next){
      var readstream = multipart.gridform.gridfsStream(db, mongodb).createReadStream(req.param('fileId'));
      readstream.on('open', function(){
        var store = readstream._store;
        res.setHeader('Content-disposition', 'attachment; filename=' + store.filename);
      });
      readstream.pipe(res);
    },
    read : function(req, res, next){
    // @fix check if the fileId exsit, if not, skips the id;
    var readstream = multipart.gridform.gridfsStream(db, mongodb).createReadStream(req.param('fileId'));
    readstream.on('open', function(){
      var store = readstream._store;
     });
    readstream.pipe(res);
             
    },
    remove : function(req, res, next){
      db.collection('fs.files', function(err, collection){
        if (err) return next(err);
        collection.remove({_id : mongodb.ObjectID(req.param('fileId'))}, function(err){
          if (err) return next(err);
          db.collection('fs.chunks', function(err, collection){
            if (err) return next(err);
            collection.remove({files_id : mongodb.ObjectID(req.param('fileId'))}, next);
          });
        });
      });
    }
  }
}
