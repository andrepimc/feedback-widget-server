import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('submit feedback', ()=>{
    it('should be able to submit a feedabck', async ()=>{
        const submitFeedback = new SubmitFeedbackUseCase(
            { create: createFeedbackSpy },
            { sendEmail: sendMailSpy}
        );

       await expect(submitFeedback.execute({
            type: "BUG",
            comment: "ERROOO :(",
            screenshot: "data:image/png;base64,567567ghff6ffdif8uo7"
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
});