import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AffiliationDataTableDataSource, AffiliationDataTableItem } from './affiliation-data-table-datasource';


@Component({
  selector: 'app-affiliation-data-table',
  templateUrl: './affiliation-data-table.component.html',
  styleUrls: ['./affiliation-data-table.component.css']
})
export class AffiliationDataTableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AffiliationDataTableItem>;
  dataSource: AffiliationDataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  //displayedColumns = ['product_id', 'product_name', 'category', 'category_id', 'sale_mode', 'availability', 'price', 'photo', 'producer_id'];
  displayedColumns = ['athlete', 'receipt_id','payment','race_id','race_name'];

  ngOnInit() {
    this.dataSource = new AffiliationDataTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
