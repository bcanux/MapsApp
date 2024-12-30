import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiYmNhbnV4IiwiYSI6ImNtNHJhNXE2MDAzNHUybG9lMHdmdmZyc2wifQ.RB1CAMJOMnAYNPEwfjp7Fg';


import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPagesComponent } from './pages/full-screen-pages/full-screen-pages.component';
import { MarkersPagesComponent } from './pages/markers-pages/markers-pages.component';
import { PropertiesPagesComponent } from './pages/properties-pages/properties-pages.component';
import { ZoomRangePagesComponent } from './pages/zoom-range-pages/zoom-range-pages.component';
import { CounterAloneComponent } from "../alone/components/counter-alone/counter-alone.component";


@NgModule({
  declarations: [
    MiniMapComponent,

    MapsLayoutComponent,
    FullScreenPagesComponent,
    MarkersPagesComponent,
    PropertiesPagesComponent,
    ZoomRangePagesComponent,

  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    CounterAloneComponent,
    SideMenuComponent,
  ],

})
export class MapsModule { }
