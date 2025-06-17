  import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { loginService } from '../../../shared/services/authorization/login-service.service';
import { loginData } from '../../../shared/interfaces/data';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  successLogedIn:boolean = false;
  errLoginMsg!: string;
  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8), Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)]),
  })
  constructor(private _loginService: loginService, private _Router: Router) {}
  submitLogin() {
    if(this.loginForm.valid){
      this.successLogedIn = true
      const loginFormData:loginData = this.loginForm.value as loginData;
      console.log(this.loginForm);
      
      this._loginService.signIn(loginFormData).subscribe({
        next: (response) => {
          console.log("Registeration Successful", response);
          localStorage.setItem('userToken',response.token)
          this._loginService.decodeUserData(); // method to decode the token
          this._Router.navigate(["/home"])
          this.successLogedIn = false
        },
        error: (err) => {
          console.error('loginForm Error', err)
          this.errLoginMsg = err.error.message;
          // console.log(this.errLoginMsg);
          if(this.errLoginMsg == "fail"){
            this.errLoginMsg = "You Should Enter Your Password"
          }
          this.successLogedIn = false
        }
      });
    }
  }

}

