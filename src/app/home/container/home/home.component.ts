import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { PoAccordionItemComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {

  ngOnInit(): void {
  }

  @ViewChild('allPokimane', { static: true }) allPokimane!: PoAccordionItemComponent;

  ngAfterContentInit() {
    // ou utilizar o método collapse()
    this.allPokimane.expand();
  }

}
