import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevoComunicadoComponent } from './nuevo-comunicado.component';

describe('NuevoComunicadoComponent', () => {
  let component: NuevoComunicadoComponent;
  let fixture: ComponentFixture<NuevoComunicadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoComunicadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoComunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
