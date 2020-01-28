
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Cfg } from './../../_config/gral.config';

@Injectable()


export class CondicionService {
    public url: string;
    public identity: string;
    public token: string;

    constructor( private _http: Http) {
        this.url = Cfg.BackendUrl;
        this.token=localStorage.getItem('token');
    }

    condicion_test () {
        return "estudio de servicio ";
    }

	condicion_list(){
        this.token=localStorage.getItem('token')         
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/condicion/list', {headers: headers}).map(
            res => res.json()
            ); 
    }
    
}