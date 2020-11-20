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

  test = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  participantsPDF = "C:/Users/Usuario/Desktop/Reports/Participants.pdf";
  positionsPDF = "C:/Users/Usuario/Desktop/Reports/Positions.pdf";

  ngOnInit(): void{ 
    this.CS.createReports().subscribe();
  }

  getParticipants(){
    alert("ERRR");
    return this.addUrl(this.participantsPDF);
  }

  getPositions(){
    alert("ERRR");
    return this.addUrl(this.positionsPDF);
  }

  public addUrl(actual){
    return this.sanitizer.bypassSecurityTrustResourceUrl(actual);
  }

}
