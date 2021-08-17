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
  selector: 'app-driving-licence-form',
  templateUrl: './driving-licence-form.page.html',
  styleUrls: ['./driving-licence-form.page.scss'],
})
export class DrivingLicenceFormPage implements OnInit {


  getFormName: any;
  gotFormId: any;
  isSubmited = false;
  lernerLicenceForm: FormGroup;
  newLicenceForm: FormGroup;


  formTypeHeader: any = {
    header: 'Your Online Form',
  };

  DLSelectHeader: any = {
    header: '  Select DL Category',
  };

  QualiHeader: any = {
    header: 'Select Qualification',
  };

  selectbloodHeader: any = {
    header: 'Select Blood Group',
  };



  // coman variable 

  formType: any = '';
  dlcategory: any = '';
  fullName: any = '';
  fatherName: any = '';
  motherName: any = '';
  dob: any = '';
  mobileNo: any = '';
  emailId: any = '';
  adharNo: any = '';
  pinCode: any = '';
  fullAddress: any = '';


  //from 2nd variable 

  stateName: any = '';
  districtName: any = '';

  stateId: any = '';
  districtId: any = '';
  qualification: any = '';
  bloodGroup: any = '';
  identityMark: any = '';
  alternateNo: any = '';
  tahsil: any = '';
  policeStation: any = '';


  learingLicencePhoto: any = null;

  profilePhoto: any = null;
  signPhoto: any = null;
  identityPhoto: any = null;
  dobPhoto: any = null;

  learingLicencePhotoSend: any = null;

