export let productos = [
  { id: "1000000", name: "pelota boca", precio: 100 },
  { id: "1000001", name: "pelota river", precio: -10 },
  { id: "1000002", name: "pelota tigre", precio: 5 },
  { id: "1000004", name: "pelota manchester", precio: 100 },
];

export let pets = [
  { id: "1000000", name: "mirta", edad: 100 },
  { id: "1000001", name: "guillepet", edad: 40 },
  { id: "1000002", name: "picachu", edad: 5 },
];

import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });
