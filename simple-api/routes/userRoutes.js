const express = require('express');
const router = express.Router();
const User = require('../models/User');

// router.post('/', async (req, res) => {
//   try {
//     const { name, email, age } = req.body;
//     const user = new User({ name, email, age });
//     await user.save();
//     res.status(201).json({ message: 'User saved', user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving user', error: error.message });
//   }
// });

router.post('/', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    const saved = await user.save();
    console.log('✅ User saved to DB:', saved);
    res.status(201).json({ message: 'User saved', user: saved });
  } catch (error) {
    console.error('❌ Error saving user:', error);
    res.status(500).json({ message: 'Error saving user', error: error.message });
  }
});


module.exports = router;
