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
  selector: 'app-handicap-pention-form',
  templateUrl: './handicap-pention-form.page.html',
  styleUrls: ['./handicap-pention-form.page.scss'],
})
export class HandicapPentionFormPage implements OnInit {


  handicapPentionForm: FormGroup;
  isSubmited = false;
  getFormName: any;


  areaTypeHeader: any = {
    header: 'जनपद चुने',
  };
  areaTypeHeader2: any = {
    header: 'निवासी चुने',
  };
  genderTypeHeader: any = {
    header: '-- चुनें --',
  };
  casteTypeHeader: any = {
    header: '-- चुनें --',
  };
  voterHeader: any = {
    header: 'पहचान प्रमाण पत्र चुनें',
  };

  handiTypeHeader: any = {
    header: 'दिव्यांगता चुनें ...',
  };

  stateName: any = '';
  districtName: any = '';

  stateId: any = '';
  janpad: any = '';
  area: any = '';
  tahsil: any = '';
  fullName: any = '';
  fatherName: any = '';
  gender: any = '';
  buildingNo: any = '';
  vikashKhand: any = '';
  fullAddress: any = '';
  gramPanchayt: any = '';
  pinCode: any = '';
  caste: any = '';
  subCast: any = '';
  dob: any = '';
  mobileNo: any = '';

  identityType: any = '';
  identityNo: any = '';

  yearIncome: any = '';
  incomeCertificate: any = '';
  bankName: any = '';
  bankBranch: any = '';
  bankAccountNo: any = '';

  handicapType: any = '';
  handicapPercentage: any = '';
  handicapCertificateNo: any = '';
  handicapCertificateDate: any = '';


  profilePhoto: any = null;
  dobPhoto: any = null;
  voterPhoto: any = null;
  incomePhoto: any = null;
  handicapCertificatePhoto: any = null;

