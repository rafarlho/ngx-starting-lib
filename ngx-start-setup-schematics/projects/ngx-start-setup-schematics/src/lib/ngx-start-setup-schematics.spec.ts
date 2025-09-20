import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxStartSetupSchematics } from './ngx-start-setup-schematics';

describe('NgxStartSetupSchematics', () => {
  let component: NgxStartSetupSchematics;
  let fixture: ComponentFixture<NgxStartSetupSchematics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxStartSetupSchematics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxStartSetupSchematics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
