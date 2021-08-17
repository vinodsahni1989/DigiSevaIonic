import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.page.html',
  styleUrls: ['./order-management.page.scss'],
})
export class OrderManagementPage implements OnInit {



  gotScreenId: any;
  gotScreenName: any;
  screenDataArray: any;
  loadfirstItem: number = 10;

  constructor(
    private router: Router,
    public platform: Platform,
    private loadingService: LoadingService,
    private shareData: ShareDataService,
    private apiService: ApiService,
    private eventService: EventService,
    public alertController: AlertController,
    private activatedroute: ActivatedRoute,

  ) {
    this.gotScreenId = Number(this.activatedroute.snapshot.paramMap.get('screenId'))
    //console.log("got screen id =", this.gotScreenId)
    this.gotScreenName = this.activatedroute.snapshot.paramMap.get('screenName')
    //console.log("got screen name =", this.gotScreenName)
    this.callScreenApi(this.gotScreenId)
  }


  ngOnInit(): void {

  }

  callScreenApi(screenId: any) {
    this.loadingService.show("Loading...");
    this.apiService.callScreeApi(screenId, this.shareData.memberDetails.UserRoleUId,
      this.shareData.memberDetails.UniqueId)
      .subscribe((data: any) => {
        if (data !== null) {
          if (data.action == "yes") {
            this.loadingService.hide();
            this.screenDataArray = data.screen;
            console.log("order management api =", this.screenDataArray)
          }
        } else if (data == null) {
          this.loadingService.hide();
          this.screenDataArray = null;
        }

      })
  }



  viewOrderDetails(item: any) {
    this.loadingService.show("Loading...");
    console.log("item=", item);
    this.apiService.callViewOrderDetailsApi(item.form_type, item.order_id)
      .subscribe((data: any) => {
        if (data.action == 'yes') {
          this.loadingService.hide();
          console.log("order details =", data)
          if (item.form_type == "5") {
            this.router.navigate(['/pancard-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "1") {
            this.router.navigate(['/income-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "2") {
            this.router.navigate(['/caste-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "3") {
            this.router.navigate(['/domicile-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "17") {
            this.router.navigate(['/birth-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "18") {
            this.router.navigate(['/death-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "19") {
            this.router.navigate(['/rationcard-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "10") {
            this.router.navigate(['/oldagepention-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "11") {
            this.router.navigate(['/widowpention-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "22") {
            this.router.navigate(['/newgst-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "13") {
            this.router.navigate(['/shadianudan-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "12") {
            this.router.navigate(['/handicap-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "14") {
            this.router.navigate(['/parivarik-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "36") {
            this.router.navigate(['/voterid-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "30") {
            this.router.navigate(['/pmkishan-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "16") {
            this.router.navigate(['/upshramik-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "26") {
            this.router.navigate(['/upshoplicence-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "27") {
            this.router.navigate(['/udhyogadhar-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "28") {
            this.router.navigate(['/passport-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "9") {
            this.router.navigate(['/passport-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          } else if (item.form_type == "21") {
            this.router.navigate(['/pvccard-details', { 'formType': JSON.stringify(item) }]);
            this.eventService.publishData(data);
          }







          else {
            this.loadingService.hide();
            this.loadingService.showToast("Server Side Error.", 2000, 'danger');
          }

        } else if (data.action == "no") {
          this.loadingService.hide();
          this.loadingService.showToast(data.msg, 2000, 'danger');
        }

      }, (error: any) => {


      })
  }

  loadMoreData(event) {
    setTimeout(() => {
      this.loadfirstItem += 10;
      event.target.complete();
    }, 300);

  }
}
