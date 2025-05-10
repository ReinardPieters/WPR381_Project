// routes/pageRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require("../models/Contact");

router.get('/', (req, res) => {
    res.render("pages/home")
});

router.get('/about', (req, res) => {
    res.render("pages/about")
});

router.get('/events', (req, res) => {
    res.render("pages/events")
});

router.get('/contact', (req, res) => {
    res.render("pages/contact")
});

router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    const newContact = new Contact({
        name,
        email,
        message
    });
    newContact.save()
        .then(() => {
            console.log("Contact saved successfully");
            res.redirect('/thankyou');
        })
        .catch((err) => {
            console.error("Error saving contact:", err);
            res.status(500).send("Internal Server Error");
        });

});
router.get('/thankyou', (req, res) => {
    res.render("pages/thankyou")
});

module.exports = router;