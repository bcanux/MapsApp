import { AfterViewInit, Component, ElementRef, Input, viewChild,  } from '@angular/core';
import { mapToCanActivate } from '@angular/router';
import {Map, Marker} from 'mapbox-gl';


@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {

  @Input() LngLat?:  [number, number];
  public divMap = viewChild<ElementRef>('map');

  ngAfterViewInit(){
    if(!this.divMap) throw "Map Div not found";
    if(!this.LngLat) throw "LngLat can't be null";


    const map = new Map({
      container: this.divMap()?.nativeElement,  //'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.LngLat, // starting position [lng, lat]
      zoom: 9, // starting zoom
      interactive: false,
    });

  new Marker().setLngLat(this.LngLat)
    .addTo(map);

  }


}
