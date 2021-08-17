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
  selector: 'app-birth-certificate',
  templateUrl: './birth-certificate.page.html',
  styleUrls: ['./birth-certificate.page.scss'],
})
export class BirthCertificatePage implements OnInit {

  birthForm: FormGroup;
  isSubmited = false;
  getFormName: any;



  radiotype: any = '';
  genderTypeHeader: any = {
    header: '-- चुनें --',
  };

  area: any = '';
  fullName: any = '';
  fatherHusbandName: any = '';
  motherName: any = '';
  dob: any = '';
  gender: any = '';
  religion: any = '';
  birthPlace: any = '';
  janpad: any = '';
  block: any = '';
  tahsil: any = '';
  villagePanchayat: any = '';
  applicantAddress: any = '';
  fullAddress: any = '';
  fatherNationality: any = '';
  motherNationality: any = '';
  mobileNo: any = '';
  registrationDate: any = '';
  registrationPlace: any = '';
  registrationNo: any = '';
  adharNo: any = '';

  profilePhoto: any = null;
  adharPhoto: any = null;
  hospitalPhoto: any = null;
  otherPhoto: any = null;

  profilePhotoSend: any = null;
  adharPhotoSend: any = null;
  hospitalPhotoSend: any = null;
  otherPhotoSend: any = null;


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

  }

  ngOnInit() {
    this.ValidateBirthCertificateForm();
  }

  ValidateBirthCertificateForm(): void {
    this.birthForm = this.formBuilder.group(
      {
        area: ['', [Validators.required]],
        fullName: ['', [Validators.required]],
        fatherHusbandName: ['', [Validators.required]],
        motherName: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        gender: ['', [Validators.required,]],
        religion: ['', [Validators.required,]],
        birthPlace: ['', [Validators.required]],
        janpad: ['', [Validators.required,]],
        block: ['', [Validators.required,]],
        tahsil: ['', [Validators.required,]],
        villagePanchayat: ['', [Validators.required,]],
        applicantAddress: ['', [Validators.required]],
        fullAddress: ['', [Validators.required,]],
        fatherNationality: ['', [Validators.required,]],
        motherNationality: ['', [Validators.required,]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        registrationDate: ['', [Validators.required,]],
        registrationPlace: ['', [Validators.required,]],
        registrationNo: ['', [Validators.required,]],
        adharNo: ['',],
      });


  }

  get errorControl() {
    return this.birthForm.controls;

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
      mediaType: this.camera.MediaType.PICTURE
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
      } if (imageType == 'hospital') {
        if (this.beforeCompressImage < 100000) {
          this.hospitalPhoto = "data:image/png;base64," + imageData;
          this.hospitalPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.hospitalPhoto = "data:image/png;base64," + imageData;
                this.hospitalPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
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
    if (imageType == 'adhar') {
      this.adharPhoto = null;
    }
    if (imageType == 'cashospitalte') {
      this.hospitalPhoto = null;
    }
    if (imageType == 'other') {
      this.otherPhoto = null;
    }
  }


  payAndSubmit() {
    this.isSubmited = true;
    if (!this.birthForm.valid) {
      //console.log(" User update Invalid")
      return false;
    } else if (this.profilePhoto == null) {
      return false;
    } else if (this.hospitalPhoto == null) {
      return false;
    }
    else {
      // console.log("user update valid")

      let birthCertificateParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,

        type: this.birthForm.value.area,
        full_name: this.birthForm.value.fullName,
        father_name: this.birthForm.value.fatherHusbandName,
        mother_name: this.birthForm.value.motherName,
        dob: this.birthForm.value.dob,
        gender: this.birthForm.value.gender,
        religion: this.birthForm.value.religion,
        birthplace: this.birthForm.value.birthPlace,
        district: this.birthForm.value.janpad,
        block: this.birthForm.value.block,
        tehsil: this.birthForm.value.tahsil,
        grampanchayat: this.birthForm.value.villagePanchayat,
        address: this.birthForm.value.applicantAddress,
        address1: this.birthForm.value.fullAddress,
        fnationality: this.birthForm.value.fatherNationality,
        mnationality: this.birthForm.value.motherNationality,
        mobile_no: this.birthForm.value.mobileNo,
        reg_date: this.birthForm.value.registrationDate,
        reg_place: this.birthForm.value.registrationPlace,
        reg_no: this.birthForm.value.registrationNo,
        adhar: this.birthForm.value.adharNo,

        photo: this.profilePhotoSend,
        adhar_card: this.adharPhotoSend,
        birthcertificate: this.hospitalPhotoSend,
        other: this.otherPhotoSend,

      }

      console.log("birthCertificateParams  =", birthCertificateParams)
      //alert("birthCertificateParams =" + JSON.stringify(birthCertificateParams))

      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createBirthCertificateForm(birthCertificateParams)
            .subscribe((data: any) => {
              if (data.action == "yes") {
                this.loadingService.hide();
                this.loadingService.showToast(data.msg, 2000, "success");
                console.log("birth cert success ", data)
                setTimeout(() => {
                  this.router.navigate(['/menu/global-online-form', { screenId: "25", screenName: "E-District Services" }])
                }, 2000)
              } else if (data.action == "no") {
                this.loadingService.hide();
                this.loadingService.showToast(data.msg, 2000, "danger");
              }
            }, (error: any) => {
              this.loadingService.hide();
              console.log("bearth cert fail ", error)
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
      this.ValidateBirthCertificateForm();
      this.profilePhoto = null;
      this.adharPhoto = null;
      this.adharPhoto = null;
      this.otherPhoto = null;
    }, 1000)
  }


}
