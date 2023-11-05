import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoCrearComponent } from './movimiento-crear.component';

describe('MovimientoCrearComponent', () => {
  let component: MovimientoCrearComponent;
  let fixture: ComponentFixture<MovimientoCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimientoCrearComponent]
    });
    fixture = TestBed.createComponent(MovimientoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
