import { Component, OnInit } from '@angular/core';
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
  selector: 'app-up-shramik-card',
  templateUrl: './up-shramik-card.page.html',
  styleUrls: ['./up-shramik-card.page.scss'],
})
export class UpShramikCardPage implements OnInit {



  upLaborForm: FormGroup;
  isSubmited = false;
  getFormName: any;

  genderTypeHeader: any = {
    header: '-- चुनें --',
  };
  areaTypeHeader: any = {
    header: 'जनपद चुने',
  };

  laborName: any = '';
  fatherHusbandName: any = '';
  motherName: any = '';
  dob: any = '';
  gender: any = '';
  workType: any = '';
  maritalStatus: any = '';
  age: any = '';
  category: any = '';
  email: any = '';
  mobileNo: any = '';
  rationCardNo: any = '';
  niyojakNameAdd: any = '';
  niyojakmobileNo: any = '';
  buildingNo: any = '';
  streetNo: any = '';
  postOffice: any = '';
  policeStation: any = '';
  stateName: any = '';
  districtName: any = '';
  stateId: any = '';
  janpad: any = '';
  tahsil: any = '';
  wardVillage: any = '';
  pinCode: any = '';
  workDaysInYear: any = '';
  contributionDuration = [];
  registrationAmount: any = '';
  contributionAmount: any = '';
  manregaWorking: any = '';
  otherBoardMember: any = '';
  adharNo: any = '';
  nomineeNameHindi: any = '';
  nomineeNameEnglish: any = '';
  laborEducation: any = '';
  laborRelation: any = '';
  LaborbankName: any = '';
  bankBranch: any = '';
  bankAccountNo: any = '';
  ifscCode: any = '';
  bankAccType: any = '';
  ePfNo: any = '';
  eSiNo: any = '';

  profilePhoto: any = null;
  niyojanPhoto: any = null;
  adharPhoto: any = null;
  passbookPhoto: any = null;
  incomePhoto: any = null;
  nivasPhoto: any = null;


  profilePhotoSend: any = null;
  niyojanPhotoSend: any = null;
  adharPhotoSend: any = null;
  passbookPhotoSend: any = null;
  incomePhotoSend: any = null;
  nivasPhotoSend: any = null;


  isSubmited2 = false;
  memberRowForm: FormGroup;
  totalMemberRow: any;

