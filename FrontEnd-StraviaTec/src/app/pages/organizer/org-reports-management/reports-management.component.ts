import { Component } from '@angular/core';
import { from } from 'rxjs';
import { Chart } from 'chart.js'
import { CommunicationService } from 'app/communication/communication.service';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'race-management-cmp',
    moduleId: module.id,
    templateUrl: 'reports-management.component.html'
})

export class ReportsManagementComponent{
  constructor(private CS: CommunicationService, private sanitizer:DomSanitizer) {}

  //SE GENERAN REPORTES
  ngOnInit(): void{
    this.CS.createReports().subscribe();
  }
}
