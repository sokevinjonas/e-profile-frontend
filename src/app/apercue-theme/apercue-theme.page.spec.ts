import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApercueThemePage } from './apercue-theme.page';

describe('ApercueThemePage', () => {
  let component: ApercueThemePage;
  let fixture: ComponentFixture<ApercueThemePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApercueThemePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
