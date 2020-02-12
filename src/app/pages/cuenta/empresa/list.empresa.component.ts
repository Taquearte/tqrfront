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
  selector: 'app-list-empresa',
  templateUrl: './list.empresa.component.html',
  providers: [FormsModule, ReactiveFormsModule, ScriptLoaderService, MapeoService, ConceptoService]
})
export class ListaEmpresaComponent implements OnInit, AfterViewInit {
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
    this.title='Lista Empresa';
    }

  ngOnInit() {



  }

  ngAfterViewInit() {

  }
}
