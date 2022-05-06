import { IEmailDTO, IMailAdapter } from "../IMailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b138c002050aae",
      pass: "8db4fa66ccb9cb"
    }
  });

export class NodemailerMailAdapter implements IMailAdapter {
    async sendEmail(data: IEmailDTO): Promise<void> {
        await transport.sendMail({
            from: "InternetSAT Team Development <oi@feedget.com>",
            to: "André Pimentel <acosta@postoeletrico.com",
            subject: data.subject,
            html: data.body
        });
    }

}