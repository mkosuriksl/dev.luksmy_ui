import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { userData } from '../../interfaces/user.modal';
import { ServiceRequest } from 'src/app/interfaces/service.modal';
import { ToastService } from '../toast/toast.service';
import { updateProfile } from 'src/app/interfaces/updateProfile.modal';
import { addAssetsData } from 'src/app/interfaces/addAssets.modal';
import { SessionTimeoutService } from '../sessionTimeout/session-timeout.service';
import { ServicePersonRegistration } from 'src/app/interfaces/ServicePersonRegistration.modal';
import { SpUpdatedProfile } from 'src/app/interfaces/spUpdateProfile.modal';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  baseUrl = environment.apiUrl;

  user_id = '';

  appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private sessionTimeoutService: SessionTimeoutService,
    private router: Router
  ) {
    this.initUserActivityListener();
  }

  isAutoLogout: boolean = false;

  getApiData() {
    return this.http.get('https://devapi.mrmason.in/getAdminUiEndPoint');
  }
  deleteAccount(body: any) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/user/sp-delete-account`;
    return this.http.post(url, body, { headers });
  }

  saveApiData(data: any) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(
      'https://devapi.mrmason.in/addAdminUiEndPoint',
      data,
      { headers }
    );
  }

  updateApiData(data: any) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(
      'https://devapi.mrmason.in/updateAdminUiEndPoint',
      data,
      { headers }
    );
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = {
      email: username,
      password: password,
      regSource: 'MRMASON',
    };

    return this.http.post(`${this.baseUrl}/login`, data, {
      headers,
      responseType: 'json',
    });
  }

  adminLogin(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = {
      email: username,
      password: password,
      regSource: 'MRMASON',
    };

    return this.http.post(`${this.baseUrl}/adminLoginWithPass`, data, {
      headers: headers,
    });
  }

  // spLogin(username: string, password: string): Observable<any> {
  //   const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //   const data ={
  //     email: username,
  //     password: password,
  //     regSource:"MRMASON",
  //   };
  spLogin(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const isEmail = username.includes('@');
    const data: any = {
      password: password,
      regSource: 'MRMASON',
    };

    if (isEmail) {
      data.email = username;
    } else {
      data.mobile = username;
    }
    return this.http.post(`${this.baseUrl}/sp-login`, data, {
      headers: headers,
      responseType: 'json',
    });
  }

  register(userData: userData): Observable<any> {
    const data = {
      userEmail: userData.email,
      userMobile: userData.mobile,
      userPassword: userData.password,
      userName: userData.uName || userData.email,
      userTown: userData.town,
      userDistrict: userData.district,
      userState: userData.state,
      userPincode: userData.pincode,
      userType: 'EC',
      regSource: 'MRMASON',
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/addNewUser`, data, {
      headers: headers,
    });
  }

  registerServicePerson(data: any): Observable<any> {
    data.regSource = 'MRMASON';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.baseUrl}/sp-register`, data, {
      headers,
    });
  }

  // material service registration
  registerMaterial(userData: userData): Observable<any> {
    const data = {
      userEmail: userData.email,
      userMobile: userData.mobile,
      userPassword: userData.password,
      userName: userData.uName,
      userTown: userData.town,
      userDistrict: userData.district,
      userState: userData.state,
      userPincode: userData.pincode,
      userType: 'EC',
      regSource: 'MRMASON',
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/addNewUser`, data, {
      headers: headers,
    });
  }

  registerMaterialServicePerson(data: any): Observable<any> {
    data.regSource = 'MRMASON';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(
      `${this.baseUrl}/material-supplier-quotation-register`,
      data,
      {
        headers,
      }
    );
  }

  msLogin(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const isEmail = username.includes('@'); // Basic check for email
    const data: any = {
      password: password,
      regSource: 'MRMASON',
    };

    if (isEmail) {
      data.email = username;
    } else {
      data.mobile = username;
    }
    return this.http.post(`${this.baseUrl}/ms-login`, data, {
      headers: headers,
      responseType: 'json',
    });
  }
  //gettoken

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  getServiceRequestData(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/ServiceRequest/getFilteredReport?SERVICE_NAME=carpenter&LOCATION=kandu`
    );
  }

  // getServicePersonData(servicePerson: string, city: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/Staff/getFilteredReport?SERVICE_NAME=${servicePerson}&CITY=${city}&AVAILABLE_STATUS`);
  // }

  //   sendPasswordResetEmail(payload: any): Observable<any> {
  //   return this.http.post<any>(
  //     `${this.baseUrl}/forgetPassword/sendOtp`,
  //     payload,
  //     { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  //   );
  // }
  sendPasswordResetEmail(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/forgetPassword/sendOtp`,
      payload,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  sendPasswordResetEmail1(contact: string): Observable<any> {
    const isEmail = contact.includes('@');
    const requestBody: any = {
      regSource: 'MRMASON',
    };

    if (isEmail) {
      requestBody.email = contact;
    } else {
      requestBody.mobile = contact;
    }

    return this.http.post<any>(
      `${this.baseUrl}/forget-pwd-send-otp`,
      requestBody
    );
  }

  // sendPasswordResetEmail1(email: string): Observable<any> {
  //   const requestBody = {
  //     email: email,
  //     regSource: "MRMASON"
  //   };
  //   return this.http.post<any>(
  //     `${this.baseUrl}/forget-pwd-send-otp`,
  //     requestBody
  //    );
  //  }

  // sendPasswordResetEmail1(email: any): Observable<any> {
  //   return this.http.post<any[]>(
  //     `${this.baseUrl}/forget-pwd-send-otp`,
  //     email,

  //   );
  // }
  sendPasswordResetEmail2(email: any): Observable<any> {
    return this.http.post<any[]>(
      `${this.baseUrl}/admin/forgetPassword/sendOtp`,
      email
    );
  }

  // forgetPassVerifyOtp(data: any): Observable<any> {
  //   return this.http.post<any>(
  //     `${this.baseUrl}/forgetPassword/verifyOtpAndChangePassword`,
  //     data,
  //     { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  //   );
  // }

  // Service method to call new BE API
  // forgetverifyotp(data: {
  //   email: string;
  //   otp: string;
  //   newPass: string;
  //   confPass: string;
  //   regSource: string;
  // }): Observable<any> {
  //   return this.http.post<any>(
  //     `${this.baseUrl}/forgetPassword/verifyOtpAndChangePassword`,
  //     data,
  //     { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  //   );
  // }
  forgetverifyotp(data: {
    mobile: string;
    otp: string;
    newPass: string;
    confPass: string;
    regSource: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/forgetPassword/verifyOtpAndChangePassword`,
      data,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  // forgetverifyotp(data: any): Observable<any> {
  //   return this.http.post<any>(
  //     `${this.baseUrl}/forgetPassword/verifyOtpAndChangePassword`,
  //     data,
  //     { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  //   );
  // }

  forgetverifyotp1(data: any): Observable<any> {
    return this.http.post<any[]>(`${this.baseUrl}/forget-pwd-change`, data);
  }
  forgetverifyotp2(data: any): Observable<any> {
    return this.http.post<any[]>(
      `${this.baseUrl}/admin/forgetPassword/verifyOtpAndChangePassword`,
      data
    );
  }

sendSubmitRequestData(serviceRequest: ServiceRequest): Observable<any> {
  const token = this.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  const params = new HttpParams().set('regSource', 'MRMASON');

  return this.http.post<any>(
    `${this.baseUrl}/addServiceRequest`,
    serviceRequest,
    { headers, params }
  );
}
addDeliveryReady(payload: any) {
  const token = this.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.post(
    `${this.baseUrl}/api/delivery-ready/add`,
    payload,
    { headers }
  );
}

updateDeliveryReady(payload: any) {
  const token = this.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.post(
    `${this.baseUrl}/api/delivery-ready/update`,
    payload,
    { headers }
  );
}

  sendOtpByEmail(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const datanew = {
      email: email,
      regSource: 'MRMASON',
    };
    return this.http.post<any>(`${this.baseUrl}/sendOtp`, datanew, { headers });
  }

  sendOtpByMobile(mobile: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const datanew = {
      mobile: mobile,
      regSource: 'MRMASON',
    };
    return this.http.post<any>(`${this.baseUrl}/sendSmsOtp`, datanew, {
      headers: headers,
    });
  }

  sendEmailOtpForServicePerson(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(
      `${this.baseUrl}/sp-send-email-otp`,
      { contactDetail: email, regSource: 'MRMASON' },
      {
        headers,
      }
    );
  }

  sendMobileOtpForServicePerson(
    // mobile: string,
    contactDetail: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post(`${this.baseUrl}/sp-send-mobile-otp`,{mobile:mobile}, {
    const body = {
      contactDetail: contactDetail,
      regSource: 'MRMASON', // <-- Add this line
    };
    return this.http.post(`${this.baseUrl}/sp-send-mobile-otp`, body, {
      headers,
    });
  }

  verifyOtpByMobile(mobile: string, otp: string): Observable<any> {
    const apiUrl = this.baseUrl + '/verifySmsOtp';
    const data = {
      mobile: mobile,
      otp: otp,
      regSource: 'MRMASON',
    };
    return this.http.post<any>(apiUrl, data);
  }

  verifyOtpByEmail(email: string, otp: string): Observable<any> {
    const apiUrl = this.baseUrl + '/verifyOtp';
    const data = {
      email: email,
      otp: otp,
      regSource: 'MRMASON',
    };
    return this.http.post<any>(apiUrl, data);
  }

  verifyOtpByMobileForServicePerson(
    contactDetail: string,
    otp: string
  ): Observable<any> {
    const apiUrl = this.baseUrl + '/sp-verify-mobile-otp';
    const data = {
      // mobile: mobile,
      // otp: otp,
      contactDetail: contactDetail,
      otp: otp,
      regSource: 'MRMASON',
    };
    return this.http.post<any>(apiUrl, data);
  }

  verifyOtpByEmailForServicePerson(
    contactDetail: string,
    otp: string
  ): Observable<any> {
    const apiUrl = this.baseUrl + '/sp-verify-email-otp';
    const data = {
      contactDetail: contactDetail,
      otp: otp,
      regSource: 'MRMASON',
    };
    return this.http.post<any>(apiUrl, data);
  }

  // material service
  mssendOtpByEmail(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const datanew = { email: email };
    return this.http.post<any>(`${this.baseUrl}/sendOtp`, datanew, {
      headers: headers,
    });
  }

  mssendOtpByMobile(mobile: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const datanew = { mobile: mobile };
    return this.http.post<any>(`${this.baseUrl}/sendSmsOtp`, datanew, {
      headers: headers,
    });
  }

  mssendEmailOtpForServicePerson(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(
      `${this.baseUrl}/ms-send-email-otp`,
      { contactDetail: email, regSource: 'MRMASON' },
      {
        headers,
      }
    );
  }

  mssendMobileOtpForServicePerson(
    // mobile: string,
    contactDetail: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post(`${this.baseUrl}/sp-send-mobile-otp`,{mobile:mobile}, {
    const body = {
      contactDetail: contactDetail,
      regSource: 'MRMASON', // <-- Add this line
    };
    return this.http.post(`${this.baseUrl}/ms-send-mobile-otp`, body, {
      headers,
    });
  }

  msverifyOtpByMobile(mobile: string, otp: string): Observable<any> {
    const apiUrl = this.baseUrl + '/verifySmsOtp';
    const data = {
      mobile: mobile,
      otp: otp,
    };
    return this.http.post<any>(apiUrl, data);
  }

  msverifyOtpByEmail(email: string, otp: string): Observable<any> {
    const apiUrl = this.baseUrl + '/verifyOtp';
    const data = {
      email: email,
      otp: otp,
    };
    return this.http.post<any>(apiUrl, data);
  }

  msverifyOtpByMobileForServicePerson(
    contactDetail: string,
    otp: string
  ): Observable<any> {
    const apiUrl = this.baseUrl + '/ms-verify-mobile-otp';
    const data = {
      // mobile: mobile,
      // otp: otp,
      contactDetail: contactDetail,
      otp: otp,
      regSource: 'MRMASON',
    };
    return this.http.post<any>(apiUrl, data);
  }

  msverifyOtpByEmailForServicePerson(
    contactDetail: string,
    otp: string
  ): Observable<any> {
    const apiUrl = this.baseUrl + '/ms-verify-email-otp';
    const data = {
      contactDetail: contactDetail,
      otp: otp,
      regSource: 'MRMASON',
    };
    return this.http.post<any>(apiUrl, data);
  }

  getEcServiceRequestData(params: any): Observable<any> {
    const url = `${this.baseUrl}/getServiceRequest`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers, params });
  }

  getadminServiceRequestData(params: any): Observable<any> {
    const url = `${this.baseUrl}/getServiceRequest`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers, params });
  }

  getSpServiceRequestData(serviceName: string): Observable<any> {
    const url = `${this.baseUrl}/getSpServiceRequest`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = { servicePersonId: serviceName };

    return this.http.get<any[]>(url, { headers, params });
  }

  getUserProfile(userId: string): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const body = localStorage.getItem('email');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('userid', userId);
    const url = `${this.baseUrl}/getProfile`;
    return this.http.get(url, { headers, params });
  }

  updateUserProfile(user_id: string, updatedProfile: any): Observable<any> {
    updatedProfile.regSource = 'MRMASON';
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/updateProfile`;
    return this.http.put(url, updatedProfile, { headers });
  }

  addAsset(userId: string, data: addAssetsData): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/addAssets?regSource=MRMASON`;
    const requestBody = {
      userId: userId,
      ...data,
    };

    return this.http.post(url, requestBody, { headers });
  }

  getAssetData(params: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.baseUrl}/getAssets`, {
      headers,
      params,
    });
  }

  getAssetDataById(appKey: string, userId: string, assetId: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(
      `${this.baseUrl}/get-asset.php?appKey=${appKey}&user_id=${userId}&asset_id=${assetId}`,
      {
        headers: headers,
      }
    );
  }

  editAsset(data: any): Observable<any> {
    const url = `${this.baseUrl}/updateAssets?regSource=MRMASON`; // query param added
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Make sure data contains all required fields as per BE API
    const payload = {
      userId: data.userId,
      assetId: data.assetId,
      assetCat: data.assetCat,
      assetSubCat: data.assetSubCat,
      location: data.location,
      street: data.street,
      doorNo: data.doorNo,
      town: data.town,
      district: data.district,
      state: data.state,
      pinCode: data.pinCode,
      assetBrand: data.assetBrand,
      assetModel: data.assetModel,
      regDate: data.regDate ?? null, // optional
      membershipExp: data.membershipExp ?? null, // optional
      planId: data.planId ?? null, // optional
    };

    return this.http.put(url, payload, { headers });
  }

  addAssetsCategory(data: any): Observable<any> {
    const url = `${this.baseUrl}/addAdminAssets`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const payload = {
      ...data,
    };
    return this.http.post(url, payload, { headers });
  }
  addServiceCategory(data: any): Observable<any> {
    const url = `${this.baseUrl}/addServiceCategory`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const payload = {
      ...data,
    };
    return this.http.post(url, payload, { headers });
  }

  getAcategory(): Observable<any> {
    const url = `${this.baseUrl}/getAdminAsset/civil/CIVIL`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', '');
    return this.http.get(url, { headers });
  }
  getAcategory1(params: any): Observable<any> {
    const url = `${this.baseUrl}/getAdminAssets`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(url, { headers, params });
  }

  getQuotationDatafromcustomer(requestId: any): Observable<any> {
    const url = `${this.baseUrl}/get-header-serviceRequestQuotation?requestId=${requestId}&regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(url, { headers });
  }
  getScategory(): Observable<any> {
    const url = `${this.baseUrl}/getServiceCategory`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = { serviceCategory: 'CIVIL' };

    return this.http.get(url, { headers, params });
  }
  getScategory2(params: any): Observable<any> {
    const url = `${this.baseUrl}/getServiceCategory`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(url, { headers, params });
  }
  getServiceType(): Observable<any> {
    const url = `${this.baseUrl}/getServiceCategory/civil/CIVIL`;
    // const token=this.getToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(url);
  }
  getScategory1(params: any): Observable<any> {
    const url = `${this.baseUrl}/getServiceCategory`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(url, { headers, params });
  }

  getAssetCategoryDetails(assetId: string): Observable<any> {
    const url = `${this.baseUrl}/getAdminAssets`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const params = {
      assetId: assetId,
    };

    return this.http.get(url, { headers, params });
  }

  getServiceCategoryDetails(assetId: string): Observable<any> {
    const url = `${this.baseUrl}/getServiceCategory`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const params = {
      id: assetId,
    };

    return this.http.get(url, { headers, params });
  }

  editAssetCategory(data: any): Observable<any> {
    const url = `${this.baseUrl}/updateAdminAssets`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(url, data, { headers });
  }

  editServiceCategory(data: any): Observable<any> {
    const url = `${this.baseUrl}/updateServiceCategory`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(url, data, { headers });
  }
  getServiceCharge(params: any): Observable<any> {
    const url = `${this.baseUrl}/getUserServiceCharegs`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers, params });
  }

  searchPerson(params: any): Observable<any> {
    const url = `${this.baseUrl}/filterServicePerson`;

    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // const params = {
    //   status: status,
    //   fromDate: fromDate,
    //   toDate:toDate
    // };
    return this.http.get(url, { headers, params });
  }

  updatePassword(
    mobile: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = {
      mobile: mobile,
      oldPass: oldPassword,
      newPass: newPassword,
      confPass: confirmPassword,
      regSource: 'MRMASON',
    };

    return this.http.post(`${this.baseUrl}/changePassword`, data, { headers });
  }

  addCharge(data: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/adding-UserServiceCharges`;
    const requestBody = {
      ...data,
    };

    return this.http.post(url, requestBody, { headers });
  }
  servicePersonUpdatePassword(
    email: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
      regSource: 'MRMASON',
    };

    return this.http.post(`${this.baseUrl}/change-password`, data, {
      headers,
      responseType: 'json',
    });
  }

  adminUpdatePassword(
    email: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
    appKey: string
  ): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = {
      email: email,
      oldPwd: oldPassword,
      newPwd: newPassword,
      conPwd: confirmPassword,
      appKey: this.appKey,
      type: 'admin',
    };

    return this.http.post(`${this.baseUrl}/changepassword.php`, data, {
      headers,
      responseType: 'json',
    });
  }

  updateServicePersonStatus(
    spId: string,
    status: string,
    location?: string
  ): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = {
      bodSeqNo: spId,
      availability: status,
      address: location,
    };

    const url = `${this.baseUrl}/sp-update-avalability`; // Updated the URL using baseUrl

    return this.http.post(url, data, { headers, responseType: 'json' });
  }

  addServiceName(
    serviceId: string,
    subcategory: string,
    servName: string,
    addedBy: string
  ): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = {
      serviceId: serviceId,
      serviceName: servName,
      addedBy: addedBy,
      serviceSubCategory: subcategory,
    };

    const url = `${this.baseUrl}/addAdminService`;

    return this.http.post(url, data, { headers });
  }

  // Inside ApiserviceService
  getServiceNames(params: any): Observable<any> {
    const url = `${this.baseUrl}/getSpService`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // const params = new HttpParams()
    //   .set('serviceSubCat', servSubCat);
    return this.http.get(url, { headers, params });
  }

  // Inside ApiserviceService

  updateServiceName(data: any): Observable<any> {
    const url = `${this.baseUrl}/updateAdminService`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(url, data, { headers });
  }

  getServiceData(params: any): Observable<any> {
    const url = `${this.baseUrl}/getAdminService`;

    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${url}`, { headers, params });
  }

  // Inside ApiserviceService
  postSpServiceData(data: any): Observable<any> {
    const url = `${this.baseUrl}/addSpService`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const addData = {
      userId: localStorage.getItem('USER_ID'),
      // pincode: localStorage.getItem('PINCODE_NO'),
      city: localStorage.getItem('CITY'),
    };
    return this.http.post(url, { ...data, ...addData }, { headers });
  }

  putSpServicesData(data: any, USER_SERVICES_ID: string): Observable<any> {
    // const url = `${this.baseUrl}/userServicesUpdate`;
    const token = this.getToken();

    const url = `${this.baseUrl}/updateSpService`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const updateData = {
      appKey: this.appKey,
      user_id: localStorage.getItem('USER_ID'),
      status: localStorage.getItem('STATUS'),
      pinCode: localStorage.getItem('PINCODE_NO'),
      city: localStorage.getItem('CITY'),
      userServId: USER_SERVICES_ID,
    };

    return this.http.put(url, { ...data, ...updateData }, { headers });
  }

  showMyServices(userId: string): Observable<any> {
    const url = `${this.baseUrl}/getSpService`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('serviceTypes', userId);

    return this.http.get(url, { headers, params });
  }
  getSpDetails(params: any): Observable<any> {
    // let params = new HttpParams()
    // .set('serviceType', serviceType)
    // .set('location',encodeURIComponent(Location));
    const url = `${this.baseUrl}/getServicePersonDetails?`;
    // const token=this.getToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(url, { params });
  }

  showMyServicesBySubCategory(category: string): Observable<any> {
    const url = `${this.baseUrl}/user-services-get.php`;
    const appKey = this.appKey;
    const userId = localStorage.getItem('USER_ID') ?? '';
    const params = new HttpParams()
      .set('appKey', appKey)
      .set('user_id', userId)
      .set('category', category);

    return this.http.get(url, { params });
  }
  getSpUserServices(subCategory: string): Observable<any> {
    const appKey = this.appKey;
    const userId = localStorage.getItem('USER_ID') ?? '';

    const url = `${this.baseUrl}/sp-user-services-get.php`;
    const params = new HttpParams()
      .set('appKey', appKey)
      .set('user_id', userId)
      .set('sub_cat', subCategory);

    return this.http.get(url, { params });
  }

  getEcUserProfileData(user_id: string): Observable<any> {
    const url = `${this.baseUrl}/getProfile`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set('userid', user_id)
      .set('regSource', 'MRMASON');

    return this.http.get(url, { headers, params });
  }

  getSpUserProfile(userId: string): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const body: any = localStorage.getItem('USER_ID');
    let params = new HttpParams();
    params = params.append('bodSeqNo', body);
    params = params.append('regSource', 'MRMASON');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/sp-get-profile`;

    return this.http.request('GET', url, { headers, params });
  }
  getUrl(): Observable<{ status: boolean }> {
    return this.http.get('https://devapi.mrmason.in/getAdminUiEndPoint').pipe(
      map((response: any) => {
        if (response.success) {
          this.baseUrl = response.data[0].id.ipUrlToUi;
        } else {
          this.baseUrl = 'https://devapi.mrmason.in';
        }
        return { status: true };
      }),
      catchError((error) => {
        console.error('Error fetching base URL:', error);
        // Set a fallback base URL on error
        this.baseUrl = 'https://devapi.mrmason.in';
        return of({ status: true });
      })
    );
  }

  // Inside ApiserviceService

  spUpdateUserProfile(
    user_id: string,
    updatedProfile: SpUpdatedProfile
  ): Observable<any> {
    const url = `${this.baseUrl}/sp-update-profile`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(
      url,
      {
        name: updatedProfile.spName,
        bodSeqNo: localStorage.getItem('USER_ID'),
        address: updatedProfile.address,
        city: updatedProfile.city,
        state: updatedProfile.state,
        district: updatedProfile.district,
        regSource: 'MRMASON',
        pincodeNo: updatedProfile.pincode,
      },
      { headers }
    );
  }

  addSpUserServices(serviceIds: any[], subCategory: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.baseUrl}/add-service`;
    const data = {
      bodSeqNo: localStorage.getItem('USER_ID'),
      serviceSubCategory: subCategory,
      serviceId: serviceIds.join(', '),
      updatedBy: localStorage.getItem('USER_ID'),
    };

    return this.http.post(url, data, { headers });
  }

  updateSpUserServices(
    selectedServices: string[],
    subCategory: string
  ): Observable<any> {
    const url = `${this.baseUrl}/sp-user-services-update.php`;
    const data = {
      appKey: this.appKey,
      userId: localStorage.getItem('USER_ID'),
      subcategory: subCategory,
      service_id: selectedServices,
    };

    return this.http.put(url, data);
  }

  searchCustomer(params: any): Observable<any> {
    const url = `${this.baseUrl}/filterCustomers`;

    // Set up headers
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(url, { headers, params });
  }

  searchCustomerAssets(
    userId?: string | null,
    category?: string | null,
    subCategory?: string | null,
    location?: string | null
  ): Observable<any> {
    const url = `${this.baseUrl}/getAssets`;

    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Set up params
    const params = new HttpParams().set('userId', userId || '');

    // Make the GET request
    return this.http.get(url, { headers, params });
  }

  addMaterialReq(
    materialRequests: any[],
    materialCategory: string,
    deliveryDate: string,
    deliveryLocation: string,
    requestedBy: string,
    brand: string
    // modelName: any,
    // modelCode: any
  ): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/add-material-request-details`;

    const data = {
      materialCategory: materialCategory,
      brand: brand,
      requestedBy: requestedBy,
      deliveryDate: deliveryDate,
      deliveryLocation: deliveryLocation,
      materialRequests: materialRequests.map((request) => ({
        cMatRequestIdLineid: request.cMatRequestIdLineid || '',
        cMatRequestId: request.cMatRequestId || '',
        itemName: request.itemName || '',
        itemSize: request.itemSize || '',
        qty: request.qty,
        orderDate: request.orderDate || deliveryDate,
        updatedDate: request.updatedDate || deliveryDate,
      })),
    };

    return this.http.post(url, data, { headers });
  }

  // getMaterialData(params: HttpParams):
  //   Observable<any> {
  //   const url = `${this.baseUrl}/get-material-request-header-details`;
  //   const token = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<any[]>(url, { headers, params });
  // }
  getMaterialData(params: any): Observable<any> {
    const url = `${this.baseUrl}/get-material-request-header-details`; //old data
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers, params });
  }

  getMaterialDataSearch(params: HttpParams) {
    const url = `${this.baseUrl}/get-material-request-header`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers, params });
  }

  getMaterialSupplierQuotation(params: HttpParams) {
    const url = `${this.baseUrl}/add-material-supplier-quotation?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers, params });
  }

  // getMaterialRequestHeaderAndDetails(params: HttpParams) {
  //   const url = `${this.baseUrl}/add-material-supplier-quotation?regSource=MRMASON`;
  //   const token = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<any>(url, { headers, params });
  // }

  getMaterialRequestHeaderAndDetails(params: HttpParams) {
    const url = `${this.baseUrl}/get-material-request-header-and-details`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers, params });
  }
  generalMaterialSearch(params: any): Observable<any> {
    const url = `${this.baseUrl}/admin-material-master/home-search`;
    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(url, { params, headers });
  }

  generalMaterialSearchGen(params: any): Observable<any> {
    const url = `${this.baseUrl}/ms-material-master/home-search`;

    return this.http.get<any>(url, { params });
  }

  addSupplierQuotation(data: any): Observable<any> {
    const url = `${this.baseUrl}/api/add-material-supplier-quotation?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(url, data, { headers });
  }

  updateSupplierQuotation(data: any[]) {
    const url = `${this.baseUrl}/api/update-material-supplier-quotation?regSource=MRMASON`;
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<any>(url, data, { headers });
  }

  // getDistinctMaterialCategories(): Observable<any> {
  //   const url = `${this.baseUrl}/admin-material-master/distinct-material-category`;
  //   const token = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get(url, { headers });
  // }

  // getBrandsByMaterialCategory(
  //   category: string,
  //   subCategory: string
  // ): Observable<any> {
  //   const url = `${this.baseUrl}/admin-material-master/get-brand-by-materialcategory`;
  //   const token = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const params = new HttpParams()
  //     .set('materialCategory', category)
  //     .set('materialSubCategory', subCategory);
  //   return this.http.get(url, { headers, params });
  // }
  getDistinctMaterialCategories(): Observable<any> {
    const url = `${this.baseUrl}/admin-material-master/distinct-material-category`;
    return this.http.get(url);
  }
  getMaterialCategories(): Observable<any> {
    const url = `${this.baseUrl}/getAdminAsset/civil/CIVIL`;
    return this.http.get(url);
  }

  getRental(params: HttpParams): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getRental`, { params });
  }

  getSpRental(params: HttpParams): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getSpRental`, { params });
  }

  updateCharge(addAssets: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/updateCharge`, addAssets);
  }

  updateSpRental(updateForm: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/updateSpRental`, updateForm);
  }

  msUpdateUserProfile(userId: string, updatedProfile: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/msUpdateUserProfile/${userId}`, updatedProfile);
  }

  getMachineProducts(query: any): Observable<any> {
    const url = `${this.baseUrl}/api/home-search-by-machine?${query}`;
    return this.http.get(url);
  }

  editSpAsset(data: any): Observable<any> {
    const url = `${this.baseUrl}/updateAssets?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(url, data, { headers });
  }

  getSpAssetData(params: any): Observable<any> {
    const url = `${this.baseUrl}/getAssets`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers, params });
  }

  getHomeRental(params: HttpParams): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getRental`, { params });
  }

  sendMobileOtpForSupplierPerson(contactDetail: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      contactDetail: contactDetail,
      regSource: 'MRMASON',
    };
    return this.http.post(`${this.baseUrl}/ms-send-mobile-otp`, body, {
      headers,
    });
  }

  sendEmailOtpForSupplierPerson(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.baseUrl}/ms-send-email-otp`,
      { contactDetail: email, regSource: 'MRMASON' },
      {
        headers,
      }
    );
  }

  verifyOtpByMobileForSupplierPerson(
    contactDetail: string,
    otp: string
  ): Observable<any> {
    const apiUrl = this.baseUrl + '/ms-verify-mobile-otp';
    const data = {
      contactDetail: contactDetail,
      otp: otp,
      regSource: 'MRMASON',
    };
    return this.http.post<any>(apiUrl, data);
  }

  verifyOtpByEmailForSupplierPerson(
    contactDetail: string,
    otp: string
  ): Observable<any> {
    const apiUrl = this.baseUrl + '/ms-verify-email-otp';
    const data = {
      contactDetail: contactDetail,
      otp: otp,
      regSource: 'MRMASON',
    };
    return this.http.post<any>(apiUrl, data);
  }

  getMsUserProfile(userId: string): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('userid', userId);
    const url = `${this.baseUrl}/getProfile`;
    return this.http.get(url, { headers, params });
  }

  getAdminMaterialMaster(): Observable<any> {
    const url = `${this.baseUrl}/admin-material-master/get`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(url, { headers });
  }

  uploadMaterialImages(formData: FormData, skuId: string): Observable<any> {
    const url = `${this.baseUrl}/admin-material-master/upload_images?skuId=${skuId}&regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(url, formData, { headers });
  }

  addAdminMaterials(data: any): Observable<any> {
    const url = `${this.baseUrl}/admin-material-master/add?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(url, data, { headers });
  }

  getMaterialCategory(): Observable<any> {
    const url = `${this.baseUrl}/getAdminAsset/civil/CIVIL`;
    return this.http.get(url);
  }

  getBrandDataAsPermaterialcategory(
    category: string,
    subCategory: string
  ): Observable<any> {
    const url = `${this.baseUrl}/admin-material-master/get-brand-by-materialcategory`;
    const params = new HttpParams()
      .set('materialCategory', category)
      .set('materialSubCategory', subCategory);
    return this.http.get(url, { params });
  }

  updateAdminMaterials(data: any): Observable<any> {
    const url = `${this.baseUrl}/admin-material-master/update?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(url, data, { headers });
  }

  getUserServiceChargs(params: any): Observable<any> {
    const url = `${this.baseUrl}/getUserServiceCharegs`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers, params });
  }

  getSpUserServicesName(params: any): Observable<any> {
    const url = `${this.baseUrl}/sp-user-services-get.php`;
    const paramsObj = new HttpParams()
      .set('appKey', this.appKey)
      .set('user_id', localStorage.getItem('USER_ID') ?? '')
      .set('sub_cat', params.subCategory);
    return this.http.get(url, { params: paramsObj });
  }

  registerSupplierPerson(data: any): Observable<any> {
    data.regSource = 'MRMASON';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.baseUrl}/material-supplier-quotation-register`,
      data,
      {
        headers,
      }
    );
  }

  updateRental(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/updateSpRental`, body);
  }

  addRental(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addRental`, body);
  }

  addSpRental(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addSpRental`, body);
  }

  addSpAsset(userId: string, data: addAssetsData): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/addSpAsset?regSource=MRMASON`;
    const requestBody = {
      userId: userId,
      ...data,
    };

    return this.http.post(url, requestBody, { headers });
  }


  getBrandsByMaterialCategory(
    category: string,
    subCategory: string
  ): Observable<any> {
    const url = `${this.baseUrl}/admin-material-master/get-brand-by-materialcategory`;
    const params = new HttpParams()
      .set('materialCategory', category)
      .set('materialSubCategory', subCategory);
    return this.http.get(url, { params });
  }

  // getMaterialCategories(): Observable<any> {
  //   const url = `${this.baseUrl}/admin-material-master/distinct-material-category`;
  //   const token = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<any>(url, { headers });
  // }

  // getBrandsByCategory(category: string): Observable<any> {
  //   const url = `${this.baseUrl}/admin-material-master/get-brand-by-materialcategory`;
  //   const token = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const params = new HttpParams().set('materialCategory', category);
  //   return this.http.get<any>(url, { headers, params });
  // }

  getMaterialSupplierQuotationHeader(params: HttpParams): Observable<any> {
    const url = `${this.baseUrl}/api/get-material-supplier-quotation-header`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers, params });
  }

  getMaterialRequestHeader(params: HttpParams) {
    const url = `${this.baseUrl}/get-material-request-header`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers, params });
  }

  // getInvoicesAndQuotationDetails(params: HttpParams) {
  //   const url = `${this.baseUrl}/api/get-invoices-and-quotation-details`;

  //   const token = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   return this.http.get<any>(url, { headers, params });
  // }
  getMaterialSupplierInvoiceHeader(params: HttpParams) {
  const url = `${this.baseUrl}/api/get-material-supplier-Invoice-header`;

  const token = this.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<any>(url, { headers, params });
}
updateDeliveryStatus(payload: any) {
  const url = `${this.baseUrl}/api/update-material-delivery-status`;

  const token = this.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.post<any>(url, payload, { headers });
}

  getInvoicesAndQuotationDetails(params: HttpParams) {
  const url = `${this.baseUrl}/api/get-material-supplier-Invoice-details`;

  const token = this.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<any>(url, { headers, params });
}
  getMaterialSupplierQuotationDetails(filters: any) {
    const url = `${this.baseUrl}/api/get-material-supplier-quotation-details`;

    const params: any = {
      quotationId: filters.quotationId || '',
      supplierId: filters.supplierId || '',
      regSource: 'MRMASON',
    };

    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(url, { headers, params });
  }

  updateStatusWithInvoiced(body: any, userId?: string) {
    let url = `${this.baseUrl}/api/update-status-with-Invoiced?regSource=MRMASON`;
    let params = new HttpParams();

    if (userId) params = params.set('userId', userId);

    const token = this.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    return this.http.put(url, body, { headers, params });
  }
  updateHeaderStatus(body: any) {
    let url = `${this.baseUrl}/header-status?regSource=MRMASON`;
    let params = new HttpParams();

    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(url, body, { headers, params });
  }

  // getMaterialRequestDetails(params: HttpParams) {
  //   const url = `${this.baseUrl}/get-material-request-header-and-details`;
  //   const token = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<any>(url, { headers, params });
  // }

  updateMaterialReq(
    cMatRequestIdLineid: string,
    brand: string,
    itemName: string,
    itemSize: string,
    qty: string
  ): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/update-material-request-details`;
    const data = {
      cMatRequestIdLineid,
      brand,
      itemName,
      itemSize,
      qty,
    };

    return this.http.put(url, data, { headers });
  }

  submitServiceRequest(data: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/add-site-measurement?regSource=MRMASON`;
    return this.http.post(url, data, { headers });
  }

  materialRequirementByRequest(
    materialRequests: any[],
    materialCategory: string,
    deliveryDate: string,
    deliveryLocation: string,
    requestedBy: string,
    brand: string
  ): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/add-materialRequirementByRequest?regSource=MRMASON`;

    const data = {
      materialCategory: materialCategory,
      brand: brand,
      requestedBy: requestedBy,
      deliveryDate: deliveryDate,
      deliveryLocation: deliveryLocation,
      materialRequests: materialRequests.map((request) => ({
        cMatRequestIdLineid: request.cMatRequestIdLineid || '',
        cMatRequestId: request.cMatRequestId || '',
        itemName: request.itemName || '',
        itemSize: request.itemSize || '',
        qty: request.qty,
        orderDate: request.orderDate || deliveryDate,
        updatedDate: request.updatedDate || deliveryDate,
        modelName: request.modelName || '',
        modelCode: request.modelCode || '',
      })),
    };
    return this.http.post(url, data, { headers });
  }

  getSiteMeasurement(params: any): Observable<any> {
    const url = `${this.baseUrl}/get-site-measurement`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers, params });
  }

  private idleTimeout: any;
  private readonly IDLE_TIME = 10 * 60 * 1000;

  private resetIdleTimer(): void {
    if (this.idleTimeout) {
      this.isAutoLogout = false;
      clearTimeout(this.idleTimeout);
    }
    this.idleTimeout = setTimeout(() => {
      this.handleAutoLogout();
    }, this.IDLE_TIME);
  }

  private handleAutoLogout(): void {
    this.isAutoLogout = true;
    // Clear local storage and redirect to login or perform logout logic
    localStorage.clear();
    this.toast.show('You have been logged out due to inactivity.', 5000);
    // window.location.href = '/login'; // Adjust route as needed
    this.router.navigate(['/login']);
  }

  private initUserActivityListener(): void {
    document.addEventListener('mousemove', () => {
      this.sessionTimeoutService.onUserActivity();
      this.resetIdleTimer();
    });

    document.addEventListener('keypress', () => {
      this.sessionTimeoutService.onUserActivity();
      this.resetIdleTimer();
    });

    // Start the idle timer on service init
    this.resetIdleTimer();
  }

  addWorker(data: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/addWorkers`;
    return this.http.post(url, data, { headers });
  }

  addWalkinCustomer(data: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/add-walk-in-customer-api-by-spOrAdmin`;
    return this.http.post(url, data, { headers });
  }

  updateWalkinCustomer(data: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/update-walk-in-customer-api-by-spOrAdmin`;
    return this.http.put(url, data, { headers });
  }

  getWalkinCustomerData(params: any): Observable<any> {
    const url = `${this.baseUrl}/get-walk-in-customer-api-by-spOrAdmin?userMobile=
${params.mobile}&userEmail=${params.email}`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers });
  }

  getWorerDetails(params: any): Observable<any> {
    const url = `${this.baseUrl}/getWorkerDetails`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers, params });
  }

  updateWorkerDetails(data: any): Observable<any> {
    const url = `${this.baseUrl}/updateWorkerDetails`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any[]>(url, data, { headers });
  }

  getConstructionQuotationTask(id?: string): Observable<any> {
    const url = `${this.baseUrl}/get-serviceRequestBuildingConstructionQuotation?requestLineId=${id}`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers });
  }
  //   getAllConstructionQuotationTask(id?: string, spId?:any): Observable<any> {
  //       const url = `${this.baseUrl}/get-serviceRequestAllquotation?regSource=MRMASOn&requestLineId=${id}&spId${spId}`;

  //   const token = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<any[]>(url, { headers });
  // }
  getAllserviceRequestQuotation(id?: string, spId?: any): Observable<any> {
    const url = `${this.baseUrl}/get-serviceRequestAllquotation?regSource=MRMASON&quotationId=${id}`;

    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers });
  }
  getWorkOrderDeatils(id?: string, spId?: any): Observable<any> {
    const url = `${this.baseUrl}/get-workorder-details?regSource=MRMASON&workOrderId=${id}`;

    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers });
  }

  getQuoteReport(requestId: string): Observable<any> {
    const url = `${this.baseUrl}/get-material-request-header-and-details?materialRequestId=${requestId}`;
    const token = this.getToken();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    return this.http.get<any>(url, { headers });
  }

  submitConstructionQuotation(data: any): Observable<any> {
    const url = `${this.baseUrl}/add-serviceRequestBuildingConstructionQuotation?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any[]>(url, data, { headers });
  }

  getAdminConstructionQuotationTask(): Observable<any[]> {
    const url = `${this.baseUrl}/admintasks/get-construction-tasks?regSource=MRMASON&serviceCategory=building construction`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers });
  }

  getAdminAllAuotationTask(service: any): Observable<any> {
    const url = `${this.baseUrl}/admin-all-quotation-task/get-by-service-category?serviceCategory=${service}`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers });
  }
  updateQuotation(data: any, Id: any): Observable<any> {
    const url = `${this.baseUrl}/update-serviceRequestAllquotation?regSource=MRMASON&taskId=${Id}`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any[]>(url, data, { headers });
  }
  updateAllQuotation(data: any): Observable<any> {
    const url = `${this.baseUrl}/update-serviceRequestAllquotation?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any[]>(url, data, { headers });
  }

  getNonConstructionTask(params: any, type: any): Observable<any[]> {
    const url = `${this.baseUrl}/admintasks/${params}?regSource=MRMASON&serviceCategory=${type}`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers });
  }

  newGetNnConstructionasks(params?: any): Observable<any[]> {
    const url = `${this.baseUrl}/get-serviceRequestAllquotation?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers, params });
  }
  addNewGetNnConstructionasks(data?: any): Observable<any[]> {
    const url = `${this.baseUrl}/add-serviceRequestAllquotation?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any[]>(url, data, { headers });
  }

  addNonConstructionTask(data: any, suburl: any) {
    const url = `${this.baseUrl}/${suburl}?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any[]>(url, data, { headers });
  }
  addWorkOrder(data: any) {
    const url = `${this.baseUrl}/add-workorder?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any[]>(url, data, { headers });
  }

  getNonConstructionQuotationDetails(params?: any): Observable<any[]> {
    const url = `${this.baseUrl}/get-serviceRequestCarpentaryquotation?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers, params });
  }
  getAdminAllQuotationTask(serviceCategory?: any): Observable<any[]> {
    const url = `${
      this.baseUrl
    }/admin-all-quotation-task/get?serviceCategory=${'Painter'}&regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers });
  }
  getAdminAllQuotationHeaders(filters: any): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // 🔹 Build params conditionally
    let params = new HttpParams()
      .set('quotationId', filters.quotationId)
      .set('requestId', filters.reqid);

    if (filters.fromDate) {
      params = params.set('fromQuotatedDate', filters.fromDate);
    }
    if (filters.toDate) {
      params = params.set('toQuotatedDate', filters.toDate);
    }
    if (filters.status) {
      params = params.set('status', filters.status);
    }

    return this.http.get<any[]>(
      `${this.baseUrl}/get-header-serviceRequestQuotation?regSource=MRMASON`,
      {
        headers,
        params,
      }
    );
  }

  getWorkOrderHeaders(filters: any): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // 🔹 Build params conditionally
    let params = new HttpParams();

    if (filters.WorkorderId) {
      params = params.set('workOrderId', filters.WorkorderId);
    }
    if (filters.fromDate) {
      params = params.set('fromQuotatedDate', filters.fromDate);
    }
    if (filters.reqid) {
      params = params.set('requestId', filters.reqid);
    }
    if (filters.toDate) {
      params = params.set('toQuotatedDate', filters.toDate);
    }
    if (filters.status) {
      params = params.set('status', filters.status);
    }

    return this.http.get<any[]>(`${this.baseUrl}/get-workorder-header`, {
      headers,
      params,
    });
  }

  updateNonConstructionQuotationDetails(data?: any): Observable<any[]> {
    const url = `${this.baseUrl}/update-serviceRequestCarpentaryquotation?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any[]>(url, data, { headers });
  }

  addPaintTaskByAdmin(data: any) {
    const url = `${this.baseUrl}/admintasks/add-paint-tasks`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any[]>(url, data, { headers });
  }
  addConstructionTaskByAdmin(data: any) {
    const url = `${this.baseUrl}/admintasks/add-construction-tasks`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any[]>(url, data, { headers });
  }

  getAllTasksByAdmin(sCategory: any) {
    const url = `${this.baseUrl}/admintasks/get-paint-tasks?regSource=MRMASON&serviceCategory=${sCategory}`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers });
  }

  updateTasksByAdmin(data?: any): Observable<any[]> {
    const url = `${this.baseUrl}/admintasks/update-paint-tasks`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any[]>(url, data, { headers });
  }

  addWorkAssignment(data: any) {
    const url = `${this.baseUrl}/api/sp-work-assignment/add?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any[]>(url, data, { headers });
  }

  makeAdminVeify(data: any) {
    const url = `${this.baseUrl}/admin-sp-verification/update`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any[]>(url, data, { headers });
  }

  getNonConstructionQuotationTableData(sCategory: any) {
    const url = `${
      this.baseUrl
    }/getServiceCategory?userId=${localStorage.getItem(
      'USER_ID'
    )}&serviceCategory=${sCategory}`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(url, { headers });
  }

  showMyspServices(userId: string): Observable<any> {
    const url = `${this.baseUrl}/getSpService`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('userId', userId);

    return this.http.get(url, { headers, params });
  }

  getSearchDetails(params: any): Observable<any> {
    const url = `${this.baseUrl}/api/home-search-by-location`;
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get(url, { params: httpParams });
  }

  getCart(): Observable<any> {
    const url = `${this.baseUrl}/customer-cart/get`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(url, { headers });
  }

  addToCart(body: any): Observable<any> {
    const url = `${this.baseUrl}/customer-cart/add`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(url, body, { headers });
  }

  updateCart(body: any): Observable<any> {
    const url = `${this.baseUrl}/customer-cart/update`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(url, body, { headers });
  }

  placeOrder(body: any): Observable<any> {
    const url = `${this.baseUrl}/placeOrder`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(url, body, { headers });
  }

  getOrderBySearch(orderId: string, customerId: string, retailerId: string) {
    const url = `${this.baseUrl}/get-orderId-by-search`;
    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const params = new HttpParams()
      .set('orderId', orderId || '')
      .set('customerId', customerId || '')
      .set('retailerId', retailerId || '');

    return this.http.get(url, { headers, params });
  }

  getOrderDetails(params: any) {
    const query = new URLSearchParams(params).toString();
    const url = `${this.baseUrl}/order/details?${query}`;
    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(url, { headers });
  }
  getOrderDetails1(params: HttpParams) {
    const url = `${this.baseUrl}/order/details`;
    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(url, { headers, params });
  }

  updateOrderQty(body: any) {
    const url = `${this.baseUrl}/order/update-order-qty`;
    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(url, body, { headers });
  }

  deleteCartItem(orderId: string, orderlineId: string) {
    const url = `${this.baseUrl}/customer-cart/delete`;
    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const params = new HttpParams()
      .set('orderId', orderId)
      .set('orderlineId', orderlineId);

    return this.http.delete(url, { headers, params });
  }

  addMaterial(materials: any) {
    const url = `${this.baseUrl}/admin-material-master/add?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(url, materials, { headers });
  }
  getMaterials(filters: any) {
    const url = `${this.baseUrl}/admin-material-master/get`;

    let httpParams = new HttpParams()
      .set('materialCategory', filters.materialCategory || '')
      .set('materialSubCategory', filters.materialSubCategory || '')
      .set('brand', filters.brand || '')
      .set('modelNo', filters.modelNo || '')
      .set('shape', filters.shape || '')
      .set('userId', filters.bodSeqNo || '');

    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(url, { headers, params: httpParams });
  }

  updateMaterial(materials: any) {
    const url = `${this.baseUrl}/admin-material-master/update?regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(url, materials, { headers });
  }

  uploadMaterialImage(skuId: string, formData: FormData) {
    const url = `${this.baseUrl}/admin-material-master/upload_images?skuId=${skuId}&regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(url, formData, { headers });
  }
  uploadProfileImage(seqNo: string, formData: any) {
    const url = `${this.baseUrl}/upload_photo?bodSeqNo=${seqNo}&regSource=MRMASON`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(url, formData, { headers });
  }

  getMenLocations(params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/distinct-location-by-sp`, { params });
  }

  getMaterialLocations(params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/distinct-location-by-ms`, {
      params,
    });
  }

  getMachineLocations(params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/distinct-location-by-machine`, {
      params,
    });
  }
}
