if (process.env.NODE_ENV !== 'production') { require('dotenv').config() };
import express from 'express';
import router from './routes';
import cors from 'cors';
import errorHandler from './middlewares/error-handler';


const app = express();
const PORT: number = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});