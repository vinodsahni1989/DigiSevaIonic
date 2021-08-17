import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-pvc-card-service',
  templateUrl: './pvc-card-service.page.html',
  styleUrls: ['./pvc-card-service.page.scss'],
})
export class PvcCardServicePage implements OnInit {

  pvcCardForm: FormGroup;
  isSubmited = false;
  getFormName: any;

  applicationHeader: any = {
    header: 'Select Delivery Type',
  };

  applicantName: any = '';
  mobileNo: any = '';
  email: any = '';
  whatPrint: any = '';
  deliveryAddress: any = '';
  shopName: any = '';
  pinCode: any = '';
  pdfPass: any = '';
  deliveryType: any = '';

  designDocument: any = null;
  designDocumentSend: any = null;

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

    private fileTransfer: FileTransfer,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private file: File,
    private imageCompress: NgxImageCompressService



  ) {
    this.getFormName = JSON.parse(this.activatedroute.snapshot.paramMap.get('formType'));
    // console.log("getFormName =", this.getFormName.form_name)

  }

  ngOnInit() {
    this.ValidatePVCCardForm();
  }

  ValidatePVCCardForm(): void {
    this.pvcCardForm = this.formBuilder.group(
      {
        applicantName: ['', [Validators.required]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        whatPrint: ['', [Validators.required]],
        deliveryAddress: ['', [Validators.required]],
        shopName: ['', [Validators.required]],
        pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
        pdfPass: ['',],
        deliveryType: ['', [Validators.required,]],
      });

  }

  get errorControl() {
    return this.pvcCardForm.controls;

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

      if (imageType == 'designDoc') {
        if (this.beforeCompressImage < 100000) {
          this.designDocument = "data:image/png;base64," + imageData;
          this.designDocumentSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.designDocument = "data:image/png;base64," + imageData;
                this.designDocumentSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
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
    if (imageType == 'designDoc') {
      this.designDocument = null;
    }

  }

  payAndSubmit() {
    this.isSubmited = true;
    if (!this.pvcCardForm.valid) {
      //console.log(" Invalid")
      return false;
    }
    else if (this.designDocument == null) {
      return false;
    }
    else {
      //console.log("valid")
      let PVCCardFormParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,

        full_name: this.pvcCardForm.value.applicantName,
        mobile_no: this.pvcCardForm.value.mobileNo,
        email_id: this.pvcCardForm.value.email,
        print: this.pvcCardForm.value.whatPrint,
        full_address: this.pvcCardForm.value.deliveryAddress,
        shop_name: this.pvcCardForm.value.shopName,
        pin_code: this.pvcCardForm.value.pinCode,
        pdf_pass: this.pvcCardForm.value.pdfPass,
        deli_type: this.pvcCardForm.value.deliveryType,

        design: this.designDocumentSend,


      }
      console.log(" PVCCardFormParams =", PVCCardFormParams)
      // alert("PVCCardFormParams =" + JSON.stringify(PVCCardFormParams))

      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createPVCCardForm(PVCCardFormParams)
            .subscribe((data: any) => {
              if (data.action == "yes") {
                this.loadingService.hide();
                this.loadingService.showToast(data.msg, 2000, "success");
                console.log("pvc card success ", data)
                setTimeout(() => {
                  this.router.navigate(['/menu/global-online-form', { screenId: "8", screenName: "PVC Card Services" }])
                }, 2000)
              } else if (data.action == "no") {
                this.loadingService.hide();
                this.loadingService.showToast(data.msg, 2000, "danger");
              }
            }, (error: any) => {
              this.loadingService.hide();
              console.log("pvc card fail ", error)
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
      this.ValidatePVCCardForm();
      this.designDocument = null;
    }, 1000)
  }







}
