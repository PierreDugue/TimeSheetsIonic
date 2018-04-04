import { Injectable, NgZone } from '@angular/core';
import { parentsDatas } from '../../app/models/parentsDatas-model';
import PouchDB from 'pouchdb';
import 'rxjs/add/operator/map';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
import { Http } from '@angular/http';

@Injectable()
export class DataManagerProvider {
  public parentsDatas;
  public pdb;


  constructor(public http: Http,
    public zone: NgZone
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
    return this.pdb.remove(parent);
  }

  getWithId(id) {
    return this.pdb.get(id);
  }

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

    this.zone.run(() => {
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
    });
  }
}
