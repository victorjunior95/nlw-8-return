// Contrato (interface) - responde às rotas e casos de uso quais são as operações que podem ser realizadas no DB, mas não implementa.

// dados necessários para criar um feedback
export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

// Definição dos métodos/funções do repositório de feedbacks
export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}