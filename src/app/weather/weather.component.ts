import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApixuService } from './apixu.service';
import { Weather } from './weather.model';
import { TemperaturePipeClass } from './pipe/temperature-class.pipe';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  standalone: true,
  imports: [TemperaturePipeClass, CommonModule, ReactiveFormsModule],
})
export class WeatherComponent implements OnInit {
  weatherSrchForm: FormGroup;
  weatherData: Weather;
  showSpinner: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apixuService: ApixuService,
  ) {}

  ngOnInit(): void {
    this.weatherSrchForm = this.formBuilder.group({
      location: [''],
    });
    const weatherGet = JSON.parse(localStorage.getItem('weather')!);
    this.weatherData = { ...weatherGet };
  }

  sendToAPI() {
    this.showSpinner = true;
    this.apixuService
      .getWeather(this.weatherSrchForm.value)
      .subscribe((data: any) => {
        if (data) {
          this.showSpinner = false;
          this.weatherData = data;
          localStorage.setItem('weather', JSON.stringify(this.weatherData));
        }
      });
  }
}
