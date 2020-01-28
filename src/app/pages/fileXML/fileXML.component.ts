import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { HTMLfuctions } from '../../_functions/HTML.fuctions';
import { Cfg } from '../../_config/gral.config';
import { DatePipe } from '@angular/common';

import { UpXMLService } from '../../_services/gasto/upxml.service';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-fileXML',
  templateUrl: './fileXML.component.html',
  providers: [ScriptLoaderService,UpXMLService]
})
export class FileXMLComponent implements OnInit, AfterViewInit {
  public title: string;
  public empresa: string;
  public devempresa: string;
  public fechaformato: string;
  public upxmllst: any;
  public identity: any;
 
  constructor(
    private _script: ScriptLoaderService,
    private _upXMLService:UpXMLService,
    private datePipe: DatePipe,    
    ) 
    {
    this.fechaformato=Cfg.formatoFecha;
    this.devempresa=Cfg.devempresa;
    this.title='XML Lista';
    }

  ngOnInit() {
    this.identity=JSON.parse(localStorage.getItem('identity'));
    this.empresa=this.identity.empresa;
    this.getupxml();

  }

  mk_getBottonClass(status){
    return HTMLfuctions.getEstatusClass(status);
  }
  
  getupxml(){
    this._upXMLService.upxml_list().subscribe(
      response => {
        if (response) {
          this.upxmllst=response;
          //console.log(this.upxmllst);
          $( document ).ready(function() {
            $('#dt_upxml').DataTable({
                pageLength: 10,
                fixedHeader: true,
                responsive: true,
                "sDom": 'rtip',
                columnDefs: [{
                    targets: 'no-sort',
                    orderable: false
                }]
            });
            var table = $('#dt_upxml').DataTable();
            $('#key-search').on('keyup', function() {
                table
                    .search(this.value)
                    .draw();
            });

            $('#type-filter').on('change', function() {
                table.column(7).search($(this).val()).draw();
            });
        });
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
  }
}
