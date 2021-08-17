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
  selector: 'app-pasport-form',
  templateUrl: './pasport-form.page.html',
  styleUrls: ['./pasport-form.page.scss'],
})
export class PasportFormPage implements OnInit {


  pasPortForm: FormGroup;
  isSubmited = false;
  getFormName: any;

  fullName: any = '';
  fatherName: any = '';
  motherName: any = '';
  dob: any = '';
  supouse_wifeName: any = '';
  mobileNo: any = '';
  emailId: any = '';
  adharNo: any = '';
  appointDate: any = '';
  districtName: any = '';
  policeStation: any = '';
  pinCode: any = '';
  fullAddress: any = '';
  pskName: any = '';

  markSeatImage: any = null;
  adharImage: any = null;
  markSeatImageSend: any = null;
  adharImageSend: any = null;

  beforeCompressImage: any;
  sendAct: any = '';





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
    console.log("getFormName =", this.getFormName.form_name)
  }

  ngOnInit() {
    this.ValidateUserForm();
  }

  ValidateUserForm(): void {
    this.pasPortForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required]],
        fatherName: ['', [Validators.required,]],
        motherName: ['', [Validators.required,]],
        dob: ['', [Validators.required,]],
        supouse_wifeName: ['', [Validators.required,]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        emailId: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        adharNo: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
        appointDate: ['', [Validators.required,]],
        districtName: ['', [Validators.required,]],
        policeStation: ['', [Validators.required,]],
        pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
        fullAddress: ['', [Validators.required,]],
        pskName: ['', [Validators.required,]],

      });


  }

  get errorControl() {
    return this.pasPortForm.controls;

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

      if (imageType == 'markseat') {
        if (this.beforeCompressImage < 20000) {
          this.markSeatImage = "data:image/png;base64," + imageData;
          this.markSeatImageSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 20000) {
          this.imageCompress.compressFile(temp, 90, 20)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              console.log("after compress =", size)
              if (size <= 20000) {
                this.markSeatImage = "data:image/png;base64," + imageData;
                this.markSeatImageSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
                //console.log("profilePhotoSend", this.profilePhotoSend)
              } else if (size > 20000) {
                this.loadingService.showToast("Image should less then 20 Kb.", 2000, 'danger');
              }
            })
        }
      } if (imageType == 'adhar') {
        if (this.beforeCompressImage < 100000) {
          this.adharImage = "data:image/png;base64," + imageData;
          this.adharImageSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.adharImage = "data:image/png;base64," + imageData;
                this.adharImageSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
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
    if (imageType == 'markseat') {
      this.markSeatImage = null;
    }
    if (imageType == 'adhar') {
      this.adharImage = null;
    }

  }

  payAndSubmit() {
    this.isSubmited = true;
    if (!this.pasPortForm.valid) {
      console.log(" User update Invalid")
      return false;
    } else if (this.markSeatImage == null) {
      return false;
    }
    else if (this.adharImage == null) {
      return false;
    }
    else {
      //console.log("user update valid")
      let pasportParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,

        full_name: this.pasPortForm.value.fullName,
        father_name: this.pasPortForm.value.fatherName,
        mother_name: this.pasPortForm.value.motherName,
        dob: this.pasPortForm.value.dob,
        wife_name: this.pasPortForm.value.supouse_wifeName,
        mobile_no: this.pasPortForm.value.mobileNo,
        email_id: this.pasPortForm.value.emailId,
        adhar_no: this.pasPortForm.value.adharNo,
        app_date: this.pasPortForm.value.appointDate,
        distt_name: this.pasPortForm.value.districtName,
        police_station: this.pasPortForm.value.policeStation,
        pin_code: this.pasPortForm.value.pinCode,
        full_address: this.pasPortForm.value.fullAddress,
        psk_name: this.pasPortForm.value.pskName,

        aadhar: this.adharImageSend,
        marksheet: this.markSeatImageSend

      }

      //console.log(this.getFormName.form_name + " info =", pasportParams)
      //alert(this.getFormName.form_name + " info =" + JSON.stringify(pasportParams))

      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {

          if (this.getFormName.form_name == "Fresh 18 Year Above") {
            this.sendAct = "passport_fresh";
          } else if (this.getFormName.form_name == "Miner") {
            this.sendAct = "passport_miner";
          } else if (this.getFormName.form_name == "Passport Renew/Lost/Exist/ Expired") {
            this.sendAct = "passport_renew";
          }

          this.apiService.createPassportSevaForm(this.sendAct, pasportParams)
            .subscribe((data: any) => {
              if (data !== null) {
                if (data.action == "yes") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "success");
                  console.log("passpost success ", data)
                  setTimeout(() => {
                    this.router.navigate(['/menu/global-online-form', { screenId: "29", screenName: "Passport Seva" }]);
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
              console.log("passport fail ", error);
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
      this.ValidateUserForm();
      this.markSeatImage = null;
      this.adharImage = null;
    }, 1000)
  }



}
