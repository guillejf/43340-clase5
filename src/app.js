import express from "express";
import handlebars from "express-handlebars";
import { routerPets } from "./routes/pets.router.js";
import { routerProductos } from "./routes/productos.router.js";
import { routerVistaProductos } from "./routes/productos.vista.router.js";
import { __dirname } from "./utils.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//archivos publicos
app.use(express.static(__dirname + "/public"));
//ENDPOINT TIPO API CON DATOS CRUDOS EN JSON
app.use("/api/productos", routerProductos);
app.use("/api/pets", routerPets);

//HTML REAL TIPO VISTA
app.use("/vista/productos", routerVistaProductos);

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
