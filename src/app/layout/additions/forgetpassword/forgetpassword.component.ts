import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetpasswordService } from '../../../shared/services/authorization/forgetpassword.service';
import { email } from '../../../shared/interfaces/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  isLoading:boolean = false;
  ForgetPasswordForm = new FormGroup({
    email : new FormControl<string>('',[Validators.required , Validators.email , Validators.pattern(/^.*@.*$/)])
  });
  constructor(private _ForgetpasswordService:ForgetpasswordService , private _Router:Router){
    let userEmail =  this.ForgetPasswordForm.get('email')?.value;
    
  }
  sendMail(){
    let data:email = this.ForgetPasswordForm.value as email;
    console.log(this.ForgetPasswordForm);
    if(this.ForgetPasswordForm.valid){
      this.isLoading=true;
      this._ForgetpasswordService.forgetPassword(data).subscribe({
        next:(response)=>{
          this.isLoading = false;
          console.log(response);
          this._Router.navigate(['/sendcode'] , {queryParams : {email: data.email}})
          // console.log(response.statusMsg);
        },
        error: (error)=>{
          this.isLoading = false;
          console.log(error);
        }
      })
    }
  }
}
