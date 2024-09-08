const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', (req, res) => {
    let password = req.body.password;

    User.findOne({ login: req.body.login }).then((user,err) => {
        if(user) {
            if(password == user.password){
                res.status(200).json({ status: 200, response: "Sukces"});
            } else {
                res.status(204).json({ status: 204, response: "Nieprawidłowy login lub hasło"});
            }
        } else if (!user) res.status(206).json({ status: 206, response: "Użytkownik nie istnieje"});
        if(err) res.status(500).json({ response: "Błąd" });
    });

});


module.exports = router;
