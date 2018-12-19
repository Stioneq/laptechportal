import { UserIconModule } from './user-icon.module';

describe('UserIconModule', () => {
  let userIconModule: UserIconModule;

  beforeEach(() => {
    userIconModule = new UserIconModule();
  });

  it('should create an instance', () => {
    expect(userIconModule).toBeTruthy();
  });
});
