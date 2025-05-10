// routes/pageRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require("../models/Contact");

const contacts = []
const events = [
  {
    name: "Community Meetup",
    date: new Date('2025-06-15'),
    location: "Community Center, Main St.",
    image: "/images/event1.jpg"
  },
  {
    name: "Summer BBQ",
    date: new Date('2025-07-10'),
    location: "Park Side, Elm Street",
    image: "/images/event2.jpg"
  },
  {
    name: "Charity Run",
    date: new Date('2025-08-05'),
    location: "Downtown Square",
    image: "/images/event3.jpg"
  },
  {
    name: "Art Exhibition",
    date: new Date('2025-09-20'),
    location: "City Gallery, 5th Ave.",
    image: "/images/event4.jpg"
  }
];

router.get('/', (req, res) => {
    res.render("pages/home", {events})
});

router.get('/about', (req, res) => {
    res.render("pages/about")
});

router.get('/events', (req, res) => {
    res.render("pages/events", {events})
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
            contacts.push(newContact);
            console.log("Contact saved:", newContact);
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