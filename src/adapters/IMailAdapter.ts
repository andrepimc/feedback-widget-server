export interface IEmailDTO {
    subject: string;
    body: string;
}

export interface IMailAdapter {
    sendEmail(data: IEmailDTO):Promise<void>
} 