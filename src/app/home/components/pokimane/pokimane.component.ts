import { Component, Input, OnInit } from '@angular/core';
import { PokemonDetail } from '../../models/pokemon-detail.interface';

@Component({
  selector: 'po-kimane',
  templateUrl: './pokimane.component.html',
  styleUrls: ['./pokimane.component.scss'],
})

export class PokimaneComponent implements OnInit {

  @Input() pokimane!: PokemonDetail

  types: string[] = []

  ngOnInit() {
    this.types = this.pokimane.types.map(({ type }) => type.name)
  }
}
