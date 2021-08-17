import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';


@Component({
  selector: 'app-download-management',
  templateUrl: './download-management.page.html',
  styleUrls: ['./download-management.page.scss'],
})
export class DownloadManagementPage implements OnInit {




  gotScreenTitle: any;
  screenDataArray: any = '';
  gotScreenName: any;
  gotScreenId: any;
  formDownloadUrl = 'http://digisevakendra.com/admin/forms/';


  constructor(
    private router: Router,
    public platform: Platform,
    private loadingService: LoadingService,
    private shareData: ShareDataService,
    private apiService: ApiService,
    private eventService: EventService,
    public alertController: AlertController,
    private activatedroute: ActivatedRoute,
    private inAppBrowser: InAppBrowser,
    private downloader: Downloader
  ) {

    this.gotScreenId = this.activatedroute.snapshot.paramMap.get('screenId');
    //console.log("got screen id =", this.gotScreenId)
    if (this.gotScreenId == "35") {
      this.gotScreenName = 'imp-download';
    } else if (this.gotScreenId == "36") {
      this.gotScreenName = 'form-download';
    }
    this.gotScreenTitle = this.activatedroute.snapshot.paramMap.get('screenName');
    //console.log("got screen title =", this.gotScreenTitle)
    this.callApiByScreen_Name(this.gotScreenName)
  }

  ngOnInit() {
  }

  callApiByScreen_Name(gotScreenName: any) {
    this.screenDataArray = '';
    this.loadingService.show("Loading...");

    this.apiService.callApiByScreenName(gotScreenName, this.shareData.memberDetails.UserRoleUId,
      this.shareData.memberDetails.UniqueId)
      .subscribe((data: any) => {
        if (data !== null) {
          if (data.action == "yes") {
            this.loadingService.hide();
            if (gotScreenName == 'imp-download') {
              this.screenDataArray = data['imp-download'];
            } else if (gotScreenName == 'form-download') {
              this.screenDataArray = data['form-download'];
            }
            //console.log("screen " + gotScreenName + " Array =", this.screenDataArray)
          }
        } else if (data == null) {
          this.loadingService.hide();
          this.screenDataArray = null;
        }

      })
  }


  openLink(url: any) {
    if (this.shareData.isLogin) {
      //console.log("download link =", url)
      var options: InAppBrowserOptions = {
        location: 'yes',//Or 'no' 
        hidden: 'no', //Or  'yes'
        clearcache: 'yes',
        clearsessioncache: 'yes',
        zoom: 'no',//Android only ,shows browser zoom controls 
        disallowoverscroll: 'no', //iOS only 
        toolbar: 'yes', //iOS only  
        hideurlbar: "yes",
        hardwareback: 'yes'
      }
      this.inAppBrowser.create(url, '', options);
    }

  }

  downloadForm(download_link: any, title: any) {

    this.loadingService.show("Downloading...")
    var stringUrl = this.formDownloadUrl + download_link;
    console.log("string url =", stringUrl + "title= ", title)

    var temp = download_link;
    var extention = temp.split('.').pop();
    //alert("extention =" + extention)

    var request: DownloadRequest = {
      uri: stringUrl.toString(),
      title: title.toString(),
      description: title + 'Downloading',
      mimeType: extention.toString(),
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Downloads/DigiSeva Forms',
        subPath: title.toString() + "." + extention
      }
    };


    this.downloader.download(request)
      .then((location: string) => {
        this.loadingService.hide();
        this.loadingService.showToast("File Downloaded Successfully.", 2000, 'success')
        //console.log('File downloaded at:' + location)
        //alert('File downloaded at:' + location);
      }).catch((error: any) => {
        this.loadingService.hide();
        this.loadingService.showToast("File Download Failed.", 2000, 'danger')
        //console.error("error =", error)
        //alert("error= " + error)
      });

  }


}
