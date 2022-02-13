const path = require("path");
const fs = require("fs").promises;
const jimp = require("jimp");

const {
  contact: { Contact },
} = require("../../models");

const avatars = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;

  const image = await jimp.read(tempUpload);
  await image.resize(250, 250);
  await image.writeAsync(tempUpload);

  const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

  try {
    const [extention] = filename.split(".").reverse();
    const newFileName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, newFileName);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", newFileName);
    await Contact.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = avatars;
