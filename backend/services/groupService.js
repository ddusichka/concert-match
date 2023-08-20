const addUser = async (userId, groupCode) => {
  const group = await Group.findOneAndUpdate(
    { group_code: groupCode },
    { $push: { members: userId } }
  );

  return group;
};
