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
import { ImageResizer } from '@ionic-native/image-resizer/ngx';
@Component({
  selector: 'app-voter-id-form',
  templateUrl: './voter-id-form.page.html',
  styleUrls: ['./voter-id-form.page.scss'],
})
export class VoterIdFormPage implements OnInit {



  voterIdForm: FormGroup;
  isSubmited = false;
  getFormName: any;

  stateHeader: any = {
    header: 'Select State',
  };
  districtHeader: any = {
    header: 'Select District',
  };
  docHeader: any = {
    header: 'Select Document',
  };
  genderTypeHeader: any = {
    header: 'Select Gender',
  };
  relationHeader: any = {
    header: 'Select Relation',
  };

  stateName: any = '';
  districtName: any = '';

  stateId: any = '';
  districtId: any = '';
  assemblyConstituency: any = '';
  houseNo: any = '';
  documentType1: any = '';
  address: any = '';
  dob: any = '';
  documentType2: any = '';
  fullName: any = '';
  gender: any = '';
  realtiveName: any = '';
  relation: any = '';
  mobileNo: any = '';
  email: any = '';

  profilePhoto: any = null;
  addressPhoto: any = null;
  agePhoto: any = null;
  declerationPhoto: any = null;


  profilePhotoSend: any = null;
  addressPhotoSend: any = null;
  agePhotoSend: any = null;
  declerationPhotoSend: any = null;

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
    this.ValidateVoterIdForm();
  }

  ValidateVoterIdForm(): void {
    this.voterIdForm = this.formBuilder.group(
      {
        stateId: ['', [Validators.required]],
        districtId: ['', [Validators.required]],
        assemblyConstituency: ['', [Validators.required]],
        houseNo: ['', [Validators.required]],
        documentType1: ['', [Validators.required,]],
        address: ['', [Validators.required,]],
        dob: ['', [Validators.required,]],
        documentType2: ['', [Validators.required,]],
        fullName: ['', [Validators.required,]],
        gender: ['', [Validators.required,]],
        realtiveName: ['', [Validators.required,]],
        relation: ['', [Validators.required,]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],

      });


  }

  get errorControl() {
    return this.voterIdForm.controls;

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
      } if (imageType == 'address') {
        if (this.beforeCompressImage < 100000) {
          this.addressPhoto = "data:image/png;base64," + imageData;
          this.addressPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.addressPhoto = "data:image/png;base64," + imageData;
                this.addressPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }

      } if (imageType == 'age') {
        if (this.beforeCompressImage < 100000) {
          this.agePhoto = "data:image/png;base64," + imageData;
          this.agePhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.agePhoto = "data:image/png;base64," + imageData;
                this.agePhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
              } else if (size > 100000) {
                this.loadingService.showToast("Image should less then 100 Kb.", 2000, 'danger');
              }
            })
        }
      } if (imageType == 'deceleration') {
        if (this.beforeCompressImage < 100000) {
          this.declerationPhoto = "data:image/png;base64," + imageData;
          this.declerationPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.declerationPhoto = "data:image/png;base64," + imageData;
                this.declerationPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
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
    if (imageType == 'address') {
      this.addressPhoto = null;
    }
    if (imageType == 'age') {
      this.agePhoto = null;
    }
    if (imageType == 'deceleration') {
      this.declerationPhoto = null;
    }
  }



  payAndSubmit() {
    this.isSubmited = true;
    if (!this.voterIdForm.valid) {
      //console.log("voter id form Invalid")
      return false;
    }
    else if (this.profilePhoto == null) {
      return false;
    } else if (this.addressPhoto == null) {
      return false;
    } else if (this.agePhoto == null) {
      return false;
    } else if (this.declerationPhoto == null) {
      return false;
    }
    else {
      //console.log("voter id form Valid")

      let voterIdParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,

        state: this.stateName,
        district: this.districtName,
        assembly: this.voterIdForm.value.assemblyConstituency,
        houseno: this.voterIdForm.value.houseNo,
        addresstype: this.voterIdForm.value.documentType1,
        full_address: this.voterIdForm.value.address,
        dob: this.voterIdForm.value.dob,
        agetype: this.voterIdForm.value.documentType2,
        full_name: this.voterIdForm.value.fullName,
        gender: this.voterIdForm.value.gender,

        relative_name: this.voterIdForm.value.realtiveName,
        relation: this.voterIdForm.value.relation,

        mobile_no: this.voterIdForm.value.mobileNo,
        email: this.voterIdForm.value.email,

        photo: this.profilePhotoSend,
        addressproof: this.addressPhotoSend,
        ageproof: this.agePhotoSend,
        decelerationform: this.declerationPhotoSend,
      }

      //console.log("voterIdParams  info =", JSON.stringify(voterIdParams))
      //alert("voterIdParams  info =" + JSON.stringify(voterIdParams))

      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createVoterIdCardForm(voterIdParams)
            .subscribe((data: any) => {
              if (data !== null) {
                if (data.action == "yes") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "success");
                  console.log("voter id card success ", data)
                  setTimeout(() => {
                    this.router.navigate(['/menu/global-online-form', { screenId: "5", screenName: "Central Govt. Scheme" }]);
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
              console.log("voter id card fail ", error);
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
      this.ValidateVoterIdForm();
      this.profilePhoto = null;
      this.addressPhoto = null;
      this.agePhoto = null;
      this.declerationPhoto = null;
    }, 1000)
  }





}
