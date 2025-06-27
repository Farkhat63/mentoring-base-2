import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateTitle',
  standalone: true
})
export class TruncateTitlePipe implements PipeTransform {

  transform(value: string | undefined, limit: number = 7): string {
    if (!value) return '';
    return value.length > limit ? value.slice(0, limit) + '...' : value;
  }

}
