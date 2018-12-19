/* tslint:disable */
// Generated using typescript-generator version 2.3.415 on 2018-07-25 00:49:54.

export interface IconUploadRequest {
    base64Icon: string;
}

export interface LoginRequest {
    name: string;
    password: string;
}

export interface SignUpUserRequest {
    name: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface GetCommentsResponse {
    comments: GetCommentResponse[];
}

export interface GetCommentResponse {
    id: string;
    text: string;
    questionId: string;
    author: string;
    postedDate: Date;
    modifiedDate: Date;
}

export interface GetIconResponse {
    icon: any;
}

export interface GetQuestionResponse {
    id: string;
    postedDate: Date;
    modifiedDate: Date;
    rating: number;
    userRating: number;
    comments: number;
    title: string;
    question: string;
    answer: string;
    author: string;
    tags: Tag[];
}

export interface GetQuestionsResponse {
    questions: QuestionPreviewDTO[];
}

export interface GetUserResponse {
    name: string;
    firstname: string;
    lastname: string;
    email: string;
    roles: string[];
}

export interface RateQuestionResponse {
    id: string;
    rating: number;
}

export interface CommentDTO {
    text: string;
}

export interface QuestionDTO {
    title: string;
    question: string;
    answer: string;
    author: string;
    tags: Tag[];
}

export interface QuestionPreviewDTO {
    id: string;
    title: string;
    question: string;
    answer: string;
    author: string;
    rating: number;
    userRating: number;
    tags: Tag[];
    postedDate: Date;
    modifiedDate: Date;
}

export interface Tag {
    title: string;
    background: string;
    color: string;
}
