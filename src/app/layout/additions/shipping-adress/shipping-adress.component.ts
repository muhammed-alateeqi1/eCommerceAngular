import { CartService } from './../../../shared/services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../shared/services/orders/order.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-shipping-adress',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-adress.component.html',
  styleUrl: './shipping-adress.component.css'
})
export class ShippingAdressComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private _OrderService: OrderService, private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _CartService: CartService) { }
  ngOnInit(): void {
    if (typeof localStorage != "undefined") {
      localStorage.setItem('currentPage', '/shippingaddress')
    }
  }

  shippingAdressForm: FormGroup = new FormGroup({
    details: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl<string>('', [Validators.required, Validators.min(3)]),

  })

  submitShippingAdressForm() {
    // console.log(this.shippingAdressForm.value)
    if (this.shippingAdressForm.valid) {
      this._ActivatedRoute.paramMap.subscribe({
        next: p => {
          console.log(p.get('cartId'))
          this._OrderService.checkOrder(p.get('cartId')!, this.shippingAdressForm.value).subscribe({
            next: res => {
              localStorage.removeItem('currentPage');
              window.location.href = res.session.url;
              this._CartService.clearLocalCart();
            }
          })
        }
      })

    }

  }
}
