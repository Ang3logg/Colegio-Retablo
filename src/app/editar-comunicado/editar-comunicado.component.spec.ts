import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditarComunicadoComponent } from './editar-comunicado.component';

describe('EditarComunicadoComponent', () => {
  let component: EditarComunicadoComponent;
  let fixture: ComponentFixture<EditarComunicadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EditarComunicadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarComunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
