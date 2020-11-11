import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/activities',    title: 'Registrar Actividad',icon:'nc-simple-add', class: ''},
    { path: '/search',        title: 'Búsqueda de Atletas',icon:'nc-tap-01', class: ''},
    { path: '/enrollment',    title: 'Inscripciones',     icon:'nc-user-run',  class: '' },
    { path: '/user',          title: 'Perfil',         icon:'nc-single-02',  class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-athleteview-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public sidebarActiveColor: string = "danger";
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
