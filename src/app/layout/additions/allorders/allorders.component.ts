
import { Component, OnInit } from '@angular/core';
import { UserOrdersRes, UserOrders } from '../../../shared/interfaces/user-orders';
import { loginService } from '../../../shared/services/authorization/login-service.service';
import { OrderService } from '../../../shared/services/orders/order.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {

  userId!: string;
  userOrders: UserOrders[] = [];
  isLoading: boolean = true;

  constructor(private _loginService: loginService, private _OrderService: OrderService) { }

  ngOnInit(): void {
    this._loginService.userData.subscribe((data) => {
      if (data) {
        this.userId = data.id;
        console.log('UserId :', this.userId);

        this._OrderService.getUserOrders(this.userId).subscribe({
          next: (res: UserOrdersRes) => {
            console.log(res);
            this.userOrders = res;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error fetching orders:', err);
            this.isLoading = false;
          }
        });
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('ar-EG').format(price) + ' جنيه';
  }

  getPaymentMethodText(method: string): string {
    return method === 'card' ? 'بطاقة ائتمان' : 'نقداً عند الاستلام';
  }

  getStatusClass(isPaid: boolean, isDelivered: boolean): string {
    if (isDelivered) return 'delivered';
    if (isPaid) return 'paid';
    return 'pending';
  }

  getStatusText(isPaid: boolean, isDelivered: boolean): string {
    if (isDelivered) return 'تم التسليم';
    if (isPaid) return 'تم الدفع';
    return 'في الانتظار';
  }

  downloadInvoice(orderId: string): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.warn('This code runs only in the browser.');
      return;
    }

    const invoiceElement = document.getElementById('invoice-' + orderId);

    if (!invoiceElement) {
      console.warn(`لم يتم العثور على العنصر invoice-${orderId}`);
      return;
    }

    import('html2pdf.js').then((html2pdf: any) => {
      const buttons = invoiceElement.querySelectorAll('.order-actions');
      buttons.forEach((btn: any) => btn.style.display = 'none');
      const options = {
        margin: 10,
        filename: `فاتورة-${orderId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf.default().from(invoiceElement).set(options).save();
    }).catch((error) => {
      console.error('فشل تحميل html2pdf:', error);
    });
  }

}