import express from "express";
export const routerProductos = express.Router();
import { productos, pets } from "../utils.js";

routerProductos.get("/", (req, res) => {
  const precio = req.query.precio;
  if (req.query && precio) {
    const productosFiltradosPorPrecio = productos.filter(
      (p) => p.precio == precio
    );
    return res.status(200).json({
      status: "success",
      msg: "te paso todos los productos cuyo precio = " + precio,
      data: productosFiltradosPorPrecio,
    });
  } else {
    return res.status(200).json({
      status: "success",
      msg: "te paso todos los productos",
      data: productos,
    });
  }
});

routerProductos.get("/:id", (req, res) => {
  const id = req.params.id;
  const producto = productos.find((p) => p.id == id);
  if (producto) {
    return res.status(200).json({
      status: "success",
      msg: "producto encontrado con exito",
      data: producto,
    });
  } else {
    return res.status(400).json({
      status: "error",
      msg: "no se encontro el producto",
      data: {},
    });
  }
});

routerProductos.delete("/:id", (req, res) => {
  const id = req.params.id;
  //const producto = productos.find((p) => p.id == id);
  productos = productos.filter((p) => p.id != id);

  return res.status(200).json({
    status: "success",
    msg: "filtramos los productos cuyo id es " + id,
    data: {},
  });
});

routerProductos.put("/:id", (req, res) => {
  const id = req.params.id; //10000
  const datosNuevos = req.body; // {name: otra cosa , precio: 666}
  const indice = productos.findIndex((p) => p.id == id);
  if (indice == -1) {
    return res.status(404).json({
      status: "error",
      msg: "error ya que este producto no existe",
      data: {},
    });
  } else {
    productos[indice] = { ...datosNuevos, id: productos[indice].id };
    return res.status(201).json({
      status: "success",
      msg: "producto modificado ok",
      data: productos[indice],
    });
  }
});

routerProductos.post("/", (req, res) => {
  const productoParaCrear = req.body;
  productoParaCrear.id = (Math.random() * 1000000000).toFixed(0);
  productoParaCrear.fecha = Date.now();
  productos.push(productoParaCrear);
  return res.status(201).json({
    status: "success",
    msg: "creamos el producto que pediste",
    data: productoParaCrear,
  });
});
