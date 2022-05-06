export interface FeedbackCreateDTO {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface IFeedbackRepository {
    create(data: FeedbackCreateDTO):Promise<void>;
}