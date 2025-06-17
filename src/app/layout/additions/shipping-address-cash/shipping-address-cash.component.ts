import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/orders/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-shipping-address-cash',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address-cash.component.html',
  styleUrl: './shipping-address-cash.component.css'
})
export class ShippingAddressCashComponent implements OnInit{
 isLoading: boolean = false;
  constructor(private _OrderService: OrderService, private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _CartService: CartService) { }
  ngOnInit(): void {
    if (typeof localStorage != "undefined") {
      localStorage.setItem('currentPage', '/shippingaddress')
    }
  }
  shippingAdressFormCash: FormGroup = new FormGroup({
    details: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
  })

  submitShippingAdressCashForm() {
    // console.log(this.shippingAdressForm.value)
    if (this.shippingAdressFormCash.valid) {
      this.isLoading = true;
      this._ActivatedRoute.paramMap.subscribe({
        next: p => {
          console.log(p.get('cartId'))
          this._OrderService.checkOrderCash(p.get('cartId')!, this.shippingAdressFormCash.value).subscribe({
            next: res => {
              console.log('CashOrders :' , res);
              this.isLoading = false;
              localStorage.removeItem('currentPage');
              this._Router.navigate(['/allorders'])
              this._CartService.clearLocalCart();
            },
            error : err =>{
              console.error('Error Creating cash orders : ', err);
              this.isLoading = false;
            }
          })
        }
      })

    }

  }
}
