import type { IUser } from "@/models/IUser";

export interface IAuth extends IUser{
    access_token:string
}