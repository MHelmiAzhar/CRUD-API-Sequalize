const router = require("express").Router();
const {
  getUsers,
  createUsers,
  updatetUser,
  deletetUser,
  getUserById,
} = require("../controllers/userController");
const {
  verifyToken,
  superadminOnly,
  adminOrSuperAdminOnly,
} = require("../middleware/auth");

router.get("/api/v1/users", verifyToken, adminOrSuperAdminOnly, getUsers);
router.post(
  "/api/v1/user/register-user",
  verifyToken,
  adminOrSuperAdminOnly,
  createUsers
);
router.post(
  "/api/v1/user/register-admin",
  verifyToken,
  superadminOnly,
  createUsers
);
router.put("/api/v1/user/:id", verifyToken, adminOrSuperAdminOnly, updatetUser);
router.delete(
  "/api/v1/user/:id",
  verifyToken,
  adminOrSuperAdminOnly,
  deletetUser
);
router.get("/api/v1/user/:id", verifyToken, adminOrSuperAdminOnly, getUserById);

module.exports = router;
