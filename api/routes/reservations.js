const express = require('express');
const router = express.Router();
const moment = require('moment');

const Reservation = require('../models/reservation');

// Lista wszystkich rezerwacji
router.get('/search', (req, res) => {
        let today = moment().startOf('day').valueOf();

    Reservation.find()
    .sort({active: -1, endDate: -1})
    .populate('car')
    .populate('customer')
    .then((r) => {
        res.json(r);
    })
    .catch((e) => {
        res.status(500).json({
            'Error': 'Nie udało się pobrać listy rezerwacji',
            'Caught': e
        });
    })
});

// Szczegóły rezerwacji o ID
router.get('/search/:id', (req, res) => {
  Reservation.findOne({ _id: req.params.id })
    .populate('car')
    .populate('customer')
    .then((r) => res.json(r))
    .catch((e) => {
        res.status(500).json({
            'Error': 'Nie udało się pobrać danych rezerwacji o ID ' + id,
            'Caught': e
        });
    })
});

// Znalezienie rezerwacji z samochodem o podanym ID
router.get('/searchByCarId/:id', (req, res) => {
    //let today = moment().startOf('day').valueOf();
    let id = req.params.id;

    Reservation.find({ car: id })
        .sort({startDate: 1})
        .then((r) => res.json(r))
        .catch((e) => {
            res.status(500).json({
                'Error': 'Nie udało się pobrać danych rezerwacji o ID ' + id,
                'Caught': e
            });
        })
});

// Dodanie rezerwacji
router.post('/add', (req, res) => {
  Reservation.create(req.body)
    .then((r) => {
        res.status(200).json({
            'Success': 'Dodano nową rezerwację',
            'R': r
        })
    })
    .catch((e) => {
        res.status(500).json({
            'Error': 'Nie udało się dodać nowej rezerwacji',
            'Caught': e
        });
    })
});

//Zmiana rezerwacji
router.patch('/change/:id', (req, res) => {
  const id = req.params.id;

  Reservation.updateMany({_id: id}, {$set: req.body})
  .then(() => {
      res.status(200).json({
          'Message': 'Pomyślnie zmieniono dane rezerwacji o ID ' + id
      });
   })
  .catch((e) => {
      res.status(500).json({
          'Error': 'Nie udało się zmienić danych rezerwacji o ID ' + id,
          'Caught': e
      });
  })

});

//Usunięcie rezerwacji
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  Reservation.deleteOne({_id: id})
  .then(() => {
      res.status(200).json({
          'Message': 'Rezerwacja o ID ' + id + ' została usunięta'
      });
   })
  .catch((e) => {
      res.status(500).json({
          'Error': 'Nie udało się usunąć rezerwacji',
          'Caught': e
      });
  })
});

//Newsfeed
router.get('/getfeed', (req, res) => {
    let today = moment().startOf('day').valueOf();
    let tomorrow = moment().add(1, 'days').startOf('day').valueOf();

    Reservation.find({endDate: today})
        .populate("car")
        .then((today) => {
            Reservation.find({startDate: tomorrow})
                .populate("car")
                .then((tomorrow) => {
                    res.json({
                        today: today,
                        tomorrow: tomorrow
                    });
                })
                .catch((e) => {
                    res.status(500).json({
                        'Error': 'Nie udało się pobrać jutrzejszych aktualności',
                        'Caught': e
                    });
                })
        })
        .catch((e) => {
            res.status(500).json({
                'Error': 'Nie udało się pobrać dzisiejszych aktualności',
                'Caught': e
            });
        })
});


module.exports = router;