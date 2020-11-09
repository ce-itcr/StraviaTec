import { Component } from '@angular/core';

@Component({
    selector: 'race-management-cmp',
    moduleId: module.id,
    templateUrl: 'groups-management.component.html'
})

export class GroupsManagementComponent{
  constructor() {}

  groups_management_table_titles = [
    ["Nombre del Grupo","Administrador","Deportistas"]
  ]

  groups_management_table_content = [
    ["Ciclistas del TEC", "John Doe Smith","angelortizv, jonex, otro"],
    ["Ciclistas del TEC", "John Doe Smith","angelortizv, jonex, otro"],
    ["Ciclistas del TEC", "John Doe Smith","angelortizv, jonex, otro"]
  ]


}
