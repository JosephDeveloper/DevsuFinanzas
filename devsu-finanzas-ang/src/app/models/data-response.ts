export class DataResponse {
  code: any;
  auxErrorCode: any;
  data: any;
  errors: any;
  message: any;
  prototype: any;

  constructor(code: any, auxErrorCode: any, data: any, errors: any, message: any, prototype: any) {
    this.code = code;
    this.auxErrorCode = auxErrorCode;
    this.data = data;
    this.errors = errors;
    this.message = message;
    this.prototype = prototype;
  }
}
