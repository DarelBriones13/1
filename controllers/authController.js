// controllers/authController.js

const bcrypt = require('bcrypt');
const db = require('../models'); // Import the models

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Use `db.User` (not `db.users`) since the model is named `User`
    const user = await db.User.findOne({
      where: { username }
    });

    if (!user) {
      return res.status(400).send('Invalid username or password');
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).send('Invalid username or password');
    }

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  login
};
