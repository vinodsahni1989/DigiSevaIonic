import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UdhyogAdharCertificatePage } from './udhyog-adhar-certificate.page';

describe('UdhyogAdharCertificatePage', () => {
  let component: UdhyogAdharCertificatePage;
  let fixture: ComponentFixture<UdhyogAdharCertificatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UdhyogAdharCertificatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UdhyogAdharCertificatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
