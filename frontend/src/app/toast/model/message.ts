export interface Message {
  title: string;
  icon?: string;
  text: string;
  messageType: MessageType;
}

// use 0 1 2 3 4 in ToastTemplate
export enum MessageType {
  SUCCESS, INFO, WARN, ERR, CUSTOM
}
