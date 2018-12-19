import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

const getPrefix = (character) => {
  switch (character) {
    case '/':
      return 'data:image/jpeg;base64,';
    case 'i':
      return 'data:image/png;base64,';
    case 'R':
      return 'data:image/gif;base64,';
    case 'Q':
      return 'data:image/bmp;base64,';
    default:
      throw new Error('incorrect format');
  }
};

export const getBase64Decoded = (encoded) => {
  return encoded && getPrefix(encoded.charAt(0)) + encoded;
};


