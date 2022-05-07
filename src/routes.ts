
import express from 'express';
import { SubmitFeedbackUseCase } from './useCases/SubmitFeedbackUseCase';
import { PrismaFeedbackRepository } from './repositories/prisma/PrismaFeedbackRepository';
import { NodemailerMailAdapter } from './adapters/nodemailer/NodemailerMailAdapter';

export const routes = express.Router();


routes.post('/feedbacks', async (req, res)=>{

    const {type, comment, screenshot} = req.body;

    try {
        const prismaFeedbackRepository = new PrismaFeedbackRepository();
        const nodemailerMailAdapter = new NodemailerMailAdapter()
        const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodemailerMailAdapter);
    
        await submitFeedbackUseCase.execute({
            type, comment, screenshot
        });
    
        return res.status(201).send();
        
    } catch (err) {
        console.log(err);
        return res.status(500).send();
        
    }

   
});