const express = require('express');
const router = express.Router();
const {generateToken} = require('../utils/tokenProvider')
const User = require('../models/User');


router.post('/GoogleLogin', async (req, res) => {
  const { googleId, name, email, picture } = req.body;

  if (!googleId || !name || !email || !picture) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let user = await User.findOne({ googleId }).lean(); // Avoid redundant queries

    if (!user) {
      // Create a new user if not found
      user = await User.create({
        name,
        email,
        googleId,
        ProfileUrl: picture,
      });

      const payload = {
        userId: user._id,
        name: user.name,
        ProfileUrl: user.ProfileUrl,
        email: user.email,
      };

      const token = generateToken(payload);
      return res.status(200).json({
        authToken: token,
        message: "Account has been created",
      });
    }

    // If user exists, generate token
    const payload = {
      userId: user._id,
      name: user.name,
      ProfileUrl: user.ProfileUrl,
      email: user.email,
    };

    const token = generateToken(payload);
    return res.status(200).json({
      authToken: token,
      message: "Login Successful",
    });
  } catch (error) {
    console.error("Error in GoogleLogin route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
