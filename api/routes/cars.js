const express = require('express');
const router = express.Router();

const Car = require('../models/car');
const Reservation = require('../models/reservation');
const Incident = require('../models/incident');


// Lista wszystkich aut
router.get('/search', (req, res) => {
    let date = new Date();
    date.setHours(0,0,0,0)

    Car.aggregate([
        {
            $lookup: {
                'from': 'incidents',
                'localField': '_id',
                'foreignField': 'car',
                'as': 'incident'
            }
        },
        {
            $unwind: {
                path: '$incident',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                availability: {
                    $cond: ['$incident.exclude', false, true]
                },
                _id: 1,
                brand: 1,
                model: 1,
                engine: 1,
                year: 1,
                color: 1,
                plate: 1,
                incident: 1
            }
        },
        {
            $lookup: {
                'from': 'reservations',
                'localField': '_id',
                'foreignField': 'car',
                'as': 'reservation'
            }
        },
        {
            $unwind: {
                path: '$reservation',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project:  {
                availability: {
                    $cond: [
                        {
                            $not: {
                                $and:
                                    [
                                        {$lte: ['$reservation.startDate', date]},
                                        {$gte: ['$reservation.endDate', date]}
                                    ]
                            }
                        }, {$not: ['$incident.exclude']}, false]
                },
                _id: 1,
                brand: 1,
                model: 1,
                engine: 1,
                year: 1,
                color: 1,
                plate: 1,
                reservation: 1
            }
        },
        {
            $group: {
                _id: '$_id',
                availability: { $min : '$availability' },
                brand: {$first : '$brand'},
                model: {$first : '$model'},
                engine: {$first : '$engine'},
                year: {$first : '$year'},
                color: {$first : '$color'},
                plate: {$first : '$plate'},
            }
        }

    ])
    .sort({availability: -1, brand: 1})
    .then((r) => {
        res.json(r);
    });
});

// Szczegóły auta o ID
router.get('/search/:id', (req, res) => {
    const id = req.params.id;

    Car.findById(id).exec()
    .then((r) => res.json(r))
    .catch((e) => {
        res.status(500).json({
            'Error': 'Nie udało się pobrać danych auta o ID ' + id,
            'Caught': e
        });
    })
});

// Sprawdź czy pojazd o numerze rej. istnieje w bazie
router.get('/searchPlate/:plate', (req, res) => {
    const plateNumber = req.params.plate;

    Car.find({plate: plateNumber}).exec()
        .then((r) => res.json(r))
        .catch((e) => {
            res.status(500).json({
                'Error': 'Nie udało się pobrać danych auta o numerze rejestracyjnym ' + plateNumber,
                'Caught': e
            });
        })
});

//Dodanie nowego auta
router.post('/add', (req, res) => {
    Car.create(req.body)
    .then((r) => {
        res.status(200).json({
            'Success': 'Dodano nowe auto',
            'R': r
        })
    })
    .catch((e) => {
        res.status(500).json({
            'Error': 'Nie udało się dodać nowego auta',
            'Caught': e
        });
    })
});

//Usuwanie auta
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    Car.findByIdAndRemove(id)
    .exec()
    .then(() => {
        res.status(200).json({
            'Success': 'Auto o ID ' + id + ' zostało usunięte'
        })
    })
    .then(() => {
        Reservation.deleteMany({'car': id})
        .exec()
        .then(() =>
            res.status(200).json({
             'Success': 'Usunięto rezerwacje powiązane z autem o ID ' + id
            }
        ))
        .catch((e) => {
            res.status(500).json({
                'Error': 'Nie udało się usunąć rezerwacji powiązanych z autem o ID ' + id,
                'Caught': e
            });
        })
    })
    .then(() => {
        Incident.deleteOne({'car': id})
            .exec()
            .then(() =>
                res.status(200).json({
                        'Success': 'Usunięto usterkę powiązaną z autem o ID ' + id
                    }
                ))
            .catch((e) => {
                res.status(500).json({
                    'Error': 'Nie udało się usunąć usterki powiązanej z autem o ID ' + id,
                    'Caught': e
                })
            })
    })
    .catch((e) => {
        res.status(500).json({
            'Error': 'Nie udało się usunąć auta o ID ' + id,
            'Caught': e
        });
    })
});

//Zmiana auta
router.patch('/change/:id', (req, res) => {
    const id = req.params.id;

    Car.updateMany({_id: id}, {$set: req.body})
    .then(() => {
        res.status(200).json({
            'Success': 'Dane auta o ID ' + id + ' zostały zmienione'
        });
    })
    .catch((e) => {
        res.status(500).json({
            'Error': 'Nie udało się zmienić danych auta o ID ' + id,
            'Caught': e
        });
    })
});

module.exports = router;
