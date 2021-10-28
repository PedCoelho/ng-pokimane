import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeGridComponent } from './poke-grid.component';

describe('PokeGridComponent', () => {
  let component: PokeGridComponent;
  let fixture: ComponentFixture<PokeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
