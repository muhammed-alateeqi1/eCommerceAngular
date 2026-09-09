import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { product } from '../../interfaces/product';

/**
 * Product tile used by the home and products pages, which previously carried
 * two copies of the same markup.
 *
 * The "Add to cart" button stays visible on touch screens; the original design
 * only revealed it on hover, which made it unreachable on mobile.
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LowerCasePipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: product;
  @Output() addToCart = new EventEmitter<string>();
}
