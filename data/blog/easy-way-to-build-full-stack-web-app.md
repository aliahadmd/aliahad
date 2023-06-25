---
title: 'Easy way to build full-stack web app'
date: '2023-6-25'
tags: ['nodejs', 'expressjs', 'ejs', 'tailwindcss']
draft: false
summary: 'Here is a cheatsheet to build full stack app fast.'
---

#### Tools I will use:

1. dotenv
2. ejs
3. express
4. express-ejs-layouts
5. nodemon
   6.bcryptjs
6. cookie-parser
7. express-async-handler
8. express-session
9. SQLite database and sequelize ORM.
10. nodemailer.

## Here's a step-by-step guide:

Sure! I can help you set up a full stack template using the tools you mentioned. Here's a step-by-step guide with a production-ready file structure:

Step 1: Initialize the project
Create a new directory for your project and navigate into it using the terminal. Run the following command to initialize a new Node.js project:

```bash
npm init -y
```

Step 2: Install dependencies
Install the required dependencies by running the following command:

```bash
npm install dotenv ejs express express-ejs-layouts nodemon bcryptjs cookie-parser express-async-handler express-session sequelize sqlite3 nodemailer
```

Step 3: Set up file structure
Create the following directories and files inside your project directory:

```
- config
  - config.js
- controllers
  - authController.js
- middlewares
  - authMiddleware.js
- models
  - User.js
- routes
  - authRoutes.js
- views
  - layouts
    - mainLayout.ejs
  - home.ejs
- server.js
```

Step 4: Configure environment variables
Create a `.env` file in your project directory and define the following environment variables:

```
PORT=3000
SESSION_SECRET=your_session_secret
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
```

Step 5: Configure Express server
Open `server.js` and add the following code:

```javascript
require('dotenv').config()
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser')

// Set up middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('layout', 'layouts/mainLayout')

// Routes
const authRoutes = require('./routes/authRoutes')
app.use('/', authRoutes)

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
```

Step 6: Create a database connection
Create a file `config/config.js` and add the following code:

```javascript
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'sqlite',
  storage: 'database.sqlite', // Change this to your desired database file location
})

module.exports = sequelize
```

Step 7: Define the User model
Create a file `models/User.js` and add the following code:

```javascript
const { DataTypes } = require('sequelize')
const sequelize = require('../config/config')

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
})

module.exports = User
```

Step 8: Create authentication routes and controllers
Create a file `routes/authRoutes.js` and add the following code:

```javascript
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/', authController.home)
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router
```

Create a file `controllers/authController.js` and add the following code:

```javascript
const bcrypt = require('bcryptjs')
const User = require('../models/User')

exports.home = (req, res) => {
  res.render('home')
}

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      username,
      password: hashedPassword,
      email,
    })

    res.redirect('/login')
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ where: { username } })

    if (!user) {
      return res.status(400).send('Invalid username or password')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(400).send('Invalid username or password')
    }

    // Store user data in session or set authentication cookie
    // Example: req.session.user = user;

    res.redirect('/dashboard')
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}
```

Step 9: Create views
Create a file `views/layouts/mainLayout.ejs` and add the following code:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
  </head>
  <body>
    <%- body %>
  </body>
</html>
```

Create a file `views/home.ejs` and add the following code:

```html
<h1>Welcome to my app!</h1>

<form action="/register" method="POST">
  <input type="text" name="username" placeholder="Username" required />
  <input type="password" name="password" placeholder="Password" required />
  <input type="email" name="email" placeholder="Email" required />
  <button type="submit">Register</button>
</form>

<form action="/login" method="POST">
  <input type="text" name="username" placeholder="Username" required />
  <input type="password" name="password" placeholder="Password" required />
  <button type="submit">Login</button>
</form>
```

Step 10: Start the server
Run the following command to start the server using nodemon:

```bash
npx nodemon server.js
```

Congratulations! You have set up a full stack template with the specified tools. Feel free to customize the code and file structure according to your needs.
