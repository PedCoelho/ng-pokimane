import { PokeApiPageData } from './../models/pokeapilistentry.interface';
import { PokeDetail, PokemonDetail } from './../models/pokemon-detail.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL: string = 'https://pokeapi.co/api/v2/pokemon/?offset='

@Injectable()
export class PokeService {

  private pokimane: PokeDetail[] = []

  constructor(private http: HttpClient) { }

  getPage(page: number): Observable<PokeApiPageData> {
    return this.http.get<PokeApiPageData>(API_URL + page + '&limit=151')
  }

  getDetails(url: string) {
    //review como fazer para inserir uma condição aqui? 
    //review o componente consumidor espera um Observable, como fazer ele ficar de boa com um retorno vazio ou nenhum retorno 
    // if (url) {

    //review tentativa de simplificar a resposta da API para que os componentes tenham menos trabalho
    return this.http.get<PokemonDetail>(url).pipe(
      map(({ name, id, types, sprites, ...rest }) => {
        const revised_types: string[] = types.map(x => x.type.name)
        const revised_sprites: { main: string, other: string } = { main: sprites.other.home.front_default, other: sprites.front_default }

        const poke_data: PokeDetail = { name, id, types: revised_types, sprites: revised_sprites, ...rest }

        return poke_data
      }))

    /* --------------- o que fazer aqui caso o http request falhe --------------- */
    /* ---------------- entender tratamento de erro em Observable --------------- */
    // }

  }

  add(poki: PokeDetail) {
    this.pokimane.push(poki)
    return this.get()
  }

  get(): Observable<PokeDetail[]> {
    /* -------------------------------------------------------------------------- */
    /*                                 asynchronous                               */
    /* -------------------------------------------------------------------------- */
    return new Observable((observer: Observer<PokeDetail[]>) => { observer.next(this.pokimane.slice()) })
  }
}



