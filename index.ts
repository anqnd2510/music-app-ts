import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import methodOverride from "method-override";
import bodyParser from "body-parser";
import * as database from "./config/database";

import adminRoutes from "./routes/admins/index.route";
import clientRoutes from "./routes/clients/index.route";
import { systemConfig } from "./config/config";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;


// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(express.static(`${__dirname}/public`));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Admin Routes
adminRoutes(app);

// Client Routes
clientRoutes(app);


  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });