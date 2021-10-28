import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { PoAccordionItemComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterContentInit {

  @ViewChild('allPokimane', { static: true }) allPokimane!: PoAccordionItemComponent;

  ngAfterContentInit() {
    this.allPokimane.expand();
  }

}
