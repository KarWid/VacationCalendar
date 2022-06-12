import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMessageManagerComponent } from './ui-message-manager.component';

describe('UiMessageManagerComponent', () => {
  let component: UiMessageManagerComponent;
  let fixture: ComponentFixture<UiMessageManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiMessageManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiMessageManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
