import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-ration-card-form',
  templateUrl: './ration-card-form.page.html',
  styleUrls: ['./ration-card-form.page.scss'],
})
export class RationCardFormPage implements OnInit {


  applicationHeader: any = {
    header: 'Application For',
  };
  cardTypeHeader: any = {
    header: 'कार्ड के प्रकार',
  };
  areaTypeHeader: any = {
    header: 'क्षेत्र चुने',
  };
  distTypeHeader: any = {
    header: 'जिला चुने',
  };
  classTypeHeader: any = {
    header: 'वर्ग',
  };
  genderTypeHeader: any = {
    header: '-- चुनें --',
  };


  rationForm: FormGroup;
  isSubmited = false;
  isSubmited2 = false;
  getFormName: any;


  applicationFor: any = 'newApplication';
  rationCardNo: any = '';
  changeInRation: any = '';
  rationCardType: any = '';
  area: any = '';
  stateId: any = '';
  districtId: any = '';
  developPart: any = '';
  tahsil: any = '';
  villagePanchayat: any = '';
  pinCode: any = '';
  fullAddress: any = '';
  fullName: any = '';
  father_name: any = '';
  husbandName: any = '';
  motherName: any = '';
  category: any = '';
  dob: any = '';
  gender: any = '';
  business: any = '';
  mobileNo: any = '';
  emailId: any = '';
  voterId: any = '';
  adharNo: any = '';
  gasConnectionStatus: any = '';
  gasConnectionType: any = '';
  gasConsumerNo: any = '';
  gasAgencyName: any = '';
  kotedarName: any = '';
  yearIncome: any = '';
  elecConnectionStatus: any = '';
  elecConsumerNo: any = '';
  bankName: any = '';
  bankBranch: any = '';
  bankIfsc: any = '';
  bankAccountNo: any = '';


  profilePhoto: any = null;
  passbookPhoto: any = null;
  adharPhoto: any = null;
  incomePhoto: any = null;

  profilePhotoSend: any = null;
  passbookPhotoSend: any = null;
  adharPhotoSend: any = null;
  incomePhotoSend: any = null;

  isGagConection: boolean = true;
  isElecConection: boolean = true;


  //=======================================

  memberRowForm: FormGroup;
  totalMemberRow: any;

  memberName: any = '';
  fatherName: any = '';
  memberRelation: any = '';
  memberDob: any = '';
  memberAdharNo: any = '';


