import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {


  constructor(
    private storage: Storage,
    public router: Router,
  ) { }

  async ngOnInit() {
    await this.storage.create();
  }
  done() {
    this.router.navigate(['/login']);
    this.storage.set("loadingFirstTime", true);
  }
}
