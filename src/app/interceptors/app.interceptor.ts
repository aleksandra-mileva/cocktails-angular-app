import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

const API_URL = 'http://localhost:8080/api';
const API = '/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, API_URL),
      withCredentials: true,
    });
  }

  return next(req).pipe(
    catchError(err => {
      return throwError(() => err);
    })
  );
};
