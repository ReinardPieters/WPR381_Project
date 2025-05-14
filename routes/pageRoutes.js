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
  },
  {
    id: 5,
    name: "Skill-Sharing Workshop",
    date: new Date('2025-06-12'),
    location: "Community Center, Main St.",
    image: "/images/event5.jpg",
    about: "Join in on our fun knowlege sharing experience for learning skills like cooking, coding or crafts",
  },
  {
    id: 6,
    name: "Financial Literacy Seminar",
    date: new Date('2025-09-13'),
    location: "Community Center, Main St.",
    image: "/images/event6.png",
    about: "Having trouble with finances? Come join our Finance seminar to get tips on how to finance youer money easier",
  },
  {
    id: 7,
    name: "Cyber Safety Workshop",
    date: new Date('2025-11-04'),
    location: "Community Center, Main St.",
    image: "/images/event7.png",
    about: "Want to know how to dodge cyber hackers or make your devices more safe? Then come on down and join us in our cyber safety workshop.",
  },
  {
    id: 8,
    name: "Game Night",
    date: new Date('2025-12-01'),
    location: "Online/Community Center, Main St.",
    image: "/images/event8.jpg",
    about: "Participate in our Game Night, where fun is the name of the game. Feeling shy no worries join the online group on Discord and play with others their",
  },
  {
    id: 9,
    name: "Photography Contest",
    date: new Date('2025-07-26'),
    location: "Onlline",
    image: "/images/event9.jpg",
    about: "Clip and share your photos around a theme given to you and 3 other in your team. Best 3 photo's taken of the group will be judged and which ever group gets the most points wins excelent prizes.",
  }
];

router.get('/', (req, res) => {
  const upcomingEvents = events.slice(0, 3); // Show first 3 events
  res.render("pages/home", { upcomingEvents });
});


router.get("/about", (req, res) => {
 const teamMembers = [
    {
      name: "Reinard Peters",
      role: "Backend Developer",
      description: "Focuses on building reliable server-side logic and database connections.",
      photo: "reinard.jpg"
    },
    {
      name: "Kemisetso Pole",
      role: "Frontend Developer",
      description: "Crafts seamless, accessible user interfaces that bring the portal to life.",
      photo: "tumi.jpg"
    },
    {
      name: "Willem Booysen",
      role: "Data Manager",
      description: "Manages data integrity and optimizes performance for smooth operations.",
      photo: "sipho.jpg"
    },
    {
      name: "Glacious Mukwevho",
      role: "Documentation Manager",
      description: "Creates clear, structured documentation and ensures effective communication.",
      photo: "zanele.jpg"
    }
  ];


  const orgDescription = "We are a dedicated team working together to bring meaningful change to the community through tech, collaboration, and innovation.";

  res.render("pages/about", { teamMembers, orgDescription });
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
