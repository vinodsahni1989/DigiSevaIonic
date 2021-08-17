import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';

@Component({
  selector: 'app-pm-kisan-samman-form',
  templateUrl: './pm-kisan-samman-form.page.html',
  styleUrls: ['./pm-kisan-samman-form.page.scss'],
})
export class PmKisanSammanFormPage implements OnInit {

  pmKisansammanForm: FormGroup;
  isSubmited = false;
  getFormName: any;


  stateHeader: any = {
    header: 'Select State',
  };
  districtHeader: any = {
    header: 'Select District',
  };
  categoryHeader: any = {
    header: 'Select Category ... ',
  };

  stateName: any = '';
  districtName: any = '';

  stateId: any = '';
  districtId: any = '';
  tehsil: any = '';
  block: any = '';
  village: any = '';
  address: any = '';
  category: any = '';
  farmerName: any = '';
  fatherName: any = '';
  dob: any = '';
  adharNo: any = '';
  bankName: any = '';
  ifcsCode: any = '';
  accountNo: any = '';
  mobileNo: any = ''

  //====================================== 

  isSubmited2 = false;

  memberRowForm: FormGroup;
  totalMemberRow: any;

  surveyKhataNo: any = '';
  dagKhasraNo: any = '';
  areaInHec: any = '';

