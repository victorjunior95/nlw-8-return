import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';

import { SubmitFeedbackUseCase } from './repositories/services/submit-feedback-use-case';

export const routes = express.Router();

// POST - rota de cadastro de feedbacks
routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  // pedaço desacoplado para PrismaFeedbacksRepository
  // const feedback = await prisma.feedback.create({ // ??? explicação para this.
  //   data: {
  //     type,
  //     comment,
  //     screenshot,
  //   }
  // })

  // Inversão de Dependências - responsabiliza o arquivo que usará/importará a regra de negócio à passar as dependências (por parâmetro), nesse caso o ORM Prisma
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()

  const nodemailer = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailer
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })  

  // CASO QUEIRA RETORNAR as informações cadastradas com sucesso
  // return res.status(201).json({ data: feedback });
  return res.status(201).send();
});