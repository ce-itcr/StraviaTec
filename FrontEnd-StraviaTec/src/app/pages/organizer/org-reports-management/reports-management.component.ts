import { Component } from '@angular/core';
import { from } from 'rxjs';
import { Chart } from 'chart.js'

@Component({
    selector: 'race-management-cmp',
    moduleId: module.id,
    templateUrl: 'reports-management.component.html'
})

export class ReportsManagementComponent{
  constructor() {}
  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  race_titles = [
    ["Carrera La Candelaria", "Vuelta Ciclistica al Arenal", "Carrera La Paz"]
  ]

    ngOnInit(){
      this.chartColor = "#FFFFFF";


      var speedCanvas = document.getElementById("speedChart");

      var dataFirst = {
        data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var dataSecond = {
        data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
        fill: false,
        borderColor: '#51CACF',
        backgroundColor: 'transparent',
        pointBorderColor: '#51CACF',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var dataThird = {
        data: [0, 1, 2, 22, 5, 70, 30, 40, 5, 8, 60, 30],
        fill: false,
        borderColor: '#6c757d',
        backgroundColor: 'transparent',
        pointBorderColor: '#6c757d',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ["1k", "2k", "3k", "4k", "5k", "6k", "7k", "8k", "9k", "10k", "11k", "12k"],
        datasets: [dataFirst, dataSecond, dataThird]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });
    }

}
