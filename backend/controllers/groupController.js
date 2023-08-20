const groupService = require("../services/groupService");

const addUser = async (req, res) => {
  try {
    const { userId, groupCode } = req.params;
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
    res.status(500).json({ message: "Error fetching user interests" });
  }
};

module.exports = {
  addUser,
};
