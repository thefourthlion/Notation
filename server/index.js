const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const jwt = require("jsonwebtoken");
const NoteModel = require("./models/Notes");
const User = require("./models/Users");
// --------------------------------------------(end of imports)------------------------------------------

require("dotenv").config({ path: "./.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// connect to note db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

// --------------------------------------------(end of init)------------------------------------------
const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy(User.authenticate()));

// sessions and cookies🍪
app.use(
  session({
    secret: process.env.ENCRYPT_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.get("/", (req, res) => {
  res.json({ app: "running" });
});

// --------------------------------------------(end of passport)------------------------------------------

// user handling
// register user account
app.post("/register", (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  });

  // create web token
  const accessToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_ENCRYPT_KEY,
    {
      expiresIn: "1m",
    }
  );

  User.register(user, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.send(err);
      console.log("user not added...");
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log("user added...");
        console.log(user);
        res.json({ accessToken });
      });
    }
  });
});

// log user in with username and password
app.post("/login", (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  });

  // create web token
  const accessToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_ENCRYPT_KEY,
    {
      expiresIn: "3m",
    }
  );

  // Refresh token
  const refreshToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_ENCRYPT_KEY,
    {
      expiresIn: "20m",
    }
  );

  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.json({ accessToken, refreshToken });
      });
    }
  });
});

// see all the users on thew server -----------(for tetsing)---------------------------------------------
app.get("/seeUsers", async (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.send({ app: err });
    }
    res.send(result);
  });
});

// --------------------------------------------(end of sign in routes)------------------------------------------

// note handling
app.post("/addNote", async function requestHandler(req, res) {
  let date = req.body.date;
  let title = req.body.title;
  let description = req.body.description;
  User.findById(req.user.id, (err, foundUser) => {
    if (err) {
      console.log(err);
    }
    if (foundUser) {
      foundUser.date = date;
      foundUser.title = title;
      foundUser.description = description;
      foundUser.save(function () {
        res.send(foundUser);
      });
    }
  });
});

app.get("/readNote", async (req, res) => {
  NoteModel.find({}, (err, result) => {
    if (err) {
      res.json({ app: err });
    }
    res.send(result);
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await NoteModel.findByIdAndRemove(id).exec();
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// --------------------------------------------(end of note routes)------------------------------------------

app.listen(PORT, () => {
  console.log("Server 👂 on 📶 " + PORT);
});
