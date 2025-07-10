import { registerData } from './../../../shared/interfaces/data';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupAuthService } from '../../../shared/services/authorization/signup-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']  // Changed to styleUrls from styleUrl
})
export class RegisterComponent {
  isLoading:boolean = false;
  errMsg!:string;
  
  registerForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)]),
    rePassword: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { validators: this.checkRepasswordMatch });

  constructor(private _SignupAuthService: SignupAuthService , private _Router:Router) { }
  checkRepasswordMatch(g: AbstractControl): { [key: string]: boolean } | null {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      g.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }
  submitRegister() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const formData: registerData = this.registerForm.value as registerData;
      this._SignupAuthService.signUp(formData).subscribe({
        next: (response) => {
        this.isLoading = false;
          console.log('Registration successful', response);
          this._Router.navigate(['/login'])
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Registration error', err);
          this.errMsg = err.error.message;
        }
      });
    } 
    console.log(this.registerForm.value);    
  }
}
