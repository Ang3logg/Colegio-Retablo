import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaReunionPage } from './nueva-reunion.page';

describe('NuevaReunionPage', () => {
  let component: NuevaReunionPage;
  let fixture: ComponentFixture<NuevaReunionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaReunionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
