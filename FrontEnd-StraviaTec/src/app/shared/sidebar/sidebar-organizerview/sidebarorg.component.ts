import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES_ORG: RouteInfo[] = [
    { path: '/race-management',     title: 'Gestión de Carreras',         icon:'nc-user-run',       class: '' },
    { path: '/enrollment-management',    title: 'Gestión de Inscripciones',icon:'nc-paper', class: ''},
    { path: '/groups-management',    title: 'Gestión de Grupos',     icon:'nc-book-bookmark',  class: '' },
    { path: '/reports-management',    title: 'Reportes',     icon:'nc-cloud-download-93',  class: '' },
    { path: '/user-profile',          title: 'Perfil',         icon:'nc-single-02',  class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-organizerview-cmp',
    templateUrl: 'sidebarorg.component.html',
})

export class SidebarOrgComponent implements OnInit {
    public menuItems: any[];
    public sidebarActiveColor: string = "danger";
    ngOnInit() {
        this.menuItems = ROUTES_ORG.filter(menuItem => menuItem);
    }
}
