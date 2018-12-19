import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private colors = [
    {background: '#0B374D', color: '#fff'},
    {background: '#1287A8*', color: '#fff'},
    {background: '#93A661', color: '#fff'},
    {background: '#0D3D56', color: '#fff'},
    {background: '#1496BB', color: '#fff'},
    {background: '#A3B86C', color: '#fff'},
    {background: '#3C6478', color: '#fff'},
    {background: '#43ABC9', color: '#fff'},
    {background: '#B5C689', color: '#fff'},
    {background: '#BCA136', color: '#fff'},
    {background: '#C2571A', color: '#fff'},
    {background: '#9A2617', color: '#fff'},
    {background: '#D3B53D', color: '#fff'}
  ];

  constructor() {
  }

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
