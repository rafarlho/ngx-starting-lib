import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSetupLibComponent } from './angular-setup-lib.component';

describe('AngularSetupLibComponent', () => {
  let component: AngularSetupLibComponent;
  let fixture: ComponentFixture<AngularSetupLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularSetupLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularSetupLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
