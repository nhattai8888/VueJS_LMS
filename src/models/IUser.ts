
export interface IUser{
    _id:string,
    full_name:string,
    role:string,
    password:string,
    email:string
}

export interface ILogin {
    email:string,
    password:string
}