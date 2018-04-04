import { Injectable } from '@angular/core';
import { parentsDatas } from '../../app/models/parentsDatas-model';
import PouchDB from 'pouchdb';
import 'rxjs/add/operator/map';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
import { Http } from '@angular/http';

/*
  Generated class for the DataManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataManagerProvider {
  public parentsDatas;
  public pdb;

  constructor(public http: Http
  ) { }

  createPouchDB() {
    PouchDB.plugin(cordovaSqlitePlugin);
    this.pdb = new PouchDB('parentsDatas.db',
      { adapter: 'cordova-sqlite' });
    return true;
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

  // read() {
  //   function allDocs(): any {
  //     this.pdb.allDocs({ include_docs: true })
  //       .then(docs => {
  //         this.parentsDatas = docs.rows.map(row => {
  //           row.doc.Date = new Date(row.doc.Date);
  //           return row.doc;
  //         });
  //         return this.parentsDatas;
  //       });
  //   }

  //   this.pdb.changes({ live: true, since: 'now', include_docs: true })
  //     .on('change', () => {
  //       allDocs().then((emps) => {
  //         this.parentsDatas = emps;
  //       });
  //     });
  //   return allDocs();
  // }

  getAll() {

    if (this.parentsDatas) {
      return Promise.resolve(this.parentsDatas);
    }

    return new Promise(resolve => {
      this.pdb.allDocs({
        include_docs: true
      }).then((result) => {
        this.parentsDatas = [];
        let docs = result.rows.map((row) => {
          this.parentsDatas.push(row.doc);
        });

        resolve(this.parentsDatas);
        this.pdb.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  handleChange(change) {
    let changedDoc = null;
    let changedIndex = null;

    this.parentsDatas.forEach((doc, index) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });

    //A document was deleted
    if (change.deleted) {
      this.parentsDatas.splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if (changedDoc) {
        this.parentsDatas[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.parentsDatas.push(change.doc);
      }
    }
  }
}
