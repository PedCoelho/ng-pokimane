import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'po-kimane',
  templateUrl: './pokimane.component.html',
  styleUrls: ['./pokimane.component.scss'],
})

export class PokimaneComponent implements OnInit {

  @Input() pokimane: any

  types!: string[]

  ngOnInit() {
    this.types = this.pokimane.types?.map(({ type }: any) => type.name)
  }
}
