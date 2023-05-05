const { user } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res
        .status(401)
        .json({ status: "failed", msg: "You are not login" });

    const payload = jwt.verify(token, process.env.TOKEN);

    const data = await user.findByPk(payload.id);
    req.user = data;
    next();
  } catch (error) {
    res.status(400).json({
      status: "failed",
      msg: error.message,
    });
  }
}
async function adminOrSuperAdminOnly(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      message: "akses ditolak!",
    });

  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (decoded.role === "superadmin" || decoded.role === "admin") {
      res.status(200);
      next();
    } else {
      return res.status(400).json({
        message: "akses ditolak!",
      });
    }
  });
}

async function superadminOnly(req, res, next) {
  if (req.user.role !== "superadmin") {
    res.status(403).json({
      status: "failed",
      message: "You are not authenticated",
    });
  } else {
    next();
  }
}

module.exports = { verifyToken, superadminOnly, adminOrSuperAdminOnly };
