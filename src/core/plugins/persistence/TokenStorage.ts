export class TokenStorage{
    constructor(){
        
    }
    static getToken(){
        return localStorage.getItem("access_token")
    }
}