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
  selector: 'app-pan-card-form',
  templateUrl: './pan-card-form.page.html',
  styleUrls: ['./pan-card-form.page.scss'],
})
export class PanCardFormPage implements OnInit {


  panCardForm: FormGroup;
  isSubmited = false;
  getFormName: any;

  applicationHeader: any = {
    header: 'Select Form Type',
  };
  stateHeader: any = {
    header: 'Select State',
  };
  districtHeader: any = {
    header: 'Select District',
  };



  stateName: any = '';
  districtName: any = '';

  formType: any = 'form49A';
  existingPanNo: any = '';
  changeInPancard: any = '';
  fullName: any = '';
  fatherName: any = '';
  motherName: any = '';
  dob: any = '';
  mobileNo: any = '';
  emailId: any = '';
  adharNo: any = '';
  pinCode: any = '';
  stateId: any = '';
  districtId: any = '';
  fullAddress: any = '';

  profilePhoto: any = null;
  signPhoto: any = null;
  fileSend: any = null;

  profilePhotoSend: any = null;
  signPhotoSend: any = null;


  isState: boolean = true;
  pdfFileName: any = null;


  fileTransferobj: FileTransferObject;
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

    private fileTransfer: FileTransfer,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private file: File,
    private imageCompress: NgxImageCompressService



  ) {
    this.getFormName = JSON.parse(this.activatedroute.snapshot.paramMap.get('formType'));
    console.log("getFormName =", this.getFormName.form_name)
    this.shareData.callStateGlobalApi();

  }

  ngOnInit() {
    this.ValidatePanCardForm();
  }

  ValidatePanCardForm(): void {
    if (this.formType == 'form49A') {
      this.panCardForm = this.formBuilder.group(
        {
          formType: [this.formType, [Validators.required]],
          fullName: ['', [Validators.required]],
          fatherName: ['', [Validators.required,]],
          motherName: ['', [Validators.required,]],
          dob: ['', [Validators.required]],
          mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
          emailId: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
          adharNo: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
          pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
          stateId: ['', [Validators.required,]],
          districtId: ['', [Validators.required,]],
          fullAddress: ['', [Validators.required,]],
        });

    } else if (this.formType == 'csfPan') {

      this.panCardForm = this.formBuilder.group(
        {
          formType: [this.formType, [Validators.required]],
          existingPanNo: ['', [Validators.required]],
          changeInPancard: ['', [Validators.required,]],
          fullName: ['', [Validators.required]],
          fatherName: ['', [Validators.required,]],
          motherName: ['', [Validators.required,]],
          dob: ['', [Validators.required]],
          mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
          emailId: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
          adharNo: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
          pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
          stateId: ['', [Validators.required,]],
          districtId: ['', [Validators.required,]],
          fullAddress: ['', [Validators.required,]],

        });
    }

  }

  get errorControl() {
    return this.panCardForm.controls;

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
      } if (imageType == 'sign') {
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
    }, (err) => {
      console.log("img err", err);
    });

  }

  removeImage(imageType: any) {
    if (imageType == 'profile') {
      this.profilePhoto = null;
    }
    if (imageType == 'sign') {
      this.signPhoto = null;
    }

  }

  select_formType(event: any) {
    this.formType = event.detail.value;
    //console.log("form type= ", this.formType)
    this.ValidatePanCardForm();
  }

  selectState(event: any) {
    this.districtId = "";
    // console.log("state id =", event.detail.value.state_name);
    this.stateName = event.detail.value.state_name;
    if (event.detail.value.state_id !== "" || event.detail.value.state_id !== null) {
      this.isStateId = false;
      this.shareData.callDistrictGlobalApi(event.detail.value.state_id);
    }
  }
  selectDistrict(event: any) {
    //console.log("district_id =", event.detail.value.city_name);
    this.districtName = event.detail.value.city_name;
  }


  payAndSubmit() {
    this.isSubmited = true;
    if (!this.panCardForm.valid) {
      //console.log(" Invalid")
      return false;
    }
    else if (this.profilePhoto == null) {
      return false;
    } else if (this.signPhoto == null) {
      return false;
    }
    else if (this.fileSend == null) {
      return false;
    }
    else {
      //console.log("valid")

      if (this.panCardForm.value.existingPanNo == undefined) {
        this.panCardForm.value.existingPanNo = "";
        this.panCardForm.value.changeInPancard = "";
      }

      let panCardFormParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,

        type: this.panCardForm.value.formType,
        pan_no: this.panCardForm.value.existingPanNo,
        change_pan: this.panCardForm.value.changeInPancard,

        full_name: this.panCardForm.value.fullName,
        father_name: this.panCardForm.value.fatherName,
        mother_name: this.panCardForm.value.motherName,
        dob: this.panCardForm.value.dob,
        mobile_no: this.panCardForm.value.mobileNo,
        email_id: this.panCardForm.value.emailId,
        adhar_no: this.panCardForm.value.adharNo,
        pin_code: this.panCardForm.value.pinCode,
        state: this.stateName,
        district: this.districtName,
        full_address: this.panCardForm.value.fullAddress,

        photo: this.profilePhotoSend,
        sign: this.signPhotoSend,
        pan_pdf: this.fileSend

      }
      //console.log(" panCardFormParams =", JSON.stringify(panCardFormParams))
      // alert("panCardFormParams =" + JSON.stringify(panCardFormParams))

      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          if (this.shareData.memberDetails.UniqueId !== null) {
            this.apiService.createPanCardForm(panCardFormParams)
              .subscribe((data: any) => {
                if (data.action == "yes") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "success");
                  console.log("pan card success ", data)
                  setTimeout(() => {
                    this.router.navigate(['/menu/global-online-form', { screenId: "3", screenName: "PAN Card Services" }])
                  }, 2000)
                } else if (data.action == "no") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "danger");
                }
              }, (error: any) => {
                this.loadingService.hide();
                console.log("pan card fail ", error)
              })
          }

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
      this.ValidatePanCardForm();
      this.profilePhoto = null;
      this.signPhoto = null;
      this.fileSend = null;
    }, 1000)
  }


  //upload pdf type of file 

  uploadFile() {
    this.fileChooser.open().then((uri: any) => {
      this.filePath.resolveNativePath(uri).then((nativePath: any) => {
        this.fileTransferobj = this.fileTransfer.create();
        let options: FileUploadOptions = {
          fileKey: "pdfFile",
          fileName: "file.pdf",
          chunkedMode: false,
          headers: {},
          mimeType: "pdf"
        }

        let fileSend = {
          "native_path": nativePath,
          "opstions": options
        }
        this.pdfFileName = fileSend.native_path.split('file:///storage/emulated/0/Download/');
        this.fileSend = JSON.stringify(fileSend)
        //alert("file =" + this.fileSend);
        //console.log(this.fileSend)
      }, (err: any) => {
        alert(JSON.stringify(err))

      })

    }, (err: any) => {
      alert(JSON.stringify(err))
    })

  }




}
