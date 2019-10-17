import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';
import cors from 'cors';
import bcyrpt from 'bcryptjs';
import User from './models/User';

//initialize express application
const app = express();

//connect database
connectDatabase();

//configure middleware
app.use(express.json({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

//API endpoints
/**
 * @route GET /
 * @desc Test endpoint
 */
app.get('/', (req, res) =>
  res.send('http get request sent to root api endpoint')
);

/**
 * @route POST api/users
 * @desc Register user
 */
app.post(
  '/api/users',
  [
    check('name', 'Please enter your name')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Pease enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;
      try {
        //Check if user exists
        let user = await User.findOne({ email: email });
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }

        //Create a new user
        user = new User({
          name: name,
          email: email,
          password: password
        });

        //Encrpyt the password
        const salt = await bcyrpt.genSalt(10);
        user.password = await bcyrpt.hash(password, salt);

        //Save to the db and return
        await user.save();
        res.send('User successfully registered');
      } catch (error) {
        res.status(500).send('Server error');
      }
    }
  }
);

//connection listener
const port = 5000;
app.listen(port, () => console.log(`Express server running on port ${port}`));
