import { Observable } from 'rxjs';
import { PokeService } from './../../service/poke-service.service';
import { AfterContentInit, Component, DoCheck, ViewChild } from '@angular/core';
import { PoAccordionItemComponent } from '@po-ui/ng-components';
import { PokeDetail } from '../../models/pokemon-detail.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterContentInit {

  public curr_pokimanes: Observable<PokeDetail[]> | null = null

  constructor(private service: PokeService) {

  }

  @ViewChild('allPokimane', { static: true }) allPokimane!: PoAccordionItemComponent;

  ngAfterContentInit() {
    this.curr_pokimanes = this.service.get()
    this.allPokimane.expand();
  }

  // ngDoCheck(){
  //   if
  // }

}
