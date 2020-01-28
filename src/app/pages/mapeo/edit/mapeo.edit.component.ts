import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { HTMLfuctions } from '../../../_functions/HTML.fuctions';
import { Cfg } from '../../../_config/gral.config';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MapeoService } from '../../../_services/gasto/mapeo.service';
import { ConceptoService } from '../../../_services/gasto/concepto.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, Form } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { FilterPipe } from 'ngx-filter-pipe';
import { Datefuctions } from '../../../_functions/date.function';
declare var $: any;

@Component({
  selector: 'app-mapeoedit',
  templateUrl: './mapeo.edit.component.html',
  providers: [FormsModule, ReactiveFormsModule,ScriptLoaderService, MapeoService, ConceptoService]
})
export class MapeoEditComponent implements OnInit, AfterViewInit {
  public title: string;
  public devempresa: string;
  public fechaformato: string;
  public mapeolst: any;
  public conceptolst: any;
  public conceptoclalst: any;
  public conceptosublst: any;

  public claselst: any;
  public subclaselst: any;
  public mkid: any;
  public conceptoedit: any;
  public identity: any;
  public searchText: any  = { $or: [{ Concepto: '' },{ Clase: '' }] };
  public conceptoFilter: any = { Concepto: '' };
  public claseFilter: any = { Clase: '' };
  public frmMapeo : FormGroup;
  public hoy = new Date();
  
 
  constructor(
    private _rutaActiva: ActivatedRoute,
    private _router:Router,
    private _script: ScriptLoaderService,
    private _mapeoService:MapeoService,
    private _conceptoService:ConceptoService,
    private _fb:FormBuilder,
    private datePipe: DatePipe,    
    private filterPipe: FilterPipe
    ) 
    {
    this.fechaformato=Cfg.formatoFecha;
    this.devempresa=Cfg.devempresa
    this.title='Equivalencias Productos y Servicios vs Conceptos Gasto';
    }

  ngOnInit() {
    this.mkid = this._rutaActiva.snapshot.params.id;
    this.identity=JSON.parse(localStorage.getItem('identity'));
    this.getconceptocla();
    this.getconceptosub();
    this.crtFrmMapeo();
    this.getmapeo();
    this.getconcepto();
  }

  mk_guardar(){
   if ( this.frmMapeo.value.concepto == "" || !this.frmMapeo.value.concepto){
    Swal.fire(this.devempresa,'Debe seleccionar un concepto', 'error');	
   } else {
    console.log(this.frmMapeo.value);
    this._mapeoService.mapeo_edit(this.frmMapeo.value,this.mkid).subscribe(
      response => {
        if (response) {
            console.log(response)
            Swal.fire(this.devempresa,'El registro se actualizo correctamente',"success");
            this._router.navigate(['mapeo/list']);


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
    
  }

  getconceptocla(){
    this._conceptoService.conceptocla_list().subscribe(
      response => {
        if (response) {
          this.conceptoclalst=response;
         // console.log(this.conceptoclalst);
          
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var mkerrores =JSON.parse(error._body);
          Swal.fire('MerQry', mkerrores.message, 'error');
        }
      });
  }
  getconceptosub(){
    this._conceptoService.conceptosub_list().subscribe(
      response => {
        if (response) {
          this.conceptosublst=response;
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var mkerrores =JSON.parse(error._body);
          Swal.fire('MerQry', mkerrores.message, 'error');
        }
      });

  }
  onCheckChange (concepto, clase, subclase){
    console.log(concepto, clase, subclase);
    this.frmMapeo.controls['concepto'].setValue(concepto);    
    this.frmMapeo.controls['clase'].setValue(clase); 
    this.frmMapeo.controls['subclase'].setValue(subclase); 
  }
  public crtFrmMapeo () {
    this.frmMapeo = this._fb.group({
      usuario : [{value: ''}],
      estatus : [{value: ''}],
      fechaCambio : [{value: ''}],
      provrfc : [{value: ''}],
      provnombre : [{value: ''}],
      cveprodserv : [{value: ''}],
      descripcion : [{value: ''}],
      concepto : [{value: ''}],
      clase : [{value: ''}],   
      subclase : [{value: ''}]
    });

    this.frmMapeo.reset();  

    this.frmMapeo.controls['usuario'].setValue(this.identity.usuario);
    this.frmMapeo.controls['estatus'].setValue('COMPLETO');
    this.frmMapeo.controls['fechaCambio'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));
    this.frmMapeo.controls['provrfc'].setValue('');
    this.frmMapeo.controls['provnombre'].setValue('');
    this.frmMapeo.controls['cveprodserv'].setValue('');
    this.frmMapeo.controls['descripcion'].setValue('');    
    this.frmMapeo.controls['clase'].setValue(''); 
    this.frmMapeo.controls['subclase'].setValue(''); 
  }
  getconcepto(){
    this._conceptoService.concepto_list().subscribe(
      response => {
        if (response) {
          this.conceptolst=response;

          $( document ).ready(function() {
            $('#dt_concepto').DataTable({
                pageLength: 10,
                fixedHeader: true,
                responsive: true,
                "sDom": 'rtip',
                columnDefs: [{
                    targets: 'no-sort',
                    orderable: false
                }]
            });
            var table = $('#dt_concepto').DataTable();
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
  getmapeo(){
    this._mapeoService.mapeo_uno(this.mkid).subscribe(
      response => {
        if (response) {
          this.mapeolst=response;
          console.log('kk',this.mapeolst)
            this.frmMapeo.controls['provrfc'].setValue(this.mapeolst[0].Proveedor);
            this.frmMapeo.controls['provnombre'].setValue(this.mapeolst[0].Nombre);
            this.frmMapeo.controls['cveprodserv'].setValue(this.mapeolst[0].ClaveProdServ);
            this.frmMapeo.controls['descripcion'].setValue(this.mapeolst[0].UltimaDes); 

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
