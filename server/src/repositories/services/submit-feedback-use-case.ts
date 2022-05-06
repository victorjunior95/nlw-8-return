// Inversão de Dependências ("I" de SOLID) - responsabiliza o arquivo que usará/importará a regra de negócio à passar as dependências (por parâmetro), nesse caso o ORM Prisma
// O Prisma passa a ser inversamente injetado

// *Service relativo a Use Case


import { MailAdapter } from "../../adapters/mail-adapter";
import { FeedbacksRepository } from "../feedbacks-repository";

// Tipos de dados necessários para enviar/criar/cadastrar um novo feedback
interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
} // Pq uma nova interface igual a FeedbackCreateData? Pq são de camadas diferentes da APP. FeedbackCreateData -> camada de dados | SubmitFeedbackUseCaseRequest -> camada da APP, das regras de negócio da mesma

// Esse caso de uso tem apenas um método, uma única responsabilidade, nesse caso a submissão/cadastro de um feedback ("S" de SOLID)
export class  SubmitFeedbackUseCase {
  // private feedbacksRepository: FeedbacksRepository;

  // constructor(feedbacksRepository: FeedbacksRepository) {
  //   this.feedbacksRepository = feedbacksRepository;
  // }  // Alternativa de implementação
  constructor( // ??? explicação para constructor
    // O tipo desse repositório não será (não ficará acoplado) o do Prisma e sim o Contrato
    private feedbacksRepository: FeedbacksRepository, // ??? explicação para private
    private mailAdapter: MailAdapter, // declaração de nova dependência
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    // regra de negócio: salvar o feedback no DB
    const { type, comment, screenshot } = request;

    // Valida se o campo type não está vazio
    if(!type) {
      throw new Error('Type is required.');
    }

    // Valida se o campo comment não está vazio
    if(!comment) {
      throw new Error('Comment is required.');
    }

    // Valida o formato correto da screenshot
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create({ // ??? explicação para this.
      type,
      comment,
      screenshot,
    });
    // CASO QUEIRA RETORNAR as informações cadastradas com sucesso
    // const feedback = await this.feedbacksRepository.create({ // ??? explicação para this.
    //   type,
    //   comment,
    //   screenshot,
    // });
    // return feedback;

    // regra de negócio: enviar o e-mail
    await this.mailAdapter.sendMail({
      subject: 'Novo feedback', // Assunto/título
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color:#111;">`,
        `<p>Tipo do feedback: ${type}<p/>`,
        `<p>Comentário: ${comment}<p/>`,
        `<div/>`,
      ].join('\n'), // o corpo/mensagem do e-mail
    });
  }
}

    
// SEM a Inversão de Dependências
// import { PrismaFeedbacksRepository } from "../prisma/prisma-feedbacks-repository";

// interface SubmitFeedbackUseCaseRequest {
//   type: string;
//   comment: string;
//   screenshot?: string;
// }

// export class  SubmitFeedbackUseCase {
//   async execute(request: SubmitFeedbackUseCaseRequest) {
//     // regra de negócio: salvar o feedback no DB
//     const { type, comment, screenshot } = request;

//     // Vai funcionar, mas mantém minha APP acoplada ao Prisma, dificultando a alteração
//     const prismaFeedbacksRepository = new PrismaFeedbacksRepository(); // instanciação do PrismaFeedbacksRepository

//     await prismaFeedbacksRepository.create({
//       type,
//       comment,
//       screenshot,
//     }) // poderia complementar enviando uma mensagem de retorno
//   }
// }