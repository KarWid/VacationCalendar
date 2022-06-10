import { CreateVacationPeriodResponse } from './create-vacation-period-response';

describe('CreateVacationPeriodResponse', () => {
  it('should create an instance', () => {
    expect(new CreateVacationPeriodResponse("TODOGUID", "TODOGUID", "Adam", "Nowak", new Date(2022, 1, 1), new Date(2022, 1, 10), "Some notes")).toBeTruthy();
  });
});
