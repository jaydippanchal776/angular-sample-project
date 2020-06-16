import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }


  public headers = {};
  public methodType = config.REQUEST_POST;
  public URL = '';
  public isBlob = false;
  public isUploadImage = false;
  public isUploadfFavicon = false;

  public createAuthorizationHeaderFormData() {
    let headers;
    headers = {
      'Content-Type': 'application/json'
    };
    return headers;
  }

  public handleErrorObservable(error: Response | any) {
    if (error.status && error.status == 401) {
      status = error.status;
      return null;
    } else {
      var response = error.message || error;
      let responseJson = { is_error: true, message: response };
      return responseJson;
    }
  }

  async makeRequest(url, data, apitype) {
    this.headers = {};
      this.headers = this.createAuthorizationHeaderFormData();
      this.URL = config.getAPIURL(url);


    if (this.isUploadImage) {
      this.headers = {};
    }
    this.isUploadImage = false;
    switch (this.methodType) {
      case 'post':
        return await this.post(data);
    }

    if (this.isUploadfFavicon) {
      this.headers = {};
    }
    this.isUploadfFavicon = false;
    switch (this.methodType) {
      case 'post':
        return await this.post(data);
        case 'get':
          return await this.get(data);
    }
  }

  public async post(data): Promise<any> {
        let requestParam;
    requestParam = {};
    requestParam.headers = this.headers;
    if (this.isBlob) {
      requestParam.responseType = 'blob';
    }
    this.isBlob = false;
    //const request = await this.http.post(this.URL, data, requestParam).toPromise().catch((e: any) => throwError(this.handleErrorObservable(e)));
    //

    //return request;

    const request = await this.http.post(this.URL, data, requestParam).toPromise().then(
      res => {
         return res;
      }
    ).catch(
      (e: any) => throwError(this.handleErrorObservable(e))
    );
    return request;
  }

  public async get(data): Promise<any> {
   
    let requestParam;
    requestParam = {};
    requestParam.headers = this.headers;
    if (this.isBlob) {
      requestParam.responseType = 'blob';
    }
    this.isBlob = false;
    const request = await this.http.get(this.URL, requestParam).toPromise().then(
      res => {
        return res;
      }
    ).catch(
      (e: any) => throwError(this.handleErrorObservable(e))
    );
    return request;
  }

  async GET_apiRequest(url, callback = null) {
    this.methodType = 'get';
    return await this.apiRequest(url, null, callback);
  }

  async POST_apiRequest(url, callback = null) {
    this.methodType = 'post';
    return await this.apiRequest(url, null, callback);
  }

  async apiRequest(url, data, callback = null) {
    const response: any = await this.makeRequest(url, data, 'main');
    const result = JSON.parse(JSON.stringify(response));
    if (!result.is_error) {
      if(callback) {
        return callback(result);
      }
      return result;
    } else {
      return result;
    }
  }

}