import { Observable } from 'rxjs';
import { ResetcodeService } from './../../../shared/services/authorization/resetcode.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { resetCode } from '../../../shared/interfaces/data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sendcodeform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sendcodeform.component.html',
  styleUrl: './sendcodeform.component.css'
})
export class SendcodeformComponent {
  sendCodeFlag: boolean = false;
  email!:string;
  sendCodeForm = new FormGroup({
    resetCode: new FormControl<string>('', [Validators.required, Validators.pattern(/^[0-9]{5,}$/)]),
  })
  constructor(private _ResetcodeService: ResetcodeService , private _ActivatedRoute:ActivatedRoute ,private _Router:Router) {}
  ngOnInit() {
    // Pass the email form forgetPassword Component
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.email = params['email'] || ''; 
    });
  }
  errorMsg!: string;
  successMessage !:string;
  submitResetCode() {
    if (this.sendCodeForm.valid) {
      this.sendCodeFlag = true
      let resetCodeValue: resetCode = this.sendCodeForm.value as resetCode;
      console.log(resetCodeValue);

      this._ResetcodeService.resetCodeFunc(resetCodeValue).subscribe({
        next: (response) => {
          console.log('Successfuly Code Sent', response);
          this.sendCodeFlag = false;
          this._Router.navigate(['/repassword'], { queryParams:{ email: this.email }});
        },
        error: (err) => {
          if (err.error.message === 'Reset code is invalid or has expired') {
            this.errorMsg = 'The reset code has expired. Please request a new one.';
          } else if (err.error.status === 'fail') {
            this.errorMsg = 'This code is wrong.';
          }else{
            this.errorMsg = 'An unexpected error occurred. Please try again later.';
          }
          console.log(this.errorMsg);
          this.sendCodeFlag = false;
        }
      });
    }
  }
}

