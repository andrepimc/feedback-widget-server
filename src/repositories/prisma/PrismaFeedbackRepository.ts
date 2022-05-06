import { prisma } from "../../prisma";
import { IFeedbackRepository, FeedbackCreateDTO } from "../IFeedbackRepository";

export class PrismaFeedbackRepository implements IFeedbackRepository {
    async create({type, comment, screenshot}: FeedbackCreateDTO): Promise<void> {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        });
    }

}