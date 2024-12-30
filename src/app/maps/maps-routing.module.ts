import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPagesComponent } from './pages/full-screen-pages/full-screen-pages.component';
import { ZoomRangePagesComponent } from './pages/zoom-range-pages/zoom-range-pages.component';
import { MarkersPagesComponent } from './pages/markers-pages/markers-pages.component';
import { PropertiesPagesComponent } from './pages/properties-pages/properties-pages.component';

const routes: Routes = [
  {
    path: '',
    component: MapsLayoutComponent,
    children: [
      {path: 'fullscreen', component: FullScreenPagesComponent},
      {path: 'zoom-range', component: ZoomRangePagesComponent},
      {path: 'markers', component: MarkersPagesComponent},
      {path: 'properties', component: PropertiesPagesComponent},
      {path: '**', redirectTo: 'fullscreen'},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
