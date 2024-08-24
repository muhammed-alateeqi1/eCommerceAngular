export interface successRegister {
    message:'success';
    user: {
        name:string;
        email:string;
        role:string;
    };
    token:string;
}