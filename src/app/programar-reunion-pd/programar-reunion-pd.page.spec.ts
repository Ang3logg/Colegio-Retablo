import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramarReunionPdPage } from './programar-reunion-pd.page';

describe('ProgramarReunionPdPage', () => {
  let component: ProgramarReunionPdPage;
  let fixture: ComponentFixture<ProgramarReunionPdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramarReunionPdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
