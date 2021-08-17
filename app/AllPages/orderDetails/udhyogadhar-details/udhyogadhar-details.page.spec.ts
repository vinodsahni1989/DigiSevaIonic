import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UdhyogadharDetailsPage } from './udhyogadhar-details.page';

describe('UdhyogadharDetailsPage', () => {
  let component: UdhyogadharDetailsPage;
  let fixture: ComponentFixture<UdhyogadharDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UdhyogadharDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UdhyogadharDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
