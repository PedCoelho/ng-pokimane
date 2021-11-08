import { PokeService } from './../../service/poke-service.service';
import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { PoAccordionItemComponent } from '@po-ui/ng-components';
import { PokeDetail } from '../../models/pokemon-detail.interface';
import { KeyValue } from '@angular/common';
import { map, mergeAll, take, tap, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

/* -------------------------------------------------------------------------- */
/*              dynamic object definition to hold pokemons by type            */
/* -------------------------------------------------------------------------- */
interface PokeDetailsByType extends Record<string, PokeDetail[]> { }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterContentInit {
  public pokeTypes: PokeDetailsByType = {}

  //vale a pena sempre declarar o tipo esperado, mesmo no caso de observables?
  public selectedType$: BehaviorSubject<string> = new BehaviorSubject('')

  private curr_pokimanes$: Observable<PokeDetail[]> = this.pokeService.pokiSubject

  private filtered_pokimanes$ = this.curr_pokimanes$.pipe(
    withLatestFrom(this.selectedType$),
    map(([pokemons, type]) => type.length ? pokemons.filter(poke => poke.types.includes(type)) : pokemons),
    tap(pokemons => this.pokeTypes = this.updateTypes(pokemons)), //side effect
  )

  /* -------------------------------------------------------------------------- */
  /*                    talvez não precise ser um observable                    */
  /* -------------------------------------------------------------------------- */
  private initial_pokimanes$ = of(this.pokeService.get()).pipe(
    tap(pokemons => {
      console.log(pokemons)
      this.pokeTypes = this.updateTypes(pokemons)
    })
  )

  private typeInputListener$ = this.selectedType$.pipe(
    tap((type) => console.log('selected type changed:', type)),
    withLatestFrom(this.curr_pokimanes$), //DEBUG a execução estáva morrendo aqui. Resolvido com ReplaySubject.
    tap(([type, pokes]) => console.log('pokes:', pokes)),
    map(([type, pokemons]) => type.length ? pokemons.filter(poke => poke.types.includes(type)) : pokemons),
    tap((pokemons) => this.pokeTypes = this.updateTypes(pokemons)),
  )


  public combined_stream$ = of(this.initial_pokimanes$, this.filtered_pokimanes$, this.typeInputListener$).pipe(mergeAll())

  constructor(private pokeService: PokeService) { }

  @ViewChild('allPokimane') allPokimane!: PoAccordionItemComponent;

  ngAfterContentInit() {
    console.log(this.selectedType$)
    // const subs = this.combined_stream$.subscribe(x => console.log('Updated Pokemon array in service', x))
    // const whatever = this.selectedType$.subscribe(x => console.log('Updated selected type', x))

    setTimeout(() => this.allPokimane.expand(), 0);
  }

  /* -------------------------------------------------------------------------- */
  /*                      keyvalue pipe compareFn parameter                     */
  /* -------------------------------------------------------------------------- */
  compareEntries(a: KeyValue<string, PokeDetail[]>, b: KeyValue<string, PokeDetail[]>): number {
    return b.value.length - a.value.length
  }

  selectType(type: string) {
    if (this.selectedType$.value == type) {
      console.log('is equal', console.log(this.selectedType$.value))
      this.selectedType$.next('')
      return
    }
    this.selectedType$.next(type)
  }

  private updateTypes(pokimanes: PokeDetail[]): PokeDetailsByType {

    return pokimanes.reduce((acc: PokeDetailsByType, obj: PokeDetail) => {
      obj.types.forEach(type => {
        acc[type] ? acc[type] = [...acc[type], obj] : acc[type] = [obj]
      })
      return acc
    }, {}) || {}

  }
}
function startsWith(arg0: never[]): import("rxjs").OperatorFunction<PokeDetail[], unknown> {
  throw new Error('Function not implemented.');
}

