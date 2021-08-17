import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PmKisanSammanFormPage } from './pm-kisan-samman-form.page';

describe('PmKisanSammanFormPage', () => {
  let component: PmKisanSammanFormPage;
  let fixture: ComponentFixture<PmKisanSammanFormPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PmKisanSammanFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PmKisanSammanFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
