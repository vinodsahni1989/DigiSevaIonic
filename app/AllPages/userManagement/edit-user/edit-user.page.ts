import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {




  userForm: FormGroup;
  isSubmited = false;
  private isDisabled: boolean = true;

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

  profileImageSend: any = null;
  adharImageSend: any = null;
  panImageSend: any = null;


  profileImageApi: any = null;
  adharImageApi: any = null;
  panImageApi: any = null;
  status: any = '0';

  beforeCompressImage: any;



  editMember: any;
  imageBaseUrl: any = 'http://digisevakendra.com/admin/uploads/';

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


  roleList: any;
  sponserList: any;
  stateList: any;
  districtList: any;



  getdata: any;


  constructor(
    private router: Router,
    public platform: Platform,
    private storage: Storage,
    private formBuilder: FormBuilder,
    public actionCtrl: ActionSheetController,
    private camera: Camera,
    private apiService: ApiService,
    private eventService: EventService,
    private activatedroute: ActivatedRoute,
    private shareData: ShareDataService,
    private loadingService: LoadingService,
    private navController: NavController,
    private imageCompress: NgxImageCompressService

  ) {

    let edit_Member = this.activatedroute.snapshot.paramMap.get('sendEditMember');
    this.editMember = JSON.parse(edit_Member);
    console.log("edit member=", this.editMember)
    this.role = this.editMember.UserRoleUId;
    this.sponsor = this.editMember.sponsor;
    this.stateId = this.editMember.state_id
    this.districtId = this.editMember.city_id;
    this.ValidateUserForm();

  }

  async ngOnInit() {
    await this.storage.create();
  }

  ValidateUserForm(): void {
    this.userForm = this.formBuilder.group(
      {
        uniqueId: [this.editMember.UniqueId, [Validators.required]],
        memberName: [this.editMember.MemberName, [Validators.required]],
        fatherName: [this.editMember.FatherName, [Validators.required]],
        dob: [this.editMember.Dob, [Validators.required]],
        mobileNo: [this.editMember.Phone, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        alternateMobNo: [this.editMember.AlternatePhone, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        email: [this.editMember.Email, Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        role: [this.editMember.UserRoleUId, [Validators.required]],
        sponsor: [this.editMember.sponsor, [Validators.required]],
        adharNo: [this.editMember.AdharNumber, [Validators.required]],
        panNo: [this.editMember.PANNumber, [Validators.required]],
        qualification: [this.editMember.Qualification, [Validators.required]],
        shopName: [this.editMember.CompanyShopName, [Validators.required]],

        stateId: [this.editMember.stateId, [Validators.required]],
        districtId: [this.editMember.districtId, [Validators.required]],

        address: [this.editMember.Address, [Validators.required]],
        notes: [this.editMember.Notes, [Validators.required]],

        status: [this.editMember.status, [Validators.required]],

      });

    this.profileImageApi = this.imageBaseUrl + this.editMember.Photo
    this.adharImageApi = this.imageBaseUrl + this.editMember.AdharCardPhoto
    this.panImageApi = this.imageBaseUrl + this.editMember.ShopPhoto
  }

  get errorControl() {
    return this.userForm.controls;

  }

  select_Role(selectedRole: any) {
    this.role = selectedRole.detail.value;
  }
  select_Sponser(selectedSponser: any) {
    this.sponsor = selectedSponser.detail.value;
  }
  select_Qualification(selectedQulif: any) {
    this.qualification = selectedQulif.detail.value;
  }
  select_State(selectedState: any) {
    // this.stateId = selectedState.detail.value;
    //console.log("state id in method = ", this.stateId);
    this.districtId = "";
    this.apiService.callDistrictApi(this.stateId)
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.shareData.districtList = data.city;
          //console.log("districtList = ", this.districtList)
        }

      })

  }
  select_District(selectedDist: any) {
    //this.districtId = selectedDist.detail.value;
    // console.log("districtId id in method = ", this.districtId);
  }
  select_Status(selectedstatus: any) {
    this.status = selectedstatus.detail.value;
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

      if (imageType == 'photo') {
        if (this.beforeCompressImage < 20000) {
          this.profileImage = "data:image/png;base64," + imageData;
          this.profileImageSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 20000) {
          this.imageCompress.compressFile(temp, 90, 20)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              console.log("after compress =", size)
              if (size <= 20000) {
                this.profileImage = "data:image/png;base64," + imageData;
                this.profileImageSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
                //console.log("profilePhotoSend", this.profilePhotoSend)
              } else if (size > 20000) {
                this.loadingService.showToast("Image should less then 20 Kb.", 2000, 'danger');
              }
            })
        }
      }
      if (imageType == 'aadhar') {
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
      if (imageType == 'panCard') {
        if (this.beforeCompressImage < 100000) {
          this.panImage = "data:image/png;base64," + imageData;
          this.panImageSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.panImage = "data:image/png;base64," + imageData;
                this.panImageSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
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
    if (imageType == 'photo') {
      this.profileImage = null;
      this.profileImageApi = null;
    }
    if (imageType == 'aadhar') {
      this.adharImage = null;
      this.adharImageApi = null;
    }
    if (imageType == 'panCard') {
      this.panImage = null;
      this.panImageApi = null;
    }
  }




  updateUser() {
    this.isSubmited = true;
    if (!this.userForm.valid) {
      console.log(" User update Invalid")
      return false;
    } else {
      //console.log("user update valid")

      if (this.districtId == "") {
        this.districtId = this.editMember.District
      }

      if (this.profileImage == null) {
        this.profileImageSend = this.editMember.Photo

      }

      if (this.adharImage == null) {
        this.adharImageSend = this.editMember.AdharCardPhoto

      }

      if (this.panImage == null) {
        this.panImageSend = this.editMember.ShopPhoto
      }


      let updateInfo = {
        uniqueid: this.userForm.value.uniqueId,
        membername: this.userForm.value.memberName,
        fathername: this.userForm.value.fatherName,
        dob: this.userForm.value.dob,
        phone: this.userForm.value.mobileNo,
        alternatephone: this.userForm.value.alternateMobNo,
        email: this.userForm.value.email,
        role: this.userForm.value.role,
        sponsor: this.userForm.value.sponsor,
        adharno: this.userForm.value.adharNo,
        panno: this.userForm.value.panNo,
        qualification: this.userForm.value.qualification,
        compshopname: this.userForm.value.shopName,
        state: this.userForm.value.stateId,
        district: this.userForm.value.districtId,
        address: this.userForm.value.address,
        notes: this.userForm.value.notes,


        photo: this.profileImageSend,
        adharphoto: this.adharImageSend,
        shopphoto: this.panImageSend,

        status: this.status,
        authname: "authname",


      }

      //alert("update user " + JSON.stringify(updateInfo));
      console.log("update user ", JSON.stringify(updateInfo))
      const paramData: any = {
        screenId: "22",
        screenName: "Users"
      }
      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Updating...");
        this.apiService.callUpdateUserApi(updateInfo)
          .subscribe((data: any) => {
            if (data.action = "yes") {
              this.loadingService.hide();
              this.loadingService.showToast(data.msg, 2000, "success");
              console.log("update user response =", data)
              setTimeout(() => {
                this.router.navigate(['/menu/users', paramData])
              }, 2000)
            } else if (data.action == "no") {
              this.loadingService.hide();
              this.loadingService.showToast(data.msg, 2000, "danger");
            }
          }, (err: any) => {
            this.loadingService.hide();
            this.loadingService.showToast("Server Error", 2000, "danger");
            console.log("update user err =", err)
          })

      }
    }

  }

}
