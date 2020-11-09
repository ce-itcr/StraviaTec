import { Component } from '@angular/core';

@Component({
    selector: 'race-management-cmp',
    moduleId: module.id,
    templateUrl: 'race-management.component.html'
})

export class RaceManagementComponent{
  constructor() {}

  race_management_table_titles = [
    ["Nombre","Fecha","Recorrido","Tipo de Actividad","Privacidad","Costo","Cuentas Bancarias","Categorías Disponibles","Patrocinadores"]
  ]

  race_management_table_content = [
    ["Carrera La Candelaria", "24/12/2020", "C:\Users\AdminCR\Documents\StraviaTec\FrontEnd-StraviaTec\src\assets\gpx\Lunch_Ride.gpx","Atletismo","Público","5000 Colones exactos", "300000000000, 400000000000","Elite, Master A","StraviaTEC, NorthFace"],
    ["Carrera La Candelaria", "24/12/2020", "C:\Users\AdminCR\Documents\StraviaTec\FrontEnd-StraviaTec\src\assets\gpx\Lunch_Ride.gpx","Atletismo","Público","5000 Colones exactos", "300000000000, 400000000000","Elite, Master A","StraviaTEC, NorthFace"],
    ["Carrera La Candelaria", "24/12/2020", "C:\Users\AdminCR\Documents\StraviaTec\FrontEnd-StraviaTec\src\assets\gpx\Lunch_Ride.gpx","Atletismo","Público","5000 Colones exactos", "300000000000, 400000000000","Elite, Master A","StraviaTEC, NorthFace"]
  ]

}
