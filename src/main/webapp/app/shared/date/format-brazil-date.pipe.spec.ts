import * as dayjs from 'dayjs';

import { FormatBrazilDatePipe } from './format-brazil-date.pipe';

describe('FormatBrazilDatePipe', () => {
  const formatBrazilDatePipe = new FormatBrazilDatePipe();

  it('should return an empty string when receive undefined', () => {
    expect(formatBrazilDatePipe.transform(undefined)).toBe('');
  });

  it('should return an empty string when receive null', () => {
    expect(formatBrazilDatePipe.transform(null)).toBe('');
  });

  it('should format date like this D MMM YYYY', () => {
    expect(formatBrazilDatePipe.transform(dayjs('2020-11-16').locale('br'))).toBe('16/11/2020');
  });
});
