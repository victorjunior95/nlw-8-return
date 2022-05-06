// Implementação (class) - implementação das operações/métodos
// Desacoplando/Abstraindo o acesso da nossa APP ao DB ("D" de SOLID)
// *OBJETIVO -> caso seja necessário trocar o ORM (TypeORM, Sequelize, Knex, Mongo etc) basta criar outra classe de implementação que a APP continua funcionado.

import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      }
    });
  }
}