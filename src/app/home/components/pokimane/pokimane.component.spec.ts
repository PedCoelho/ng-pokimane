import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokimaneComponent } from './pokimane.component';

describe('PokimaneComponent', () => {
  let component: PokimaneComponent;
  let fixture: ComponentFixture<PokimaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokimaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokimaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
