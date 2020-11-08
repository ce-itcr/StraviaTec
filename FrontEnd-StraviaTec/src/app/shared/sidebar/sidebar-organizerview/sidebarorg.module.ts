import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarOrgComponent } from './sidebarorg.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarOrgComponent ],
    exports: [ SidebarOrgComponent ]
})

export class SidebarOrgModule {}
