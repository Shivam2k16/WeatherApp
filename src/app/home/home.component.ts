import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
weatherData:any[];
validation:any[];
bg_img=new Array<any>(9);

  constructor(private api:ApiService) {
  		this.weatherData=[{},{},{},{},{},{},{},{},{}];
  		this.validation=[false,false,false,false,false,false,false,false,false];
  		this.bg_img=['','','','','','','','',''];	
  	
   }

  ngOnInit() { 

  	this.api.getData('hey').subscribe(()=>{},(error)=>{
  		 this.bg_img=JSON.parse(localStorage.getItem('img'));
  		 this.weatherData=JSON.parse(localStorage.getItem('weather'));
  		 this.validation=JSON.parse(localStorage.getItem('valid'));
  		});}

  getWeatherData(city,i){

	  if(city){

	  	this.api.getData(city).subscribe((response)=>{
	  		this.weatherData[i]=response;
	  		localStorage.setItem('weather', JSON.stringify(this.weatherData));
	  		if(this.weatherData[i].weather[0].description.toLowerCase().indexOf( "thunderstorm" )!=-1){
	  			this.bg_img[i]=this.thunderstorm;
	  		}
	  		else if(this.weatherData[i].weather[0].description.toLowerCase().indexOf( "rain" )!=-1){
	  			this.bg_img[i]=this.rain;
	  		}
	  		else if(this.weatherData[i].weather[0].description.toLowerCase().indexOf( "cloud" )!=-1){
	  			this.bg_img[i]=this.clouds;
	  		}
	  		else if(this.weatherData[i].weather[0].description.toLowerCase().indexOf( "haze" )!=-1){
	  			this.bg_img[i]=this.haze;
	  		}
	  		else if(this.weatherData[i].weather[0].description.toLowerCase().indexOf( "smoke" )!=-1){
	  			this.bg_img[i]=this.smoke;
	  		}
	  		else{
	  			this.bg_img[i]=this.clear_sky;
	  		}
	  		localStorage.setItem('img', JSON.stringify(this.bg_img));

	  	},(error) => {
	  		let obj={
	  			"errorlog":"Can't find this city. Please re-enter the city name."
	  		}
	  		this.weatherData[i]=obj;
	  		this.bg_img[i]='';
	  		localStorage.setItem('img', JSON.stringify(this.bg_img));
	  		localStorage.setItem('weather', JSON.stringify(this.weatherData));
	  	});
	  
	  }
  }

onClick(i){
	this.validation[i]=true;
	localStorage.setItem('valid', JSON.stringify(this.validation));
}


clear_sky=`https://s3.envato.com/files/234922966/preview.jpg`;
thunderstorm=`https://i2-prod.gloucestershirelive.co.uk/incoming/article2790617.ece/ALTERNATES/s1200/0_Thunderstorm-at-sunset.jpg`;
rain=`https://static1.squarespace.com/static/5899e78b1b10e35238fba886/t/5bd0e4ca4785d33f58ec3c1c/1540416755583/shutterstock_heavy+rain.jpg?format=750w`;
haze=`https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAcub1.img?h=403&w=624&m=6&q=60&o=f&l=f`;
smoke=`https://ak4.picdn.net/shutterstock/videos/18381814/thumb/11.jpg`;
clouds=`https://www.eoas.ubc.ca/courses/atsc113/flying/met_concepts/01-met_concepts/01c-cloud_coverage/images-01c/g2.jpg`;
}




