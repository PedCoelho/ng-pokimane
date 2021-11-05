import { PokeService } from './../../service/poke-service.service';
import { AfterContentInit, Component, DoCheck, ViewChild } from '@angular/core';
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

  // public curr_pokimanes$ = service.get()
  public curr_pokimanes: PokeDetail[] = []
  public pokeTypes: PokeDetailsByType = {}
  public selectedType?: string

  constructor(private service: PokeService) {
    this.curr_pokimanes = service.get()
  }

  @ViewChild('allPokimane', { static: true }) allPokimane!: PoAccordionItemComponent;

  ngAfterContentInit() {
    this.pokeTypes = this.updateTypes()
    this.allPokimane.expand();
  }

  ngDoCheck(): void {
    /* -------------------------------------------------------------------------- */
    /*                          lifecycle hook monitoring                         */
    /* -------------------------------------------------------------------------- */
    /* ------------------------- custom change detection ------------------------ */
    if (this.curr_pokimanes.length != this.service.get().length) {

      console.log('curr_len:' + this.curr_pokimanes.length, 'service_len:' + this.service.get().length)
      this.curr_pokimanes = this.service.get()
      this.pokeTypes = this.updateTypes()
    }
  }

  private updateTypes(): PokeDetailsByType {
    return this.curr_pokimanes.reduce((acc: PokeDetailsByType, obj: PokeDetail) => {
      obj.types.forEach(type => {
        acc[type] ? acc[type] = [...acc[type], obj] : acc[type] = [obj]
      })
      return acc

    }, {})
  }

  public selectType(type: string) {
    this.selectedType = type
  }

  /* -------------------------------------------------------------------------- */
  /*                      keyvalue pipe compareFn parameter                     */
  /* -------------------------------------------------------------------------- */
  compareEntries(a: KeyValue<string, PokeDetail[]>, b: KeyValue<string, PokeDetail[]>): number {
    return b.value.length - a.value.length
  }


}
