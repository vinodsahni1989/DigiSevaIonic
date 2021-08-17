import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-udhyog-adhar-certificate',
  templateUrl: './udhyog-adhar-certificate.page.html',
  styleUrls: ['./udhyog-adhar-certificate.page.scss'],
})
export class UdhyogAdharCertificatePage implements OnInit {


  udhyogAadharForm: FormGroup;
  isSubmited = false;
  getFormName: any;


  catHeader: any = {
    header: 'Select Social Category',
  };
  genderHeader: any = {
    header: 'Select Gender',
  };
  orgHeader: any = {
    header: 'Select Organisation',
  };
  majorHeader: any = {
    header: 'Select Major Activity',
  };
  nationalHeader: any = {
    header: 'Select National Industry',
  };

  adharNo: any = '';
  entrepreneurName: any = '';
  shopCategory: any = '';
  gender: any = '';
  entrepreneurShopName: any = '';
  organisationType: any = '';
  panNumber: any = '';
  shopOpenDate: any = '';
  email: any = '';
  mobileNo: any = '';
  ifscCode: any = '';
  accountNo: any = '';
  fullAddress: any = '';
  stateName: any = '';
  districtName: any = '';
  stateId: any = '';
  districtId: any = '';
  pinCode: any = '';
  noOfEmployee: any = '';
  investInLakh: any = '';
  majotActivityUnit: any = '';
  nationalIndustry: any = '';
  NIC2: any = '';
  NIC3: any = '';
  NIC4: any = '';
  NIC5: any = '';

  isStateId: boolean = true;



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
  ) {
    this.getFormName = JSON.parse(this.activatedroute.snapshot.paramMap.get('formType'));
    // console.log("getFormName =", this.getFormName.form_name)
    this.shareData.callStateGlobalApi();
  }

  ngOnInit() {
    this.ValidateUdhyogForm();
  }

  ValidateUdhyogForm(): void {
    this.udhyogAadharForm = this.formBuilder.group(
      {
        adharNo: ['', [Validators.required], Validators.maxLength(12), Validators.pattern('^[0-9]+$')],
        entrepreneurName: ['', [Validators.required]],
        shopCategory: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        entrepreneurShopName: ['', [Validators.required,]],
        organisationType: ['', [Validators.required,]],
        panNumber: ['', [Validators.required]],
        shopOpenDate: ['', [Validators.required]],
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        ifscCode: ['', [Validators.required]],
        accountNo: ['', [Validators.required,]],
        fullAddress: ['', [Validators.required,]],
        stateId: ['', [Validators.required,]],
        districtId: ['', [Validators.required,]],
        pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
        noOfEmployee: ['', [Validators.required,]],
        investInLakh: ['', [Validators.required,]],
        majorActivityUnit: ['', [Validators.required,]],
        nationalIndustry: ['', [Validators.required,]],
        NIC2: ['', [Validators.required,]],
        NIC3: ['', [Validators.required,]],
        NIC4: ['', [Validators.required,]],
        NIC5: ['', [Validators.required,]],
      });

  }

  get errorControl() {
    return this.udhyogAadharForm.controls;

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



  payAndSubmit() {
    this.isSubmited = true;
    if (!this.udhyogAadharForm.valid) {
      //console.log("voter id form Invalid")
      return false;
    }
    else {
      //console.log("voter id form Valid")
      let udhyogAdharParams = {

        form: this.getFormName.form_id,
        roleid: this.shareData.memberDetails.UserRoleUId,
        UniqueId: this.shareData.memberDetails.UniqueId,

        adhar_no: this.udhyogAadharForm.value.adharNo,
        full_name: this.udhyogAadharForm.value.entrepreneurName,
        category: this.udhyogAadharForm.value.shopCategory,
        gender: this.udhyogAadharForm.value.gender,
        shop_name: this.udhyogAadharForm.value.entrepreneurShopName,
        organisation: this.udhyogAadharForm.value.organisationType,
        pan_no: this.udhyogAadharForm.value.panNumber,
        open_date: this.udhyogAadharForm.value.shopOpenDate,
        email_id: this.udhyogAadharForm.value.email,
        mobile_no: this.udhyogAadharForm.value.mobileNo,
        ifsc_code: this.udhyogAadharForm.value.ifscCode,
        acc_no: this.udhyogAadharForm.value.accountNo,
        full_address: this.udhyogAadharForm.value.fullAddress,
        state: this.stateName,
        district: this.districtName,
        pin_code: this.udhyogAadharForm.value.pinCode,
        no_emp: this.udhyogAadharForm.value.noOfEmployee,
        investment: this.udhyogAadharForm.value.investInLakh,
        unit: this.udhyogAadharForm.value.majorActivityUnit,

        nic: this.udhyogAadharForm.value.nationalIndustry,

        nic2: this.udhyogAadharForm.value.NIC2,
        nic3: this.udhyogAadharForm.value.NIC3,
        nic4: this.udhyogAadharForm.value.NIC4,
        nic5: this.udhyogAadharForm.value.NIC5,

      }

      console.log("udhyogAdharParams  info =", udhyogAdharParams)

      if (this.shareData.memberDetails.UniqueId !== null) {
        this.loadingService.show("Creating Form...")
        this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
        if (this.shareData.walletBalance >= this.getFormName.form_price) {
          this.apiService.createUPUdyogAdharForm(udhyogAdharParams)
            .subscribe((data: any) => {
              if (data !== null) {
                if (data.action == "yes") {
                  this.loadingService.hide();
                  this.loadingService.showToast(data.msg, 2000, "success");
                  console.log("udyog adhar success ", data)
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
              console.log("udyog adhar fail ", error);
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
      this.ValidateUdhyogForm();
    }, 1000)
  }




}

