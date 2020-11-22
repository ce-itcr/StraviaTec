import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarOrgModule } from './shared/sidebar/sidebar-organizerview/sidebarorg.module';
import { SidebarModule } from './shared/sidebar/sidebar-athleteview/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { OrganizerLayoutComponent} from './layouts/organizer-layout/organizer-layout.component';
import { HttpClientModule } from '@angular/common/http';

import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginLayoutComponent,
    OrganizerLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    PdfViewerModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    SidebarOrgModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
