import { Component, OnInit } from '@angular/core';
// import { Pokemon } f/rom '../../models/pokeapilistentry.interface';
import { PokeService } from '../../service/poke-service.service'

import { concatMap } from 'rxjs/operators';
import { concat, from, of } from 'rxjs';

@Component({
  selector: 'po-kegrid',
  templateUrl: './poke-grid.component.html',
  styleUrls: ['./poke-grid.component.scss']
})

export class PokeGridComponent implements OnInit {

  poki: any[] = []
  next_url: string = ''

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
  /*                      option 2 : build observable array                     */
  /* -------------------------------------------------------------------------- */
  getResults(page: number) {
    this.pokeService.getPage(page).subscribe((res: any) => {
      // console.log(res)
      let observables = res.results.map((pokimane: any) => {
        return this.pokeService.getDetails(pokimane.url)
      })

      concat(...observables).subscribe((poki: any) => {
        this.poki = this.pokeService.add(poki)
      })
    })
  }

  // getResults(page: number) {
  //   this.pokeService.getPage(page).pipe(
  //     concatMap((res: any) => {
  //       return from(res.results)
  //     })
  //   ).subscribe((pokimane: any) => {
  //     console.log(pokimane)
  //     this.pokeService.getDetails(pokimane.url).subscribe((poki: any) => {
  //       this.poki = this.pokeService.add(poki)
  //     })
  //   })
  // }

  ngOnInit() {
    this.getResults(0)
  }

}

