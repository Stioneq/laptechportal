import { ModalDialogsModule } from './modal-dialogs.module';

describe('ModalDialogsModule', () => {
  let modalDialogsModule: ModalDialogsModule;

  beforeEach(() => {
    modalDialogsModule = new ModalDialogsModule();
  });

  it('should create an instance', () => {
    expect(modalDialogsModule).toBeTruthy();
  });
});
