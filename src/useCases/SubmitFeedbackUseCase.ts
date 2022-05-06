import { IMailAdapter } from "../adapters/IMailAdapter";
import { IFeedbackRepository } from "../repositories/IFeedbackRepository";

interface IRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbackRepository: IFeedbackRepository,
        private mailAdapter: IMailAdapter
    ){}
    async execute({type, comment, screenshot}: IRequest){

        if(!type){
            throw new Error('Type is required.')
        }

        if(!comment){
            throw new Error('Comment is required.')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Formato inválido...')
        }

        await this.feedbackRepository.create({type, comment, screenshot});
        await this.mailAdapter.sendEmail({
            subject: "Novo feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo de feedback: ${type}</p>"`,
                `<p>Comentário do feedback: ${comment}</p>"`,
                screenshot ? `<img src="${screenshot}"/>` : ``,
                `</div>`
            ].join('/n')
        })
    }
}