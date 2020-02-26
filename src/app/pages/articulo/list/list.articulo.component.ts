import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HTMLfuctions } from '../../../_functions/HTML.fuctions';
import { Cfg } from '../../../_config/gral.config';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { FilterPipe } from 'ngx-filter-pipe';
import { Datefuctions } from '../../../_functions/date.function';
import { ArticuloService } from './../../../_services/articulo/articulo.service';
declare var $: any;


@Component({
  selector: 'app-list-articulo',
  templateUrl: './list.articulo.component.html',
  providers: [ArticuloService]
})
export class ListaArticuloComponent implements OnInit, AfterViewInit {
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
  public articulolst: any;
  public hoy = new Date();
  public upxmllst: any;
  constructor(
    private _articuloService: ArticuloService,
    private datePipe: DatePipe,
    private filterPipe: FilterPipe
    ) 
    {
    this.fechaformato=Cfg.formatoFecha;
    this.fechaformato=Cfg.formatoFecha;
    this.devempresa=Cfg.devempresa;
    this.title='Lista Articulo';
    }

  ngOnInit() {
    this.getArt();
  }

  ngAfterViewInit() {
  }


      // GET
      getArt(){
        this._articuloService.articulo_list().subscribe(
          response => {
            if (response) {
              this.articulolst = response;
                   
              $( document ).ready(function() {
                $('#dt_art').DataTable({
                    pageLength: 10,
                    fixedHeader: true,
                    responsive: true,
                    "sDom": 'rtip',
                    columnDefs: [{
                        targets: 'no-sort',
                        orderable: true
                    }]
                });
                var table = $('#dt_art').DataTable();
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
