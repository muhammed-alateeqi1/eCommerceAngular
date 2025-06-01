
export interface email{
    email:string
}

export interface loginData {
    name:'string',
    password:'string'
}
export interface registerData extends loginData , email{
    rePassword:string;
    phone:string;
}
export interface resetCode {
    resetCode:string;
}
export interface rePasswordData extends email{
        token:any;
        newPassword:string;
}
export interface shippingAdress{
    details:string;
    phone:string;
    city:string;
}