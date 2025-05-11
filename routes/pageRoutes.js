// routes/pageRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require("../models/Contact");

const contacts = []
const events = [
  {
    id: 1,
    name: "Community Meetup",
    date: new Date('2025-06-15'),
    location: "Community Center, Main St.",
    image: "/images/event1.jpg",
    about: "Join us for a community meetup to discuss local issues and initiatives. This is a great opportunity to meet your neighbors and get involved in community projects."
  },
  {
    id: 2,
    name: "Summer BBQ",
    date: new Date('2025-07-10'),
    location: "Park Side, Elm Street",
    image: "/images/event2.jpg",
    about: "Enjoy a fun-filled day at our Summer BBQ! Bring your family and friends for delicious food, games, and activities. Don't forget to bring your favorite dish to share!"
  },
  {
    id: 3,
    name: "Charity Run",
    date: new Date('2025-08-05'),
    location: "Downtown Square",
    image: "/images/event3.jpg",
    about: "Participate in our Charity Run to raise funds for local charities. Whether you're a seasoned runner or a beginner, everyone is welcome! Sign up now and help us make a difference."
  },
  {
    id: 4,
    name: "Art Exhibition",
    date: new Date('2025-09-20'),
    location: "City Gallery, 5th Ave.",
    image: "/images/event4.jpg",
    about: "Explore the creativity of local artists at our Art Exhibition. Enjoy a day filled with art, culture, and inspiration. Don't miss the chance to meet the artists and learn about their work."
  }
];

router.get('/', (req, res) => {
  res.render("pages/home")
});


router.get('/about', (req, res) => {
    res.render("pages/about")
});

router.get('/events', (req, res) => {
  const search = (req.query.search || '').toLowerCase();
  const sort = req.query.sort || 'none';

  let filteredEvents = [...events];

  filteredEvents = filteredEvents.filter(event =>
    event.name.toLowerCase().includes(search) ||
    event.location.toLowerCase().includes(search)
  );

  if (sort === 'date-asc') {
    filteredEvents.sort((a, b) => a.date - b.date);
  } else if (sort === 'date-desc') {
    filteredEvents.sort((a, b) => b.date - a.date);
  }

  res.render('pages/events', {
    events: filteredEvents,
    search,
    sort 
  });
});

router.get('/contact', (req, res) => {
    res.render("pages/contact")
});

router.get('/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find(e => e.id === eventId);
  if (event) {
    res.render('pages/event_info', { event});  
  } else {
    res.status(404).send('Event not found');
  }
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