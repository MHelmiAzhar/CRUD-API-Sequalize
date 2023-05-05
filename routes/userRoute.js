const router = require("express").Router();
const {
  getUsers,
  createUsers,
  updatetUser,
  deletetUser,
  getUserById,
} = require("../controllers/userController");
const { verifyToken, superadminOnly } = require("../middleware/auth");

router.get("/api/v1/users", verifyToken, getUsers);
router.post("/api/v1/user/register-user", createUsers);
router.post(
  "/api/v1/user/register-admin",
  verifyToken,
  superadminOnly,
  createUsers
);
router.put("/api/v1/user/:id", verifyToken, updatetUser);
router.delete("/api/v1/user/:id", verifyToken, deletetUser);
router.get("/api/v1/user/:id", verifyToken, getUserById);

module.exports = router;
