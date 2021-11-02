import { PokeService } from './../../service/poke-service.service';
import { AfterContentInit, Component, DoCheck, OnChanges, ViewChild } from '@angular/core';
import { PoAccordionItemComponent } from '@po-ui/ng-components';
import { PokeDetail } from '../../models/pokemon-detail.interface';
import { KeyValue } from '@angular/common';

/* -------------------------------------------------------------------------- */
/*               custom type definition to hold pokemons by type              */
/* -------------------------------------------------------------------------- */
interface PokeDetailsByType extends Record<string, PokeDetail[]> { }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterContentInit, DoCheck {

  // public curr_pokimanes: Observable<PokeDetail[]> | null = null
  public curr_pokimanes: PokeDetail[] = []
  public pokeTypes: PokeDetailsByType = {}

  constructor(private service: PokeService) {
    this.curr_pokimanes = service.get()
  }

  @ViewChild('allPokimane', { static: true }) allPokimane!: PoAccordionItemComponent;

  ngAfterContentInit() {
    this.curr_pokimanes = this.service.get()
    this.allPokimane.expand();
  }

  ngDoCheck(): void {
    /* -------------------------------------------------------------------------- */
    /*                          lifecycle hook monitoring                         */
    /* -------------------------------------------------------------------------- */
    /* ------------------------- custom change detection ------------------------ */
    if (this.curr_pokimanes.length != this.service.get().length) {
      this.curr_pokimanes = this.service.get()
      this.pokeTypes = this.updateTypes()
    }
  }

  updateTypes(): PokeDetailsByType {
    return this.curr_pokimanes.reduce((acc: PokeDetailsByType, obj: PokeDetail) => {
      obj.types.forEach(type => {
        acc[type] ? acc[type] = [...acc[type], obj] : acc[type] = [obj]
      })
      return acc

    }, {})
  }

  /* -------------------------------------------------------------------------- */
  /*                      keyvalue pipe compareFn parameter                     */
  /* -------------------------------------------------------------------------- */
  compareEntries(a: KeyValue<string, PokeDetail[]>, b: KeyValue<string, PokeDetail[]>): number {
    return b.value.length - a.value.length
  }

  // sortObjectByValues(pokeTypes: PokeDetailsByType): PokeDetailsByType {
  //   let converted_obj = Object.entries(pokeTypes)
  //   let objEntriesSortFn = ([, valA]: [any, PokeDetail[]], [, valB]: [any, PokeDetail[]]) => valB.length - valA.length
  //   let sorted = converted_obj.sort(objEntriesSortFn)
  //   return Object.fromEntries(sorted)
  // }

}
