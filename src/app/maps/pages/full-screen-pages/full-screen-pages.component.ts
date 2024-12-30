import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import {Map} from 'mapbox-gl';

@Component({
  templateUrl: './full-screen-pages.component.html',
  styleUrl: './full-screen-pages.component.css'
})
export class FullScreenPagesComponent implements AfterViewInit {


  public divMap = viewChild<ElementRef>('map');


  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elmento HTML no ha sido encontrado.';
    //console.log(this.divMap);

    const map = new Map({
      container: this.divMap()?.nativeElement,  //'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

  }




}
