import express from 'express';
import nodemailer from 'nodemailer'; // lib para envios de e-mail
import { prisma } from './prisma';

const app = express();

app.use(express.json());

// Configuração de Integração do Nodemailer com o Mailtrap
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6b83a6edf55cdf",
    pass: "1d670082132edd"
  }
});

// POST - rota de cadastro de feedbacks
app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  });

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feeget.com>', // configuração do remetente, nesse caso, a APP
    to: 'Victor Junior <victor.junior.silv0@gmail.com>',
    subject: 'Novo feedback', // Assunto/título
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color:#111;">`,
      `<p>Tipo do feedback: ${type}<p/>`,
      `<p>Comentário: ${comment}<p/>`,
      `<div/>`,
    ].join('\n'), // o corpo/mensagem do e-mail
  })  

  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
  console.log('HTTP server running!');
});