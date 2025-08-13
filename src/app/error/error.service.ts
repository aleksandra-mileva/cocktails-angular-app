import { Injectable } from '@angular/core';
import { BackendValidationErrorResponse, FieldError } from '../types/backendValidationErrorResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BackendValidationMap } from '../types/backendValidationMap';
import {UserService} from '../user/user.service';

@Injectable({providedIn: 'root'})
export class ErrorService {

  constructor(private router: Router, private userService: UserService) {}

  handleHttpPostFormError(
    err: HttpErrorResponse,
    errorMap: BackendValidationMap,
    mapField?: (backendField: string) => string
  ): void {
    // Backend validation errors
    if (err.status === 400 && err.error?.errors) {
      this.collectBackendValidationErrors(err.error, errorMap, mapField);
    }
    // Username changed / login required
    else if (
      err.status === 401 &&
      Array.isArray(err.error?.errors) &&
      err.error.errors.some((e: { field: string; }) => e.field === 'username')
    ) {
      alert('Your username has changed. Please log in again.');
      this.userService.logout();
      this.router.navigate(['/users/login']);
    }

    else if (err.status === 409 && (err.error?.errors)) {
      this.collectBackendValidationErrors(err.error, errorMap, mapField);
    }
    else {
      this.navigateToErrorPage(err);
    }
  }

  navigateToErrorPage(err: HttpErrorResponse) {
    const errorCode = err?.status ?? 500;
    const message: string = this.getErrorMessage(errorCode);
    this.router.navigate(['/error'], {
      state: { errorCode, message }
    });
  }

  private getErrorMessage(errorCode: number) : string {
    switch (errorCode) {
      case 400: return  'Bad Request - Invalid data sent.';
      case 401: return  'Unauthorized Access - Please login.';
      case 403: return 'Access Denied.';
      case 404: return 'Ops! Page Not Found';
      case 500: return 'Internal Server Error - Please try again later.';
      default: return  'Something went wrong.';
    }
  }

  private collectBackendValidationErrors(
    errorResponse: BackendValidationErrorResponse,
    errorMap: BackendValidationMap,
    mapField?: (backendField: string) => string)
    : void {
    Object.keys(errorMap).forEach(key => delete errorMap[key]);

    errorResponse.errors.forEach(({ field, message }: FieldError) => {
      const mappedField = mapField ? mapField(field) : field;

      if (errorMap[mappedField]) {
        errorMap[mappedField] += ', ' + message;
      } else {
        errorMap[mappedField] = message;
      }
    });
  }
}
