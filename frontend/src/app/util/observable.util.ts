import {Observable} from 'rxjs';

export const fromFile = (file) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  return Observable.create(observer => {
    fileReader.onloadend = ev => {
      observer.next((<any>ev.target).result);
      observer.complete();
    };
  });
};
