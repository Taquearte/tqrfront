
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Cfg } from './../../_config/gral.config';

@Injectable()


export class UpXMLService {
    public url: string;
    public identity: string;
    public token: string;

    constructor( private _http: Http) {
        this.url = Cfg.BackendUrl;
        this.token=localStorage.getItem('token');
    }

    upxml_test () {
        return "estudio de servicio ";
    }
    
    upxml_del_one_xml (_id) {
        let mkid=_id;  
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/upxmldel/'+mkid, {headers: headers}).map(
            res => res.json()
            );
    }
    

	upxml_list(){           
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/upxml/list/', {headers: headers}).map(
            res => res.json()
            ); 
    }
	upxml_list10(){           
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/upxml/list10/', {headers: headers}).map(
            res => res.json()
            ); 
    }

    
    upxml_sparchivar(_id){         
        let mkid=_id;  
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/upxmlsparchivar/'+mkid, {headers: headers}).map(
            res => res.json()
            ); 
    }  

    upxml_splist(_id){         
        let mkid=_id;  
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/upxmlsp/'+mkid, {headers: headers}).map(
            res => res.json()
            ); 
    }    

	upxml_listcab(_id){         
        let mkid=_id;  
        let headers = new Headers({'Content-Type':'application/json','authorization': this.token});
        return this._http.get(this.url+'/upxmlcab/'+mkid, {headers: headers}).map(
            res => res.json()
            ); 
    }    
 
}
