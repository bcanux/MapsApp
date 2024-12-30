import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl';


@Component({
  templateUrl: './zoom-range-pages.component.html',
  styleUrl: './zoom-range-pages.component.css'
})
export class ZoomRangePagesComponent implements AfterViewInit, OnDestroy {



  public divMap = viewChild<ElementRef>('map');
  public zoom : number = 10;
  public map?: Map;
  public currentCenter: LngLat = new LngLat(-90.50847429776246, 14.643879751303885);


  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elmento HTML no ha sido encontrado.';
    //console.log(this.divMap);

    this.map = new Map({
      container: this.divMap()?.nativeElement,  //'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(){
    if(!this.map)throw 'Mapa no inicializado.';

    this.map.on('zoom', (ev)=>{
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev)=>{
      if(this.map!.getZoom() < 18) return;

      this.map!.zoomTo(18);
    });

    this.map.on('move',(ev)=> {
      this.currentCenter = this.map!.getCenter();
      //console.log(this.currentCenter);
    });
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChange(value: string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
}
