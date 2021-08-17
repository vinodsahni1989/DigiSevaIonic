import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { Storage } from '@ionic/storage-angular';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {


  gotScreenId: any;
  gotScreenName: any;
  screenDataArray = new Array();
  editMember: any;
  backButtonSubs: any;

  roleList: any;
  sponserList: any;
  stateList: any;
  districtList: any;
  loadfirstItem: number = 10;





  constructor(
    private router: Router,
    public platform: Platform,
    private storage: Storage,
    private loadingService: LoadingService,
    private shareData: ShareDataService,
    private apiService: ApiService,
    private eventService: EventService,
    public alertController: AlertController,
    private activatedroute: ActivatedRoute,
    public navCtrl: NavController
  ) {


  }

  ionViewDidEnter() {
    this.activatedroute.params.subscribe((data: any) => {
      //console.log("got back in user page after save edit or back click =,", data)
      this.gotScreenId = data.screenId
      this.gotScreenName = data.screenName
      this.callScreenApi(this.gotScreenId)
    })
  }

  getBook() {
    this.gotScreenId = Number(this.activatedroute.snapshot.paramMap.get('screenId'))
    //console.log("got screen id =", this.gotScreenId)
    this.gotScreenName = this.activatedroute.snapshot.paramMap.get('screenName')
    // console.log("got screen name =", this.gotScreenName)
    this.callScreenApi(this.gotScreenId)
  }


  async ngOnInit() {
    await this.storage.create();
  }


  callScreenApi(screenId: any) {
    this.screenDataArray = [];
    this.loadingService.show("Loading...");
    this.apiService.callScreeApi(screenId, this.shareData.memberDetails.UserRoleUId,
      this.shareData.memberDetails.UniqueId)
      .subscribe((data: any) => {
        if (data !== null) {
          if (data.action == "yes") {
            this.loadingService.hide();
            this.screenDataArray = data.screen;
            console.log("screen data array =", this.screenDataArray)
          }
        } else if (data == null) {
          this.loadingService.hide();
          this.screenDataArray = null;
        }
      }, err => {

      })
  }



  editUser(selectedUniqueId: any) {
    this.loadingService.show("Loading...");
    //console.log("edit member detals", selectedUniqueId)
    if (this.shareData.isLogin == true) {
      this.apiService.callEditUserApi(selectedUniqueId)
        .subscribe((data: any) => {
          if (data.action == "yes") {
            this.editMember = data.memberDetails;
            if (data.memberDetails == null) {
              this.loadingService.hide();
              this.loadingService.showToast("Menber Details is Not Found !!", 2000, "danger");
            } else {
              this.callDropDownApi();
              setTimeout(() => {
                this.loadingService.hide();
                this.router.navigate(['edit-user', { sendEditMember: JSON.stringify(data.memberDetails) }])
              }, 3000)
            }
          } else if (data.action == "no") {
            this.loadingService.hide();
          }
        })

    }

  }

  aproveUser(UserUniqueId: any) {
    //this.router.navigate(['aprove-user',])
    this.loadingService.show("Approving User...");
    this.apiService.callApproveUserApi(UserUniqueId).subscribe((data: any) => {
      if (data.action == "yes") {
        this.loadingService.hide();
        this.loadingService.showToast("User Approved Success.", 2000, "success");
        setTimeout(() => {
          this.callScreenApi(this.gotScreenId)
        }, 2000)
      } else if (data.action == "no") {
        this.loadingService.hide();
        this.loadingService.showToast("User Approved Fail.", 2000, "danger");
      }
    })
  }


  changePassword(userUniqueId: any) {
    //console.log('user unique id = ', userUniqueId);
    this.router.navigate(['change-password', { userUniqueId: userUniqueId }])

  }

  addNewUser() {
    this.loadingService.show("Loading...")
    this.apiService.callRoleApi()
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.shareData.roleList = data.role;
          //console.log("Role = ", this.shareData.roleList)
        }

      })

    this.apiService.callStateApi()
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.shareData.stateList = data.state;
          //console.log("state= ", this.shareData.stateList)
        }
      })


    setTimeout(() => {
      this.loadingService.hide();
      this.router.navigate(['add-user',])
    }, 300)

  }

  callDropDownApi() {
    this.apiService.callRoleApi()
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.shareData.roleList = data.role;
          //console.log("Role = ", this.shareData.roleList)
        }

      })

    this.apiService.callSponserApi(this.editMember.UserRoleUId)
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.shareData.sponserList = data.sponsor;
          // console.log("splonser = ", this.shareData.sponserList)
        }

      })

    this.apiService.callStateApi()
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.shareData.stateList = data.state;
          //console.log("state= ", this.shareData.stateList)
        }

      })
    if (this.editMember.state_id !== null) {
      this.apiService.callDistrictApi(this.editMember.state_id)
        .subscribe((data: any) => {
          if (data.action == "yes") {
            this.shareData.districtList = data.city;
            //console.log("districtList = ", this.shareData.districtList)
          }

        })
    }

  }

  loadMoreData(event) {
    setTimeout(() => {
      this.loadfirstItem += 10;
      event.target.complete();
    }, 300);

  }


}
