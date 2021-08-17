
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  baseUrl: any = 'http://www.digisevakendra.com/api/index.php?act=';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };


  constructor(
    public platform: Platform,
    private httpNative: HTTP,
    private httpClient: HttpClient,
    private loadingService: LoadingService,

  ) { }


  callLoginApi(uniqueID: any, password: any) {
    return this.httpClient.get(this.baseUrl + "login&UniqueId="
      + uniqueID + "&password=" + password, this.httpOptions)
  }

  callMenuListApi(userRoleId: any) {
    return this.httpClient.get(this.baseUrl + "menu&UserRoleUId="
      + userRoleId, this.httpOptions)
  }



  callScreeApi(screenId: any, userRoleId: any, userUniqueId: any) {
    return this.httpClient.get(this.baseUrl + "screen&screen_id=" + screenId + "&UserRoleUId=" + userRoleId
      + "&UniqueId=" + userUniqueId, this.httpOptions)
  }

  callEditUserApi(userUniqueId: any) {
    return this.httpClient.get(this.baseUrl + "edituser" + "&UniqueId=" + userUniqueId, this.httpOptions)
  }

  callStateApi() {
    return this.httpClient.get(this.baseUrl + "state", this.httpOptions)
  }

  callBloodGroupApi() {
    return this.httpClient.get(this.baseUrl + "BloodGroup", this.httpOptions)
  }

  callDistrictApi(stateId: any) {
    return this.httpClient.get(this.baseUrl + "district" + "&state_id=" + stateId, this.httpOptions)
  }

  callRoleApi() {
    return this.httpClient.get(this.baseUrl + "role", this.httpOptions)
  }

  callSponserApi(userRoleId: any) {
    return this.httpClient.get(this.baseUrl + "sponsor" + "&UserRoleUId=" + userRoleId, this.httpOptions)
  }

  callApiByScreenName(screenName: any, userRoleId: any, userUniqueId: any) {
    return this.httpClient.get(this.baseUrl + screenName + "&UserRoleUId=" + userRoleId
      + "&UniqueId=" + userUniqueId, this.httpOptions)
  }


  callViewOrderDetailsApi(formType: any, orderId: any) {
    return this.httpClient.get(this.baseUrl + "formdetails" + "&form_type=" + formType
      + "&order_id=" + orderId)
  }


  callwalletbalanceApi(UniqueId: any) {
    return this.httpClient.get(this.baseUrl + "showbalance" + "&uid=" + UniqueId, this.httpOptions)
  }

  updateOrderStatus(userId: any, orderId: any, orderStatus: any, remarks: any, uploadFile: any) {
    return this.httpClient.get(this.baseUrl + "statusupdate" + "&userid=" + userId +
      "&order_id=" + orderId + "&order_status=" + orderStatus + "&remarks=" + remarks +
      "&upload=" + uploadFile)
  }


  updateOrderStatus1(updateStatusParams: any) {
    return this.httpClient.post("http://digisevakendra.com/api/index.php?act=statusupdate", updateStatusParams, this.httpOptions)
  }


  callAddNewUserApi(addNewUserParams: any) {
    console.log("http://digisevakendra.com/api/index.php?act=add-user", addNewUserParams);
    return this.httpClient.post("http://digisevakendra.com/api/index.php?act=add-user", addNewUserParams, this.httpOptions)
  }

  callUpdateUserApi(updateUserParams: any) {
    //console.log("http://digisevakendra.com/api/index.php?act=update-user" + JSON.stringify(updateUserParams));
    return this.httpClient.post("http://digisevakendra.com/api/index.php?act=update-user", updateUserParams, this.httpOptions)
  }

  callAddwalletRequestApi(credit: any, UniqueId: any, txnDetails: any, description: any) {
    return this.httpClient.get(this.baseUrl + "AddWalletRequest" + "&credit=" + credit
      + "&UniqueId=" + UniqueId + "&txn_detail=" + txnDetails + "&description=" + description, this.httpOptions)
  }

  callOccupationApi() {
    return this.httpClient.get(this.baseUrl + "occupation", this.httpOptions)
  }

  createRationCardForm(rationCardParams: any) {
    return this.httpClient.post(this.baseUrl + "RationCardUp", rationCardParams, this.httpOptions)
  }

  createBirthCertificateForm(birthCertificateParams: any) {
    return this.httpClient.post(this.baseUrl + "birth-certificate", birthCertificateParams, this.httpOptions)
  }

  createDeathCertificateForm(deathCertificateParams: any) {
    return this.httpClient.post(this.baseUrl + "death_certificate", deathCertificateParams, this.httpOptions)
  }

  createDomicileCertificateForm(domicileCertificateParams: any) {
    return this.httpClient.post(this.baseUrl + "domi", domicileCertificateParams, this.httpOptions)
  }

  createCasteCertificateForm(casteCertificateParams: any) {
    return this.httpClient.post(this.baseUrl + "caste", casteCertificateParams, this.httpOptions)
  }

  createIncomeCertificateForm(incomeCertificateParams: any) {
    return this.httpClient.post(this.baseUrl + "income", incomeCertificateParams, this.httpOptions)
  }

  createPanCardForm(panCardParams: any) {
    return this.httpClient.post(this.baseUrl + "pancard", panCardParams, this.httpOptions)
  }

  createNewGSTRegistrationForm(newGSTParams: any) {
    return this.httpClient.post(this.baseUrl + "GSTRegistration", newGSTParams, this.httpOptions)
  }

  createPMKishanSammanForm(voterIdParams: any) {
    return this.httpClient.post(this.baseUrl + "kisan-samman", voterIdParams, this.httpOptions)
  }

  createVoterIdCardForm(voterIdParams: any) {
    return this.httpClient.post(this.baseUrl + "voter-id", voterIdParams, this.httpOptions)
  }

  createWidowPensionForm(widowPensionParams: any) {
    return this.httpClient.post(this.baseUrl + "widow-pension", widowPensionParams, this.httpOptions)
  }

  createOldAgePensionForm(oldAgePensionParams: any) {
    return this.httpClient.post(this.baseUrl + "oldage-pension", oldAgePensionParams, this.httpOptions)
  }

  callDigiMartApi() {
    return this.httpClient.get(this.baseUrl + "digimart", this.httpOptions)
  }

  createUPShramikCardForm(shramikCardParams: any) {
    return this.httpClient.post(this.baseUrl + "shramik-card", shramikCardParams, this.httpOptions)
  }

  createFamilyLabhForm(familtyLabhParams: any) {
    return this.httpClient.post(this.baseUrl + "parivarik-labh", familtyLabhParams, this.httpOptions)
  }

  createShadiAnudanForm(shadiAnudanParams: any) {
    return this.httpClient.post(this.baseUrl + "shadi-anudan", shadiAnudanParams, this.httpOptions)
  }

  createHandicapPensionForm(handicapPensionParams: any) {
    return this.httpClient.post(this.baseUrl + "handicap-pension", handicapPensionParams, this.httpOptions)
  }

  createUPShopLicenseForm(upShopLicenceParams: any) {
    return this.httpClient.post(this.baseUrl + "up_shop_license", upShopLicenceParams, this.httpOptions)
  }

  createUPUdyogAdharForm(upUdyogAdharParams: any) {
    return this.httpClient.post(this.baseUrl + "up_udyog_adhar", upUdyogAdharParams, this.httpOptions)
  }

  callNotoficationListApi(uniqueId: any) {
    return this.httpClient.get(this.baseUrl + "noti&UniqueId=" + uniqueId, this.httpOptions)
  }

  callReadNotoficationListApi(notiId: any) {
    return this.httpClient.get(this.baseUrl + "read_noti&id=" + notiId, this.httpOptions)
  }

  regDeviceToken(deviceToken: any) {
    return this.httpClient.get(this.baseUrl + "read_noti&id=" + deviceToken, this.httpOptions)
  }

  createPassportSevaForm(actType: any, passportParams: any,) {
    return this.httpClient.post(this.baseUrl + actType, passportParams, this.httpOptions)
  }

  createPVCCardForm(pvcCardParams: any) {
    return this.httpClient.post(this.baseUrl + "PVCCard", pvcCardParams, this.httpOptions)
  }

  sendFCMTokenAndDevoceId(tokenDeviceParams: any) {
    //console.log(this.baseUrl + "push_notification" + JSON.stringify(tokenDeviceParams))
    return this.httpClient.post(this.baseUrl + "push_notification", tokenDeviceParams, this.httpOptions)
  }

  deleteFCMToken(removetokenDeviceParams: any) {
    //console.log(this.baseUrl + "delete_push_notification" + JSON.stringify(removetokenDeviceParams))
    return this.httpClient.post(this.baseUrl + "delete_push_notification", removetokenDeviceParams, this.httpOptions)
  }

  updateWalletApi(avlBalance: any, addBalance: any, uniqueId: any, rechargeTopup: any, authuid: any, remarks: any) {
    return this.httpClient.get(this.baseUrl + "topwallet" + "&avabal=" + avlBalance +
      "&addbal=" + addBalance + "&UniqueId=" + uniqueId + "&rtopup=" + rechargeTopup + "&authuid=" + authuid + "&remark=" + remarks, this.httpOptions)
  }

  changePasswordApi(password: any, authuid: any) {
    return this.httpClient.get(this.baseUrl + "changepass" + "&password=" + password + "&authuid=" + authuid, this.httpOptions)
  }

  callApproveUserApi(userUniqueId: any) {
    return this.httpClient.get("http://digisevakendra.com/api/approve-user.php?UniqueId=" + userUniqueId, this.httpOptions)
  }

  callCheckUserStatusApi(userUniqueId: any) {
    return this.httpClient.get(this.baseUrl + "userstatus&UniqueId=" + userUniqueId, this.httpOptions)
  }

  createLearningLicenceForm(learningLicenceParams: any) {
    return this.httpClient.post(this.baseUrl + "driving_license", learningLicenceParams, this.httpOptions)
  }

  createNewLicenceForm(newLicenceParams: any) {
    return this.httpClient.post(this.baseUrl + "new_driving_license", newLicenceParams, this.httpOptions)
  }


}
