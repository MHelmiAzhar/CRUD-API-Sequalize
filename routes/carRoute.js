const router = require("express").Router();
const {
  getCars,
  createCar,
  updatetCar,
  deletetCar,
  getCarById,
} = require("../controllers/carController");
const {
  verifyToken,

  adminOrSuperAdminOnly,
} = require("../middleware/auth");

router.get("/api/v1/cars", verifyToken, getCars);
router.post("/api/v1/car", verifyToken, adminOrSuperAdminOnly, createCar);
router.put("/api/v1/car/:id", verifyToken, adminOrSuperAdminOnly, updatetCar);
router.delete(
  "/api/v1/car/:id",
  verifyToken,
  adminOrSuperAdminOnly,
  deletetCar
);
router.get("/api/v1/car/:id", verifyToken, adminOrSuperAdminOnly, getCarById);

module.exports = router;
