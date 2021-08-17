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
  selector: 'app-family-labh-form',
  templateUrl: './family-labh-form.page.html',
  styleUrls: ['./family-labh-form.page.scss'],
})
export class FamilyLabhFormPage implements OnInit {


  familyLabhForm: FormGroup;
  isSubmited = false;
  getFormName: any;


  areaTypeHeader: any = {
    header: 'जनपद चुने',
  };
  nivasTypeHeader: any = {
    header: '  निवासी चुने ...',
  };
  shreniHeader: any = {
    header: 'श्रेणी चुनें ... ',
  };
  identityHeader: any = {
    header: 'पहचान प्रमाण पत्र चुनें ...',
  };

  selectHeader: any = {
    header: '-- चयन करें --',
  };


  stateName: any = '';
  districtName: any = '';

  stateId: any = '';
  janpad: any = '';
  nivas: any = '';
  tahsil: any = '';
  fullName: any = '';
  fatherName: any = '';
  category: any = '';
  identity: any = '';
  identityCertificateNo: any = '';
  familyYearIncome: any = '';
  incomeCertificateNo: any = '';
  incomeAppNo: any = '';
  bankName: any = '';
  bankBranch: any = '';
  ifscCode: any = '';
  bankAccountNo: any = '';
  mobileNo: any = '';
  deceasedName: any = '';
  deceasedFatherName: any = '';
  deathCertificateNo: any = '';
  deathCertificateIssueDate: any = '';
  deathDate: any = '';
  deathCause: any = '';
  deceasedAge: any = '';
  deceasedBusiness: any = '';
  deceasedRelation: any = '';
  deceasedRelCertificate: any = '';


  profilePhoto: any = null;
  identityPhoto: any = null;
  passbookPhoto: any = null;
  deathCertificatePhoto: any = null;
  incomePhoto: any = null;
  signaturePhoto: any = null;
  deceasedRelPhoto: any = null;


