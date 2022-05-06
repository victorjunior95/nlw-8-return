import nodemailer from 'nodemailer'; // lib para envios de e-mail

import { MailAdapter, sendMailData } from "../mail-adapter";

// Configuração de Integração do Nodemailer com o Mailtrap
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6b83a6edf55cdf",
    pass: "1d670082132edd"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: sendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feeget.com>', // configuração do remetente, nesse caso, a APP
      to: 'Victor Junior <victor.junior.silv0@gmail.com>',
      subject,
      html: body,
    });
  }
}