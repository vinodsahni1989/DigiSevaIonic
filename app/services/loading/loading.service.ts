import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: HTMLIonLoadingElement;

  isLoading = false;
  constructor(
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public alertCtrl: AlertController,
  ) {


  }


  async show(message: any) {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      message: message,
      spinner: 'circular',
      backdropDismiss: false // disabled outside click
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async hide() {

    setTimeout(async () => {
      this.isLoading = false;
      return await this.loadingCtrl.dismiss().then(() => {
        //console.log('dismissed');
      });
    }, 100)

  }


  async autoHide(time: number, message: any) {
    this.loading = await this.loadingCtrl.create({
      duration: time,
      message: message,
      spinner: 'circular',
      backdropDismiss: false,
    });
    this.loading.present();
  }



  // async show() {
  //   this.loading = await this.loadingCtrl.create({
  //     cssClass: 'custom-loading'

  //   });
  //   this.loading.present();
  // }

  // hide() {
  //   try {
  //     setTimeout(() => {
  //       this.loading.dismiss();
  //     }, 200)
  //   } catch (error) {
  //     console.log("loading hide error");
  //   }
  // }



  // async autoHide(time: number) {
  //   this.loading = await this.loadingCtrl.create({
  //     duration: time,
  //     cssClass: 'custom-loading'
  //   });
  //   this.loading.present();
  // }


  async showToast(message: any, duration: number, tstColor: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'top',
      color: tstColor,
      cssClass: 'custom-Toast',

    });
    toast.present();
  }


  async showAlertWithTitle(text, title) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: text,
      buttons: ["ok"],
      backdropDismiss: false // <- Here! :)
    });
    await alert.present();
  }

}
