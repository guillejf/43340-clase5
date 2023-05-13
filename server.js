const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let productos = [
  { id: "1000000", name: "pelota boca", precio: 100 },
  { id: "1000001", name: "pelota river", precio: -10 },
  { id: "1000002", name: "pelota tigre", precio: 5 },
  { id: "1000004", name: "pelota manchester", precio: 100 },
];

app.get("/productos", (req, res) => {
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

app.get("/productos/:id", (req, res) => {
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

app.delete("/productos/:id", (req, res) => {
  const id = req.params.id;
  //const producto = productos.find((p) => p.id == id);
  productos = productos.filter((p) => p.id != id);

  return res.status(200).json({
    status: "success",
    msg: "filtramos los productos cuyo id es " + id,
    data: {},
  });
});

app.put("/productos/:id", (req, res) => {
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

app.post("/productos", (req, res) => {
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

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "error esa ruta no existe",
    data: {},
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
