import express from "express";
import { routerProductos } from "./routes/productos.router.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODOS NUESTROS ENDPOINT
app.use("/productos", routerProductos);
// app.use("/pets", routerPets);

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
