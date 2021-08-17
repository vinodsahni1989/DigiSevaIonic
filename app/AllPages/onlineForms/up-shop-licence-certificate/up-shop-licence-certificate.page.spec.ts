import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpShopLicenceCertificatePage } from './up-shop-licence-certificate.page';

describe('UpShopLicenceCertificatePage', () => {
  let component: UpShopLicenceCertificatePage;
  let fixture: ComponentFixture<UpShopLicenceCertificatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpShopLicenceCertificatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpShopLicenceCertificatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
