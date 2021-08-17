import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-new-gstregistration',
  templateUrl: './new-gstregistration.page.html',
  styleUrls: ['./new-gstregistration.page.scss'],
})
export class NewGSTRegistrationPage implements OnInit {

  gstRegistrationForm: FormGroup;
  isSubmited = false;
  getFormName: any;

  docHeader: any = {
    header: 'Select One',
  };

  taxType: any = '';
  panNumber: any = '';
  firmOfficeShop: any = '';
  fullName: any = '';
  dob: any = '';
  fatherName: any = '';
  mobileNo: any = '';
  email: any = '';
  adharNo: any = '';
  stateName: any = '';
  districtName: any = '';
  stateId: any = '';
  districtId: any = '';
  pincode: any = '';
  address: any = '';

  profilePhoto: any = null;
  signaturePhoto: any = null;
  pancardPhoto: any = null;
  identityPhoto: any = null;
  passbookPhoto: any = null;
  rentElectronicPhoto: any = null;

  profilePhotoSend: any = null;
  signaturePhotoSend: any = null;
  pancardPhotoSend: any = null;
  identityPhotoSend: any = null;
  passbookPhotoSend: any = null;
  rentElectronicPhotoSend: any = null;

  isStateId: boolean = true;
  beforeCompressImage: any;


  constructor(
    private router: Router,
    public platform: Platform,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private eventService: EventService,
    private activatedroute: ActivatedRoute,
    private shareData: ShareDataService,
    private loadingService: LoadingService,
    private navController: NavController,
    public actionCtrl: ActionSheetController,
    private camera: Camera,
    private imageCompress: NgxImageCompressService
  ) {
    this.getFormName = JSON.parse(this.activatedroute.snapshot.paramMap.get('formType'));
    // console.log("getFormName =", this.getFormName.form_name)
    this.shareData.callStateGlobalApi();
  }

  ngOnInit() {
    this.ValidateGSTRegistrationForm();
  }

  ValidateGSTRegistrationForm(): void {
    this.gstRegistrationForm = this.formBuilder.group(
      {
        taxType: ['', [Validators.required]],
        panNumber: ['', [Validators.required]],
        firmOfficeShop: ['', [Validators.required]],
        fullName: ['', [Validators.required]],
        dob: ['', [Validators.required,]],
        fatherName: ['', [Validators.required,]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        adharNo: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
        stateId: ['', [Validators.required,]],
        districtId: ['', [Validators.required,]],
        pincode: ['', [Validators.required,]],
        address: ['', [Validators.required,]],
      });

  }

  get errorControl() {
    return this.gstRegistrationForm.controls;

  }

  selectState(event: any) {
    this.districtId = "";
    console.log("state id =", event.detail.value.state_name);
    this.stateName = event.detail.value.state_name;
    if (event.detail.value.state_id !== "" || event.detail.value.state_id !== null) {
      this.isStateId = false;
      this.shareData.callDistrictGlobalApi(event.detail.value.state_id);
    }
  }
  selectDistrict(event: any) {
    console.log("district_id =", event.detail.value.city_name);
    this.districtName = event.detail.value.city_name;
  }

  async selectImage(imageType: any) {
    // console.log("image type=", imageType)
    const actionSheet = await this.actionCtrl.create({
      header: 'Choose Option',
      mode: "ios",
      buttons: [{
        text: 'Take photo',
        icon: 'camera-outline',
        handler: () => {
          this.takephoto(imageType);

        }
      }, {
        text: 'Select from Gallery',
        icon: 'image-outline',
        handler: () => {
          this.getImage(imageType);

        }
      },
      {
        text: ' Close',
        icon: 'close-outline',
        role: 'cancel',

      },
      ]
    });
    await actionSheet.present();

  }

  takephoto(imageType: any) {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 600,
      targetHeight: 600,
      allowEdit: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.storePhoto(imageType, options);
  }

  getImage(imageType: any) {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 600,
      targetHeight: 600,
      allowEdit: false,
      correctOrientation: true,
      destinationType: 0,
      encodingType: this.camera.EncodingType.PNG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }
    this.storePhoto(imageType, options);
  }

