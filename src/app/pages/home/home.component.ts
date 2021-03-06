import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { DocumentoService } from '../../_services/gasto/documento.service';

import Swal from 'sweetalert2';
import { HTMLfuctions } from '../../_functions/HTML.fuctions';
import { Cfg } from '../../_config/gral.config';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [DocumentoService]
})
export class HomeComponent implements OnInit, AfterViewInit {
  public gastolst: any;
  public upxmllst: any;
  public identiy: any;
  public documentolst: any;
  public documentolstResp: any;
  public empresa: string;
  public devempresa: string;
  public fechaformato: string;
  constructor(
    private _script: ScriptLoaderService,
    private _documentoService: DocumentoService,
    private datePipe: DatePipe,
    ) {
      this.identiy = JSON.parse(localStorage.getItem('identity'));
      this.devempresa = Cfg.devempresa;
      this.fechaformato = Cfg.formatoFecha;
    }

  ngOnInit() {
    this.getlista();
  }

  mk_getBottonClass(status) {
    return HTMLfuctions.getEstatusClass(status);
  }

  getlista(){
    this._documentoService.documento_list().subscribe(
      response => {
        if (response) {
          this.documentolstResp=response;
          this.documentolst=this.documentolstResp.slice(0,9)
          //console.log(this.documentolst);
          this.documentolst.sort(function (a, b){
            return (b.ID - a.ID)
        })        
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var mkerrores =JSON.parse(error._body);
          Swal.fire(this.devempresa, mkerrores.message, 'error');
        }
      });

  }

  ngAfterViewInit() {
    this._script.load('./assets/js/scripts/dashboard_7.js');
  }

}
