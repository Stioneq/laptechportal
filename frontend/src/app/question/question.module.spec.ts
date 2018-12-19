import { QuestionModule } from './question.module';

describe('QuestionModule', () => {
  let questionsModule: QuestionModule;

  beforeEach(() => {
    questionsModule = new QuestionModule();
  });

  it('should create an instance', () => {
    expect(questionsModule).toBeTruthy();
  });
});
