import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyUsComponent } from './only-us.component';

describe('OnlyUsComponent', () => {
  let component: OnlyUsComponent;
  let fixture: ComponentFixture<OnlyUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlyUsComponent]
    });
    fixture = TestBed.createComponent(OnlyUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