  profilePhotoSend: any = null;
  dobPhotoSend: any = null;
  voterPhotoSend: any = null;
  incomePhotoSend: any = null;
  handicapCertificatePhotoSend: any = null;

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
    // console.log("getFormName =", this.getFormName.form_name);
    this.shareData.callStateGlobalApi();
  }
  ngOnInit() {
    this.ValidatehandicapPentionForm();
  }

  ValidatehandicapPentionForm(): void {
    this.handicapPentionForm = this.formBuilder.group(
      {
        stateId: ['', [Validators.required]],
        janpad: ['', [Validators.required]],
        area: ['', [Validators.required]],
        tahsil: ['', [Validators.required]],
        fullName: ['', [Validators.required]],
        fatherName: ['', [Validators.required,]],
        gender: ['', [Validators.required,]],
        buildingNo: ['', [Validators.required,]],
        vikashKhand: ['', [Validators.required,]],
        fullAddress: ['', [Validators.required,]],
        gramPanchayt: ['', [Validators.required,]],
        pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
        caste: ['', [Validators.required,]],
        subCast: ['', [Validators.required,]],
        dob: ['', [Validators.required,]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],

        identityType: ['', [Validators.required,]],
        identityNo: ['', [Validators.required,]],

        yearIncome: ['', [Validators.required,]],
        incomeCertificate: ['', [Validators.required,]],
        bankName: ['', [Validators.required,]],
        bankBranch: ['', [Validators.required,]],
        bankAccountNo: ['', [Validators.required,]],

        handicapType: ['', [Validators.required,]],
        handicapPercentage: ['', [Validators.required,]],
        handicapCertificateNo: ['', [Validators.required,]],
        handicapCertificateDate: ['', [Validators.required,]],
      });


  }

  get errorControl() {
    return this.handicapPentionForm.controls;

  }
  selectState(event: any) {
    this.janpad = "";
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
      }
      if (imageType == 'dobImage') {
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
      }
      if (imageType == 'voterId') {
        if (this.beforeCompressImage < 100000) {
          this.voterPhoto = "data:image/png;base64," + imageData;
          this.voterPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.voterPhoto = "data:image/png;base64," + imageData;
                this.voterPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      }
      if (imageType == 'income') {
        if (this.beforeCompressImage < 100000) {
          this.incomePhoto = "data:image/png;base64," + imageData;
          this.incomePhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.incomePhoto = "data:image/png;base64," + imageData;
                this.incomePhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      } if (imageType == 'handicap') {
        if (this.beforeCompressImage < 100000) {
          this.handicapCertificatePhoto = "data:image/png;base64," + imageData;
          this.handicapCertificatePhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.handicapCertificatePhoto = "data:image/png;base64," + imageData;
                this.handicapCertificatePhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
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
      this.profilePhotoSend = null;
    }
    if (imageType == 'dobImage') {
      this.dobPhoto = null;
      this.dobPhotoSend = null;
    }
    if (imageType == 'voterId') {
      this.voterPhoto = null;
      this.voterPhotoSend = null;
    }
    if (imageType == 'income') {
      this.incomePhoto = null;
      this.incomePhotoSend = null;
    } if (imageType == 'handicap') {
      this.handicapCertificatePhoto = null;
      this.handicapCertificatePhotoSend = null;
    }
  }

  payAndSubmit() {
    this.isSubmited = true;
    if (!this.handicapPentionForm.valid) {
      //console.log(" User update Invalid")
      return false;
    } else if (this.profilePhoto == null) {
      return false;
    } else if (this.dobPhoto == null) {
      return false;
    } else if (this.voterPhoto == null) {
      return false;
    } else if (this.incomePhoto == null) {
      return false;
    } else if (this.handicapCertificatePhoto == null) {
      return false;
    }
    else {
      //console.log("user update valid")
      let handicapPentionParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,

        district: this.districtName,
        area: this.handicapPentionForm.value.area,
        tahsil: this.handicapPentionForm.value.tahsil,
        full_name: this.handicapPentionForm.value.fullName,
        father_name: this.handicapPentionForm.value.fatherName,
        gender: this.handicapPentionForm.value.gender,
        house_no: this.handicapPentionForm.value.buildingNo,
        gali: this.handicapPentionForm.value.vikashKhand,
        full_address: this.handicapPentionForm.value.fullAddress,
        locality: this.handicapPentionForm.value.gramPanchayt,
        pin_code: this.handicapPentionForm.value.pinCode,
        category: this.handicapPentionForm.value.caste,
        subcategory: this.handicapPentionForm.value.subCast,
        dob: this.handicapPentionForm.value.dob,
        mobile_no: this.handicapPentionForm.value.mobileNo,
        id_proff: this.handicapPentionForm.value.identityType,
        id_no: this.handicapPentionForm.value.identityNo,
        income: this.handicapPentionForm.value.yearIncome,
        aay_no: this.handicapPentionForm.value.incomeCertificate,
        bank_name: this.handicapPentionForm.value.bankName,
        bank_branch: this.handicapPentionForm.value.bankBranch,
        acc_no: this.handicapPentionForm.value.bankAccountNo,


        handitype: this.handicapPentionForm.value.handicapType,
        handi_par: this.handicapPentionForm.value.handicapPercentage,
        handi_certi_no: this.handicapPentionForm.value.handicapCertificateNo,
        handi_date: this.handicapPentionForm.value.handicapCertificateDate,

        photo: this.profilePhotoSend,
        birthcertificate: this.dobPhotoSend,
        proff_pdf: this.voterPhotoSend,
        aay_cer: this.incomePhotoSend,
        handi_cer: this.handicapCertificatePhotoSend
      }

      console.log("handicapPentionParams  info =", JSON.stringify(handicapPentionParams))

      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createHandicapPensionForm(handicapPentionParams)
            .subscribe((data: any) => {
              if (data !== null) {
                if (data.action == "yes") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "success");
                  console.log("handicap success ", data)
                  setTimeout(() => {
                    this.router.navigate(['/menu/global-online-form', { screenId: "4", screenName: "UP Govt. Scheme" }]);
                  }, 2000)
                } else if (data.action == "no") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "danger");
                }
              } else if (data == null) {
                this.loadingService.hide();
                this.loadingService.showToast("Server Side Error !!", 2000, "danger");
              }

            }, (error: any) => {
              this.loadingService.hide();
              console.log("handicap fail ", error);
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
      this.ValidatehandicapPentionForm();
      this.profilePhoto = null;
      this.dobPhoto = null;
      this.voterPhoto = null;
      this.incomePhoto = null;
      this.handicapCertificatePhoto = null;
    }, 1000)
  }









}
