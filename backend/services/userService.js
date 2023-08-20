const User = require("../models/userModel");
const Concert = require("../models/concertModel");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUsers = async () => {
  return await User.find({}).sort({ createdAt: -1 });
};

const signUp = async (req) => {
  const { name, email, password } = req;

  const lower_email = email.toLowerCase();
  const existingUser = await User.findOne({ email: lower_email });

  if (existingUser) {
    return res.status(409).send("User already exists. Please login instead.");
  }

  const user_id = uuidv4().toString();
  const hashed_password = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name,
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
    { user_id: user.user_id, email: user.user_id },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 24 }
  );

  return { token, user };
};

const swipe = async () => {
  const { direction, userId, id } = req;

  const user = await User.findOneAndUpdate(
    { user_id: userId },
    { $push: { seenConcerts: id } }
  );

  if (direction == "right") {
    const userMatch = await User.findOneAndUpdate(
      { user_id: userId },
      { $push: { matches: id } }
    );
  }

  return user;
};

const getUserInterests = async (userId) => {
  const user = await User.findOne({ _id: userId }).select("matches");
  const concertIds = user.matches;
  const concerts = await Concert.find({ _id: { $in: concertIds } });
  return concerts;
};

module.exports = {
  getUsers,
  signUp,
  logIn,
  swipe,
  getUserInterests,
};
