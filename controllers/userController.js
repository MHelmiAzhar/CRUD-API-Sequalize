const { user, car } = require("../models");
const bcrypt = require("bcrypt");

async function getUsers(req, res) {
  try {
    const data = await user.findAll();

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      msg: error.message,
    });
  }
}
async function createUsers(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    newUser = await user.create({
      name: name,
      email: email,
      role: role,
      password: hashPassword,
    });

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      msg: error.message,
    });
  }
}
async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const data = await user.findByPk(id, {
      include: { model: car },
    });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      msg: error.message,
    });
  }
}
async function updatetUser(req, res) {
  try {
    const { name } = req.body;
    const id = req.params.id;
    const data = await user.update(
      {
        name,
      },
      {
        where: { id },
      }
    );

    res.status(200).json({
      status: "success",
      msg: `user dengan id ${id} berhasi diupdate`,
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      msg: error.message,
    });
  }
}
async function deletetUser(req, res) {
  try {
    const id = req.params.id;
    const data = await user.destroy({
      where: { id },
    });

    res.status(200).json({
      status: "success",
      msg: `user dengan id ${id} berhasi dihapus`,
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      msg: error.message,
    });
  }
}

module.exports = {
  getUsers,
  createUsers,
  updatetUser,
  deletetUser,
  getUserById,
};
