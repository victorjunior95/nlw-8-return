// TESTES UNITÁRIOS
import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

// spies = espiões -> sinaliza se alguma função, da APP, foi chamada dentro dos testes
const createFeedbackSpy = jest.fn(); // 'fn()' é uma função espiã, sem objetivo nenhum, somente para testar a chamada da mesma
const sendMailSpy = jest.fn();

// const submitFeedback = new SubmitFeedbackUseCase(
//   { create: async () => {} },
//   { sendMail: async () => {} },
//   )
const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
  )

describe('Submit feedback', () => {
  // alternativa test('')
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64foansidfhn0qjqf'
    })).resolves.not.toThrow(); // ao rodar o execute(resolves), que não(no) retorne um erro(toThrow)

    expect(createFeedbackSpy).toHaveBeenCalled(); // espero que a função createFeedbackSpy tenha sido chamada
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64foansidfhn0qjqf'
    })).rejects.toThrow(); // que não rode(rejects) e retorne um erro(toThrow)
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64foansidfhn0qjqf'
    })).rejects.toThrow(); // que não rode(rejects) e retorne um erro(toThrow)
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.png'
    })).rejects.toThrow(); // que não rode(rejects) e retorne um erro(toThrow)
  });
});

