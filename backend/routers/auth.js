const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'AYUSHDUBEYKYAHO';

// Validation middleware
const userValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('phone').isNumeric().isLength({ min: 10 }).withMessage('Invalid phone number'),
];

router.post('/createuser', userValidation, async (req, res) => {
  let success = false
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        success = false
        const error_msgs = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: error_msgs });
      }
  
      const { name, email, phone, password } = req.body;
  
      // Check if a user with the same email exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists with this email' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
      });
      const data = {
        user:{
          id:newUser.id
        }
      }
      // Generate and send the authentication token
      const authToken = jwt.sign(data, JWT_SECRET);
      success= true
      return res.status(201).json({success,  user: newUser, authToken });
    } catch (error) {
      // Handle any unexpected errors
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while creating the user' });
    }
  });


router.post("/login", [
    // Validate the email field using express-validator
    body('email').isEmail().withMessage('Invalid email format')
], async (req, res) => {
  let success = false
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          success =false
            const error_msgs = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: error_msgs });
        }

        // Extract email and password from the request body
        const { email, password } = req.body;

        // Find the user in the database by email
        const user = await User.findOne({ email });

        // Handle invalid user or password
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(404).json({ error: "Invalid email and password" });
        }
        const data = {
          user:{
              id:user.id
          }
      }
        // Generate an authentication token
        const authToken = jwt.sign(data, JWT_SECRET);

        // Respond with the authentication token
        success = true
        res.status(201).json({success, user, authToken });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
