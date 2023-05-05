const { user } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const data = await user.findOne({
      where: {
        email,
      },
    });

    if (!data) {
      res.status(404).json({
        status: "failed",
        msg: "User not found",
      });
    }

    if (data && bcrypt.compareSync(password, data.password)) {
      const token = jwt.sign(
        {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
        },
        process.env.TOKEN
      );
      res.status(200).json({
        status: "success",
        data: {
          data,
          token,
        },
      });
    } else {
      return res.status(404).json({ msg: "email or password wrong" });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      msg: error.message,
    });
  }
}

async function me(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res
        .status(401)
        .json({ status: "failed", msg: "You are not login" });

    const payload = jwt.verify(token, process.env.TOKEN);

    const data = await user.findByPk(payload.id);
    if (!data) return res.status(404).json({ msg: "User Not Found" });
    res.status(200).json(data);
    next();
  } catch (error) {
    res.status(400).json({
      status: "failed",
      msg: error.message,
    });
  }
}

module.exports = { login, me };
