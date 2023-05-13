import express from "express";
import { routerPets } from "./routes/pets.router.js";
import { routerProductos } from "./routes/productos.router.js";
import path from "path";
import { __dirname } from "./utils.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//archivos publicos
app.use(express.static(__dirname + "/public"));
//TODOS NUESTROS ENDPOINT
app.use("/productos", routerProductos);
app.use("/pets", routerPets);

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
