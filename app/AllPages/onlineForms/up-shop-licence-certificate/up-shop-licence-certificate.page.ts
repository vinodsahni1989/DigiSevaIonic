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
  selector: 'app-up-shop-licence-certificate',
  templateUrl: './up-shop-licence-certificate.page.html',
  styleUrls: ['./up-shop-licence-certificate.page.scss'],
})
export class UpShopLicenceCertificatePage implements OnInit {

  upShopLicenceForm: FormGroup;
  isSubmited = false;
  getFormName: any;

  catHeader: any = {
    header: 'Select Category',
  };
  selectEmpHeader: any = {
    header: 'Select No of Employee',
  };

  shopCategory: any = '';
  firmOfficeShopName: any = '';
  noOfEmployee: any = '';
  shopOpenDate: any = '';
  ownerName: any = '';
  fatherName: any = '';
  mobileNo: any = '';
  email: any = '';
  adharNo: any = '';
  panNumber: any = '';
  officeShopAddress: any = '';
  ownerAddress: any = '';


  adharPhoto: any = null;
  pancardPhoto: any = null;
  adharPhotoSend: any = null;
  pancardPhotoSend: any = null;
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
  }

  ngOnInit() {
    this.ValidateUPShopLicenceForm();
  }

  ValidateUPShopLicenceForm(): void {
    this.upShopLicenceForm = this.formBuilder.group(
      {
        shopCategory: ['', [Validators.required]],
        firmOfficeShopName: ['', [Validators.required]],
        noOfEmployee: ['', [Validators.required]],
        shopOpenDate: ['', [Validators.required]],
        ownerName: ['', [Validators.required,]],
        fatherName: ['', [Validators.required,]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        adharNo: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
        panNumber: ['', [Validators.required,]],
        officeShopAddress: ['', [Validators.required,]],
        ownerAddress: ['', [Validators.required,]],
      });

  }

  get errorControl() {
    return this.upShopLicenceForm.controls;

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
      if (imageType == 'adhar') {
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
      }
    }, (err) => {
      console.log("img err", err);
    });

  }

  removeImage(imageType: any) {
    if (imageType == 'adhar') {
      this.adharPhoto = null;
    }
    if (imageType == 'pancard') {
      this.pancardPhoto = null;
    }

  }


  payAndSubmit() {
    this.isSubmited = true;
    if (!this.upShopLicenceForm.valid) {
      //console.log("voter id form Invalid")
      return false;
    }
    else if (this.adharPhoto == null) {
      return false;
    } else if (this.pancardPhoto == null) {
      return false;
    }
    else {
      //console.log("voter id form Valid")
      let UpShopLicenceParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,


        shop_type: this.upShopLicenceForm.value.shopCategory,
        shop_name: this.upShopLicenceForm.value.firmOfficeShopName,
        no_emp: this.upShopLicenceForm.value.noOfEmployee,
        open_date: this.upShopLicenceForm.value.shopOpenDate,
        full_name: this.upShopLicenceForm.value.ownerName,
        father_name: this.upShopLicenceForm.value.fatherName,
        mobile_no: this.upShopLicenceForm.value.mobileNo,
        email_id: this.upShopLicenceForm.value.email,
        adhar_no: this.upShopLicenceForm.value.adharNo,
        pan_no: this.upShopLicenceForm.value.panNumber,
        shop_address: this.upShopLicenceForm.value.officeShopAddress,
        full_address: this.upShopLicenceForm.value.ownerAddress,

        aadhar_card: this.adharPhotoSend,
        pan_card: this.pancardPhotoSend,

      }

      console.log("UpShopLicenceParams  info =", UpShopLicenceParams)
      //alert("UpShopLicenceParams  info =" + JSON.stringify(UpShopLicenceParams)
      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createUPShopLicenseForm(UpShopLicenceParams)
            .subscribe((data: any) => {
              if (data !== null) {
                if (data.action == "yes") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "success");
                  console.log("shop licence success ", data)
                  setTimeout(() => {
                    this.router.navigate(['/menu/global-online-form', { screenId: "9", screenName: "Shop Act License" }]);
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
              console.log("shop licence fail ", error);
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
      this.ValidateUPShopLicenceForm();
      this.adharPhoto = null;
      this.pancardPhoto = null;
    }, 1000)
  }










}
