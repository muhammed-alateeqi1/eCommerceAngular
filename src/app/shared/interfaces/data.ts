export interface registerData extends loginData{
    email:string;
    rePassword:string;
    phone:string;
}

export interface loginData {
    name:'string',
    password:'string'
}