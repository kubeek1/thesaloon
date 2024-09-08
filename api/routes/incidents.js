const express = require('express');
const router = express.Router();

const Incident = require('../models/incident');

// Lista wszystkich usterek
router.get('/search', (req, res) => {
    Incident.find()
    .populate('car')
    .then((r) => res.json(r))
    .catch((e) => {
        res.status(500).json({
            'Error': 'Nie udało się pobrać listy usterek',
            'Caught': e
        });
    })
});

// Wyszukanie danych usterki o podanym ID
router.get('/search/:id', (req, res) => {
    const id = req.params.id;

    Incident.findOne({ _id: id })
    .populate('car')
    .then((r) => res.json(r))
    .catch((e) => {
         res.status(500).json({
            'Error': 'Nie udało się pobrać danych usterki o ID ' + id,
            'Caught': e
        });
    })
});

// Dodanie nowej usterki
router.post('/add', (req, res) => {
    Incident.create(req.body)
    .then((r) => {
        res.status(200).json({
            'Success': 'Dodano nową usterkę',
            'R': r
        })
    })
    .catch((e) => {
      res.status(500).json({
          'Error': 'Nie udało się dodać nowej usterki',
          'Caught': e
      });
    })
});

//Zmiana danych usterki
router.patch('/change/:id', (req, res) => {
    const id = req.params.id;

    Incident.updateOne({_id: id}, {$set: req.body})
    .then(() => {
      res.status(200).json({
          'Success': 'Zmieniono dane usterki o ID ' + id
      });
    })
    .catch((e) => {
      res.status(500).json({
          'Error': 'Nie udało się zmienić danych usterki o ID ' + id,
          'Caught': e
      });
    })
});

//Usunięcie usterki
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    Incident.deleteOne({_id: id})
    .then(() => {
      res.status(200).json({
          'Success': 'Usterka o ID ' + id + ' została usunięta'
      });
    })
    .catch((e) => {
      res.status(500).json({
          'Error': 'Nie udało się usunać usterki o ID ' + id,
          'Caught': e
      });
    })
});

module.exports = router;