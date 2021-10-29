import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonDetail } from '../../models/pokemon-detail.interface';

@Component({
  selector: 'po-kimane',
  templateUrl: './pokimane.component.html',
  styleUrls: ['./pokimane.component.scss'],
})

export class PokimaneComponent implements OnInit {

  @Input() pokimane!: PokemonDetail

  types: string[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.types = this.pokimane.types.map(({ type }) => type.name)
  }

  public gotoDetail(): void {
    this.router.navigate(['/detail', { id: this.pokimane.id }]);
  }
}
