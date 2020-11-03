import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface AffiliationDataTableItem {
  athlete: string,
  receipt_id: number,
  payment: number,
  race_id: string,
  race_name: string
}

// TODO: replace this with real data from your application
/*const EXAMPLE_DATA: AffiliationDataTableItem[] = [
  {"race_id":"20202612candelaria","race_name":"Carrera La Candelaria", "race_date":"26/12/2020","race_path":"RACE_PATH_RACE_PATH","activity_type":"atletismo","privacy":"publico","race_price":5000,
   "bank_account": 888888888,"race_category":"Elite","race_sponsors":"StraviaTEC, Red Bull"}
]*/

const EXAMPLE_DATA: AffiliationDataTableItem[] = [
  {"athlete":"Angelo Ortiz Vega","receipt_id":20201103,"payment":5000,"race_id":"20202612candelaria","race_name":"Carrera La Candelaria"}
]


/**
 * Data source for the RaceDataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AffiliationDataTableDataSource extends DataSource<AffiliationDataTableItem> {
  data: AffiliationDataTableItem[] = EXAMPLE_DATA; //globalThis.race;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AffiliationDataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: AffiliationDataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AffiliationDataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(+a.race_id, +b.race_id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
