import {FileHandleMal} from './FlileHandleMal';
import {Roles} from "./roles";

export class User {
    id: number;
    username: string;

    fullName: string;
    email: string;
    phoneNumber: string;

    password: string;

    confirmPassword: string;
    gender: string;
    roles: Roles[];

    userImages: FileHandleMal[];
}
