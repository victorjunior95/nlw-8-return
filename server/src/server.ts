import express from 'express';
import cors from 'cors';

import { routes } from './routes';

const app = express();

app.use(cors());// Permite o acesso de qualquer FE
// Caso de uso em produção, passando o endereço do FE que consome essa APP
// app.use(cors({
//   origin: 'http://localhost:3000'
// }));
app.use(express.json());

app.use(routes)

app.listen(3333, () => {
  console.log('HTTP server running!');
});