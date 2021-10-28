import { PokemonDetail } from './../../models/pokemon-detail.interface';
import { Component, OnInit } from '@angular/core';
import { concat, from, of } from 'rxjs';

import { PokeService } from '../../service/poke-service.service'

@Component({
  selector: 'po-kegrid',
  templateUrl: './poke-grid.component.html',
  styleUrls: ['./poke-grid.component.scss']
})

export class PokeGridComponent implements OnInit {

  public poki: PokemonDetail[] = []
  private next_url: string = ''

  constructor(private pokeService: PokeService) { }

  /* -------------------------------------------------------------------------- */
  /*                          option 1 : non sequential                         */
  /* -------------------------------------------------------------------------- */
  // getResults(page: number) {
  //   this.pokeService.getPage(page).subscribe((res: any) => {

  //     console.log(res)

  //     res?.results.forEach((pokimane: any) => {
  //       this.pokeService.getDetails(pokimane.url)?.subscribe((poki: any) => {
  //         this.poki = this.pokeService.add(poki)
  //       })
  //     })
  //   })
  // }

  /* -------------------------------------------------------------------------- */
  /*         option 2 : build observable array and request sequentially         */
  /* -------------------------------------------------------------------------- */
  private getResults(page: number) {
    this.pokeService.getPage(page).subscribe((page_data) => {
      console.log(page_data)
      let observables = page_data.results.map((pokimane) => {
        return this.pokeService.getDetails(pokimane.url)
      })

      concat(...observables).subscribe((pokimane_detail) => {
        this.poki = this.pokeService.add(pokimane_detail)
      })
    })
  }

  ngOnInit() {
    this.getResults(0)
  }

}

