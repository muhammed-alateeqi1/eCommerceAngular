import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onsale',
  standalone: true
})
export class OnsalePipe implements PipeTransform {

  transform(title : string): string {
    return `on sale : ${title}`;
  }

}
