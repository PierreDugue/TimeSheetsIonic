import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
import 'rxjs/add/operator/map';

import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

@Injectable()
export class TsManagerProvider {
  public pdb;
  public timeSheet;
  constructor(public http: Http,
    public zone: NgZone) {
  }

  createPouchDB() {
    PouchDB.plugin(cordovaSqlitePlugin);
    this.pdb = new PouchDB('tsDatabase.db');
    return true;
  }

  create(timeSheetDatas) {
    return this.pdb.post(timeSheetDatas);
  }

  update(parent) {
    return this.pdb.put(parent);
  }

  delete(parent) {
    return this.pdb.remove(parent);
  }

  getWithId(id) {
    return this.pdb.get(id);
  }

  getAll() {

    if (this.timeSheet) {
      return Promise.resolve(this.timeSheet);
    }

    return new Promise(resolve => {
      this.pdb.allDocs({
        include_docs: true
      }).then((result) => {
        this.timeSheet = [];
        let docs = result.rows.map((row) => {
          this.timeSheet.push(row.doc);
        });

        resolve(this.timeSheet);
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

    this.timeSheet.forEach((doc, index) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });

    this.zone.run(() => {
      //A document was deleted
      if (change.deleted) {
        this.timeSheet.splice(changedIndex, 1);
      }
      else {

        //A document was updated
        if (changedDoc) {
          this.timeSheet[changedIndex] = change.doc;
        }

        //A document was added
        else {
          this.timeSheet.push(change.doc);
        }
      }
    });
  }

}