  profilePhotoSend: any = null;
  signPhotoSend: any = null;
  identityPhotoSend: any = null;
  dobPhotoSend: any = null;

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
    private imageCompress: NgxImageCompressService,
  ) {

    this.getFormName = JSON.parse(this.activatedroute.snapshot.paramMap.get('formType'));
    //console.log("getFormName =", this.getFormName.form_name)
    this.gotFormId = this.getFormName.form_id;
    //console.log("Form Id =", this.gotFormId)
    this.shareData.callBloodGroupApi();
    this.shareData.callStateGlobalApi();

  }

  ngOnInit() {

    if (this.gotFormId == "6") {
      this.ValidateLearningLicenceForm();
    } else if (this.gotFormId == "7") {
      this.ValidateNewLicenceForm();
    }

  }

  ValidateLearningLicenceForm(): void {
    this.lernerLicenceForm = this.formBuilder.group(
      {

        formType: [this.formType, [Validators.required]],
        dlcategory: ['', [Validators.required]],
        fullName: ['', [Validators.required]],
        fatherName: ['', [Validators.required,]],
        motherName: ['', [Validators.required,]],
        dob: ['', [Validators.required]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        emailId: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        adharNo: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
        pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
        fullAddress: ['', [Validators.required,]],

        stateId: ['', [Validators.required,]],
        districtId: ['', [Validators.required,]],
        qualification: ['', [Validators.required,]],
        bloodGroup: ['', [Validators.required,]],
        identityMark: ['', [Validators.required,]],
        alternateNo: ['',],
        tahsil: ['', [Validators.required,]],
        policeStation: ['', [Validators.required,]],


      });

  }

  get errorControl() {
    return this.lernerLicenceForm.controls;

  }

  ValidateNewLicenceForm(): void {
    this.newLicenceForm = this.formBuilder.group(
      {
        formType: [this.formType, [Validators.required]],
        dlcategory: ['', [Validators.required]],
        fullName: ['', [Validators.required]],
        fatherName: ['', [Validators.required,]],
        motherName: ['', [Validators.required,]],
        dob: ['', [Validators.required]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        emailId: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        adharNo: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
        pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
        fullAddress: ['', [Validators.required,]],
      });

  }

  get errorControl2() {
    return this.newLicenceForm.controls;

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
          //this.takephoto(imageType);
          this.pickImage(this.camera.PictureSourceType.CAMERA, imageType);

        }
      }, {
        text: 'Select from Gallery',
        icon: 'image-outline',
        handler: () => {
          //this.getImage(imageType);
          this.pickImage(this.camera.PictureSourceType.SAVEDPHOTOALBUM, imageType);
        }
      },
      {
        text: ' Close',
        icon: 'close-outline',
        role: 'cancel',
        cssClass: 'left-align-buttons',


      },
      ]
    });
    await actionSheet.present();

  }

  pickImage(sourceType: any, imageType: any) {
    const options: CameraOptions = {
      quality: 8,
      targetWidth: 600,
      targetHeight: 600,
      allowEdit: false,
      correctOrientation: true,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }
    //alert("options= " + JSON.stringify(options))
    this.storePhoto(imageType, options);
  }

  // takephoto(imageType: any) {
  //   const options: CameraOptions = {
  //     quality: 10,
  //     targetWidth: 600,
  //     targetHeight: 600,
  //     allowEdit: false,
  //     correctOrientation: true,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   }
  //   this.storePhoto(imageType, options);
  // }

  // getImage(imageType: any) {
  //   const options: CameraOptions = {
  //     quality: 10,
  //     targetWidth: 600,
  //     targetHeight: 600,
  //     allowEdit: false,
  //     correctOrientation: true,
  //     destinationType: 0,
  //     encodingType: this.camera.EncodingType.PNG,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //   }
  //   this.storePhoto(imageType, options);
  // }


  storePhoto(imageType: any, options: any) {
    this.camera.getPicture(options).then((imageData) => {
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
      }
      if (imageType == 'sign') {
        if (this.beforeCompressImage < 100000) {
          this.signPhoto = "data:image/png;base64," + imageData;
          this.signPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.signPhoto = "data:image/png;base64," + imageData;
                this.signPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      }
      if (imageType == 'identity') {
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
      }
      if (imageType == 'dob') {
        if (this.beforeCompressImage < 100000) {
          this.dobPhoto = "data:image/png;base64," + imageData;
          this.dobPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.dobPhoto = "data:image/png;base64," + imageData;
                this.dobPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      } if (imageType == 'learing') {
        if (this.beforeCompressImage < 100000) {
          this.learingLicencePhoto = "data:image/png;base64," + imageData;
          this.learingLicencePhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.learingLicencePhoto = "data:image/png;base64," + imageData;
                this.learingLicencePhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      }
    }, (err) => {
      console.log(err)
    });


  }

  removeImage(imageType: any) {
    if (imageType == 'profile') {
      this.profilePhoto = null;
    }
    if (imageType == 'sign') {
      this.signPhoto = null;
    }
    if (imageType == 'identity') {
      this.identityPhoto = null;
    }
    if (imageType == 'dob') {
      this.dobPhoto = null;
    }

    if (imageType == 'learing') {
      this.learingLicencePhoto = null;
    }

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


  submitLearningDrivingForm() {
    this.isSubmited = true;
    if (!this.lernerLicenceForm.valid) {
      //console.log(" Invalid")
      return false;
    }
    else if (this.profilePhoto == null) {
      return false;
    } else if (this.signPhoto == null) {
      return false;
    }
    else if (this.identityPhoto == null) {
      return false;
    }
    else if (this.dobPhoto == null) {
      return false;
    }

    else {
      //console.log("valid")
      let lernerLicenceFormParams = {

        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,

        //formType: this.lernerLicenceForm.value.formType,

        dl_category: this.lernerLicenceForm.value.dlcategory,
        full_name: this.lernerLicenceForm.value.fullName,
        father_name: this.lernerLicenceForm.value.fatherName,
        mother_name: this.lernerLicenceForm.value.motherName,
        dob: this.lernerLicenceForm.value.dob,
        mobile_no: this.lernerLicenceForm.value.mobileNo,
        email_id: this.lernerLicenceForm.value.emailId,
        adhar_no: this.lernerLicenceForm.value.adharNo,
        pin_code: this.lernerLicenceForm.value.pinCode,
        full_address: this.lernerLicenceForm.value.fullAddress,

        state: this.stateName,
        district: this.districtName,
        qualification: this.lernerLicenceForm.value.qualification,
        blood: this.lernerLicenceForm.value.bloodGroup,
        identification: this.lernerLicenceForm.value.identityMark,
        alternate_no: this.lernerLicenceForm.value.alternateNo,
        tahsil: this.lernerLicenceForm.value.tahsil,
        thana: this.lernerLicenceForm.value.policeStation,


        photo: this.profilePhotoSend,
        sign: this.signPhotoSend,
        idproof: this.identityPhotoSend,
        dobproof: this.dobPhotoSend,


      }
      console.log("lernerLicenceFormParams =", lernerLicenceFormParams)
      //alert("lernerLicenceFormParams =" + JSON.stringify(lernerLicenceFormParams));
      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createLearningLicenceForm(lernerLicenceFormParams)
            .subscribe((data: any) => {
              if (data !== null) {
                if (data.action == "yes") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "success");
                  console.log("learn licence success ", data)
                  setTimeout(() => {
                    this.router.navigate(['/menu/global-online-form', { screenId: "2", screenName: "ARTO Services" }]);
                  }, 2000)
                } else if (data.action == "no") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "danger");
                }
              } else if (data == null) {
                this.loadingService.hide();
                this.loadingService.showToast("Server Side Error.", 2000, 'danger');
              }
            }, (error: any) => {
              this.loadingService.hide();
              console.log("learn licence fail ", error);
            })
        } else if (this.shareData.walletBalance < this.getFormName.form_price) {
          this.loadingService.hide();
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }

      }

    }


  }


  submitNewDrivingForm() {
    this.isSubmited = true;
    if (!this.newLicenceForm.valid) {
      //console.log(" Invalid")
      return false;
    }
    else if (this.profilePhoto == null) {
      return false;
    } else if (this.signPhoto == null) {
      return false;
    }
    else if (this.identityPhoto == null) {
      return false;
    }
    else if (this.dobPhoto == null) {
      return false;
    }
    else if (this.learingLicencePhoto == null) {
      return false;
    }

    else {
      //console.log("valid")
      let newLicenceFormParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,


        lice_no: this.newLicenceForm.value.formType,

        dl_category: this.newLicenceForm.value.dlcategory,
        full_name: this.newLicenceForm.value.fullName,
        father_name: this.newLicenceForm.value.fatherName,
        mother_name: this.newLicenceForm.value.motherName,
        dob: this.newLicenceForm.value.dob,
        mobile_no: this.newLicenceForm.value.mobileNo,
        email_id: this.newLicenceForm.value.emailId,
        adhar_no: this.newLicenceForm.value.adharNo,
        pin_code: this.newLicenceForm.value.pinCode,
        full_address: this.newLicenceForm.value.fullAddress,

        photo: this.profilePhotoSend,
        sign: this.signPhotoSend,
        idproof: this.identityPhotoSend,
        dobproof: this.dobPhotoSend,
        lice_upload: this.learingLicencePhotoSend,
      }
      console.log("newLicenceFormParams =", newLicenceFormParams)
      //alert("learningLicenewLicenceFormParamsnceParams =" + JSON.stringify(newLicenceFormParams))
      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createNewLicenceForm(newLicenceFormParams)
            .subscribe((data: any) => {
              if (data !== null) {
                if (data.action == "yes") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "success");
                  console.log("new licence success ", data)
                  setTimeout(() => {
                    this.router.navigate(['/menu/global-online-form', { screenId: "2", screenName: "ARTO Services" }]);
                  }, 2000)
                } else if (data.action == "no") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "danger");
                }
              } else if (data == null) {
                this.loadingService.hide();
                this.loadingService.showToast("Server Side Error.", 2000, 'danger');
              }
            }, (error: any) => {
              this.loadingService.hide();
              console.log("new  licence fail ", error);
            })
        } else if (this.shareData.walletBalance < this.getFormName.form_price) {
          this.loadingService.hide();
          this.loadingService.showToast(this.shareData.insufficientBalanceToast, 2000, 'danger');
        }

      }
    }
  }


  resetLearningDrivingForm() {
    this.loadingService.autoHide(1000, "Reseting...");
    setTimeout(() => {
      this.ValidateLearningLicenceForm();
      this.profilePhoto = null;
      this.signPhoto = null;
      this.identityPhoto = null;
      this.dobPhoto = null;
    }, 1000)
  }


  resetNewDrivingForm() {
    this.loadingService.autoHide(1000, "Reseting...");
    setTimeout(() => {
      this.ValidateNewLicenceForm();
      this.profilePhoto = null;
      this.signPhoto = null;
      this.identityPhoto = null;
      this.dobPhoto = null;
      this.learingLicencePhoto = null;
    }, 1000)


  }
}
