import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdashComponent } from './customerdash.component';

describe('CustomerdashComponent', () => {
  let component: CustomerdashComponent;
  let fixture: ComponentFixture<CustomerdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerdashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
