import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { __dirname } from './utils.js';
import { uploader } from "./utils.js";
import indexRouter from './routers/api/index.router.js';
import cartRouter from './routers/api/cart.router.js';
import productRouter from './routers/api/products.router.js';
import chatRouter from './routers/api/messages.router.js';
import userRouter from './routers/api/user.router.js';
import morgan from 'morgan';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan("dev"));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', indexRouter);
app.use("/api", uploader.single("thumbnails"), userRouter, cartRouter, productRouter, chatRouter);


app.use((error, req, res, next) => {
  const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});

export default app;