  storePhoto(imageType: any, options: any) {
    this.camera.getPicture(options).then((imageData: string) => {
      let temp = 'data:image/jpeg;base64,' + imageData;
      this.beforeCompressImage = this.imageCompress.byteCount(temp);
      //console.log("before compress",this.beforeCompressImage);

      if (imageType == 'profile') {
        if (this.beforeCompressImage < 20000) {
          this.profilePhoto = "data:image/png;base64," + imageData;
          this.profilePhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 20000) {
          this.imageCompress.compressFile(temp, 90, 20)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              console.log("after compress =", size)
              if (size <= 20000) {
                this.profilePhoto = "data:image/png;base64," + imageData;
                this.profilePhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
                //console.log("profilePhotoSend", this.profilePhotoSend)
              } else if (size > 20000) {
                this.loadingService.showToast("Image should less then 20 Kb.", 2000, 'danger');
              }
            })
        }
      } if (imageType == 'signature') {
        if (this.beforeCompressImage < 100000) {
          this.signaturePhoto = "data:image/png;base64," + imageData;
          this.signaturePhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.signaturePhoto = "data:image/png;base64," + imageData;
                this.signaturePhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }

      } if (imageType == 'pancard') {
        if (this.beforeCompressImage < 100000) {
          this.pancardPhoto = "data:image/png;base64," + imageData;
          this.pancardPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.pancardPhoto = "data:image/png;base64," + imageData;
                this.pancardPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      } if (imageType == 'identity') {
        if (this.beforeCompressImage < 100000) {
          this.identityPhoto = "data:image/png;base64," + imageData;
          this.identityPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.identityPhoto = "data:image/png;base64," + imageData;
                this.identityPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      } if (imageType == 'passbook') {
        if (this.beforeCompressImage < 100000) {
          this.passbookPhoto = "data:image/png;base64," + imageData;
          this.passbookPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.passbookPhoto = "data:image/png;base64," + imageData;
                this.passbookPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      } if (imageType == 'rentElectronic') {
        if (this.beforeCompressImage < 100000) {
          this.rentElectronicPhoto = "data:image/png;base64," + imageData;
          this.rentElectronicPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.rentElectronicPhoto = "data:image/png;base64," + imageData;
                this.rentElectronicPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      }
    }, (err) => {
      console.log("img err", err);
    });

  }

  removeImage(imageType: any) {
    if (imageType == 'profile') {
      this.profilePhoto = null;
    }
    if (imageType == 'signature') {
      this.signaturePhoto = null;
    }
    if (imageType == 'pancard') {
      this.pancardPhoto = null;
    }
    if (imageType == 'identity') {
      this.identityPhoto = null;
    }
    if (imageType == 'passbook') {
      this.passbookPhoto = null;
    }
    if (imageType == 'rentElectronic') {
      this.rentElectronicPhoto = null;
    }
  }


  payAndSubmit() {
    this.isSubmited = true;
    if (!this.gstRegistrationForm.valid) {
      //console.log("voter id form Invalid")
      return false;
    }
    else if (this.profilePhoto == null) {
      return false;
    } else if (this.signaturePhoto == null) {
      return false;
    } else if (this.pancardPhoto == null) {
      return false;
    } else if (this.identityPhoto == null) {
      return false;
    } else if (this.passbookPhoto == null) {
      return false;
    } else if (this.rentElectronicPhoto == null) {
      return false;
    }
    else {
      //console.log("voter id form Valid")

      let gstRegistrationParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,



        tax_type: this.gstRegistrationForm.value.taxType,
        pan_no: this.gstRegistrationForm.value.panNumber,
        shop_name: this.gstRegistrationForm.value.firmOfficeShop,
        full_name: this.gstRegistrationForm.value.fullName,
        dob: this.gstRegistrationForm.value.dob,
        father_name: this.gstRegistrationForm.value.fatherName,
        mobile_no: this.gstRegistrationForm.value.mobileNo,
        email_id: this.gstRegistrationForm.value.email,
        adhar_no: this.gstRegistrationForm.value.adharNo,
        state: this.stateName,
        district: this.districtName,
        pin_code: this.gstRegistrationForm.value.pincode,
        full_address: this.gstRegistrationForm.value.address,

        photo: this.profilePhotoSend,
        sign: this.signaturePhotoSend,
        pan_card: this.pancardPhotoSend,
        id_proof: this.identityPhotoSend,
        bank_passbook: this.passbookPhotoSend,
        agreement: this.rentElectronicPhotoSend,
      }

      console.log("gstRegistrationParams  info =", gstRegistrationParams)
      // alert("gstRegistrationParams  info =" + JSON.stringify(gstRegistrationParams))
      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createNewGSTRegistrationForm(gstRegistrationParams)
            .subscribe((data: any) => {
              if (data !== null) {
                if (data.action == "yes") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "success");
                  console.log("New GST reg success ", data)
                  setTimeout(() => {
                    this.router.navigate(['/menu/global-online-form', { screenId: "6", screenName: "GST Suvidha Kendra" }]);
                  }, 2000)
                }
                else if (data.action == "no") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "danger");
                }
              } else if (data == null) {
                this.loadingService.hide();
                this.loadingService.showToast("Server Side Error.", 2000, 'danger');
              }
            }, (error: any) => {
              this.loadingService.hide();
              console.log("New GST Reg fail ", error)
            })
        } else if (this.shareData.walletBalance < this.getFormName.form_price) {
          this.loadingService.hide();
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }
      }
    }
  }

  resetMainForm() {
    this.loadingService.autoHide(1000, "Reseting...");
    setTimeout(() => {
      this.ValidateGSTRegistrationForm();
      this.profilePhoto = null;
      this.signaturePhoto = null;
      this.pancardPhoto = null;
      this.identityPhoto = null;
      this.passbookPhoto = null;
      this.rentElectronicPhoto = null;
    }, 1000)
  }




}
