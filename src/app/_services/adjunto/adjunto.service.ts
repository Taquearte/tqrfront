import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Cfg } from '../../_config/gral.config';

@Injectable()


export class AdjuntoService {
    public url: string;
    public identity: any;
    public token: string;


    constructor( private _http: Http) {
        this.url = Cfg.BackendUrl;
        this.token = localStorage.getItem('token');
        this.identity = JSON.parse(localStorage.getItem('identity'));
    }

    adjunto_test () {
        return "estudio de servicio ";
    }

    adjunto_list(_id) {
        let mkid=_id;
        const params: URLSearchParams = new URLSearchParams();
        params.set('usuario', this.identity.Usuario);
        params.set('modulo', 'COMS');
       
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        let requestOptions = new RequestOptions();
        requestOptions.headers = headers;
        requestOptions.search = params;


        return this._http.get(this.url+'/adjunto/' + mkid, {headers: headers, search: params }).map(
            res => res.json()
            );
    }

}