import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarioPdPage } from './calendario-pd.page';

describe('CalendarioPdPage', () => {
  let component: CalendarioPdPage;
  let fixture: ComponentFixture<CalendarioPdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioPdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
