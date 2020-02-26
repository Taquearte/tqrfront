import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HTMLfuctions } from '../../../_functions/HTML.fuctions';
import { Cfg } from '../../../_config/gral.config';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { FilterPipe } from 'ngx-filter-pipe';
import { Datefuctions } from '../../../_functions/date.function';
import { SucursalService } from './../../../_services/sucursal/sucursal.service';
declare var $: any;


@Component({
  selector: 'app-list-sucursal',
  templateUrl: './list.sucursal.component.html',
  providers: [SucursalService]
})
export class ListaSucursalComponent implements OnInit, AfterViewInit {
  public title: string;
  public empresa: string;
  public fechaformato: string;
  public mapeolst: any;
  public conceptolst: any;
  public claselst: any;
  public subclaselst: any;
  public mapeoedit: any;
  public identity: any;
  public searchText: any  = { $or: [{ Concepto: '' },{ Clase: '' }] };
  public conceptoFilter: any = { Concepto: '' };
  public claseFilter: any = { Clase: '' };
  public devempresa: string;
  public sucursallst: any;
  public hoy = new Date();
  public upxmllst: any;
  constructor(
    private _sucursalService: SucursalService,
    private datePipe: DatePipe,
    private filterPipe: FilterPipe
    ) 
    {
    this.fechaformato=Cfg.formatoFecha;
    this.fechaformato=Cfg.formatoFecha;
    this.devempresa=Cfg.devempresa;
    this.title='Lista Sucursales';
    }

  ngOnInit() {
    this.getArt();
  }

  ngAfterViewInit() {
  }


      // GET
      getArt(){
        this._sucursalService.sucursal_list().subscribe(
          response => {
            if (response) {
              this.sucursallst = response;
                   console.log(this.sucursallst);
              $( document ).ready(function() {
                $('#dt_suc').DataTable({
                    pageLength: 10,
                    fixedHeader: true,
                    responsive: true,
                    "sDom": 'rtip',
                    columnDefs: [{
                        targets: 'no-sort',
                        orderable: true
                    }]
                });
                var table = $('#dt_suc').DataTable();
                $('#key-search').on('keyup', function() {
                    table
                        .search(this.value)
                        .draw();
                });
    
                $('#type-filter').on('change', function() {
                    table.column(3).search($(this).val()).draw();
                });
            });
            }
          },
          error => {
              console.log(error);
              Swal.fire(this.devempresa, error._body, 'error');
          });
    
      }

      mk_getBottonClass(status){
        return HTMLfuctions.getEstatusClass(status);
      }

}
