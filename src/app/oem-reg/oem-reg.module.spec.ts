import { OemRegModule } from './oem-reg.module';

describe('OemRegModule', () => {
  let oemRegModule: OemRegModule;

  beforeEach(() => {
    oemRegModule = new OemRegModule();
  });

  it('should create an instance', () => {
    expect(oemRegModule).toBeTruthy();
  });
});
