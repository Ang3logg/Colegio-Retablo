import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPrincipalPdPage } from './menu-principal-pd.page';

describe('MenuPrincipalPdPage', () => {
  let component: MenuPrincipalPdPage;
  let fixture: ComponentFixture<MenuPrincipalPdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPrincipalPdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
