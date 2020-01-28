
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Cfg } from './../../_config/gral.config';

@Injectable()


export class GastoService {
    public url: string;
    public identity: string;
    public token: string;

    constructor( private _http: Http) {
        this.url = Cfg.BackendUrl;
        this.token=localStorage.getItem('token');
    }

    gasto_test () {
        return "estudio de servicio ";
    }
	gasto_list(_id){    
        let mkid=_id;           
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/gasto/list/'+ mkid, {headers: headers}).map(
            res => res.json()
            ); 
    }
	gasto_list9(_id){    
        let mkid=_id;           
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/gasto/list9/'+ mkid, {headers: headers}).map(
            res => res.json()
            ); 
    }
 
    gasto_uno(_id){  
        let mkid=_id; 
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/gasto/one/'+mkid, {headers:headers}).map(
            res=>res.json()        
            );
   }    
   gasto_unodet(_id){  
    let mkid=_id; 
    let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
    return this._http.get(this.url+'/gasto/onedet/'+mkid, {headers:headers}).map(
        res=>res.json()        
        );
}    
    
   gasto_new(movgasto){
    let params = JSON.stringify(movgasto); 
    let headers = new Headers({'Content-Type': 'application/json','authorization': this.token});
    return this._http.post(this.url+'/gasto/new',params,{headers:headers}).map(
        res=>res.json()
        );
    }
    gasto_afectar(movgastodet){
        let params = JSON.stringify(movgastodet); 
        let headers = new Headers({'Content-Type': 'application/json','authorization': this.token});
        return this._http.post(this.url+'/gasto/afectar',params,{headers:headers}).map(
            res=>res.json()
            );
        }

    gasto_edit(paciente,_id){   
        let mkid = _id;  
        let params = JSON.stringify(paciente);
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.put(this.url + '/art/' + mkid, params, {headers: headers}).map(
            res => res.json()
            );
    }    
}
