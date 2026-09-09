import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly angularVersion = VERSION.major;
}
