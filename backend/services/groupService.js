const Group = require("../models/groupModel");

const createGroup = async (name) => {
  console.log(name);
  group = await Group.create({ name: name });

  return group;
};

const addUser = async (userId, groupCode) => {
  const group = await Group.findOneAndUpdate(
    { _id: groupCode },
    { $push: { members: userId } }
  );

  return group;
};

module.exports = {
  createGroup,
  addUser,
};
