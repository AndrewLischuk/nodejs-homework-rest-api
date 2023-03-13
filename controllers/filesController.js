const { WrongParametersError } = require("../helpers/errors");
const { updateAvatar } = require("../services/fileService");

const uploadController = async (req, res) => {
  const { _id: userId } = req.user;
  const { filename, path: dirPath } = req.file;
  const avatarURL = await updateAvatar(userId, filename, dirPath);
  res.status(200).json({ avatarURL });
};

module.exports = {
  uploadController,
};
