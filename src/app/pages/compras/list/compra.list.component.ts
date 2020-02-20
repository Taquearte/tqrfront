import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HTMLfuctions } from '../../../_functions/HTML.fuctions';
import { Cfg } from '../../../_config/gral.config';
import { DocumentoService } from '../../../_services/gasto/documento.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-compra-list',
  templateUrl: './compra.list.component.html',
  providers: [DocumentoService]
})

export class CompraListComponent implements OnInit, AfterViewInit {
  public title: string;
  public empresa: string;
  public devempresa: string;
  public fechaformato: string;
  public documentolst: any;
  public identity: any;

 
  constructor(
    private _documentoService: DocumentoService,
    private _router: Router,
    ) 
    {
    this.fechaformato=Cfg.formatoFecha;
    this.devempresa=Cfg.devempresa;
    this.title='Compras';
    this.identity=JSON.parse(localStorage.getItem('identity'));
    }

  ngOnInit() {    
    this.empresa=this.identity.Empresa;
    this.getlista();
  }
  
// CLASES
  mk_getBottonClass(status){
    return HTMLfuctions.getEstatusClass(status);
  }
// GET
  getlista(){
    this._documentoService.documento_list().subscribe(
      response => {
        if (response) {
          this.documentolst=response;
          console.log(this.documentolst);
          this.documentolst.sort(function (a, b){
            return (b.ID - a.ID)
        })



          $( document ).ready(function() {
            $('#dt_documento').DataTable({
                pageLength: 10,
                fixedHeader: true,
                responsive: true,
                "sDom": 'rtip',
                columnDefs: [{
                    targets: 'no-sort',
                    orderable: true
                }]
            });
            var table = $('#dt_documento').DataTable();
            $('#key-search').on('keyup', function() {
                table
                    .search(this.value)
                    .draw();
            });

            $('#type-filter').on('change', function() {
                table.column(2).search($(this).val()).draw();
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
// ACCIONES
  mk_nuevo(){
    this._router.navigate(['compra/edit/0']);
  }

  ngAfterViewInit() {
  }
}
