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
    { property: 'status', tag: true, divider: 'Status' },
    { property: 'id', label: 'User ID', key: true },
    { property: 'name', divider: 'Personal data' },
    { property: 'nickname' },
    { property: 'email', label: 'E-mail' },
    { property: 'birthdate', label: 'Birth date', type: 'date' },
    { property: 'genre', gridLgColumns: 6 },
    { property: 'nationality' },
    { property: 'birthPlace', label: 'Place of birth' },
    { property: 'graduation' },
    { property: 'father', label: 'Father`s name', divider: 'Relationship' },
    { property: 'mother', label: 'Mother`s name' },
    { property: 'street', divider: 'Address' },
    { property: 'city' },
    { property: 'country' }
  ];
}