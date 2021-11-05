import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './container/detail/detail.component';

import { PoModule } from '@po-ui/ng-components';
import { PoPageDynamicDetailModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [
    DetailComponent,
  ],
  imports: [
    PoModule,
    PoPageDynamicDetailModule,
    CommonModule
  ]
})
export class DetailModule { }
