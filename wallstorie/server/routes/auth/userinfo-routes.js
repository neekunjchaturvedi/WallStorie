const express = require("express");
const {
  getAllUserinfo,
  createUserinfo,
  fetchAllUsers,
} = require("../../controllers/auth/userinfocontroller");

const router = express.Router();

router.get("/userinfo", getAllUserinfo);
router.get("/getusers", fetchAllUsers);
router.post("/userinfopost", createUserinfo);

module.exports = router;
