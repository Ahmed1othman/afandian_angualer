import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerHeadComponent } from './banner-head.component';

describe('BannerHeadComponent', () => {
  let component: BannerHeadComponent;
  let fixture: ComponentFixture<BannerHeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerHeadComponent]
    });
    fixture = TestBed.createComponent(BannerHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
