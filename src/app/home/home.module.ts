import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module'; //TODO verificar se isso vai ser utilizado
import { HomeComponent } from './container/home/home.component'
import { PokeGridComponent } from './components/poke-grid/poke-grid.component';
import { PokimaneComponent } from './components/pokimane/pokimane.component'

import { PokeService } from './service/poke-service.service';


@NgModule({
  declarations: [
    HomeComponent,
    PokeGridComponent,
    PokimaneComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    HttpClientModule,
    HomeRoutingModule, //TODO verificar se isso vai ser utilizado
  ],
  providers: [PokeService],
  exports: [HomeComponent]
})

export class HomeModule { }
