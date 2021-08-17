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
  selector: 'app-wallet-balance-manage',
  templateUrl: './wallet-balance-manage.page.html',
  styleUrls: ['./wallet-balance-manage.page.scss'],
})
export class WalletBalanceManagePage implements OnInit {


  walletmanageForm: FormGroup;
  isSubmited = false;
  getUserInfo: any;

  catHeader: any = {
    header: 'Select Category',
  };
  selectEmpHeader: any = {
    header: 'Select No of Employee',
  };


  WalletType: any = '';
  name: any = '';
  mobileNo: any = '';
  email: any = '';
  avlBalance: any = '';
  addBalance: any = '';
  totalBalance: any = '';
  remark: any = '';
  private isDisabled: boolean = true;
  actionType = "Add Balance";
  lowBalanceToast: any = 'User does not have sufficient amount for deduction <br/>उपयोगकर्ता के पास कटौती के लिए पर्याप्त राशि नहीं है';
  updateBalanceFlag: boolean;


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
    this.getUserInfo = JSON.parse(this.activatedroute.snapshot.paramMap.get('userInfo'));
    //console.log("getUserInfo =", this.getUserInfo)
  }

  ngOnInit() {
    this.ValidateWalletForm();
  }

  ValidateWalletForm(): void {
    this.walletmanageForm = this.formBuilder.group(
      {
        WalletType: ['', [Validators.required]],
        name: [this.getUserInfo.MemberName, [Validators.required]],
        mobileNo: [this.getUserInfo.Phone, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        email: [this.getUserInfo.Email, Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        avlBalance: [Number(this.getUserInfo.credit) - Number(this.getUserInfo.debit), [Validators.required,]],
        addBalance: ['', [Validators.required,]],
        totalBalance: ['', [Validators.required,]],
        remark: ['', [Validators.required,]],
      });

  }

  get errorControl() {
    return this.walletmanageForm.controls;

  }


  selectedRadioType(selectedType: any) {
    this.addBalance = '';
    this.totalBalance = '';
    if (selectedType == 1) {
      this.actionType = 'Add Balance'
    } else if (selectedType == 2) {
      this.actionType = 'Deduct Balance'
    }
  }


  updateBalance(updateMoney: any) {
    if (this.walletmanageForm.value.WalletType == 1) {
      let finalBalance = Number(this.getUserInfo.credit) - Number(this.getUserInfo.debit);
      this.totalBalance = Number(finalBalance) + Number(updateMoney)
      //console.log(this.totalBalance);
      if (this.shareData.walletBalance >= Number(updateMoney)) {
        this.addBalance = Number(updateMoney);
        this.updateBalanceFlag = true;
      } else if (this.shareData.walletBalance < Number(updateMoney)) {
        this.loadingService.showToast("Your wallet balance is less than &nbsp;" + Number(updateMoney) + "<br/> पहले कृपया अपने वॉलेट में राशि जमा करें", 3000, 'danger');
        this.updateBalanceFlag = false;
      }
    } else if (this.walletmanageForm.value.WalletType == 2) {
      let finalBalance = Number(this.getUserInfo.credit) - Number(this.getUserInfo.debit);
      this.totalBalance = Number(finalBalance) - Number(updateMoney)
      //console.log(this.totalBalance);
      if (finalBalance >= Number(updateMoney)) {
        this.addBalance = Number(updateMoney);
        this.updateBalanceFlag = true;
      } else if (finalBalance < Number(updateMoney)) {
        this.loadingService.showToast(this.lowBalanceToast, 3000, 'danger');
        this.updateBalanceFlag = false;
      }
    }
  }



  updateWallet() {
    this.isSubmited = true;
    if (!this.walletmanageForm.valid) {
      console.log("form Invalid")
      return false;
    }
    else {
      //console.log("form Valid")
      if (this.updateBalanceFlag == true) {
        this.loadingService.show("Updating Wallet...")
        this.apiService.updateWalletApi(this.totalBalance, this.addBalance,
          this.getUserInfo.UniqueId, this.walletmanageForm.value.WalletType, this.shareData.memberDetails.UniqueId, this.walletmanageForm.value.remark)
          .subscribe((data: any) => {
            if (data !== null) {
              if (data.action == "yes") {
                this.loadingService.hide();
                this.loadingService.showToast(data.msg, 1000, "success");
                console.log("wallet update success ", data)
                setTimeout(() => {
                  this.shareData.callMyWalletApi(this.shareData.memberDetails.UniqueId);
                  this.router.navigate(['/menu/wallet-management', { screenId: "37", screenName: "Wallet Balance" }]);
                }, 2000)
              }
            } else if (data == null) {
              this.loadingService.hide();
              this.loadingService.showToast("Server Side Error.", 2000, 'danger');
            }
          }, (error: any) => {
            this.loadingService.hide();
            console.log("wallet update fail ", error);
          })

      } else if (this.updateBalanceFlag == false) {

      }

    }
  }

  resetMainForm() {
    this.loadingService.autoHide(1000, "Reseting...");
    setTimeout(() => {
      this.ValidateWalletForm();
    }, 1000)
  }










}
