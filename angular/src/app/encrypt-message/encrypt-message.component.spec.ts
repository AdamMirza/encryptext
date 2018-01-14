import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptMessageComponent } from './encrypt-message.component';

describe('EncryptMessageComponent', () => {
  let component: EncryptMessageComponent;
  let fixture: ComponentFixture<EncryptMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncryptMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
