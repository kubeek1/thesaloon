const express = require('express');
const router = express.Router();

const Customer = require('../models/customer');

router.get('/search', (req, res) => {
    Customer.find().sort({name: 1, surname: 1}).exec()
    .then((r) => res.json(r))
    .catch((e) => {
        res.status(500).json({
            'Error': 'Nie udało się pobrać listy klientów',
            'Caught': e
        });
    })
});

router.get('/search/:id', (req, res) => {
    const id = req.params.id;

    Customer.findById(id).exec()
    .then((r) => res.json(r))
    .catch((e) => {
        res.status(500).json({
            'Error': 'Nie udało się pobrać danych klienta o ID ' + id,
            'Caught': e
        });
    })
});

// Sprawdź czy klient o numerze tel. istnieje w bazie
router.get('/searchPhone/:phone', (req, res) => {
    const phoneNumber = req.params.phone;

    Customer.find({phone: phoneNumber}).exec()
        .then((r) => res.json(r))
        .catch((e) => {
            res.status(500).json({
                'Error': 'Nie udało się pobrać danych klienta z numerem telefonu ' + phoneNumber,
                'Caught': e
            });
        })
});


//Dodanie nowego klienta
router.post('/add', (req, res) => {
    Customer.create(req.body)
    .then((r) => {
    console.log(r);
        res.status(200).json({
            'Success': 'Dodano nowego klienta',
            'R': r
        })
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({
            'Error': 'Nie udało się dodać nowego klienta',
            'Caught': e
        });
    })
});

//Zmiana danych klienta
router.patch('/change/:id', (req, res) => {
    const id = req.params.id;

    Customer.updateMany({_id: id}, {$set: req.body})
    .then((r) => {
      res.status(200).json({
          'Success': 'Dane klienta o ID ' + id + ' zostały zmienione'
      });
    })
    .catch((e) => {
      res.status(500).json({
          'Error': 'Nie udało się zmienić danych klienta o ID ' + id,
          'Caught': e
      });
    })

});

// Usunięcie klienta
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    Customer.deleteOne({_id: id})
    .then(() => {
      res.status(200).json({
          'Success': 'Klient o ID ' + id + ' został usunięty'
      });
    })
    .catch((e) => {
      res.status(500).json({
          'Error': 'Nie udało się usunąć klienta o ID ' + id,
          'Caught': e
      });
    })
});


module.exports = router;
