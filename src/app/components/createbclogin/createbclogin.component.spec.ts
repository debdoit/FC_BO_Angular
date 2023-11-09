import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebcloginComponent } from './createbclogin.component';

describe('CreatebcloginComponent', () => {
  let component: CreatebcloginComponent;
  let fixture: ComponentFixture<CreatebcloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatebcloginComponent]
    });
    fixture = TestBed.createComponent(CreatebcloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
