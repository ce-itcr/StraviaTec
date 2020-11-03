import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RaceDataTableDataSource, RaceDataTableItem } from './race-data-table-datasource';


@Component({
  selector: 'app-race-data-table',
  templateUrl: './race-data-table.component.html',
  styleUrls: ['./race-data-table.component.css']
})
export class RaceDataTableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<RaceDataTableItem>;
  dataSource: RaceDataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  //displayedColumns = ['product_id', 'product_name', 'category', 'category_id', 'sale_mode', 'availability', 'price', 'photo', 'producer_id'];
  displayedColumns = ['race_id', 'race_name','race_date','race_path','activity_type','privacy','race_price','bank_account','race_category','race_sponsors'];

  /*race_id: string,
  race_name: string,
  race_date: string,
  race_path: string,
  activity_type: string,
  privacy: string,
  race_price: number,
  bank_account: number,
  race_category: string,
  race_sponsors: string*/

  ngOnInit() {
    this.dataSource = new RaceDataTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
