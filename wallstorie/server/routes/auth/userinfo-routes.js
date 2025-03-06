const express = require("express");
const {
  getAllUserinfo,
  createUserinfo,
} = require("../../controllers/auth/userinfocontroller");

const router = express.Router();

router.get("/userinfo", getAllUserinfo);
router.post("/userinfopost", createUserinfo);

module.exports = router;
