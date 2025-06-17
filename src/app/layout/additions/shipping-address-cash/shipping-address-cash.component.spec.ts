import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAddressCashComponent } from './shipping-address-cash.component';

describe('ShippingAddressCashComponent', () => {
  let component: ShippingAddressCashComponent;
  let fixture: ComponentFixture<ShippingAddressCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingAddressCashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShippingAddressCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
