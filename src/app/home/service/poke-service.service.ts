import { PokemonDetail } from './../models/pokemon-detail.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokeApiListEntry } from '../models/pokeapilistentry.interface';


let pokimane: PokemonDetail[] = []
let API_URL: string = 'https://pokeapi.co/api/v2/pokemon/?offset='

@Injectable()

export class PokeService {

  constructor(private http: HttpClient) { }

  getPage(page: number) {
    return this.http.get<PokeApiListEntry[]>(API_URL + page)
    //maybe should be handled internally
  }

  getDetails(url: string) {
    // if (url) {
    //todo como fazer para inserir uma condição aqui? 
    //todo o que fazer aqui caso o http request falhe 
    return this.http.get(url)
    // }
  }

  get() {
    return pokimane.slice()
  }

  add(poki: PokemonDetail) {
    pokimane.push(poki)
    return this.get()
  }
}

