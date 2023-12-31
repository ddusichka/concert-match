const groupService = require("../services/groupService");

const createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const group = await groupService.createGroup(name);

    if (!group) {
      return res.status(400).json({ error: "Error creating group" });
    }
    res.status(200).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating group" });
  }
};

const addUser = async (req, res) => {
  try {
    const { userId, groupCode } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const group = await groupService.addUser(userId, groupCode);

    if (!group) {
      return res.status(400).json({ error: "No such user" });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user to group" });
  }
};

module.exports = {
  createGroup,
  addUser,
};
