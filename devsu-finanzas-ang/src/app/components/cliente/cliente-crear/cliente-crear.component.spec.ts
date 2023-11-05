import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteCrearComponent } from './cliente-crear.component';

describe('ClienteCrearComponent', () => {
  let component: ClienteCrearComponent;
  let fixture: ComponentFixture<ClienteCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteCrearComponent],
      imports: [ReactiveFormsModule], // Importa ReactiveFormsModule para trabajar con FormGroup.
    });

    fixture = TestBed.createComponent(ClienteCrearComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
