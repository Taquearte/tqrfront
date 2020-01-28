
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Cfg } from './../../_config/gral.config';

@Injectable()


export class MapeoService {
    public url: string;
    public identity: string;
    public token: string;

    constructor( private _http: Http) {
        this.url = Cfg.BackendUrl;
        this.token=localStorage.getItem('token');
    }

    mapeo_test () {
        return "estudio de servicio ";
    }


	mapeo_list(){    
      
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/mapeo/list', {headers: headers}).map(
            res => res.json()
            ); 
    }

 
    mapeo_uno(_id){  
        let mkid=_id; 
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/mapeo/'+mkid, {headers:headers}).map(
            res=>res.json()        
            );
   }    


   mapeo_new(paciente){
    let params = JSON.stringify(paciente); 
    let headers = new Headers({'Content-Type': 'application/json','authorization': this.token});
    return this._http.post(this.url+'/mapeo/new',params,{headers:headers}).map(
        res=>res.json()
        );
    }

    mapeo_edit(info,_id){   
        let mkid = _id;  
        let params = JSON.stringify(info);
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.put(this.url + '/mapeo/' + mkid, params, {headers: headers}).map(
            res => res.json()
            );
    }    
}
