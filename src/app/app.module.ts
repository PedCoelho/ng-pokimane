import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { PoModule } from '@po-ui/ng-components';
import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/container/home/home.component';
import { DetailComponent } from './detail/container/detail/detail.component';
import { PoPageDynamicDetailComponent } from '@po-ui/ng-templates';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PoModule,
    HomeModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      {
        path: 'detail', component: DetailComponent, children: [
          {
            path: ':id', //:id is dynamic here
            component: PoPageDynamicDetailComponent,
            data: { id: ':id' }
          }
        ]
      }
    ]),
    DetailModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
