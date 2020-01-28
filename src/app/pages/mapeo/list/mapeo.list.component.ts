import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { HTMLfuctions } from '../../../_functions/HTML.fuctions';
import { Cfg } from '../../../_config/gral.config';
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
  selector: 'app-mapeo',
  templateUrl: './mapeo.list.component.html',
  providers: [FormsModule, ReactiveFormsModule, ScriptLoaderService, MapeoService, ConceptoService]
})
export class MapeoListComponent implements OnInit, AfterViewInit {
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
  public frmMapeo : FormGroup;
  public hoy = new Date();
 
  constructor(
    private _script: ScriptLoaderService,
    private _mapeoService:MapeoService,
    private _conceptoService:ConceptoService,
    private _fb:FormBuilder,
    private datePipe: DatePipe,    
    private filterPipe: FilterPipe
    ) 
    {
    this.fechaformato=Cfg.formatoFecha;
    this.title='Equivalencias Productos y Servicios vs Conceptos Gasto';
    }

  ngOnInit() {
    this.identity=JSON.parse(localStorage.getItem('identity'));
    this.empresa=this.identity.empresa;
    this.crtFrmMapeo();
    this.getmapeo();
    this.getconcepto();


  }

    mk_getBottonClass(status){
      return HTMLfuctions.getEstatusClass(status);
    }


  mk_selConcepto(i){
    console.log(i);
  }

  mk_getfrmConcepto(){
   
  }

  onCheckChange (concepto, clase, subclase){
    console.log(concepto, clase, subclase);
  }

  mk_editar(i){    
    this.mapeoedit=this.mapeolst[i];
    console.log(this.mapeoedit);
    this.frmMapeo.controls['provrfc'].setValue(this.mapeoedit.Proveedor);
    this.frmMapeo.controls['provnombre'].setValue(this.mapeoedit.Nombre);
    this.frmMapeo.controls['cveprodserv'].setValue(this.mapeoedit.ClaveProdServ);
    this.frmMapeo.controls['descripcion'].setValue(this.mapeoedit.UltimaDes); 
    this.frmMapeo.controls['concepto'].setValue(this.mapeoedit.Concepto);    
    this.frmMapeo.controls['clase'].setValue(this.mapeoedit.Clase); 
    this.frmMapeo.controls['subclase'].setValue(this.mapeoedit.SubClase); 

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

    
        this.claselst = this.conceptolst.filter(
          (thing, i, arr) => arr.findIndex(t => t.Clase === thing.Clase) === i
        );
         // console.log(this.claselst);


           


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
  getmapeo(){    
    this._mapeoService.mapeo_list().subscribe(
      response => {
        if (response) {
          this.mapeolst=response;         
          $( document ).ready(function() {
            $('#dt_mapeo').DataTable({
                pageLength: 10,
                fixedHeader: true,
                responsive: true,
                "sDom": 'rtip',
                columnDefs: [{
                    targets: 'no-sort',
                    orderable: false
                }]
            });
            var table = $('#dt_mapeo').DataTable();
            $('#key-search').on('keyup', function() {
                table
                    .search(this.value)
                    .draw();
            });

            $('#type-filter').on('change', function() {
                table.column(4).search($(this).val()).draw();
            });
        });

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
  

  ngAfterViewInit() {

  }
}
