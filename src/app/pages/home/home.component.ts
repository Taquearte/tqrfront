import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { GastoService } from '../../_services/gasto/gasto.service';
import { UpXMLService } from '../../_services/gasto/upxml.service';
import Swal from 'sweetalert2';
import { HTMLfuctions } from '../../_functions/HTML.fuctions';
import { Cfg } from '../../_config/gral.config';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [GastoService, UpXMLService]
})
export class HomeComponent implements OnInit, AfterViewInit {
  public gastolst: any;
  public upxmllst: any;
  public identiy: any;
  public empresa: string;
  public devempresa: string;
  public fechaformato: string;
  constructor(
    private _script: ScriptLoaderService,
    private _gastoService: GastoService,
    private _upXMLService: UpXMLService,
    private datePipe: DatePipe,
    ) {
      this.identiy = JSON.parse(localStorage.getItem('identity'));
      this.devempresa = Cfg.devempresa;
      this.fechaformato = Cfg.formatoFecha;
    }

  ngOnInit() {
    this.getgasto();
  }

  mk_getBottonClass(status) {
    return HTMLfuctions.getEstatusClass(status);
  }
  getupxml(){
    this.empresa = this.identiy.Empresa;
    this._upXMLService.upxml_list10().subscribe(
      response => {
        if (response) {
          this.upxmllst = response;

        }
      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage != null) {
          const mkerrores = JSON.parse(error._body);
          Swal.fire(this.devempresa, mkerrores.message, 'error');
        }
      });

  }
  getgasto(){
    this.empresa = this.identiy.Empresa;
    this._gastoService.gasto_list9(this.empresa).subscribe(
      response => {
        if (response) {
          this.gastolst = response;
          //console.log(this.gastolst);
          this.gastolst.sort(function (a, b){
            return (b.ID - a.ID);
        })
        }
      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage != null) {
          const mkerrores = JSON.parse(error._body);
          Swal.fire(this.devempresa, mkerrores.message, 'error');
        }
      });

  }

  ngAfterViewInit() {
    this._script.load('./assets/js/scripts/dashboard_7.js');
  }

}
