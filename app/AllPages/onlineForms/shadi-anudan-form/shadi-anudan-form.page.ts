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
  selector: 'app-shadi-anudan-form',
  templateUrl: './shadi-anudan-form.page.html',
  styleUrls: ['./shadi-anudan-form.page.scss'],
})
export class ShadiAnudanFormPage implements OnInit {

  shadiAnudanForm: FormGroup;
  isSubmited = false;
  getFormName: any;

  shreniHeader: any = {
    header: 'श्रेणी चुनें ... ',
  };

  areaTypeHeader: any = {
    header: 'जनपद चुने',
  };


  category: any = '';
  subCaste: any = '';
  marrigeDate: any = '';
  stateName: any = '';
  districtName: any = '';
  stateId: any = '';
  janpad: any = '';
  tahsil: any = '';
  block: any = '';
  fullAddress: any = '';
  pinCode: any = '';
  fullName: any = '';
  fatherName: any = '';
  mobileNo: any = '';
  daughterName: any = '';
  casteCertificateNo: any = '';
  daughterDob: any = '';
  bridesmaidName: any = '';
  bridesmaidAge: any = '';
  bridesmaidAddress: any = '';
  incomeCertificate: any = '';
  bankName: any = '';
  bankBranch: any = '';
  bankAccountNo: any = '';

  profilePhoto: any = null;
  daughterPhoto: any = null;
  incomePhoto: any = null;
  daughterAgePhoto: any = null;
  marrigeCardPhoto: any = null;
  passbookPhoto: any = null;
  adharVoterPhoto: any = null;

