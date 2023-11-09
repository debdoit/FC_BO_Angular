import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedprofessionallistComponent } from './trustedprofessionallist.component';

describe('TrustedprofessionallistComponent', () => {
  let component: TrustedprofessionallistComponent;
  let fixture: ComponentFixture<TrustedprofessionallistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrustedprofessionallistComponent]
    });
    fixture = TestBed.createComponent(TrustedprofessionallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
