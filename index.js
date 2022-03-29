import { squad } from "./squad.js";
import express from "express";

const app = express();
const PORT = 8000;

app.use(express.json());

app.listen(PORT, () => console.log(`Server is Running on port:${PORT}`));

app.get("/get", (req, res) => {
 res.status(200).send(squad)
});
