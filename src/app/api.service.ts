import { Injectable } from '@angular/core';
import { HttpClient } from'@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url='https://api.openweathermap.org/data/2.5/weather?q=';

  constructor(private http:HttpClient) { }

  getData(city){

	  var url1=this.url+city+'&APPID=a4c95c649a6e47e17b1a64dcf04456bc&units=metric';

	  return this.http.get(url1);

  }
}
