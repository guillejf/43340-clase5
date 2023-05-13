import express from "express";
import { pets } from "../utils.js";
import { uploader } from "../utils.js";
export const routerPets = express.Router();

routerPets.get("/", (req, res) => {
  const edad = req.query.edad;
  if (req.query && edad) {
    const petsFiltradosPorEdad = pets.filter((p) => p.edad == edad);
    return res.status(200).json({
      status: "success",
      msg: "te paso todos los pets cuyo edad = " + edad,
      data: petsFiltradosPorEdad,
    });
  } else {
    return res.status(200).json({
      status: "success",
      msg: "te paso todos los pets",
      data: pets,
    });
  }
});

routerPets.get("/:id", (req, res) => {
  const id = req.params.id;
  const pet = pets.find((p) => p.id == id);
  if (pet) {
    return res.status(200).json({
      status: "success",
      msg: "pet encontrado con exito",
      data: pet,
    });
  } else {
    return res.status(400).json({
      status: "error",
      msg: "no se encontro el pet",
      data: {},
    });
  }
});

routerPets.delete("/:id", (req, res) => {
  const id = req.params.id;
  pets = pets.filter((p) => p.id != id);

  return res.status(200).json({
    status: "success",
    msg: "filtramos los pets cuyo id es " + id,
    data: {},
  });
});

routerPets.put("/:id", (req, res) => {
  const id = req.params.id;
  const datosNuevos = req.body;
  const indice = pets.findIndex((p) => p.id == id);
  if (indice == -1) {
    return res.status(404).json({
      status: "error",
      msg: "error ya que este pet no existe",
      data: {},
    });
  } else {
    pets[indice] = { ...datosNuevos, id: pets[indice].id };
    return res.status(201).json({
      status: "success",
      msg: "pet modificado ok",
      data: pets[indice],
    });
  }
});

routerPets.post("/", uploader.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).send({
      status: "error",
      msg: "error no enviaste una foto o no se puedo subir la misma",
      data: {},
    });
  }

  const petParaCrear = req.body;
  petParaCrear.id = (Math.random() * 1000000000).toFixed(0);
  petParaCrear.fecha = Date.now();
  petParaCrear.file = "http://localhost:3000/" + req.file.filename;
  pets.push(petParaCrear);
  return res.status(201).json({
    status: "success",
    msg: "creamos el pet que pediste",
    data: petParaCrear,
  });
});
