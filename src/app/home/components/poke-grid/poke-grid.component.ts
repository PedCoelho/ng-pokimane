import { PokeApiPageData } from './../../models/pokeapilistentry.interface';
import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';

import { PokeService } from '../../service/poke-service.service'

@Component({
  selector: 'po-kegrid',
  templateUrl: './poke-grid.component.html',
  styleUrls: ['./poke-grid.component.scss']
})

export class PokeGridComponent implements OnInit {

  public next_page?: number

  constructor(private pokeService: PokeService) { }

  /* -------------------------------------------------------------------------- */
  /*         option 2 : build observable array and request sequentially         */
  /* -------------------------------------------------------------------------- */
  private getResults(page: number): void {
    this.pokeService.getPage(page).subscribe((page_data) => {

      this.setNextPage(page_data)

      let observables = page_data.results.map((pokimane) => {
        return this.pokeService.getDetails(pokimane.url)
      })

      concat(...observables).subscribe((pokimane_detail) => {
        this.pokeService.add(pokimane_detail)
      })
    })
  }

  setNextPage(api_response: PokeApiPageData): void {
    console.log(api_response)
    // let page = [...new URLSearchParams(api_response.next).values()][0]
    //ESSA PORRA FUNCIONA NO BROWSER, MAS NÃO FUNCIONA AQUI PORQUE C****** ?

    let reg = new RegExp(/\?offset=(.*?)&/)
    let pageN: string | null = (api_response.next?.match(reg) || [null, null])[1] //gambiarra anti-typescript

    this.next_page = Number(pageN)
    console.log(this.next_page)
  }

  getNextPage(): void {
    let next = this.next_page
    if (next) {
      this.getResults(next)
    }
  }

  ngOnInit() {
    this.getResults(0)
  }

}

