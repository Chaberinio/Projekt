'use strict';
var express = require('express');
var router = express.Router();

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
    res.render('addGame', { title: "Dodaj grê" });
});

router.get('/addDev', (req, res) => {
    res.render('addDev', { title: "Dodaj dewelopera" });
});

router.get('/addGenre', (req, res) => {
    res.render('addGenre', { title: "Dodaj gatunek" });
});

module.exports = router;