import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomfileComponent } from './customfile.component';

describe('CustomfileComponent', () => {
  let component: CustomfileComponent;
  let fixture: ComponentFixture<CustomfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
