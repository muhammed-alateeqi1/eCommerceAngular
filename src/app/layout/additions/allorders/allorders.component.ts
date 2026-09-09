import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserOrdersRes, UserOrders } from '../../../shared/interfaces/user-orders';
import { loginService } from '../../../shared/services/authorization/login-service.service';
import { OrderService } from '../../../shared/services/orders/order.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly _loginService = inject(loginService);
  private readonly _OrderService = inject(OrderService);

  userId!: string;
  userOrders: UserOrders[] = [];
  isLoading = true;

  ngOnInit(): void {
    this._loginService.userData.subscribe((data) => {
      if (!data) return;
      this.userId = data.id;

      this._OrderService.getUserOrders(this.userId).subscribe({
        next: (res: UserOrdersRes) => {
          this.userOrders = res;
          this.isLoading = false;
        },
        error: () => (this.isLoading = false),
      });
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-EG').format(price) + ' EGP';
  }

  getPaymentMethodText(method: string): string {
    return method === 'card' ? 'Credit card' : 'Cash on delivery';
  }

  /** Tailwind classes for the status pill, appended to the base `badge` class. */
  getStatusClass(isPaid: boolean, isDelivered: boolean): string {
    if (isDelivered) return 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300';
    if (isPaid) return 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300';
    return 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300';
  }

  getStatusText(isPaid: boolean, isDelivered: boolean): string {
    if (isDelivered) return 'Delivered';
    if (isPaid) return 'Paid';
    return 'Pending';
  }

  downloadInvoice(orderId: string): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const invoiceElement = document.getElementById('invoice-' + orderId);
    if (!invoiceElement) return;

    const actions = invoiceElement.querySelectorAll<HTMLElement>('.order-actions');
    actions.forEach((el) => (el.style.display = 'none'));

    const restore = () => actions.forEach((el) => el.style.removeProperty('display'));

    import('html2pdf.js')
      .then((html2pdf: any) =>
        html2pdf
          .default()
          .from(invoiceElement)
          .set({
            margin: 10,
            filename: `invoice-${orderId}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          })
          .save()
      )
      // The buttons were previously left hidden once the PDF had been produced,
      // so the control disappeared until the page was reloaded.
      .finally(restore);
  }
}
