import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-pmkishan-details',
  templateUrl: './pmkishan-details.page.html',
  styleUrls: ['./pmkishan-details.page.scss'],
})
export class PmkishanDetailsPage implements OnInit {

  gotFormType: any;
  viewFormType: any;
  formDetails: any;
  formRubberStatus: any;
  formStatus: any;

  imageUrl: any = 'http://digisevakendra.com/admin/uploads/forms_data/';

  statusHeader: any = {
    header: 'Select Status',
  };

  statusType: any = '';
  remarks: any = '';
  fileBase64url: any = null;
  sendPDF: any;
  @ViewChild('myInput') myInputVariable: ElementRef;


  constructor(
    private router: Router,
    public platform: Platform,
    private loadingService: LoadingService,
    private shareData: ShareDataService,
    private apiService: ApiService,
    private eventService: EventService,
    public alertController: AlertController,
    private activatedroute: ActivatedRoute,
    private downloader: Downloader,

    private fileTransfer: FileTransfer,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private file: File,
  ) {
    this.callEvent()
  }

  callEvent() {
    this.gotFormType = JSON.parse(this.activatedroute.snapshot.paramMap.get('formType'))
    //console.log("got form =", this.gotFormType)
    this.viewFormType = this.gotFormType.form_type;
    //console.log("form Type =", this.viewFormType)

    this.eventService.currentEvent.subscribe((orderDetails: any) => {
      if (orderDetails !== null) {
        this.formRubberStatus = orderDetails.formdetails[0].status;
        this.formDetails = orderDetails.formdetails[0].formdata;
        this.formStatus = orderDetails.formstatus;
        console.log("order details =", orderDetails)
      } else if (orderDetails == null) {
      }
    });

  }

  ngOnInit() {
  }

  downloadAnything(download_link: any, title: any) {
    this.loadingService.show("Downloading...")
    var stringUrl = this.imageUrl + download_link;
    //console.log("string url =", stringUrl)
    //console.log("string title =", title)

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
        dirType: 'Downloads/DigiSeva',
        subPath: title.toString() + "." + extention
      }
    };

    this.downloader.download(request)
      .then((location: string) => {
        this.loadingService.hide();
        this.loadingService.showToast("Downloaded Successfully.", 2000, 'success')
        //console.log('File downloaded at:' + location)
        //alert('File downloaded at:' + location);
      }).catch((error: any) => {
        this.loadingService.hide();
        this.loadingService.showToast("Download Failed.", 2000, 'danger')
        //console.error("error =", error)
        //alert("error= " + error)
      });
  }

  submitStatus() {
    this.loadingService.show("Updating...")
    let updateStatuParam = {
      "order_id": this.gotFormType.order_id,
      "userid": this.shareData.memberDetails.UniqueId,
      "order_status": this.statusType,
      "remarks": this.remarks,
      "upload": this.fileBase64url
    }
    console.log("update param", updateStatuParam);
    this.apiService.updateOrderStatus1(updateStatuParam)
      .subscribe((data: any) => {
        this.loadingService.hide();
        if (data.action == 'yes') {
          this.loadingService.showToast(data.msg, 2000, 'success');
          //console.log("order update status = ", data)
        }

      })
  }

  selectFile(event: any): void {
    //console.log("file=", event.target.files);
    var fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = () => {
      this.sendPDF = fileReader.result;
      this.fileBase64url = this.sendPDF.replace(/^data:application\/[a-z]+;base64,/, "");
      //console.log("base 64 string url= ", this.fileBase64url);
    }
  }

  resetStatusUpdate() {
    this.loadingService.autoHide(1000, "Reseting...");
    setTimeout(() => {
      this.statusType = null;
      this.remarks = null;
      this.fileBase64url = null;
      this.myInputVariable.nativeElement.value = "";

    }, 1000)
  }


}