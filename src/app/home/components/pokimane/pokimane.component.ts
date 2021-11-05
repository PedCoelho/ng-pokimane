import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeDetail } from '../../models/pokemon-detail.interface';

@Component({
  selector: 'po-kimane',
  templateUrl: './pokimane.component.html',
  styleUrls: ['./pokimane.component.scss'],
})

export class PokimaneComponent {

  @Input() pokimane: PokeDetail = {
    id: 0,
    name: 'default',
    sprites: { other: '', main: '' },
    types: []
  }

  constructor(
    private router: Router
  ) { }

  gotoDetail(): void {
    this.router.navigate(['/detail', { id: this.pokimane.id }]);
  }
}
