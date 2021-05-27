if (process.env.NODE_ENV !== 'production') { require('dotenv').config() };
import express from 'express';
const app = express();
const PORT: number = Number(process.env.PORT) || 4000;

app.get('/', (req, res, next) => { res.status(200).json("test") });

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});