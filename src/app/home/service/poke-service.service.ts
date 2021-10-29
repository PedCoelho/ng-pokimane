import { PokeApiPageData } from './../models/pokeapilistentry.interface';
import { PokemonDetail } from './../models/pokemon-detail.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL: string = 'https://pokeapi.co/api/v2/pokemon/?offset='

@Injectable()
export class PokeService {

  private pokimane: PokemonDetail[] = []

  constructor(private http: HttpClient) { }

  getPage(page: number) {
    return this.http.get<PokeApiPageData>(API_URL + page + '&limit=151')
  }

  getDetails(url: string) {
    // if (url) {
    //todo como fazer para inserir uma condição aqui? 
    //review o componente consumidor espera um Observable, como fazer ele ficar de boa com um retorno vazio ou nenhum retorno 

    return this.http.get<PokemonDetail>(url)
    // }
    //todo o que fazer aqui caso o http request falhe 
  }

  get(): PokemonDetail[] //is return type important to declare?
  {
    return this.pokimane.slice()
  }

  add(poki: PokemonDetail) {
    this.pokimane.push(poki)
    return this.get()
  }
}

