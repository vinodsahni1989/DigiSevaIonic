import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';

@Component({
  selector: 'app-digi-mart',
  templateUrl: './digi-mart.page.html',
  styleUrls: ['./digi-mart.page.scss'],
})
export class DigiMartPage implements OnInit {


  tempJson: any;

  productArray: any;
  imageUrl: any = 'http://digisevakendra.com/admin/digimart-images/';


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
    this.tempJson =
      [
        {
          "form_description": "आय प्रमाण पत्र ऑनलाइन",
          "form_id": "1",
          "form_name": "CROMPTON - 60 Watt Normal Bulb",
          "form_price": "904",

        },
        {
          "form_description": "आय प्रमाण पत्र ऑनलाइन",
          "form_id": "2",
          "form_name": "CROMPTON - 100 Watt Normal Bulb",
          "form_price": "114",
        },
        {
          "form_description": "आय प्रमाण पत्र ऑनलाइन",
          "form_id": "3",
          "form_name": "UJALA - 9 Watt EESL LED Bulb",
          "form_price": "204",
        },
        {
          "form_description": "आय प्रमाण पत्र ऑनलाइन",
          "form_id": "4",
          "form_name": "CROMPTON - 7 Watt LED Bulb",
          "form_price": "240",
        },

      ]

    this.callProductApi();



  }

  ngOnInit() {
  }

  callProductApi() {
    this.loadingService.show("Loading...")
    this.apiService.callDigiMartApi()
      .subscribe((data: any) => {
        if (data.action == "yes") {
          this.loadingService.hide();
          this.productArray = data.data;
          //console.log("product array succ=", this.productArray);
        } else if (data.action == "no") {
          this.loadingService.hide();
          //console.log("product array fail=", data);
        }
      })

  }
  addToCart(item: any) {
    console.log("add to cart product =", item);
  }

}
