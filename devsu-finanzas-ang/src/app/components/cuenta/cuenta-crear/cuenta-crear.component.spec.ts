import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCrearComponent } from './cuenta-crear.component';

describe('CuentaCrearComponent', () => {
  let component: CuentaCrearComponent;
  let fixture: ComponentFixture<CuentaCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuentaCrearComponent]
    });
    fixture = TestBed.createComponent(CuentaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
