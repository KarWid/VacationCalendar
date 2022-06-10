import { ApiResponse } from "./api-response";

describe('ApiResponse', () => {
  it('should create an instance', () => {
    expect(new ApiResponse<number>(true, 1, [], 1)).toBeTruthy();
  });
});
