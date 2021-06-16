if (process.env.NODE_ENV !== 'production') { require('dotenv').config() };
import express from 'express';
import router from './routes/index-router';
import cors from 'cors';

const app = express();
const PORT: number = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});