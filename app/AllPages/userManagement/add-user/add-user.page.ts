import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';
import { ProtractorExpectedConditions } from 'protractor';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  addNewUserForm: FormGroup;
  isSubmited = false;


  uniqueId: any = '';
  memberName: any = '';
  fatherName: any = '';
  dob: any = '';
  mobileNo: any = '';
  alternateMobNo: any = '';
  email: any = '';
  role: any = '';
  sponsor: any = '';
  adharNo: any = '';
  panNo: any = '';
  qualification: any = '';
  shopName: any = '';
  stateId: any = '';
  districtId: any = '';
  address: any = '';
  notes: any = '';

  profileImage: any = null;
  adharImage: any = null;
  panImage: any = null;

  status: any = '0';
  password: any = '';
  confirmPassword: any = '';

  isRole: boolean = true;
  isState: boolean = true;

  customRoleHeader: any = {
    header: 'Select Role',
  };
  customSponserHeader: any = {
    header: 'Select Sponser',
  };
  customSatateHeader: any = {
    header: 'Select State',
  };
  customQualiHeader: any = {
    header: 'Select Qualification',
  };
  customDistHeader: any = {
    header: 'Select District/City',
  };
  customStatusHeader: any = {
    header: 'Select Status',
  };



  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  constructor(
    private router: Router,
    public platform: Platform,
    private loadingService: LoadingService,
    private shareData: ShareDataService,
    private apiService: ApiService,
    private eventService: EventService,
    public alertController: AlertController,
    private activatedroute: ActivatedRoute,
    public navCtrl: NavController,
    private camera: Camera,
    public actionCtrl: ActionSheetController,
    private formBuilder: FormBuilder,
    private imageCompress: NgxImageCompressService
  ) {
    this.ValidateAddNewUserForm();


  }

  ngOnInit() {
  }

  select_Role(selectedRole: any) {
    this.role = selectedRole.detail.value;
    this.sponsor = "";
    this.isRole = false;
    this.apiService.callSponserApi(this.role)
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.shareData.sponserList = data.sponsor;
          // console.log("splonser = ", this.shareData.sponserList)
          //console.log("isRole = ", this.isRole)
        }
      })

  }
  select_Sponser(selectedSponser: any) {
    this.sponsor = selectedSponser.detail.value;
  }
  select_Qualification(selectedQulif: any) {
    this.qualification = selectedQulif.detail.value;
  }
  select_State(selectedState: any) {
    this.stateId = selectedState.detail.value;
    //console.log("state id in method = ", this.stateId);
    this.districtId = "";
    this.isState = false;
    this.apiService.callDistrictApi(this.stateId)
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.shareData.districtList = data.city;
          console.log("districtList = ", this.shareData.districtList)
        }

      })

  }
  select_District(selectedDist: any) {
    //this.districtId = selectedDist.detail.value;
    //console.log("districtId id in method = ", this.districtId);
  }

  async selectPhoto(imageType: any) {

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
        handler: () => {

        }
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
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,

    }
    this.camera.getPicture(options).then((imageData: string) => {
      // console.log("Image Type =", imageType)
      let temp = "data:image/png;base64," + imageData;
      if (imageType == 'photo') {
        this.imageCompress.compressFile(temp, 10, 10)
          .then((result: any) => {
            let size = this.imageCompress.byteCount(result);
            if (size <= 20000) {
              this.profileImage = result;
            } else if (size > 20000) {
              this.loadingService.showToast("Image should less then 20 Kb.", 2000, 'danger');
            }
          })
          .catch((error: any) => {
          })
      }
      if (imageType == 'aadhar') {
        this.imageCompress.compressFile(temp, 10, 10)
          .then((result: any) => {
            let size = this.imageCompress.byteCount(result);
            if (size <= 20000) {
              this.adharImage = result;
            } else if (size > 20000) {
              this.loadingService.showToast("Image should less then 20 Kb.", 2000, 'danger');
            }
          })
          .catch((error: any) => {
          })
      }
      if (imageType == 'panCard') {
        this.imageCompress.compressFile(temp, 10, 10)
          .then((result: any) => {
            let size = this.imageCompress.byteCount(result);
            if (size <= 20000) {
              this.panImage = result;
            } else if (size > 20000) {
              this.loadingService.showToast("Image should less then 20 Kb.", 2000, 'danger');
            }
          })
          .catch((error: any) => {
          })
      }

    }, (err) => {
      console.log("img err", err);
    });

  }

  getImage(imageType: any) {
    const options: CameraOptions = {
      quality: 10,
      targetWidth: 800,
      targetHeight: 800,
      destinationType: 0,
      encodingType: this.camera.EncodingType.PNG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,

    }
    this.camera.getPicture(options).then((imageData) => {
      let temp = "data:image/png;base64," + imageData;

      if (imageType == 'photo') {
        this.imageCompress.compressFile(temp, 10, 10)
          .then((result: any) => {
            let size = this.imageCompress.byteCount(result);
            if (size <= 20000) {
              this.profileImage = result;
            } else if (size > 20000) {
              this.loadingService.showToast("Image should less then 20 Kb.", 2000, 'danger');
            }
          })
          .catch((error: any) => {
          })
      }
      if (imageType == 'aadhar') {
        this.imageCompress.compressFile(temp, 10, 10)
          .then((result: any) => {
            let size = this.imageCompress.byteCount(result);
            if (size <= 20000) {
              this.adharImage = result;
            } else if (size > 20000) {
              this.loadingService.showToast("Image should less then 20 Kb.", 2000, 'danger');
            }
          })
          .catch((error: any) => {
          })
      }
      if (imageType == 'panCard') {
        this.imageCompress.compressFile(temp, 10, 10)
          .then((result: any) => {
            let size = this.imageCompress.byteCount(result);
            if (size <= 20000) {
              this.panImage = result;
            } else if (size > 20000) {
              this.loadingService.showToast("Image should less then 20 Kb.", 2000, 'danger');
            }
          })
          .catch((error: any) => {
          })
      }
    }, (err) => {
      console.log(err)
    });

  }


  removeImage(imageType: any) {

    if (imageType == 'photo') {
      this.profileImage = null;
    }
    if (imageType == 'aadhar') {
      this.adharImage = null;
    }
    if (imageType == 'panCard') {
      this.panImage = null;
    }
  }


  ValidateAddNewUserForm(): void {
    this.addNewUserForm = this.formBuilder.group(
      {
        //uniqueId: ['', [Validators.required]],
        memberName: ['', [Validators.required]],
        fatherName: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        alternateMobNo: ['', [Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        role: ['', [Validators.required]],
        sponsor: ['', [Validators.required]],
        adharNo: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
        panNo: ['', [Validators.required]],
        qualification: ['', [Validators.required]],
        shopName: ['', [Validators.required]],
        stateId: ['', [Validators.required]],
        districtId: ['', [Validators.required]],
        address: ['', [Validators.required]],
        notes: ['', [Validators.required]],
        status: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(3)],],
        confirmPassword: ['', [Validators.required, Validators.minLength(3)]],

      });


  }

  get errorControl() {
    return this.addNewUserForm.controls;
  }

  addNewUser() {
    if (this.addNewUserForm.value.password == this.addNewUserForm.value.confirmPassword) {
      this.isSubmited = true;
      if (!this.addNewUserForm.valid) {
        console.log("Add User Invalid")
        return false;
      }
      else if (this.profileImage == null) {
        return false;
      }
      else if (this.adharImage == null) {
        return false;
      }
      else if (this.panImage == null) {
        return false;
      }

      else {
        //console.log("user update valid")
        let addUserNew = {
          // uniqueid: this.addNewUserForm.value.uniqueId,
          membername: this.addNewUserForm.value.memberName,
          fathername: this.addNewUserForm.value.fatherName,
          dob: this.addNewUserForm.value.dob,
          phone: this.addNewUserForm.value.mobileNo,
          alternatephone: this.addNewUserForm.value.alternateMobNo,
          email: this.addNewUserForm.value.email,
          role: this.addNewUserForm.value.role,
          sponsor: this.addNewUserForm.value.sponsor,
          adharno: this.addNewUserForm.value.adharNo,
          panno: this.addNewUserForm.value.panNo,
          qualification: this.qualification,
          compshopname: this.addNewUserForm.value.shopName,
          state: this.addNewUserForm.value.stateId,
          district: this.addNewUserForm.value.districtId,
          address: this.addNewUserForm.value.address,
          notes: this.addNewUserForm.value.notes,

          status: this.addNewUserForm.value.status,
          authname: this.shareData.memberDetails.UniqueId,
          password: this.addNewUserForm.value.password,

          photo: this.profileImage,
          adharphoto: this.adharImage,
          shopphoto: this.panImage,

        }

        //alert("Add new  user " + JSON.stringify(addUserNew));
        console.log("Add new user ", JSON.stringify(addUserNew))
        if (this.shareData.memberDetails.UniqueId !== null) {
          this.loadingService.show("Adding New User...")
          this.apiService.callAddNewUserApi(addUserNew)
            .subscribe((data: any) => {
              console.log("add new user response =", data)
              if (data.action == "yes") {
                this.loadingService.hide();
                this.loadingService.showToast(data.msg, 2000, "success");
                const paramData: any = {
                  screenId: "22",
                  screenName: "Users"
                }
                setTimeout(() => {
                  this.router.navigate(['/menu/users', paramData])
                  console.log("add new user response =", data)
                }, 2000)
              } else if (data.action == "no") {
                this.loadingService.hide();
                this.loadingService.showToast(data.msg, 2000, "danger");
              }
            }, (err: any) => {
              this.loadingService.hide();
              this.loadingService.showToast("Server Error !!", 2000, "danger");
            })

        }
      }
    } else {
      this.loadingService.showToast("Confirm Password Did not Match !!", 2000, 'danger');
    }
  }
















}


