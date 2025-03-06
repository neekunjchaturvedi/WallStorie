const Userinfo = require("../../models/userinfo");

const createUserinfo = async (req, res) => {
  try {
    const { phone, email } = req.body;
    const newUserinfo = new Userinfo({ phone, email });
    await newUserinfo.save();
    res.status(201).json(newUserinfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all user info
const getAllUserinfo = async (req, res) => {
  try {
    const userinfos = await Userinfo.find();
    res.status(200).json(userinfos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUserinfo, getAllUserinfo };
