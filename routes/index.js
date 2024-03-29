var express = require('express');
var router = express.Router();
const fs = require("fs");
const folder = "files";

router.get('/', function(req, res, next) {
  fs.readdir(`./${folder}`, {withFileTypes: true}, function(err, files){
    res.render('index', {folder, files});
  })
});

router.get('/refresh', function(req, res, next) {
    res.redirect("back")
  })

router.get('/createfile', function(req, res, next) {
  fs.writeFile(`./${folder}/${req.query.filename}`, "", function(err){
    res.redirect("/");
  })
});

router.post('/save/:filename', function(req, res, next) {
  fs.writeFile(`./${folder}/${req.params.filename}`, req.body.filedata, function(err){
    res.redirect("back");
  })
});

router.get('/createfolder', function(req, res, next) {
  fs.mkdir(`./${folder}/${req.query.foldername}`, function(err, path){
    res.redirect("/");
  })
});

router.get('/delete/file/:filename', function(req, res, next) {
  fs.unlink(`./${folder}/${req.params.filename}`, function(err){
    res.redirect("/");
  })
});

router.get('/delete/folder/:filename', function(req, res, next) {
  fs.rmdir(`./${folder}/${req.params.filename}`, function(err){
    res.redirect("/");
  })
});

router.get('/file/:filename', function(req, res, next) {
  fs.readdir(`./${folder}`, {withFileTypes: true}, function(err, files){
    fs.readFile(`./${folder}/${req.params.filename}`, "utf8", function(err, data){
    res.render('duplicate', {folder, files, filename: req.params.filename, filedata: data});
    })
  })
});

router.get('/update/:filename', function(req, res, next) {
  fs.rename(`./${folder}/${req.params.filename}`, `./${folder}/${req.query.filename}`, function(err){
    res.redirect("/");
  } )
  })

module.exports = router;