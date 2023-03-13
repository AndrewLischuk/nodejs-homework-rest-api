const fs = require("fs/promises");
const { constants } = require("fs");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../db/userModel");
const { NotAuthorizedError } = require("../helpers/errors");

const updateAvatar = async (userId, filename, dirPath) => {
  const oldAvatarURL = await User.findById(userId, { avatarURL: 1 });
  const avatarURL = await Jimp.read(dirPath)
    .then((image) => {
      const newAvatarUrl = `${path.resolve("./public/avatars")}\\${filename}`;
      image.cover(250, 250).write(newAvatarUrl);
      return newAvatarUrl;
    })
    .catch((err) => {
      console.error(err);
    });

  if (avatarURL) {
    fs.unlink(dirPath, (err) => {
      if (err) {
        throw err;
      }
    });
  }
  if (!avatarURL) {
    throw new NotAuthorizedError("You need to log in first!");
  }

  const rewriteAvatarURL = await User.findByIdAndUpdate(
    userId,
    {
      $set: { avatarURL },
    },
    { new: true }
  );

  if (rewriteAvatarURL) {
    try {
      await fs.access(oldAvatarURL.avatarURL, constants.F_OK);
    } catch {
      return avatarURL;
    }
    fs.unlink(oldAvatarURL.avatarURL, (err) => {
      if (err) {
        console.log("Previous avatar was not deleted, some error occurred");
        return avatarURL;
      }
    });
  }

  return avatarURL;
};

module.exports = {
  updateAvatar,
};
