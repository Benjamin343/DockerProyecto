import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CertificadoCreadoComponent } from './certificado-creado.component';

describe('CertificadoCreadoComponent', () => {
  let component: CertificadoCreadoComponent;
  let fixture: ComponentFixture<CertificadoCreadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoCreadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoCreadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

 // it('should create', () => {
  //  expect(component).toBeTruthy();
  //});
});
