import { GenerateUpdateModule } from './generate-update.module';

describe('GenerateUpdateModule', () => {
  let generateUpdateModule: GenerateUpdateModule;

  beforeEach(() => {
    generateUpdateModule = new GenerateUpdateModule();
  });

  it('should create an instance', () => {
    expect(generateUpdateModule).toBeTruthy();
  });
});
