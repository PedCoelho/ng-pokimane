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
  public next_page?: number

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
  public getResults(page: number) {
    this.pokeService.getPage(page).subscribe((page_data) => {
      console.log(page_data)

      // let page = [...new URLSearchParams(page_data.next).values()][0]
      //ESSA PORRA FUNCIONA NO BROWSER, MAS NÃO FUNCIONA AQUI PORQUE C****** ?

      let reg = new RegExp(/\?offset=(.*?)&/)
      let pageN: string | null = (page_data.next.match(reg) || [null, null])[1] //gambiarra anti-typescript

      this.next_page = Number(pageN)
      console.log(pageN, this.next_page)

      let observables = page_data.results.map((pokimane) => {
        return this.pokeService.getDetails(pokimane.url)
      })

      concat(...observables).subscribe((pokimane_detail) => {
        this.poki = this.pokeService.add(pokimane_detail)
      })
    })
  }

  public getNextPage() {
    let next = this.next_page
    if (next) {
      this.getResults(next)
    }
  }

  ngOnInit() {
    this.getResults(0)
  }

}

