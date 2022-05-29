'use strict';
var express = require('express');
var router = express.Router();

const mysql = require('mysql');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aw'
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql nawi¹zano po³¹czenie...');
});

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });

});


router.get('/showGames', (req, res) => {
    res.render('showGames', { title: "Lista gier" });
});

router.get('/showDev', (req, res) => {
    res.render('showDevelopers', { title: "Lista deweloperów" });
});

router.get('/showGenre', (req, res) => {
    res.render('showGenre', { title: "Lista gatunków" });
});

router.get('/addGame', (req, res) => {

    //var devSql = `SELECT name FROM developers`;
    //var devNames = "";
    //db.query(devSql, function (err, result) {
    //    if (err) throw err;
    //    console.log('developers loaded' + result);
    //    devNames = result;
    //});
    
    res.render('addGame', { title: "Dodaj grê");    
});

router.get('/addDev', (req, res) => {
    res.render('addDev', { title: "Dodaj dewelopera" });
});

router.get('/addGenre', (req, res) => {
    res.render('addGenre', { title: "Dodaj gatunek" });
});

router.post('/addDev', function (req, res, next) {
    var name = req.body.name;
    if (name != "") {
        var sql = `INSERT INTO developers SET name = '${name}'`;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log('record inserted');
            res.render('success');
        });
    }
    else res.render('empty');
    
});

router.post('/addGenre', function (req, res) {
    var name = req.body.name;

    let sql = `INSERT INTO genres SET Name = '${name}' `;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render("success");
    });

});

router.post('/addGame', function (req, res, next) {

    var name = req.body.name;
    if (name != "") {
        var sql = `INSERT INTO developers SET name = '${name}'`;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log('record inserted');
            res.render('success');
        });
    }
    else res.render('empty');
});

module.exports = router;