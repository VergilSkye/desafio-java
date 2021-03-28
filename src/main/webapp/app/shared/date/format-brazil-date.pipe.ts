import { Pipe, PipeTransform } from '@angular/core';

import * as dayjs from 'dayjs';

@Pipe({
  name: 'brazilDate',
})
export class FormatBrazilDatePipe implements PipeTransform {
  transform(day: dayjs.Dayjs | null | undefined): string {
    return day ? day.format('DD/MM/YYYY') : '';
  }
}
