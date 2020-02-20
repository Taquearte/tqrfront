
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Cfg } from '../../_config/gral.config';

@Injectable()


export class DocumentoService {
    public url: string;
    public identity: any;
    public token: string;


    constructor( private _http: Http) {
        this.url = Cfg.BackendUrl;
        this.token = localStorage.getItem('token');
        this.identity = JSON.parse(localStorage.getItem('identity'));
    }

    documento_test () {
        return "estudio de servicio ";
    }

    documento_list() {

        const params: URLSearchParams = new URLSearchParams();
        params.set('usuario', this.identity.Usuario);
        params.set('empresa', this.identity.Empresa);
        params.set('sucursal', this.identity.Sucursal);
        params.set('modulo', 'COMS');
        params.set('perfil', this.identity.PerfilWeb);
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        let requestOptions = new RequestOptions();
        requestOptions.headers = headers;
        requestOptions.search = params;


        return this._http.get(this.url+'/documento/list', {headers: headers, search: params }).map(
            res => res.json()
            );
    }

    documento_uno(_id) {

        let mkid=_id; 
        const params: URLSearchParams = new URLSearchParams();
        params.set('usuario', this.identity.Usuario);
        params.set('empresa', this.identity.Empresa);
        params.set('sucursal', this.identity.Sucursal);
        params.set('modulo', 'COMS');
        params.set('perfil', this.identity.PerfilWeb);
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        let requestOptions = new RequestOptions();
        requestOptions.headers = headers;
        requestOptions.search = params;


        return this._http.get(this.url+'/documento/one/'+mkid, {headers: headers, search: params }).map(
            res => res.json()
            );
    }
}