import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAdressComponent } from './shipping-adress.component';

describe('ShippingAdressComponent', () => {
  let component: ShippingAdressComponent;
  let fixture: ComponentFixture<ShippingAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingAdressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShippingAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
