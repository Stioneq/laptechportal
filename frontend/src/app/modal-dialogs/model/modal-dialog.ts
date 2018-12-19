/**
 * Defines behavior for modal dialogs
 */
export interface ModalDialog {
  /**
   * Should be implemented. Called by ModalService when it is necessary to force closing of modal dialog.
   * Basic behavior is just a setting the flags.
   */
  close(): void;
}
