import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  constructor(private sanitizer:DomSanitizer) {}
  
  ngOnInit(): void {
    var url = "https://www.google.com/maps/d/embed?mid=1cQv-iSgDnNCLG_jrQyX5emwZZDzLbixd&hl=es-419";
  }


  public addUrl(actual){
    return this.sanitizer.bypassSecurityTrustResourceUrl(actual);
  }

}
