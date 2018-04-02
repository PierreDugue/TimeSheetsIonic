import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parentsDatas } from '../../app/models/parentsDatas-model';
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

/*
  Generated class for the DataManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataManagerProvider {
  public parentsDatas: parentsDatas;
  public pdb;

  constructor(public http: HttpClient
  ) { }

  createPouchDB() {
    PouchDB.plugin(cordovaSqlitePlugin);
    this.pdb = new PouchDB('parentsDatas.db',
      { adapter: 'cordova-sqlite' });
  }

  create(parent) {
    return this.pdb.post(parent);
  }

  update(parent) {
    return this.pdb.put(parent);
  }

  delete(parent) {
    return this.pdb.delete(parent);
  }

  read() {
    function allDocs() {
      this.pdb.allDocs({ include_docs: true })
        .then(docs => {
          this.parentsDatas = docs.rows.map(row => {
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });
          return this.employees;
        });
    }

    // this.pdb.changes({ live: true, since: 'now', include_docs: true })
    //   .on('change', () => {
    //     allDocs().then((emps) => {
    //       this.parentsDatas = emps;
    //     });
    //   });
    // return allDocs();

  }

}
