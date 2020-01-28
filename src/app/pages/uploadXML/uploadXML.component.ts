import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { HTMLfuctions } from '../../_functions/HTML.fuctions';
import { Datefuctions } from '../../_functions/date.function';
import { ProyService } from '../../_services/gasto/proy.service';
import { Cfg } from '../../_config/gral.config';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng2-select2';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, Form } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-uploadXML',
  templateUrl: './uploadXML.component.html',
  //styleUrls: ['./uploadXML.component.css'],
  providers: [ScriptLoaderService, HttpClient,ProyService]
})


export class UploadXMLComponent implements OnInit, AfterViewInit {
  public title: string;
  public fechaformato: string;
  public files: File[] = [];
  public uploadForm : FormGroup;
  public backendUrl: any;
  public mkresxml : any;
  public devempresa:string;
  public mkxml : any;
  public identity : any;
  public hoy = new Date();
  public proylst : any;
 
  constructor(
    private _script: ScriptLoaderService,
    private _httpClient:HttpClient,
    private _fb:FormBuilder,
    private datePipe: DatePipe,   
    private _proyService:ProyService, 
    ) 
    {
    this.fechaformato=Cfg.formatoFecha;
    this.backendUrl=Cfg.BackendUrl;
    this.devempresa=Cfg.devempresa;
    this.title='Upload XML 3.3';
    this.identity=JSON.parse(localStorage.getItem('identity'));
    }




  ngOnInit() {    
    this.createFormFile();
    this.getproy();
    this.files=[];
  }


  getproy(){
    this._proyService.proy_list().subscribe(
      response => {
        if (response) {
          this.proylst=response;
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

          // Proyecto
          $(".select2_proyecto").select2({
            placeholder: "Select Proyecto ",
            allowClear: true
          });  
          $('#Proyecto').on('change', (event) => { 
            let arrayProy = this.proylst.filter( ele => ele.descripcion == event.target.value);
            console.log(arrayProy[0].proyecto);
            this.uploadForm.controls['proyecto'].setValue(arrayProy[0].proyecto);                
          });

  }
  
  public createFormFile () {
    this.uploadForm = this._fb.group({
      usuario : [{value: ''}],
      descripcion : [{value: ''}],
      empresa : [{value: ''}],
      sucursal : [{value: ''}],
      fecha : [{value: ''}],
      files : [{value: ''}],   
      estatus : [{value: ''}],
      proyecto : [{value: ''}]
    });

    this.uploadForm.reset();   

    this.uploadForm.controls['usuario'].setValue(this.identity.Usuario);
    this.uploadForm.controls['descripcion'].setValue('');
    this.uploadForm.controls['empresa'].setValue(this.identity.Empresa);
    this.uploadForm.controls['sucursal'].setValue(this.identity.Sucursal);
    this.uploadForm.controls['fecha'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));
    this.uploadForm.controls['estatus'].setValue('ACTIVO'); 
    this.uploadForm.controls['proyecto'].setValue(''); 
  }

  onSelect(event) {
    //console.log(event);    
    this.files.push(...event.addedFiles);
    //const file = this.files;
    this.uploadForm.get('files').setValue(this.files);

  }

  onRemove(event) {
    //console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  
  mk_upload() {
    
    if (this.uploadForm.get('files').value==null || this.uploadForm.get('files').value==undefined){
      Swal.fire(this.devempresa, 'Seleccione un archivo con extension XML', 'error');
    } else if (this.uploadForm.get('descripcion').value==null || !this.uploadForm.get('descripcion').value ){
      Swal.fire(this.devempresa, 'La clave es un dato obligatorio', 'error');
    } else if (this.uploadForm.get('proyecto').value==null || !this.uploadForm.get('proyecto').value ){
      Swal.fire(this.devempresa, 'El Proyecto es un dato obligatorio', 'error');
    } else { 
      //console.log(this.uploadForm.get('files').value);
      const formData = new FormData();
      formData.append('usuario', this.uploadForm.get('usuario').value);
      formData.append('descripcion', this.uploadForm.get('descripcion').value);
      formData.append('empresa', this.uploadForm.get('empresa').value);
      formData.append('sucursal', this.uploadForm.get('sucursal').value);
      formData.append('fecha', this.uploadForm.get('fecha').value);
      formData.append('proyecto', this.uploadForm.get('proyecto').value);
      //formData.append('files', this.uploadForm.get('files').value);
      //formData.append('files', new Blob( [ JSON.stringify( this.files ) ], { type : 'application/json' } ) );

      for(let i =0; i < this.files.length; i++){
        formData.append("files", this.files[i], this.files[i].name);
          }

      formData.append('estatus', this.uploadForm.get('estatus').value);  

      //console.log(formData);
      this._httpClient.post<any>(this.backendUrl + '/upxml/new', formData).subscribe(
        response => {
          if (response.mkresxml) {
          this.mkresxml = response.mkresxml;
          Swal.fire(this.devempresa, ' los archivos subieron correctamente', 'success');
          this.files=[];
        }
        },
        error => {
          //console.log(error.error);
          //var errorMessage =<any>error;
          if (error.error != null) {
            var mkerrores =error.error;
            //console.log(mkerrores);
            Swal.fire(this.devempresa, mkerrores, 'error');
          }
        }
        );
    }
  }



}
