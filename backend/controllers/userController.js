const userService = require("../services/userService");

// This file is for defining routes

// GET user
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await userService.getUser(userId);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST a new user
const signUp = async (req, res) => {
  try {
    const { token, user } = await userService.signUp(req.body);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logIn = async (req, res) => {
  try {
    const { token, user } = await userService.logIn(req.body);
    res.status(201).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid credentials" });
  }
};

const react = async (req, res) => {
  try {
    const { direction, userId, concertId } = req.body;
    console.log(req.body);
    const user = await userService.swipe(direction, userId, concertId);

    if (!user) {
      return res.status(400).json({ message: "No such user" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getUserInterests = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const userInterests = await userService.getUserInterests(userId);
    res.status(200).json(userInterests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user interests" });
  }
};
// const addGroup = async (req, res) => {
//   const { userId, groupCode } = req.body;

//   const user = await User.findOneAndUpdate(
//     { user_id: userId },
//     { $push: { group_code: groupCode } }
//   );

//   if (!user) {
//     return res.status(400).json({ error: "No such user" });
//   }

//   return res.status(200).json(user);
// };

module.exports = {
  getUser,
  signUp,
  logIn,
  // addGroup,
  react,
  getUserInterests,
};
