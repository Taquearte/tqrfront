
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Cfg } from './../../_config/gral.config';

@Injectable()


export class ConceptoService {
    public url: string;
    public identity: string;
    public token: string;

    constructor( private _http: Http) {
        this.url = Cfg.BackendUrl;
        this.token=localStorage.getItem('token');
    }
    concepto_test () {
        return "estudio de servicio ";
    }  
	concepto_list(){          
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/concepto/list', {headers: headers}).map(
            res => res.json()
            ); 
    }
	conceptocla_list(){    
      
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/conceptocla/list', {headers: headers}).map(
            res => res.json()
            ); 
    }
	conceptosub_list(){          
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/conceptosub/list', {headers: headers}).map(
            res => res.json()
            ); 
    }
    concepto_uno(_id){  
        let mkid=_id; 
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/mapeo/'+mkid, {headers:headers}).map(
            res=>res.json()        
            );
   }  
   concepto_new(paciente){
    let params = JSON.stringify(paciente); 
    let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
    return this._http.post(this.url+'/mapeo/new',params,{headers:headers}).map(
        res=>res.json()
        );
    }
    concepto_edit(info,_id){   
        let mkid = _id;  
        let params = JSON.stringify(info);
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.put(this.url + '/mapeo/' + mkid, params, {headers: headers}).map(
            res => res.json()
            );
    }    
}
