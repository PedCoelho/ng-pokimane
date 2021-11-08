import { PokeApiPageData } from './../models/pokeapilistentry.interface';
import { PokeDetail, PokeApiDetail } from './../models/pokemon-detail.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

let API_URL: string = 'https://pokeapi.co/api/v2/pokemon/?offset='

@Injectable()
export class PokeService {

  private pokimane: PokeDetail[] = []
  pokiSubject: Subject<PokeDetail[]> = new ReplaySubject<PokeDetail[]>()
  // pokeObservable: Observable<PokeDetail[]> = new Observable()

  private next_page?: number
  private nextPageUrl: string = ''

  constructor(private http: HttpClient) { }

  getPage(page: number): Observable<PokeApiPageData> {
    return this.http.get<PokeApiPageData>(API_URL + page + '&limit=151').pipe(
      tap(response => this.getNextPageUrl(response))
    )
  }

  getDetails(url: string) {
    //review como fazer para inserir uma condição aqui? 
    //review o componente consumidor espera um Observable, como fazer ele ficar de boa com um retorno vazio ou nenhum retorno 
    // if (url) {
    //review tentativa de simplificar a resposta da API para que os componentes tenham menos trabalho

    return this.http.get<PokeApiDetail>(url).pipe(
      map(({ name, id, types, sprites, ...rest }) => {
        const revised_types: string[] = types.map(x => x.type.name)
        const revised_sprites: { main: string, other: string } = { main: sprites.other.home.front_default, other: sprites.front_default }

        const poke_data: PokeDetail = { name, id, types: revised_types, sprites: revised_sprites, ...rest }

        return poke_data
      }),
      tap((data) => {
        this.add(data)
        this.pokiSubject.next(this.pokimane.slice())
      })
    )



    /* --------------- o que fazer aqui caso o http request falhe --------------- */
    /* ---------------- entender tratamento de erro em Observable --------------- */
    // }

  }

  add(poki: PokeDetail) {
    this.pokimane.push(poki)
    return this.get()
  }

  get(): PokeDetail[] {
    /* -------------------------------------------------------------------------- */
    /*                                 synchronous                               */
    /* -------------------------------------------------------------------------- */
    return this.pokimane.slice()
  }

  private getNextPageUrl(response: PokeApiPageData) {
    console.log(response.next)
    if (!response.next) return
    this.nextPageUrl = response.next
  }

  public getNextPageN(): number | undefined {
    return this.next_page
  }

  public setNextPageN(pageN: number): number | undefined {
    if (!pageN) {
      return
    }
    this.next_page = pageN
    return this.next_page
  }
}



