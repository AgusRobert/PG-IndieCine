const bcrypt = require("bcryptjs");

exports.encrypt = async (textPlane) => {
    return (await bcrypt.hash(textPlane,14));
};

exports.compare = async (textPlane, textEncrypt) => {
    return (await bcrypt.compare(textPlane, textEncrypt));
};