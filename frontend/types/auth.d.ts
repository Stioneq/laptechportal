/* tslint:disable */
// Generated using typescript-generator version 2.3.415 on 2018-07-13 18:46:31.

export interface IconUploadRequest {
    base64Icon: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface SignUpUserRequest {
    name: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface GetIconResponse {
    icon: any;
}

export interface GetUserResponse {
    name: string;
    firstname: string;
    lastname: string;
    email: string;
    roles: string[];
}
