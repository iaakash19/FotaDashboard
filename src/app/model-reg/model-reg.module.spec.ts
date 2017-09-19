import { ModelRegModule } from './model-reg.module';

describe('ModelRegModule', () => {
  let modelRegModule: ModelRegModule;

  beforeEach(() => {
    modelRegModule = new ModelRegModule();
  });

  it('should create an instance', () => {
    expect(modelRegModule).toBeTruthy();
  });
});
