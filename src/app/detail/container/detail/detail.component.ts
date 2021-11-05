import { Component } from "@angular/core";
import { PoBreadcrumb } from "@po-ui/ng-components";
import { PoPageDynamicDetailActions, PoPageDynamicDetailField } from "@po-ui/ng-templates";

@Component({
  selector: 'detail-page',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  public readonly serviceApi = 'https://pokeapi.co/api/v2/pokemon';

  public readonly actions: PoPageDynamicDetailActions = {
    back: '/'
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Detail' }
    ]
  };

  public readonly fields: Array<PoPageDynamicDetailField> = [
    { property: 'id', label: 'ID', key: true },
    { property: 'order', label: 'Ordem' },
    { property: 'name', color: 'red', tag: true, key: true, divider: 'Poke Data' },
    { property: 'weight', type: 'number', format: '1.2-5' },
    { property: 'types', label: 'Types' },
  ];

}
