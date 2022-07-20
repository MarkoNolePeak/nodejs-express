const { createUser, getUserByUserId, getUsers,updateUsers, deleteUser,login, token, logout} = require("./user.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");

//router.use();
router.post("/", checkToken,createUser);
router.get("/", checkToken,getUsers);
router.get("/:id", checkToken,getUserByUserId);
router.patch("/", checkToken,updateUsers);
router.delete("/", checkToken,deleteUser);
router.post("/login",login);
router.post("/token",token);
router.delete("/logout",logout);






module.exports = router;