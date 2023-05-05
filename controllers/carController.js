const { car, user } = require("../models");

async function getCars(req, res) {
  try {
    const data = await car.findAll();

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
async function createCar(req, res) {
  const { manufacture, model, price } = req.body;

  try {
    newCar = await car.create({
      manufacture: manufacture,
      model: model,
      price: price,
      userId: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: newCar,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      msg: error.message,
    });
  }
}
async function getCarById(req, res) {
  try {
    const id = req.params.id;
    const data = await car.findByPk(id);

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
async function updatetCar(req, res) {
  try {
    const { name } = req.body;
    const id = req.params.id;
    const data = await car.update(
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
async function deletetCar(req, res) {
  try {
    const id = req.params.id;
    const data = await car.destroy({
      where: { id },
    });

    res.status(200).json({
      status: "success",
      msg: `Mobil dengan id ${id} berhasi dihapus`,
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
  getCars,
  createCar,
  updatetCar,
  deletetCar,
  getCarById,
};
