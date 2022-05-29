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
    var sql = `SELECT games.Id AS Id, games.Name AS Name, developers.Name AS Dev, genres.Name AS Genre, games.Photo_URL AS Photo_URL, games.ReleaseDate AS Release_Date, games.Description AS Description
                FROM games 
                    LEFT JOIN developers ON games.Developer_Id = developers.Id
                    LEFT JOIN genres ON games.Genre_Id = genres.Id;`;

    db.query(sql, function (err, result) {
        if (err) throw err;

        var games = result;
        console.log(games);

        res.render('showGames', { games: games });
    });
});

router.get('/showDev', (req, res) => {
    var sql = `SELECT * from developers`;
    
    db.query(sql, function (err, result) {
        if (err) throw err;
        
        var devs = result;
        console.log(devs); 
        
       res.render('showDevelopers', {devs: devs});
    });

});

router.get('/showGenre', (req, res) => {
    var sql = `SELECT * from genres`;

    db.query(sql, function (err, result) {
        if (err) throw err;

        var genres = result;
        console.log(genres);

        res.render('showGenre', { genres: genres });
    });
});

router.get('/addGame', (req, res) => {

    var devSql = `SELECT * from developers`;
    var genreSql = `SELECT * FROM genres`;
    
    db.query(devSql, function (err, resultDev) {
        if (err) throw err;    
        var devNames = resultDev;
        console.log(devNames);
        
        db.query(genreSql, function (err, resultGenre) {
            if (err) throw err;
            var genreNames = resultGenre;
            console.log(genreNames);
            res.render('addGame', { devNames: devNames, genreNames: genreNames });    
        });
    });

    
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

router.post('/addGame', function (req, res) {

    if (req.body.name != "" ) {
        var sql = `INSERT INTO games SET Name = '${req.body.name}', Developer_Id = '${req.body.dev}', Genre_Id = '${req.body.genre}', Photo_URL = '${req.body.url}', ReleaseDate = '${req.body.date}', Description = '${req.body.description}'`;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log('record inserted');
            res.render('success');
        });
    }
    else res.render('empty');

});


module.exports = router;