  profilePhotoSend: any = null;
  daughterPhotoSend: any = null;
  incomePhotoSend: any = null;
  daughterAgePhotoSend: any = null;
  marrigeCardPhotoSend: any = null;
  passbookPhotoSend: any = null;
  adharVoterPhotoSend: any = null;

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
    this.ValidateShadiAnudanForm();
  }

  ValidateShadiAnudanForm(): void {
    this.shadiAnudanForm = this.formBuilder.group(
      {
        category: ['', [Validators.required]],
        subCaste: ['', [Validators.required]],
        marrigeDate: ['', [Validators.required]],
        stateId: ['', [Validators.required]],
        janpad: ['', [Validators.required]],
        tahsil: ['', [Validators.required]],
        block: ['', [Validators.required]],
        fullAddress: ['', [Validators.required,]],
        pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
        fullName: ['', [Validators.required]],
        fatherName: ['', [Validators.required,]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        daughterName: ['', [Validators.required,]],
        casteCertificateNo: ['', [Validators.required,]],
        daughterDob: ['', [Validators.required,]],
        bridesmaidName: ['', [Validators.required,]],
        bridesmaidAge: ['', [Validators.required,]],
        bridesmaidAddress: ['', [Validators.required,]],
        incomeCertificate: ['', [Validators.required,]],
        bankName: ['', [Validators.required,]],
        bankBranch: ['', [Validators.required,]],
        bankAccountNo: ['', [Validators.required,]],
      });


  }

  get errorControl() {
    return this.shadiAnudanForm.controls;

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
      } if (imageType == 'daughter') {
        if (this.beforeCompressImage < 100000) {
          this.daughterPhoto = "data:image/png;base64," + imageData;
          this.daughterPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.daughterPhoto = "data:image/png;base64," + imageData;
                this.daughterPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
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
      } if (imageType == 'daughter_Age') {
        if (this.beforeCompressImage < 100000) {
          this.daughterAgePhoto = "data:image/png;base64," + imageData;
          this.daughterAgePhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.daughterAgePhoto = "data:image/png;base64," + imageData;
                this.daughterAgePhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      }
      if (imageType == 'marrigeCard') {
        if (this.beforeCompressImage < 100000) {
          this.marrigeCardPhoto = "data:image/png;base64," + imageData;
          this.marrigeCardPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.marrigeCardPhoto = "data:image/png;base64," + imageData;
                this.marrigeCardPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      }
      if (imageType == 'passbook') {
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
      }
      if (imageType == 'adharVoter') {
        if (this.beforeCompressImage < 100000) {
          this.adharVoterPhoto = "data:image/png;base64," + imageData;
          this.adharVoterPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.adharVoterPhoto = "data:image/png;base64," + imageData;
                this.adharVoterPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
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
      this.profilePhotoSend = null;
    }
    if (imageType == 'daughter') {
      this.daughterPhoto = null;
      this.daughterPhotoSend = null;
    }
    if (imageType == 'income') {
      this.incomePhoto = null;
      this.incomePhotoSend = null;
    } if (imageType == 'daughter_Age') {
      this.daughterAgePhoto = null;
      this.daughterAgePhotoSend = null;
    }
    if (imageType == 'marrigeCard') {
      this.marrigeCardPhoto = null;
      this.marrigeCardPhotoSend = null;
    }
    if (imageType == 'passbook') {
      this.passbookPhoto = null;
      this.passbookPhotoSend = null;
    }
    if (imageType == 'adharVoter') {
      this.adharVoterPhoto = null;
      this.adharVoterPhotoSend = null;
    }
  }


  payAndSubmit() {
    this.isSubmited = true;
    if (!this.shadiAnudanForm.valid) {
      //console.log(" User update Invalid")
      return false;
    } else if (this.profilePhoto == null) {
      return false;
    } else if (this.daughterPhoto == null) {
      return false;
    } else if (this.daughterAgePhoto == null) {
      return false;
    } else if (this.marrigeCardPhoto == null) {
      return false;
    } else if (this.passbookPhoto == null) {
      return false;
    } else if (this.adharVoterPhoto == null) {
      return false;
    }
    else {
      //console.log("user update valid")
      let shadiAnudanParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,

        category: this.shadiAnudanForm.value.category,
        subcategory: this.shadiAnudanForm.value.subCaste,
        mari_date: this.shadiAnudanForm.value.marrigeDate,
        district: this.districtName,
        tahsil: this.shadiAnudanForm.value.tahsil,
        block: this.shadiAnudanForm.value.block,
        full_address: this.shadiAnudanForm.value.fullAddress,

        pin_code: this.shadiAnudanForm.value.pinCode,

        full_name: this.shadiAnudanForm.value.fullName,
        father_name: this.shadiAnudanForm.value.fatherName,
        mobile_no: this.shadiAnudanForm.value.mobileNo,
        girl_name: this.shadiAnudanForm.value.daughterName,
        jati_no: this.shadiAnudanForm.value.casteCertificateNo,
        girl_dob: this.shadiAnudanForm.value.daughterDob,
        var_name: this.shadiAnudanForm.value.bridesmaidName,
        var_age: this.shadiAnudanForm.value.bridesmaidAge,
        var_add: this.shadiAnudanForm.value.bridesmaidAddress,
        aay_no: this.shadiAnudanForm.value.incomeCertificate,
        bank_name: this.shadiAnudanForm.value.bankName,
        bank_branch: this.shadiAnudanForm.value.bankBranch,
        acc_no: this.shadiAnudanForm.value.bankAccountNo,


        photo: this.profilePhotoSend,
        girl_photo: this.daughterPhotoSend,
        aay_cer: this.incomePhotoSend,
        parivar_nakal: this.daughterAgePhotoSend,
        mari_card: this.marrigeCardPhotoSend,
        bank_passbook: this.passbookPhotoSend,
        aadhar_card: this.adharVoterPhotoSend,

      }

      console.log("shadiAnudanParams  info =", shadiAnudanParams)
      // alert("shadiAnudanParams  info =" + JSON.stringify(shadiAnudanParams))
      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createShadiAnudanForm(shadiAnudanParams)
            .subscribe((data: any) => {
              if (data !== null) {
                if (data.action == "yes") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "success");
                  console.log("shadi anudan success ", data)
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
              console.log("shadi anudan fail ", error);
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
      this.ValidateShadiAnudanForm();
      this.profilePhoto = null;
      this.daughterPhoto = null;
      this.incomePhoto = null;
      this.daughterAgePhoto = null;
      this.marrigeCardPhoto = null;
      this.passbookPhoto = null;
      this.adharVoterPhoto = null;
    }, 1000)
  }





}
