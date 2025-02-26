import { AppService } from '../app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService();
  });

  it('should return "Welcome to Project Dapy Backend!"', () => {
    expect(appService.getHello()).toBe('Welcome to Project Dapy Backend!');
  });
});
