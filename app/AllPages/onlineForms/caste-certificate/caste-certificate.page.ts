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
  selector: 'app-caste-certificate',
  templateUrl: './caste-certificate.page.html',
  styleUrls: ['./caste-certificate.page.scss'],
})
export class CasteCertificatePage implements OnInit {


  casteForm: FormGroup;
  isSubmited = false;
  getFormName: any;

  radiotype: any = '';
  genderTypeHeader: any = {
    header: '-- चुनें --',
  };


  stateName: any = '';
  districtName: any = '';
  stateId: any = '';
  districtId: any = '';
  address: any = '';
  fullName: any = '';
  fatherHusbandType: any = '';
  fatherHusbandName: any = '';
  motherName: any = '';
  dob: any = '';
  adharNo: any = '';
  mobileNo: any = '';
  categry: any = '';
  subCategry: any = '';
  casteCertificateType: any = '';
  permanentAddress: any = '';
  tahsil: any = '';
  policeStation: any = '';
  residenceDuration: any = '';
  needOfCasteCertificate: any = '';
  prevCasteCertificateSatus: any = '';


  profilePhoto: any = null;
  selfPhoto: any = null;
  castePhoto: any = null;
  adharPhoto: any = null;
  otherPhoto: any = null;

  profilePhotoSend: any = null;
  selfPhotoSend: any = null;
  castePhotoSend: any = null;
  adharPhotoSend: any = null;
  otherPhotoSend: any = null;

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
    this.ValidateCasteCertificateForm();
  }

  ValidateCasteCertificateForm(): void {
    this.casteForm = this.formBuilder.group(
      {
        stateId: ['', [Validators.required]],
        districtId: ['', [Validators.required]],
        address: ['', [Validators.required]],
        fullName: ['', [Validators.required]],
        fatherHusbandType: ['', [Validators.required]],
        fatherHusbandName: ['', [Validators.required]],
        motherName: ['', [Validators.required,]],
        dob: ['', [Validators.required,]],
        adharNo: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],

        categry: ['', [Validators.required,]],
        subCategry: ['', [Validators.required,]],
        casteCertificateType: ['', [Validators.required]],

        permanentAddress: ['', [Validators.required,]],
        tahsil: ['', [Validators.required,]],
        policeStation: ['', [Validators.required,]],
        residenceDuration: ['', [Validators.required]],
        needOfCasteCertificate: ['', [Validators.required,]],
        prevCasteCertificateSatus: ['', [Validators.required,]],

      });

  }

  get errorControl() {
    return this.casteForm.controls;

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
      quality: 10,
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
      quality: 10,
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
      } if (imageType == 'self') {
        if (this.beforeCompressImage < 100000) {
          this.selfPhoto = "data:image/png;base64," + imageData;
          this.selfPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.selfPhoto = "data:image/png;base64," + imageData;
                this.selfPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      } if (imageType == 'caste') {
        if (this.beforeCompressImage < 100000) {
          this.castePhoto = "data:image/png;base64," + imageData;
          this.castePhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.castePhoto = "data:image/png;base64," + imageData;
                this.castePhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      } if (imageType == 'adhar') {
        if (this.beforeCompressImage < 100000) {
          this.adharPhoto = "data:image/png;base64," + imageData;
          this.adharPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.adharPhoto = "data:image/png;base64," + imageData;
                this.adharPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      } if (imageType == 'other') {
        if (this.beforeCompressImage < 100000) {
          this.otherPhoto = "data:image/png;base64," + imageData;
          this.otherPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.otherPhoto = "data:image/png;base64," + imageData;
                this.otherPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
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
    if (imageType == 'self') {
      this.selfPhoto = null;
    }
    if (imageType == 'caste') {
      this.castePhoto = null;
    }
    if (imageType == 'adhar') {
      this.adharPhoto = null;
    }
    if (imageType == 'other') {
      this.otherPhoto = null;
    }
  }




  payAndSubmit() {
    this.isSubmited = true;
    if (!this.casteForm.valid) {
      //console.log(" User update Invalid")
      return false;
    } else if (this.profilePhoto == null) {
      return false;
    } else if (this.selfPhoto == null) {
      return false;
    } else if (this.castePhoto == null) {
      return false;
    } else if (this.adharPhoto == null) {
      return false;
    }
    else {
      // console.log("user update valid")

      let casteCertificateParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,

        //stateId: this.casteForm.value.stateId,
        district: this.districtName,
        nivash: this.casteForm.value.address,
        full_name: this.casteForm.value.fullName,
        ptype: this.casteForm.value.fatherHusbandType,
        pname: this.casteForm.value.fatherHusbandName,
        mother_name: this.casteForm.value.motherName,
        dob: this.casteForm.value.dob,
        adhar_no: this.casteForm.value.adharNo,
        mobile_no: this.casteForm.value.mobileNo,

        caste: this.casteForm.value.categry,
        sub_caste: this.casteForm.value.subCategry,
        castetype: this.casteForm.value.casteCertificateType,

        address: this.casteForm.value.permanentAddress,
        tahsil: this.casteForm.value.tahsil,
        thana: this.casteForm.value.policeStation,
        stay: this.casteForm.value.residenceDuration,
        reason: this.casteForm.value.needOfCasteCertificate,
        previous_issue: this.casteForm.value.prevCasteCertificateSatus,

        photo: this.profilePhotoSend,
        sw_pramanit: this.selfPhotoSend,
        other_card: this.castePhotoSend,
        adhaar_card: this.adharPhotoSend,
        other: this.otherPhotoSend,

      }

      console.log("casteCertificateParams  =", casteCertificateParams)
      //alert("casteCertificateParams =" + JSON.stringify(casteCertificateParams))
      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createCasteCertificateForm(casteCertificateParams)
            .subscribe((data: any) => {
              if (data.action == "yes") {
                this.loadingService.hide();
                this.loadingService.showToast(data.msg, 2000, "success");
                console.log("caste success ", data)
                setTimeout(() => {
                  this.router.navigate(['/menu/global-online-form', { screenId: "25", screenName: "E-District Services" }])
                }, 2000)
              }
              else if (data.action == "no") {
                this.loadingService.hide();
                this.loadingService.showToast(data.msg, 2000, "danger");
              }
            }, (error: any) => {
              this.loadingService.hide();
              console.log("caste fail ", error)
            })
        } else if (this.shareData.walletBalance < this.getFormName.form_price) {
          this.loadingService.hide();
          this.loadingService.showToast("Insufficient wallet Balance.", 2000, 'danger');
        }
      }
    }
  }

  resetMainForm() {
    this.loadingService.autoHide(1000, "Reseting...");
    setTimeout(() => {
      this.ValidateCasteCertificateForm();
      this.profilePhoto = null;
      this.selfPhoto = null;
      this.castePhoto = null;
      this.adharPhoto = null;
      this.otherPhoto = null;
    }, 1000)
  }






}
