import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/config/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  passwordForm: FormGroup;
  isSubmited = false;
  newPassword: any = '';
  confPassword: any = '';
  authUid: any = '';


  constructor(
    private router: Router,
    public platform: Platform,
    private fromBuilder: FormBuilder,
    private apiService: ApiService,
    private eventService: EventService,
    private activatedroute: ActivatedRoute,
    private shareData: ShareDataService,
    private loadingService: LoadingService,
    private navController: NavController,
  ) {

    this.ValidatePasswordForm();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.activatedroute.params.subscribe((data: any) => {
      this.authUid = data.userUniqueId;
      //console.log("got user unique id =", this.authUid);
    })
  }

  ValidatePasswordForm() {
    this.passwordForm = this.fromBuilder.group({
      newPassword: ['', [Validators.required]],
      confPassword: ['', [Validators.required]],
    })
  }

  get errorControl() {
    return this.passwordForm.controls;
  }


  updatePassword() {
    this.isSubmited = true;
    if (!this.passwordForm.valid) {
      // console.log(" User update Invalid")
      return false;
    } else {
      //console.log("user update valid");
      if (this.passwordForm.value.newPassword == this.passwordForm.value.confPassword) {
        this.loadingService.show("Changing Password...")
        this.apiService.changePasswordApi(this.passwordForm.value.newPassword, this.authUid)
          .subscribe((data: any) => {
            if (data !== null) {
              if (data.action == "yes") {
                this.loadingService.hide();
                this.loadingService.showToast(data.msg, 1000, "success");
                //console.log("change pass success ", data)
                setTimeout(() => {
                  this.router.navigate(['/menu/users', { screenId: "22", screenName: "Users" }]);
                }, 2000)
              }
            } else if (data == null) {
              this.loadingService.hide();
              this.loadingService.showToast("Server Side Error.", 2000, 'danger');
            }
          }, (error: any) => {
            this.loadingService.hide();
            //console.log("change pass  fail ", error);
          })
      } else {
        this.loadingService.showToast("Confirm Password Did Not Match.", 2000, 'danger');
      }
    }

  }

}