  memberName: any = '';
  fatherName: any = '';
  memberRelation: any = '';
  memberDob: any = '';
  memberAdhar: any = '';


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
    private imageCompress: NgxImageCompressService,

  ) {
    this.getFormName = JSON.parse(this.activatedroute.snapshot.paramMap.get('formType'));
    // console.log("getFormName =", this.getFormName.form_name)
    this.shareData.callStateGlobalApi();
  }

  ngOnInit() {
    this.ValidateUpLaborForm();
    this.ValidateMemberForm();
  }

  ValidateUpLaborForm(): void {
    this.upLaborForm = this.formBuilder.group(
      {
        laborName: ['', [Validators.required]],
        fatherHusbandName: ['', [Validators.required]],
        motherName: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        gender: ['', [Validators.required,]],
        workType: ['', [Validators.required,]],
        maritalStatus: ['', [Validators.required,]],
        age: ['', [Validators.required,]],
        category: ['', [Validators.required,]],
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        rationCardNo: ['', [Validators.required,]],
        niyojakNameAdd: ['', [Validators.required,]],
        niyojakmobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        buildingNo: ['', [Validators.required,]],
        streetNo: ['', [Validators.required,]],
        postOffice: ['', [Validators.required,]],
        policeStation: ['', [Validators.required,]],
        stateId: [this.stateId, [Validators.required]],
        janpad: ['', [Validators.required,]],
        tahsil: ['', [Validators.required,]],
        wardVillage: ['', [Validators.required,]],
        pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
        workDaysInYear: ['', [Validators.required,]],
        // contributionDuration: ['', [Validators.required,]],
        registrationAmount: ['20', [Validators.required,]],
        contributionAmount: ['20', [Validators.required,]],
        manregaWorking: ['', [Validators.required,]],
        otherBoardMember: ['', [Validators.required,]],
        adharNo: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
        nomineeNameHindi: ['', [Validators.required,]],
        nomineeNameEnglish: ['', [Validators.required,]],
        laborEducation: ['', [Validators.required,]],
        laborRelation: ['', [Validators.required,]],
        LaborbankName: ['', [Validators.required,]],
        bankBranch: ['', [Validators.required,]],
        bankAccountNo: ['', [Validators.required,]],
        ifscCode: ['', [Validators.required,]],
        bankAccType: ['', [Validators.required,]],
        ePfNo: ['', [Validators.required,]],
        eSiNo: ['', [Validators.required,]],

      });


  }

  get errorControl() {
    return this.upLaborForm.controls;

  }

  get errorControl2() {
    return this.memberRowForm.controls;

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



  getContributionDuration(event: any, getYear: Number,) {
    if (event.detail.checked) {
      this.contributionDuration.push(getYear);
      console.log("contri year =>", this.contributionDuration.toString())
    } else {
      let index = this.removeCheckedFromArray(Number(getYear));
      this.contributionDuration.splice(index, 1);
      //console.log("after remove contri =>", this.contributionDuration)

    }
  }

  //Removes checkbox from array when you uncheck it
  removeCheckedFromArray(checkbox: Number) {
    return this.contributionDuration.findIndex((category) => {
      return category === checkbox;
    })
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
      } if (imageType == 'niyojan') {
        if (this.beforeCompressImage < 100000) {
          this.niyojanPhoto = "data:image/png;base64," + imageData;
          this.niyojanPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.niyojanPhoto = "data:image/png;base64," + imageData;
                this.niyojanPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
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
      } if (imageType == 'nivas') {
        if (this.beforeCompressImage < 100000) {
          this.nivasPhoto = "data:image/png;base64," + imageData;
          this.nivasPhotoSend = temp.replace(/^data:image\/[a-z]+;base64,/, "");
        } else if (this.beforeCompressImage > 100000) {
          this.imageCompress.compressFile(temp, 90, 90)
            .then((result: any) => {
              let size = this.imageCompress.byteCount(result);
              //console.log("after compress =", size)
              if (size <= 100000) {
                this.nivasPhoto = "data:image/png;base64," + imageData;
                this.nivasPhotoSend = result.replace(/^data:image\/[a-z]+;base64,/, "");
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
    if (imageType == 'niyojan') {
      this.niyojanPhoto = null;
    }
    if (imageType == 'adhar') {
      this.adharPhoto = null;
    }
    if (imageType == 'passbook') {
      this.passbookPhoto = null;
    }
    if (imageType == 'income') {
      this.incomePhoto = null;
    }
    if (imageType == 'nivas') {
      this.nivasPhoto = null;
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
      memberAdhar: ['', Validators.required]
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
          "member_adharNo": this.memberRowForm.value.memberAdhar
        }

        this.memberArray.push(memberInfo)
        this.memberRowForm.reset();
        console.log("array val =", this.memberArray)

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


  payAndSubmit() {
    this.isSubmited = true;
    if (!this.upLaborForm.valid) {
      //console.log(" User update Invalid")
      return false;
    } else if (this.profilePhoto == null) {
      return false;
    } else if (this.niyojanPhoto == null) {
      return false;
    } else if (this.adharPhoto == null) {
      return false;
    } else if (this.passbookPhoto == null) {
      return false;
    } else if (this.incomePhoto == null) {
      return false;
    } else if (this.nivasPhoto == null) {
      return false;
    }
    else {
      // console.log("user update valid")
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

      }



      let upLaborParams = {
        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,
        order_id: "0",

        full_name: this.upLaborForm.value.laborName,
        father_name: this.upLaborForm.value.fatherHusbandName,
        mother_name: this.upLaborForm.value.motherName,
        dob: this.upLaborForm.value.dob,
        gender: this.upLaborForm.value.gender,
        worktype: this.upLaborForm.value.workType,
        married_status: this.upLaborForm.value.maritalStatus,
        age: this.upLaborForm.value.age,
        category: this.upLaborForm.value.category,
        emailid: this.upLaborForm.value.email,
        mobile_no: this.upLaborForm.value.mobileNo,
        rationcard_no: this.upLaborForm.value.rationCardNo,
        employer: this.upLaborForm.value.niyojakNameAdd,
        employer_mobile: this.upLaborForm.value.niyojakmobileNo,
        house_no: this.upLaborForm.value.buildingNo,
        gali: this.upLaborForm.value.streetNo,
        post: this.upLaborForm.value.postOffice,
        thana: this.upLaborForm.value.policeStation,
        district: this.districtName,
        tahsil: this.upLaborForm.value.tahsil,
        locality: this.upLaborForm.value.wardVillage,
        pin_code: this.upLaborForm.value.pinCode,
        work_days: this.upLaborForm.value.workDaysInYear,
        anshdan: this.contributionDuration.toString(),
        reg_fee: this.upLaborForm.value.registrationAmount,
        anshdan_fee: this.upLaborForm.value.contributionAmount,
        manrega: this.upLaborForm.value.manregaWorking,
        board_member: this.upLaborForm.value.otherBoardMember,
        aadhar_no: this.upLaborForm.value.adharNo,
        nomineenamehindi: this.upLaborForm.value.nomineeNameHindi,
        nomineenameenglish: this.upLaborForm.value.nomineeNameEnglish,
        education: this.upLaborForm.value.laborEducation,
        relation: this.upLaborForm.value.laborRelation,
        bank_name: this.upLaborForm.value.LaborbankName,
        bank_branch: this.upLaborForm.value.bankBranch,
        acc_no: this.upLaborForm.value.bankAccountNo,
        ifsc_code: this.upLaborForm.value.ifscCode,
        acc_type: this.upLaborForm.value.bankAccType,
        epf: this.upLaborForm.value.ePfNo,
        esi: this.upLaborForm.value.eSiNo,

        photo: this.profilePhotoSend,
        employer_pdf: this.niyojanPhotoSend,
        aadhar_card: this.adharPhotoSend,
        bank_passbook: this.passbookPhotoSend,
        aay_cer: this.incomePhotoSend,
        nivash_cer: this.nivasPhotoSend,

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

      console.log("upLaborParams  info =", upLaborParams)
      // alert("upLaborParams  info =" + JSON.stringify(upLaborParams))

      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createUPShramikCardForm(upLaborParams)
            .subscribe((data: any) => {
              if (data !== null) {
                if (data.action == "yes") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "success");
                  console.log("shramik card success ", data)
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
              console.log("shramik card  fail ", error);
            })


        } else if (this.shareData.walletBalance < this.getFormName.form_price) {
          this.loadingService.showToast("Insufficient wallet Balance.", 2000, 'danger');
        }

      }

    }
  }



  resetMainForm() {
    this.loadingService.autoHide(1000, "Reseting...");
    setTimeout(() => {
      this.ValidateMemberForm();
      this.ValidateUpLaborForm();
      this.profilePhoto = null;
      this.niyojanPhoto = null;
      this.adharPhoto = null;
      this.passbookPhoto = null;
      this.incomePhoto = null;
      this.nivasPhoto = null;
    }, 1000)
  }

}
