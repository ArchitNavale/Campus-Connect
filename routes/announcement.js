const express = require('express');
const app = express()
const mongoose = require('mongoose');
const Announcement = mongoose.model("Announcement");
const router = express.Router();

router.post('/api/blog', async (req, res) => {
  const newAnnouncement = new Announcement({ ...req.body });
  newAnnouncement
    .save()
    .then(post => {
      console.log(post)
      res.json({ success: true, post });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'Error saving the blog post' });
    });
  //   const all = await Announcement.find({})
  //   console.log(all[0].content)
});


router.post('/getblog', async (req, res) => {
  const { department, year, club } = req.body;
  console.log('dept ', department)
  let newAnnouncements;
  if(department)
  newAnnouncements = await Announcement.find({
    department,
    year,
    club,
    deadline: { $gt: new Date() }
  });
  
  else {
    console.log('m here')
    newAnnouncements = await Announcement.find({
      club,
      deadline: { $gt: new Date() }
    });
  }
  if (newAnnouncements) {
    res.json(newAnnouncements);
  }
});

module.exports = router;