import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class ErrorsHandler implements ErrorHandler {

  //TODO ask about injector or find information
  constructor(private injector: Injector) {
  }

  handleError(error: Error) {
    // Do whatever you like with the error (send it to the server?)
    // And log it to the console
    const router = this.injector.get(Router);


    if (error instanceof HttpErrorResponse) {
      console.error('It happens: ', error);
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
      } else {
        // Handle Http Error (error.status === 403, 404...)
      }
    } else {
      console.error('It happens: ', error);
      //router.navigate(['error'], {});
      // Handle Client Error (Angular Error, ReferenceError...)
    }
  }
}
