import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PoMenuComponent, PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  appName: string = 'Pokimane'
  closeMenu: boolean = true

  @ViewChild('poMenu')

  private poMenu!: PoMenuComponent

  readonly subItems = {
    home: [
      {
        label: 'SubHome'
      },
      {
        label: 'SubHome 2'
      },
    ], detail: [{ label: 'SubDetail' }]
  }

  readonly menus: PoMenuItem[] = [
    { label: 'Home', shortLabel: 'Home', icon: 'po-icon-anchor', subItems: this.subItems.home },
    { label: 'Detail', shortLabel: 'Detail', icon: 'po-icon-eye', subItems: this.subItems.detail, action: this.onClick.bind(null, 'detail') }
  ];

  private onClick(label: string) {
    alert(`Clicked in menu item ${label}`)
  }

  ngAfterViewInit() {
    this.poMenu.collapse() // useless / pointless without other properties on menuItems
    // alert(this.poMenu.filteredItems.map((x: PoMenuItem) => x.label))
  }

}