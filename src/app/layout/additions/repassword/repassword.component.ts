import { rePasswordData } from './../../../shared/interfaces/data';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RepasswordService } from '../../../shared/services/authorization/repassword.service';
import { ActivatedRoute, Router } from '@angular/router';
import { loginService } from '../../../shared/services/authorization/login-service.service';

@Component({
  selector: 'app-repassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './repassword.component.html',
  styleUrl: './repassword.component.css'
})
export class RepasswordComponent {

  isLoading:boolean = false;
  errMsg!:string;
  defualtEmail!:string;
  rePasswordForm = new FormGroup({
    email: new FormControl({ value: this.defualtEmail, disabled: true }, [Validators.required, Validators.email]),
    newPassword : new FormControl('',[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)]),
  })
  constructor(private _RepasswordService:RepasswordService ,private _ActivatedRoute:ActivatedRoute , private _Router:Router , private _loginService:loginService){}
  ngOnInit() {
    this._ActivatedRoute.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        this.rePasswordForm.get('email')?.setValue(email);
      }
    });
  }
  submitRePassword(){
    if (this.rePasswordForm.valid) {
      this.isLoading = true
      const  rePassword:rePasswordData = this.rePasswordForm.getRawValue() as rePasswordData 
      // console.log(rePassword);
      this._RepasswordService.rePassword(rePassword).subscribe({
        next : (response) =>{  
          console.log('Success ' , response)
          this.isLoading = false;
          let token = response['token'];
          localStorage.setItem('userToken', token); 
          this._loginService.decodeUserData(); // method to decode the token
          this._Router.navigate(["/home"])
        },
        error : err =>{
          console.log('Somthing went Wrong',err);
          this.isLoading = false;
        }
      })
  }
   
  }
}
