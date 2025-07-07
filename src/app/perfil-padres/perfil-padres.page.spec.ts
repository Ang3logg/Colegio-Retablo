import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPadresPage } from './perfil-padres.page';

describe('PerfilDirectorPage', () => {
  let component: PerfilPadresPage;
  let fixture: ComponentFixture<PerfilPadresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPadresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
