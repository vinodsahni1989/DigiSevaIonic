import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-digimart-orders',
  templateUrl: './digimart-orders.page.html',
  styleUrls: ['./digimart-orders.page.scss'],
})
export class DigimartOrdersPage implements OnInit {

  backButtonSubs: any;
  constructor(
    public platform: Platform,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  //for disable back button
  ionViewDidEnter() {
    setTimeout(() => {
      this.backButtonSubs = this.platform.backButton.subscribeWithPriority(9999, () => {
        this.router.navigate(['/menu/dashboard'])
      })
    }, 100);

  }
  ionViewWillLeave() {
    this.backButtonSubs.unsubscribe();
  }
  //for disable back button end
}