  myForm: FormGroup;
  playerCount: number = 1;
  memberArray: any = [];
  memberArray1: any = [];
  memberArray2: any = [];
  memberArray3: any = [];
  memberArray4: any = [];
  memberArray5: any = [];
  memberArray6: any = [];
  memberArray7: any = [];
  memberArray8: any = [];
  memberArray9: any = [];
  memberArray10: any = [];

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
    console.log("getFormName =", this.getFormName)
    this.shareData.callStateGlobalApi();
    this.shareData.callOccupationGlobalApi();
  }

  ngOnInit() {
    this.ValidateRationForm();
    this.ValidateMemberForm();


  }

  ValidateRationForm(): void {
    if (this.applicationFor == 'newApplication') {
      this.rationForm = this.formBuilder.group(
        {
          applicationFor: [this.applicationFor, [Validators.required]],
          rationCardType: ['', [Validators.required]],
          area: ['', [Validators.required,]],
          stateId: [this.stateId, [Validators.required]],
          districtId: ['', [Validators.required]],
          developPart: ['', [Validators.required]],
          tahsil: ['', [Validators.required,]],
          villagePanchayat: ['', [Validators.required,]],
          pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
          fullAddress: ['', [Validators.required,]],
          fullName: ['', [Validators.required,]],
          father_name: ['', [Validators.required,]],
          husbandName: ['', [Validators.required,]],
          motherName: ['', [Validators.required,]],
          category: ['', [Validators.required,]],
          dob: ['', [Validators.required]],
          gender: ['', [Validators.required,]],
          business: ['', [Validators.required,]],
          mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
          emailId: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
          voterId: ['', [Validators.required,]],
          adharNo: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
          gasConnectionStatus: ['', [Validators.required]],
          gasConnectionType: ['', [Validators.required,]],
          gasConsumerNo: ['', [Validators.required,]],
          gasAgencyName: ['', [Validators.required]],
          kotedarName: ['', [Validators.required,]],
          yearIncome: ['', [Validators.required,]],
          elecConnectionStatus: ['', [Validators.required]],
          elecConsumerNo: ['', [Validators.required,]],
          bankName: ['', [Validators.required,]],
          bankBranch: ['', [Validators.required,]],
          bankIfsc: ['', [Validators.required,]],
          bankAccountNo: ['', [Validators.required,]],

        });

    } else if (this.applicationFor == 'correctionApplication') {

      this.rationForm = this.formBuilder.group(
        {
          applicationFor: [this.applicationFor, [Validators.required]],
          rationCardNo: ['', [Validators.required,]],
          changeInRation: ['', [Validators.required,]],
          rationCardType: ['', [Validators.required]],
          area: ['', [Validators.required,]],
          stateId: [this.stateId, [Validators.required]],
          districtId: ['', [Validators.required,]],
          developPart: ['', [Validators.required]],
          tahsil: ['', [Validators.required,]],
          villagePanchayat: ['', [Validators.required,]],
          pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
          fullAddress: ['', [Validators.required,]],
          fullName: ['', [Validators.required,]],
          father_name: ['', [Validators.required,]],
          husbandName: ['', [Validators.required,]],
          motherName: ['', [Validators.required,]],
          category: ['', [Validators.required,]],
          dob: ['', [Validators.required]],
          gender: ['', [Validators.required,]],
          business: ['', [Validators.required,]],
          mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
          emailId: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
          voterId: ['', [Validators.required,]],
          adharNo: ['', [Validators.required,]],
          gasConnectionStatus: ['', [Validators.required]],
          gasConnectionType: ['', [Validators.required,]],
          gasConsumerNo: ['', [Validators.required,]],
          gasAgencyName: ['', [Validators.required]],
          kotedarName: ['', [Validators.required,]],
          yearIncome: ['', [Validators.required,]],
          elecConnectionStatus: ['', [Validators.required]],
          elecConsumerNo: ['', [Validators.required,]],
          bankName: ['', [Validators.required,]],
          bankBranch: ['', [Validators.required,]],
          bankIfsc: ['', [Validators.required,]],
          bankAccountNo: ['', [Validators.required,]],

        });
    }

  }

  get errorControl() {
    return this.rationForm.controls;

  }
  get errorControl2() {
    return this.memberRowForm.controls;

  }

  selectState(event: any) {
    console.log("state =", this.rationForm.value.stateId)
    if (this.rationForm.value.stateId !== "" || this.rationForm.value.stateId !== null) {
      this.isStateId = false;
      this.shareData.callDistrictGlobalApi(this.rationForm.value.stateId);
    }
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
      }
    }, (err) => {
      console.log("img err", err);
    });

  }

  removeImage(imageType: any) {
    if (imageType == 'profile') {
      this.profilePhoto = null;
    }
    if (imageType == 'passbook') {
      this.passbookPhoto = null;
    }
    if (imageType == 'adhar') {
      this.adharPhoto = null;
    }
    if (imageType == 'income') {
      this.incomePhoto = null;
    }

  }

  ValidateMemberForm() {
    this.myForm = this.formBuilder.group({
      player1: ['', Validators.required]
    });

    this.memberRowForm = this.formBuilder.group({
      memberName: ['', Validators.required],
      fatherName: ['', Validators.required],
      memberRelation: ['', Validators.required],
      memberDob: ['', Validators.required],
      memberAdharNo: ['', Validators.required]
    });

  }

  addMember() {
    this.isSubmited2 = true;
    if (!this.memberRowForm.valid) {
      //console.log(" Invalid")
      return false;
    }
    else {
      //console.log("valid")
      if (this.playerCount <= 10) {

        this.myForm.addControl('player' + this.playerCount, new FormControl('', Validators.required));
        const memberInfo = {
          "member_name": this.memberRowForm.value.memberName,
          "member_fatherName": this.memberRowForm.value.fatherName,
          "member_relation": this.memberRowForm.value.memberRelation,
          "member_dob": this.memberRowForm.value.memberDob,
          "member_adharNo": this.memberRowForm.value.memberAdharNo
        }

        this.memberArray.push(memberInfo)
        this.memberRowForm.reset();
        //console.log("array val =", this.memberArray)

        if (this.playerCount == 1) {
          this.memberArray1.push(memberInfo);
        } else if (this.playerCount == 2) {
          this.memberArray2.push(memberInfo);
        } else if (this.playerCount == 3) {
          this.memberArray3.push(memberInfo);
        } else if (this.playerCount == 4) {
          this.memberArray4.push(memberInfo);
        } else if (this.playerCount == 5) {
          this.memberArray5.push(memberInfo);
        } else if (this.playerCount == 6) {
          this.memberArray6.push(memberInfo);
        } else if (this.playerCount == 7) {
          this.memberArray7.push(memberInfo);
        } else if (this.playerCount == 8) {
          this.memberArray8.push(memberInfo);
        } else if (this.playerCount == 9) {
          this.memberArray9.push(memberInfo);
        } else if (this.playerCount == 10) {
          this.memberArray10.push(memberInfo);
        }

        this.playerCount++;
      } else if (this.playerCount >= 10) {
        //alert("cant not more 10 member")
        this.loadingService.showToast("Can't Add more then 10 Member", 2000, 'danger');
      }

    }

  }

  removeMember(index: any, removeMem: any) {
    this.memberArray.splice(index, 1);
    this.playerCount -= 1;
  }


  select_appFor(event: any) {
    this.applicationFor = event.detail.value;
    // console.log("applocation For= ", this.applicationFor)
    this.ValidateRationForm();
    this.ValidateMemberForm();
    if (this.applicationFor == 'newApplication') {
      this.rationForm.value.rationCardNo = "no";
      this.rationForm.value.changeInRation = "no";
    }
  }




  select_gasConnectionStatus(event: any) {
    this.gasConnectionStatus = event.detail.value;
    //console.log("status= ", this.gasConnectionStatus)
    if (this.gasConnectionStatus == 'हाँ') {
      this.isGagConection = false;
      //console.log("isGagConection= ", this.isGagConection)
    } else if (this.gasConnectionStatus == 'नहीं') {
      this.isGagConection = true;
      //console.log("isGagConection= ", this.isGagConection)
    }

  }

  select_ElecConnectionStatus(event: any) {
    this.elecConnectionStatus = event.detail.value;
    //console.log("status= ", this.elecConnectionStatus)
    if (this.elecConnectionStatus == 'हाँ') {
      this.isElecConection = false;
      //console.log("isElecConection= ", this.isElecConection)
    } else if (this.elecConnectionStatus == 'नहीं') {
      this.isElecConection = true;
      //console.log("isElecConection= ", this.isElecConection)
    }
  }



  payAndSubmit() {
    if (this.applicationFor == 'newApplication') {
      this.rationForm.value.rationCardNo = "no";
      this.rationForm.value.changeInRation = "no";
    }

    this.isSubmited = true;
    if (!this.rationForm.valid) {
      //console.log(" Invalid")
      return false;
    }
    else if (this.profilePhoto == null) {
      return false;
    }
    else if (this.passbookPhoto == null) {
      return false;
    }
    else if (this.adharPhoto == null) {
      return false;
    }
    else if (this.incomePhoto == null) {
      return false;
    }
    else {
      //console.log("valid")

      if (this.memberArray.length == 0) {
        this.loadingService.showToast("Please Add at least 1 Member", 2000, 'danger');
      } else if (this.memberArray.length > 0) {
        // console.log("member array =", this.memberArray)


        if (this.memberArray2.length == 0) {
          const memberInfo = {
            "member_name": "",
            "member_fatherName": "",
            "member_relation": "",
            "member_dob": "",
            "member_adharNo": ""
          }
          this.memberArray2.push(memberInfo);
        }
        if (this.memberArray3.length == 0) {
          const memberInfo = {
            "member_name": "",
            "member_fatherName": "",
            "member_relation": "",
            "member_dob": "",
            "member_adharNo": ""
          }
          this.memberArray3.push(memberInfo);
        }
        if (this.memberArray4.length == 0) {
          const memberInfo = {
            "member_name": "",
            "member_fatherName": "",
            "member_relation": "",
            "member_dob": "",
            "member_adharNo": ""
          }
          this.memberArray4.push(memberInfo);
        }
        if (this.memberArray5.length == 0) {
          const memberInfo = {
            "member_name": "",
            "member_fatherName": "",
            "member_relation": "",
            "member_dob": "",
            "member_adharNo": ""
          }
          this.memberArray5.push(memberInfo);
        }
        if (this.memberArray6.length == 0) {
          const memberInfo = {
            "member_name": "",
            "member_fatherName": "",
            "member_relation": "",
            "member_dob": "",
            "member_adharNo": ""
          }
          this.memberArray6.push(memberInfo);
        }
        if (this.memberArray7.length == 0) {
          const memberInfo = {
            "member_name": "",
            "member_fatherName": "",
            "member_relation": "",
            "member_dob": "",
            "member_adharNo": ""
          }
          this.memberArray7.push(memberInfo);
        }
        if (this.memberArray8.length == 0) {
          const memberInfo = {
            "member_name": "",
            "member_fatherName": "",
            "member_relation": "",
            "member_dob": "",
            "member_adharNo": ""
          }
          this.memberArray8.push(memberInfo);
        }
        if (this.memberArray9.length == 0) {
          const memberInfo = {
            "member_name": "",
            "member_fatherName": "",
            "member_relation": "",
            "member_dob": "",
            "member_adharNo": ""
          }
          this.memberArray9.push(memberInfo);
        }
        if (this.memberArray10.length == 0) {
          const memberInfo = {
            "member_name": "",
            "member_fatherName": "",
            "member_relation": "",
            "member_dob": "",
            "member_adharNo": ""
          }
          this.memberArray10.push(memberInfo);
        }

        let rationFormParams = {
          form: this.getFormName.form_id,
          roleid: this.shareData.memberDetails.UserRoleUId,
          UniqueId: this.shareData.memberDetails.UniqueId,
          order_id: "0",

          apply: this.rationForm.value.applicationFor,
          card_no: this.rationForm.value.rationCardNo,
          change_ration: this.rationForm.value.changeInRation,
          type: this.rationForm.value.rationCardType,
          area: this.rationForm.value.area,
          //stateId: this.rationForm.value.stateId,
          district: this.rationForm.value.districtId,
          vikashkhand: this.rationForm.value.developPart,
          tahsil: this.rationForm.value.tahsil,
          grampanchayat: this.rationForm.value.villagePanchayat,
          pin_code: this.rationForm.value.pinCode,
          full_address: this.rationForm.value.fullAddress,
          full_name: this.rationForm.value.fullName,
          father_name: this.rationForm.value.father_name,
          husband_name: this.rationForm.value.husbandName,
          mother_name: this.rationForm.value.motherName,
          category: this.rationForm.value.category,
          dob: this.rationForm.value.dob,
          gender: this.rationForm.value.gender,
          business: this.rationForm.value.business,
          mobile_no: this.rationForm.value.mobileNo,
          email_id: this.rationForm.value.emailId,
          voter_id: this.rationForm.value.voterId,
          adhar_no: this.rationForm.value.adharNo,
          gas_conection: this.rationForm.value.gasConnectionStatus,
          gas_line: this.rationForm.value.gasConnectionType,
          customer_no: this.rationForm.value.gasConsumerNo,
          agency_name: this.rationForm.value.gasAgencyName,
          kotedar_name: this.rationForm.value.kotedarName,
          income: this.rationForm.value.yearIncome,
          electy_conection: this.rationForm.value.elecConnectionStatus,
          conection_no: this.rationForm.value.elecConsumerNo,
          bank_name: this.rationForm.value.bankName,
          bank_branch: this.rationForm.value.bankBranch,
          ifsc_code: this.rationForm.value.bankIfsc,
          acc_no: this.rationForm.value.bankAccountNo,


          photo: this.profilePhoto,
          bank_passbook: this.passbookPhoto,
          adhar_card: this.adharPhoto,
          Income_Certificate: this.incomePhoto,

          //family_member: this.memberArray
          member1: this.memberArray1[0].member_name,
          parent1: this.memberArray1[0].member_fatherName,
          rele1: this.memberArray1[0].member_relation,
          dob1: this.memberArray1[0].member_dob,
          aadhaar1: this.memberArray1[0].member_adharNo,

          member2: this.memberArray2[0].member_name,
          parent2: this.memberArray2[0].member_fatherName,
          rele2: this.memberArray2[0].member_relation,
          dob2: this.memberArray2[0].member_dob,
          aadhaar2: this.memberArray2[0].member_adharNo,

          member3: this.memberArray3[0].member_name,
          parent3: this.memberArray3[0].member_fatherName,
          rele3: this.memberArray3[0].member_relation,
          dob3: this.memberArray3[0].member_dob,
          aadhaar3: this.memberArray3[0].member_adharNo,

          member4: this.memberArray4[0].member_name,
          parent4: this.memberArray4[0].member_fatherName,
          rele4: this.memberArray4[0].member_relation,
          dob4: this.memberArray4[0].member_dob,
          aadhaar4: this.memberArray4[0].member_adharNo,

          member5: this.memberArray5[0].member_name,
          parent5: this.memberArray5[0].member_fatherName,
          rele5: this.memberArray5[0].member_relation,
          dob5: this.memberArray5[0].member_dob,
          aadhaar5: this.memberArray5[0].member_adharNo,

          member6: this.memberArray6[0].member_name,
          parent6: this.memberArray6[0].member_fatherName,
          rele6: this.memberArray6[0].member_relation,
          dob6: this.memberArray6[0].member_dob,
          aadhaar6: this.memberArray6[0].member_adharNo,

          member7: this.memberArray7[0].member_name,
          parent7: this.memberArray7[0].member_fatherName,
          rele7: this.memberArray7[0].member_relation,
          dob7: this.memberArray7[0].member_dob,
          aadhaar7: this.memberArray7[0].member_adharNo,

          member8: this.memberArray8[0].member_name,
          parent8: this.memberArray8[0].member_fatherName,
          rele8: this.memberArray8[0].member_relation,
          dob8: this.memberArray8[0].member_dob,
          aadhaar8: this.memberArray8[0].member_adharNo,

          member9: this.memberArray9[0].member_name,
          parent9: this.memberArray9[0].member_fatherName,
          rele9: this.memberArray9[0].member_relation,
          dob9: this.memberArray9[0].member_dob,
          aadhaar9: this.memberArray9[0].member_adharNo,

          member10: this.memberArray10[0].member_name,
          parent10: this.memberArray10[0].member_fatherName,
          rele10: this.memberArray10[0].member_relation,
          dob10: this.memberArray10[0].member_dob,
          aadhaar10: this.memberArray10[0].member_adharNo,

        }
        console.log("rationFormParams =", rationFormParams)

        //alert("rationFormParams =" + JSON.stringify(rationFormParams))
        if (this.shareData.memberDetails.UniqueId !== null) {
          this.loadingService.show("Creating Form...")
          this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
          if (this.shareData.walletBalance >= this.getFormName.form_price) {
            this.apiService.createRationCardForm(rationFormParams)
              .subscribe((data: any) => {
                if (data.action == "yes") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "success");
                  console.log("ration card success ", data)
                  setTimeout(() => {
                    this.router.navigate(['/menu/global-online-form', { screenId: "25", screenName: "E-District Services" }])
                  }, 2000)
                } else if (data.action == "no") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "danger");
                }
              }, (error: any) => {
                this.loadingService.hide();
                console.log("ration card fail ", error)
              })
          } else if (this.shareData.walletBalance < this.getFormName.form_price) {
            this.loadingService.hide();
            this.loadingService.showToast("Insufficient wallet Balance.", 2000, 'danger');
          }
        }

      }

    }

  }


  resetMainForm() {
    this.loadingService.autoHide(1000, "Reseting...");
    setTimeout(() => {
      this.ValidateMemberForm();
      this.ValidateRationForm();
    }, 1000)
  }

}