  profilePhotoSend: any = null;
  identityPhotoSend: any = null;
  passbookPhotoSend: any = null;
  deathCertificatePhotoSend: any = null;
  incomePhotoSend: any = null;
  signaturePhotoSend: any = null;
  deceasedRelPhotoSend: any = null;




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
    // console.log("getFormName =", this.getFormName.form_name)
    this.shareData.callStateGlobalApi();
  }

  ngOnInit() {
    this.ValidateFamilyLabhForm();
  }

  ValidateFamilyLabhForm(): void {
    this.familyLabhForm = this.formBuilder.group(
      {
        stateId: ['', [Validators.required]],
        janpad: ['', [Validators.required]],
        nivas: ['', [Validators.required]],
        tahsil: ['', [Validators.required]],
        fullName: ['', [Validators.required]],
        fatherName: ['', [Validators.required,]],
        category: ['', [Validators.required,]],
        identity: ['', [Validators.required,]],
        identityCertificateNo: ['', [Validators.required,]],
        familyYearIncome: ['', [Validators.required,]],
        incomeCertificateNo: ['', [Validators.required,]],
        incomeAppNo: ['', [Validators.required,]],
        bankName: ['', [Validators.required,]],
        bankBranch: ['', [Validators.required,]],
        ifscCode: ['', [Validators.required,]],
        bankAccountNo: ['', [Validators.required,]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        deceasedName: ['', [Validators.required,]],
        deceasedFatherName: ['', [Validators.required,]],
        deathCertificateNo: ['', [Validators.required,]],
        deathCertificateIssueDate: ['', [Validators.required,]],
        deathDate: ['', [Validators.required,]],
        deathCause: ['', [Validators.required,]],
        deceasedAge: ['', [Validators.required,]],
        deceasedBusiness: ['', [Validators.required,]],
        deceasedRelation: ['', [Validators.required,]],
        deceasedRelCertificate: ['', [Validators.required,]],
      });


  }

  get errorControl() {
    return this.familyLabhForm.controls;

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
      } if (imageType == 'deathCertificate') {
        if (this.beforeCompressImage < 100000) {
          this.deathCertificatePhoto = "data:image/png;base64," + imageData;
          this.deathCertificatePhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.deathCertificatePhoto = "data:image/png;base64," + imageData;
                this.deathCertificatePhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      } if (imageType == 'income') {
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
      } if (imageType == 'deceasedRelated') {
        if (this.beforeCompressImage < 100000) {
          this.deceasedRelPhoto = "data:image/png;base64," + imageData;
          this.deceasedRelPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.deceasedRelPhoto = "data:image/png;base64," + imageData;
                this.deceasedRelPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
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
    if (imageType == 'identity') {
      this.identityPhoto = null;
      this.identityPhotoSend = null;
    }
    if (imageType == 'passbook') {
      this.passbookPhoto = null;
      this.passbookPhotoSend = null;
    }
    if (imageType == 'deathCertificate') {
      this.deathCertificatePhoto = null;
      this.deathCertificatePhotoSend = null;
    }
    if (imageType == 'income') {
      this.incomePhoto = null;
      this.incomePhotoSend = null;
    }
    if (imageType == 'signature') {
      this.signaturePhoto = null;
      this.signaturePhotoSend = null;
    }
    if (imageType == 'deceasedRelated') {
      this.deceasedRelPhoto = null;
      this.deceasedRelPhotoSend = null;

    }
  }


  payAndSubmit() {
    this.isSubmited = true;
    if (!this.familyLabhForm.valid) {
      //console.log(" User update Invalid")
      return false;
    } else if (this.profilePhoto == null) {
      return false;
    } else if (this.identityPhoto == null) {
      return false;
    } else if (this.passbookPhoto == null) {
      return false;
    } else if (this.deathCertificatePhoto == null) {
      return false;
    } else if (this.incomePhoto == null) {
      return false;
    } else if (this.signaturePhoto == null) {
      return false;
    } else if (this.deceasedRelPhoto == null) {
      return false;
    }
    else {
      //console.log("user update valid")

      let familyLabhParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,

        district: this.districtName,
        area: this.familyLabhForm.value.nivas,
        tahsil: this.familyLabhForm.value.tahsil,
        full_name: this.familyLabhForm.value.fullName,
        father_name: this.familyLabhForm.value.fatherName,
        category: this.familyLabhForm.value.category,
        id_proff: this.familyLabhForm.value.identity,
        id_no: this.familyLabhForm.value.identityCertificateNo,
        income: this.familyLabhForm.value.familyYearIncome,
        aay_no: this.familyLabhForm.value.incomeCertificateNo,
        avedan_no: this.familyLabhForm.value.incomeAppNo,
        bank_name: this.familyLabhForm.value.bankName,
        bank_branch: this.familyLabhForm.value.bankBranch,
        ifsc_code: this.familyLabhForm.value.ifscCode,
        acc_no: this.familyLabhForm.value.bankAccountNo,
        mobile_no: this.familyLabhForm.value.mobileNo,
        death_name: this.familyLabhForm.value.deceasedName,
        death_father: this.familyLabhForm.value.deceasedFatherName,
        death_cerno: this.familyLabhForm.value.deathCertificateNo,
        death_isudate: this.familyLabhForm.value.deathCertificateIssueDate,
        death_date: this.familyLabhForm.value.deathDate,
        death_reason: this.familyLabhForm.value.deathCause,
        man_age: this.familyLabhForm.value.deceasedAge,
        business: this.familyLabhForm.value.deceasedBusiness,
        death_rele: this.familyLabhForm.value.deceasedRelation,
        praman: this.familyLabhForm.value.deceasedRelCertificate,


        photo: this.profilePhotoSend,
        proff_pdf: this.identityPhotoSend,
        bank_passbook: this.passbookPhotoSend,
        death_certificate: this.deathCertificatePhotoSend,
        aay_cer: this.incomePhotoSend,
        signature: this.signaturePhotoSend,
        pramancertificate: this.deceasedRelPhotoSend,

      }
      console.log("familyLabhParams  info =", familyLabhParams)
      // alert("familyLabhParams  info =" + JSON.stringify(familyLabhParams))


      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createFamilyLabhForm(familyLabhParams)
            .subscribe((data: any) => {
              if (data !== null) {
                if (data.action == "yes") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "success");
                  console.log("family labh success ", data)
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
              console.log("family labh fail ", error);
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
      this.ValidateFamilyLabhForm();
      this.profilePhoto = null;
      this.identityPhoto = null;
      this.passbookPhoto = null;
      this.deathCertificatePhoto = null;
      this.incomePhoto = null;
      this.signaturePhoto = null;
      this.deceasedRelPhoto = null;
    }, 1000)
  }






}
