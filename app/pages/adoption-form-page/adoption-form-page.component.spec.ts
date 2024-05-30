import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionFormPageComponent } from './adoption-form-page.component';

describe('AdoptionFormPageComponent', () => {
  let component: AdoptionFormPageComponent;
  let fixture: ComponentFixture<AdoptionFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdoptionFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
