import { VacationPeriod } from './vacation-period';

describe('VacationPeriod', () => {
  it('should create an instance', () => {
    expect(new VacationPeriod("Karol", "Widła", "My notes", new Date(2022,0,10), new Date(2022,1,1))).toBeTruthy();
  });
});
