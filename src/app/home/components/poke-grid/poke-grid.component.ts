import { PokeApiPageData } from './../../models/pokeapilistentry.interface';
import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';

import { PokeService } from '../../service/poke-service.service'
import { PokeDetail } from '../../models/pokemon-detail.interface';

@Component({
  selector: 'po-kegrid',
  templateUrl: './poke-grid.component.html',
  styleUrls: ['./poke-grid.component.scss']
})

export class PokeGridComponent implements OnInit {

  public next_page?: number = this.pokeService.getNextPageN()
  private pokis: PokeDetail[] = this.pokeService.get()

  constructor(private pokeService: PokeService) { }

  ngOnInit() {
    if (!this.pokis.length) this.getResults(0)
  }

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

  private setNextPage(api_response: PokeApiPageData): void {
    console.log(api_response)
    // let page = [...new URLSearchParams(api_response.next).values()][0]
    //ESSA PORRA FUNCIONA NO BROWSER, MAS NÃO FUNCIONA AQUI PORQUE C****** ?

    let reg = new RegExp(/\?offset=(.*?)&/)
    let pageN: string | undefined = (api_response.next?.match(reg) || [undefined, undefined])[1] //gambiarra anti-typescript

    //review controle explicito, mudar para reativo / rxjs
    this.next_page = this.pokeService.setNextPageN(Number(pageN))
    console.log(this.next_page)
  }

  public getNextPage(): void {
    let next = this.next_page
    if (next) {
      this.getResults(next)
    }
  }


}

