import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';

@Injectable()
export class DateParserFormatter extends NgbDateParserFormatter {
  readonly DT_FORMAT = 'DD/MM/YYYY';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const mdt = dayjs(value.trim(), this.DT_FORMAT);
      return { day: mdt.day(), month: mdt.month() + 1, year: mdt.year() };
    }
    return null;
  }
  format(date: NgbDateStruct | null): string {
    if (!date) {
      return '';
    }
    return dayjs(`${date.year}-${date.month - 1}-${date.day}`).format(this.DT_FORMAT);
  }
}
