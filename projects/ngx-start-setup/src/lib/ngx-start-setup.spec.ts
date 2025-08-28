import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxStartSetup } from './ngx-start-setup';

describe('NgxStartSetup', () => {
  let component: NgxStartSetup;
  let fixture: ComponentFixture<NgxStartSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxStartSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxStartSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
