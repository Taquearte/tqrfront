import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HTMLfuctions } from '../../../_functions/HTML.fuctions';
import { Cfg } from '../../../_config/gral.config';
import { GastoService } from '../../../_services/gasto/gasto.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-gasto-list',
  templateUrl: './gasto.list.component.html',
  providers: [GastoService]
})

export class GastoListComponent implements OnInit, AfterViewInit {
  public title: string;
  public empresa: string;
  public devempresa: string;
  public fechaformato: string;
  public gastolst: any;
  public identity: any;

 
  constructor(
    private _gastoService:GastoService,
    private _router: Router,
    ) 
    {
    this.fechaformato=Cfg.formatoFecha;
    this.devempresa=Cfg.devempresa;
    this.title='Gastos';
    this.identity=JSON.parse(localStorage.getItem('identity'));
    }

  ngOnInit() {    
    this.empresa=this.identity.Empresa;
    this.getgasto();
  }
  

  mk_getBottonClass(status){
    return HTMLfuctions.getEstatusClass(status);
  }

  getgasto(){
    this._gastoService.gasto_list(this.empresa).subscribe(
      response => {
        if (response) {
          this.gastolst=response;
          //console.log('sin orden',this.gastolst);
          // this.gastolst.sort(function (a,b) {
          //   if (a.ID < b.ID) { //comparación lexicogŕafica
          //     return 1;
          //   } 
          //   return 0;
          // });

          this.gastolst.sort(function (a, b){
            return (b.ID - a.ID)
        })

          //console.log('ordenado',this.gastolst);

          $( document ).ready(function() {
            $('#dt_gasto').DataTable({
                pageLength: 10,
                fixedHeader: true,
                responsive: true,
                "sDom": 'rtip',
                columnDefs: [{
                    targets: 'no-sort',
                    orderable: true
                }]
            });
            var table = $('#dt_gasto').DataTable();
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
  
  mk_nuevo(){
    this._router.navigate(['gasto/edit/0']);
  }

  ngAfterViewInit() {
  }
}
