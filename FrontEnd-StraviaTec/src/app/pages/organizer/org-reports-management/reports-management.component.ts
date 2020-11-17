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
  current_race_name = localStorage.getItem("current_race_name");
  all = "master";

  race_management_table_titles = [
    ["Nombre","Fecha","Tipo de Actividad","Privacidad"]
  ]

  race_management_table_content = [
    ["Carrera La Candelaria", "24/12/2020","Atletismo","Público"],
    ["Carrera Atletica TEC", "24/12/2020","Atletismo","Público"],
    ["Carrera Cartaguito", "24/12/2020","Atletismo","Público"]
  ]

  participants_reports_by_race = [
    ["Carrera La Candelaria", "Nombre: Angelo, Apellido: Ortiz, Edad: 22, Categoria: Elite"],
    ["Carrera La Candelaria", "Nombre: Jonathan, Apellido: Esquivel, Edad: 21, Categoria: Master"],
    ["Carrera Atletica TEC","adasd"],
    ["Carrera Cartaguito","asdsad"]
  ]

  positions_reports_by_race = [
    ["Carrera La Candelaria", "Nombre: Angelo, Apellido: Ortiz, Edad: 22, Tiempo: 55 mins, Categoria: Elite"],
    ["Carrera La Candelaria", "Nombre: Jonathan, Apellido: Esquivel, Edad: 21, Tiempo: 50 mins, Categoria: Elite"],
    ["Carrera La Candelaria", "Nombre: Iván, Apellido: Solís, Edad: 20, Tiempo: 45 mins, Categoria: Master"],
    ["Carrera La Candelaria", "Nombre: Agustín, Apellido: Venegas, Edad: 21, Tiempo: 40 mins, Categoria: Master"],
    ["Carrera Atletica TEC","adasd"],
    ["Carrera Cartaguito","asdsad"]
  ]


    ngOnInit(){
    }

    public displayCategoriesChart(){
      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [1, 2, 3],
          datasets: [{
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#ef8157'
            ],
            borderWidth: 0,
            data: [342, 480, 530, 120]
          }]
        },

        options: {

          legend: {
            display: false
          },

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      });
    }

    public participantReports(race){
      localStorage.setItem("current_race_name", race);
      var htmlList = document.getElementById("list");
      var newList = document.createElement("newList");
      newList.className = "list-group";
      newList.id = "list";

      var cont = 0;
      while(cont<this.participants_reports_by_race.length){
        if(this.participants_reports_by_race[cont][0] == race || race == this.all){
          var element = document.createElement("li");
          element.className = "list-group-item";
          element.appendChild(document.createTextNode(this.participants_reports_by_race[cont][1]));
          newList.appendChild(element);
        }
        cont++;
      }
      htmlList.replaceWith(newList);

      this.displayCategoriesChart();
    }




}
