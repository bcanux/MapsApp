import { PlatformLocation } from '@angular/common';
import { Component, ElementRef, viewChild } from '@angular/core';
import {LngLat, Map, Marker} from 'mapbox-gl';
import { last } from 'rxjs';

interface MarkerAndColor{
  color: string;
  marker: Marker;
}

interface PlaneMarker {
  color:string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-pages.component.html',
  styleUrl: './markers-pages.component.css'
})
export class MarkersPagesComponent {


  public divMap = viewChild<ElementRef>('map');
  public zoom : number = 13;
  public map?: Map;
  public currentCenter: LngLat = new LngLat(-90.50847429776246, 14.643879751303885);
  public markers:  MarkerAndColor[] =  [];

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elmento HTML no ha sido encontrado.';

    //console.log(this.divMap);

    this.map = new Map({
      container: this.divMap()?.nativeElement,  //'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage();


    //this.mapListeners();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Brandon Canux';
    // const marker = new Marker({
    //   //color:''
    //   element: markerHtml,
    // })
    // .setLngLat(this.currentCenter)
    // .addTo(this.map)


  }


  createMarker(){
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map?.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color:string){
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,

    }).setLngLat(lngLat)
    .addTo(this.map);

    this.markers.push({color, marker});

    this.saveToLocalStorage();

    marker.on('dragend', ()=>{
      this.saveToLocalStorage();
    })
  }

  deleteMarker(index: number){
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker:  Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });

  }

  saveToLocalStorage(){
    //console.log(this.markers);
    const plainMarkers:  PlaneMarker[] = this.markers.map(({color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers')?? '[]';
    const plainMarkers: PlaneMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    })

  }

}
