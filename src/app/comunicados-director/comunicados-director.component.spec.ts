import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComunicadosDirectorComponent } from './comunicados-director.component';

describe('ComunicadosDirectorComponent', () => {
  let component: ComunicadosDirectorComponent;
  let fixture: ComponentFixture<ComunicadosDirectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunicadosDirectorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComunicadosDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
