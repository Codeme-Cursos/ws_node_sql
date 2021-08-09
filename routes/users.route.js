const express = require("express");
const {
  getUsers,
  postUsers,
  deleteUserById,
  getUserById,
  patchUserById,
} = require("../controllers/users.controller");
const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.post("/user", postUsers);
router.patch("/user/:id", patchUserById);
router.delete("/user/:id", deleteUserById);

module.exports = router;
