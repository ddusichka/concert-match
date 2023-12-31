const User = require("../models/userModel");
const Concert = require("../models/concertModel");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUser = async (userId) => {
  return await User.findOne({ _id: userId });
};

const signUp = async (req) => {
  const { email, password } = req;

  const lower_email = email.toLowerCase();
  const existingUser = await User.findOne({ email: lower_email });

  if (existingUser) {
    throw new Error("User already exists. Please login instead.");
  }

  const user_id = uuidv4().toString();
  const hashed_password = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: "test name",
    user_id: user_id,
    email: lower_email,
    hashed_password: hashed_password,
  });

  const token = jwt.sign(
    { user_id: user_id, email: lower_email },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 24 }
  );

  return { token, user };
};

const logIn = async (req) => {
  const { email, password } = req;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("User not found");
  }

  const correctPassword = await bcrypt.compare(password, user.hashed_password);

  if (!correctPassword) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { user_id: user.user_id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 24 }
  );

  console.log(token);

  return { token, user };
};

const swipe = async (direction, userId, concertId) => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { seenConcerts: concertId } }
  );

  if (direction == "right") {
    const userMatch = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { matches: concertId } }
    );
  }
  console.log(user);
  return user;
};

const getUserInterests = async (userId) => {
  const user = await User.findOne({ _id: userId }).select("matches");
  const concertIds = user.matches;
  const concerts = await Concert.find({ _id: { $in: concertIds } });
  return concerts;
};

module.exports = { getUser, signUp, logIn, swipe, getUserInterests };
