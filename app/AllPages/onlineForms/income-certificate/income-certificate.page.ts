import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-income-certificate',
  templateUrl: './income-certificate.page.html',
  styleUrls: ['./income-certificate.page.scss'],
})
export class IncomeCertificatePage implements OnInit {



  incomeForm: FormGroup;
  isSubmited = false;
  getFormName: any;


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

  business: any = '';
  familyMemberNo: any = '';
  yearIncome: any = '';
  incomeFromLabor: any = '';
  incomeFromFiled: any = '';
  incomeFromPension: any = '';
  incomeFromService: any = '';
  personalIncome: any = '';

  permanentAddress: any = '';
  tahsil: any = '';
  policeStation: any = '';
  needOfIncomeCertificate: any = '';
  prevIncomeCertificateSatus: any = '';

  profilePhoto: any = null;
  selfPhoto: any = null;
  adharPhoto: any = null;
  otherPhoto: any = null;

  profilePhotoSend: any = null;
  selfPhotoSend: any = null;
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
    this.ValidateIncomeCertificateForm();
  }

  ValidateIncomeCertificateForm(): void {
    this.incomeForm = this.formBuilder.group(
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
        business: ['', [Validators.required,]],
        familyMemberNo: ['', [Validators.required,]],
        yearIncome: ['', [Validators.required]],
        incomeFromLabor: ['', [Validators.required,]],
        incomeFromFiled: ['', [Validators.required,]],
        incomeFromPension: ['', [Validators.required,]],
        incomeFromService: ['', [Validators.required,]],
        personalIncome: ['', [Validators.required,]],
        permanentAddress: ['', [Validators.required,]],
        tahsil: ['', [Validators.required,]],
        policeStation: ['', [Validators.required,]],
        needOfIncomeCertificate: ['', [Validators.required]],
        prevIncomeCertificateSatus: ['', [Validators.required,]],

      });
  }

  get errorControl() {
    return this.incomeForm.controls;

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
      console.log("img err", err);
    });

  }

  removeImage(imageType: any) {
    if (imageType == 'profile') {
      this.profilePhoto = null;
    }
    if (imageType == 'self') {
      this.selfPhoto = null;
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
    if (!this.incomeForm.valid) {
      //console.log(" User update Invalid")
      return false;
    } else if (this.profilePhoto == null) {
      return false;
    } else if (this.selfPhoto == null) {
      return false;
    }
    else if (this.adharPhoto == null) {
      return false;
    }
    else {
      // console.log("user update valid")

      let incomeCertificateParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,


        stateId: this.stateName,
        district: this.districtName,
        nivash: this.incomeForm.value.address,
        full_name: this.incomeForm.value.fullName,
        ptype: this.incomeForm.value.fatherHusbandType,
        pname: this.incomeForm.value.fatherHusbandName,
        mother_name: this.incomeForm.value.motherName,
        dob: this.incomeForm.value.dob,
        adhar_no: this.incomeForm.value.adharNo,
        mobile_no: this.incomeForm.value.mobileNo,
        business: this.incomeForm.value.business,
        persons: this.incomeForm.value.familyMemberNo,
        income: this.incomeForm.value.yearIncome,

        unexpert_income: this.incomeForm.value.incomeFromLabor,
        expert_income: this.incomeForm.value.incomeFromFiled,
        pension_income: this.incomeForm.value.incomeFromPension,
        sevayojna_income: this.incomeForm.value.incomeFromService,
        business_income: this.incomeForm.value.personalIncome,

        address: this.incomeForm.value.permanentAddress,
        tahsil: this.incomeForm.value.tahsil,
        thana: this.incomeForm.value.policeStation,
        reason: this.incomeForm.value.needOfIncomeCertificate,
        previous_issue: this.incomeForm.value.prevIncomeCertificateSatus,

        photo: this.profilePhotoSend,
        sw_pramanit: this.selfPhotoSend,
        other_card: this.adharPhotoSend,
        other: this.otherPhotoSend,

      }

      console.log("incomeCertificateParams  info =", incomeCertificateParams)
      //alert("incomeCertificateParams  info =" + JSON.stringify(incomeCertificateParams))

      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createIncomeCertificateForm(incomeCertificateParams)
            .subscribe((data: any) => {
              if (data.action == "yes") {
                this.loadingService.hide();
                this.loadingService.showToast(data.msg, 2000, "success");
                console.log("income success ", data)
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
              console.log("income fail ", error)
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
      this.ValidateIncomeCertificateForm();
      this.profilePhoto = null;
      this.selfPhoto = null;
      this.adharPhoto = null;
      this.otherPhoto = null;
    }, 1000)
  }

}