  myForm: FormGroup;
  playerCount: number = 1;
  memberArray: any = [];
  memberArray1: any = [];
  memberArray2: any = [];
  memberArray3: any = [];
  memberArray4: any = [];
  memberArray5: any = [];

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
  ) {
    this.getFormName = JSON.parse(this.activatedroute.snapshot.paramMap.get('formType'));
    // console.log("getFormName =", this.getFormName.form_name)
    this.shareData.callStateGlobalApi();

  }

  ngOnInit() {
    this.ValidatePMKisanForm();
    this.ValidateMemberForm();
  }

  ValidatePMKisanForm(): void {
    this.pmKisansammanForm = this.formBuilder.group(
      {
        stateId: ['', [Validators.required]],
        districtId: ['', [Validators.required]],
        tehsil: ['', [Validators.required]],
        block: ['', [Validators.required]],
        village: ['', [Validators.required,]],
        address: ['', [Validators.required,]],
        category: ['', [Validators.required,]],
        farmerName: ['', [Validators.required,]],
        fatherName: ['', [Validators.required,]],
        dob: ['', [Validators.required,]],
        adharNo: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
        bankName: ['', [Validators.required,]],
        ifcsCode: ['', [Validators.required,]],
        accountNo: ['', [Validators.required,]],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      });


  }

  get errorControl() {
    return this.pmKisansammanForm.controls;

  }

  get errorControl2() {
    return this.memberRowForm.controls;

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


  ValidateMemberForm() {
    this.myForm = this.formBuilder.group({
      player1: ['', Validators.required]
    });

    this.memberRowForm = this.formBuilder.group({
      surveyKhataNo: ['', Validators.required],
      dagKhasraNo: ['', Validators.required],
      areaInHec: ['', Validators.required],
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
      if (this.playerCount <= 5) {

        this.myForm.addControl('player' + this.playerCount, new FormControl('', Validators.required));
        const memberInfo = {
          "surveyKhata_No": this.memberRowForm.value.surveyKhataNo,
          "dagKhasra_No": this.memberRowForm.value.dagKhasraNo,
          "areaIn_Hec": this.memberRowForm.value.areaInHec,
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
        }
        this.playerCount++;
      } else if (this.playerCount >= 5) {
        //alert("cant not more 10 member")
        this.loadingService.showToast("Can't Add more then 5 Record.", 2000, 'danger');
      }

    }

  }

  removeMember(index: any, removeMem: any) {
    this.memberArray.splice(index, 1);
    this.playerCount -= 1;
  }


  payAndSubmit() {
    this.isSubmited = true;
    if (!this.pmKisansammanForm.valid) {
      //console.log(" User update Invalid")
      return false;
    }
    else {
      // console.log("user update valid")
      if (this.memberArray.length == 0) {
        this.loadingService.showToast("Please Add at least 1 Record.", 2000, 'danger');
      } else if (this.memberArray.length > 0) {
        console.log("member array =", this.memberArray)


        if (this.memberArray2.length == 0) {
          const memberInfo = {
            "surveyKhata_No": "",
            "dagKhasra_No": "",
            "areaIn_Hec": "",
          }
          this.memberArray2.push(memberInfo);
        }
        if (this.memberArray3.length == 0) {
          const memberInfo = {
            "surveyKhata_No": "",
            "dagKhasra_No": "",
            "areaIn_Hec": "",
          }
          this.memberArray3.push(memberInfo);
        }
        if (this.memberArray4.length == 0) {
          const memberInfo = {
            "surveyKhata_No": "",
            "dagKhasra_No": "",
            "areaIn_Hec": "",
          }
          this.memberArray4.push(memberInfo);
        }
        if (this.memberArray5.length == 0) {
          const memberInfo = {
            "surveyKhata_No": "",
            "dagKhasra_No": "",
            "areaIn_Hec": "",
          }
          this.memberArray5.push(memberInfo);
        }


        let PMKisanSammanParams = {
          form: this.getFormName.form_id,
          roleid: this.shareData.memberDetails.UserRoleUId,
          UniqueId: this.shareData.memberDetails.UniqueId,

          state: this.stateName,
          district: this.districtName,

          tahsil: this.pmKisansammanForm.value.tehsil,
          block: this.pmKisansammanForm.value.block,
          village: this.pmKisansammanForm.value.village,
          full_address: this.pmKisansammanForm.value.address,
          category: this.pmKisansammanForm.value.category,
          full_name: this.pmKisansammanForm.value.farmerName,
          father_name: this.pmKisansammanForm.value.fatherName,
          dob: this.pmKisansammanForm.value.dob,
          adhar_no: this.pmKisansammanForm.value.adharNo,
          bank_name: this.pmKisansammanForm.value.bankName,
          ifsc_code: this.pmKisansammanForm.value.ifcsCode,
          acc_no: this.pmKisansammanForm.value.accountNo,
          mobile_no: this.pmKisansammanForm.value.mobileNo,


          //for land record
          survey1: this.memberArray1[0].surveyKhata_No,
          dag1: this.memberArray1[0].dagKhasra_No,
          farea1: this.memberArray1[0].areaIn_Hec,

          survey2: this.memberArray2[0].surveyKhata_No,
          dag2: this.memberArray2[0].dagKhasra_No,
          farea2: this.memberArray2[0].areaIn_Hec,

          survey3: this.memberArray3[0].surveyKhata_No,
          dag3: this.memberArray3[0].dagKhasra_No,
          farea3: this.memberArray3[0].areaIn_Hec,

          survey4: this.memberArray4[0].surveyKhata_No,
          dag4: this.memberArray4[0].dagKhasra_No,
          farea4: this.memberArray4[0].areaIn_Hec,

          survey5: this.memberArray5[0].surveyKhata_No,
          dag5: this.memberArray5[0].dagKhasra_No,
          farea5: this.memberArray5[0].areaIn_Hec,


        }

        console.log("PMKisanSammanParams  info =", PMKisanSammanParams)
        //alert("PMKisanSammanParams  info =" + JSON.stringify(PMKisanSammanParams))

        if (this.shareData.memberDetails.UniqueId !== null) {
          this.loadingService.show("Creating Form...")
          this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
          if (this.shareData.walletBalance >= this.getFormName.form_price) {
            this.apiService.createPMKishanSammanForm(PMKisanSammanParams)
              .subscribe((data: any) => {
                if (data !== null) {
                  if (data.action == "yes") {
                    this.loadingService.hide();
                    this.loadingService.showToast(data.msg, 2000, "success");
                    console.log("pm kishan success ", data)
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
                console.log("pm kishan  fail ", error);
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
      this.ValidatePMKisanForm();
    }, 1000)
  }





}

