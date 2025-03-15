const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_URL } = process.env;
//https://cloudinary.com/documentation/node_quickstart
//Refactored into chunks

cloudinary.config({
  cloudinary_url: CLOUDINARY_URL,
  secure: true,
});

cloudinary.config();

module.exports.uploadAsset = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    resource_type: "auto",
    access_mode: "public",
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error(
      `Boss, we have a problem: ${err}. If you don't understand what this means, take a screenshot and sent to Vlad. Usually the error above should tell you if the issue is with the file size, file type, or maybe the file is corrupt. If it's none of that, RIP.`,
    );
  }
};

//TODO: Test if this works
module.exports.destroyAsset = async (path) => {
  await cloudinary.uploader.destroy(path);
};

module.exports.getAssetInfo = async (publicId) => {
  const options = {
    colors: true,
  };

  try {
    const result = await cloudinary.api.resource(publicId, options);
    return result.colors;
  } catch (err) {
    console.error(err);
    throw new Error(
      `If you see an error here, it's probably that the file is deleted or corrupted, or our credits ran out. Either way, send (me) to Vova this message: ${err}`,
    );
  }
};

module.exports.createImageTag = (publicId, ...colors) => {
  const [effectColor, backgroundColor] = colors;

  let imageTag = cloudinary.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: "faces", crop: "thumb" },
      { radius: "max" },
      { effect: "outline:10", color: effectColor },
      { background: backgroundColor },
    ],
  });

  return imageTag;
};
