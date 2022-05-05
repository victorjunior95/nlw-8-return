// Arquivo para acessar o DB
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  // gera uma mensagem de log a cada operação no DB Prisma
  log: ['query']
});