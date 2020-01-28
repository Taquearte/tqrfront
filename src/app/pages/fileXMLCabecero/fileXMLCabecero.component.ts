import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { HTMLfuctions } from '../../_functions/HTML.fuctions';
import { Cfg } from '../../_config/gral.config';
import { DatePipe } from '@angular/common';


import { UpXMLService } from '../../_services/gasto/upxml.service';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-fileXMLCabecero',
  templateUrl: './fileXMLCabecero.component.html',
  providers: [UpXMLService]
})
export class FileXMLCabeceroComponent implements OnInit, AfterViewInit {
  public title: string;
  public mkid: number;
  public empresa: string;
  public devempresa: string;
  public fechaformato: string;
  public upxmllst: any;
  public identity: any;
  public descripcion: any;
 
  constructor(
    private _router:Router,
    private _rutaActiva: ActivatedRoute,
    private _upXMLService:UpXMLService,
    private datePipe: DatePipe,    
    ) 
    {
    this.fechaformato=Cfg.formatoFecha;
    this.devempresa=Cfg.devempresa;
    this.title='XML Cabecero';
    }

  ngOnInit() {
    this.mkid = this._rutaActiva.snapshot.params.id;
    this.identity=JSON.parse(localStorage.getItem('identity'));
    this.empresa=this.identity.empresa;
    this.getupxml(this.mkid);

  }
  mk_getBottonClass(status){
    return HTMLfuctions.getEstatusClass(status);
  }
  mk_archivar(){
    this._upXMLService.upxml_sparchivar(this.descripcion).subscribe(
      response => {
        if (response) {   
          console.log(response[0].OK);
          
          if ( response[0].OK > 0 ) {
            Swal.fire(this.devempresa, response[0].Mensaje,"success");
          } else {
            Swal.fire(this.devempresa, response[0].Mensaje,"error");
          }
          
          // this.ngOnInit();

        }
      },
      error => {
        console.log(error);
        //var errorMessage =<any>error;
        if (error.error != null) {
          var mkerrores =error.error;
          //console.log(mkerrores);
          Swal.fire('MerQry', mkerrores, 'error');
        }
      }
      );
  }
  mk_quitar(id){
    let idborrar=id;
   // console.log(idborrar);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro de quitar el registro',
      text: "El proceso no se podra revertirse!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Quitarlo!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        
         this._upXMLService.upxml_del_one_xml(idborrar).subscribe(
          response => {
            if (response.OK == 1) {
              Swal.fire(this.devempresa, response.OKRef, 'success');
            } else if (response.OK == -1) {
              Swal.fire(this.devempresa, response.OKRef, 'error');
            }         
          },
          error => {
            console.log(error);
            var errorMessage = <any>error;
            if (errorMessage != null) {
              var mkerrores =JSON.parse(error._body);
              Swal.fire('MerQry', mkerrores.message, 'error');
            }
          }); 
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El Registro sigue intacto :)',
          'error'
        )
      }
    })

  }

  mk_procesar(){
    this._upXMLService.upxml_splist(this.descripcion).subscribe(
      response => {
        if (response) {         
          Swal.fire(this.devempresa, 'se proceso correctamente',"success");
          this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/upxmlcab/'+this.mkid]));

        }
      },
      error => {
        //console.log(error);
        //var errorMessage =<any>error;
        if (error.error != null) {
          var mkerrores =error.error;
          //console.log(mkerrores);
          Swal.fire('MerQry', mkerrores, 'error');
        }
      }
      );
  }
  getupxml(idvar){
    var mkvarid=idvar;
    this._upXMLService.upxml_listcab(mkvarid).subscribe(
      response => {
        if (response) {
          this.upxmllst=response;
          this.descripcion= this.upxmllst[0].Descripcion;
          //console.log(this.descripcion);
          //Descripcion: "MOV001"
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
                table.column(5).search($(this).val()).draw();
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
