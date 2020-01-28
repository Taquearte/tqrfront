import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HTMLfuctions } from '../../../_functions/HTML.fuctions';
import { Datefuctions } from '../../../_functions/date.function';
import { Cfg } from '../../../_config/gral.config';
import { MovService } from '../../../_services/gasto/mov.service';
import { AcreedorService } from '../../../_services/gasto/acreedor.service';
import { ProyService } from '../../../_services/gasto/proy.service';
import { FormaPagoService } from '../../../_services/gasto/formapago.service';
import { ConceptoService } from '../../../_services/gasto/concepto.service';
import { CondicionService } from '../../../_services/gasto/condicion.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { GastoService } from '../../../_services/gasto/gasto.service';
import { Select2OptionData } from 'ng2-select2';
import { ScriptLoaderService } from '../../../_services/script-loader.service';

import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-gasto-edit',
  templateUrl: './gasto.edit.component.html',
  providers: [MovService,AcreedorService,ProyService,FormaPagoService,ConceptoService,GastoService,CondicionService,ScriptLoaderService]
})

export class GastoEditComponent implements OnInit, AfterViewInit {
  public title: string;
  public empresa: string;
  public devempresa: string;
  public fechaformato: string;
  public movlst: any;
  public gastomov: any;
  public gastomovdet: any[];
  public mkresControl2: any[];
  public movid: any;
  public proylst: any;
  public provlst: any;
  public establelst: any;
  public acreedorlst: any;
  public formapagolst: any;
  public conceptoclalst: any;
  public conceptoclaselect: any;
  public conceptosublst: any;
  public conceptosubselect: any;
  public conceptolst: any;
  public conceptoselect: any;
  public condicionlst: any;
  public hoy = new Date();
  public formatofecha: string;
  public mostrarCaja: boolean;

  public identity: any;
  public formGasto: FormGroup;
  public formaGastoDetalle: FormGroup;
  public mkid: number;
  public detalleshow: boolean ;
  public detalleaddshow: boolean ;
  public empresamk : string;
  public exampleData: Array<Select2OptionData>;
public total1:any;
public total2:any;
  public selectproy: string;
  public selectprov: string;
  public selectesta: string;
  public conceptoselectfinal: any;



  constructor(
    private _movService:MovService,
    private _acreedorService:AcreedorService,
    private _formaPagoService:FormaPagoService,
    private _proyService:ProyService,
    private _conceptoService:ConceptoService,
    private _gastoService:GastoService,
    private _fb: FormBuilder,
    private _rutaActiva: ActivatedRoute,
    private _condicionService:CondicionService,
    private _router:Router,
    private _scriptLoaderService:ScriptLoaderService,

    ) 
    {
    this.fechaformato=Cfg.formatoFecha;
    this.devempresa=Cfg.devempresa;
    
    this.identity=JSON.parse(localStorage.getItem('identity'));
    this.gastomovdet=[];
    this.mkresControl2=[];
    this.formatofecha = Cfg.formatoFecha;
    this.empresamk=this.identity.Empresa;
    this.mostrarCaja=false;
    }

    ngOnInit() {

      this.mkid = this._rutaActiva.snapshot.params.id;
      this.createFormaGasto()
      this.createFormaGastoDetalle(); 

      this.getmov();      
      this.getprov();
      this.getproy();
      this.getformapago();      
      this.getconceptocla();
      this.getconceptosub();
      this.getconcepto();
      this.getcondicion();
        
      
      
      if (this.mkid==0){
        this.title='Nuevo';
        this.formGasto.controls['Empresa'].setValue(this.identity.Empresa);
        this.formGasto.controls['Mov'].setValue('Gasto');
        this.formGasto.controls['FechaEmision'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));
        this.formGasto.controls['UltimoCambio'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));
        this.formGasto.controls['Acreedor'].setValue('');
        this.formGasto.controls['Moneda'].setValue('Pesos');
        this.formGasto.controls['TipoCambio'].setValue('1.0');
        this.formGasto.controls['Proyecto'].setValue('');
        this.formGasto.controls['Usuario'].setValue(this.identity.Usuario);
        this.formGasto.controls['Observaciones'].setValue('');
        this.formGasto.controls['FormaPago'].setValue('');
        this.formGasto.controls['Clase'].setValue('');
        this.formGasto.controls['Subclase'].setValue('');
        this.formGasto.controls['Estatus'].setValue('SINAFECTAR');
        this.formGasto.controls['Condicion'].setValue('');
        this.formGasto.controls['Vencimiento'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));
        this.formGasto.controls['Importe'].setValue('0');
        this.formGasto.controls['Retencion'].setValue('0');
        this.formGasto.controls['Impuestos'].setValue('0');
        this.formGasto.controls['FechaRequerida'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));
        this.formGasto.controls['Sucursal'].setValue(this.identity.Sucursal);
        this.formGasto.controls['SucursalOrigen'].setValue(this.identity.Sucursal);
        this.formGasto.controls['Comentarios'].setValue('Comentarios MKSD');
        this.formGasto.controls['Prioridad'].setValue('Normal');
        this.formGasto.controls['SubModulo'].setValue('GAS'); 

      } else {
        //Cabecero
        this.title='Edit';
        this._gastoService.gasto_uno(this.mkid).subscribe(
          response => {
            if (response) {  
              this.gastomov=response[0];               
              // Detalle
              this._gastoService.gasto_unodet(this.mkid).subscribe(
                response => {
                  if (response) {
                    this.gastomovdet = response;

                    this.formGasto.reset();
                    this.formGasto.controls['ID'].setValue(this.gastomov.ID);
                    this.formGasto.controls['Empresa'].setValue(this.gastomov.Empresa);
                    this.formGasto.controls['Mov'].setValue(this.gastomov.Mov);
                    this.formGasto.controls['MovID'].setValue(this.gastomov.MovID);
                    this.formGasto.controls['FechaEmision'].setValue(Datefuctions.getFechaSinHora_ymd(this.gastomov.FechaEmision));
                    this.formGasto.controls['UltimoCambio'].setValue(Datefuctions.getFechaSinHora_ymd(this.gastomov.UltimoCambio));
                    this.formGasto.controls['Acreedor'].setValue(this.gastomov.Acreedor);
                    this.formGasto.controls['Moneda'].setValue(this.gastomov.Moneda);
                    this.formGasto.controls['TipoCambio'].setValue(this.gastomov.TipoCambio);
                    this.formGasto.controls['Proyecto'].setValue(this.gastomov.Proyecto);
                    this.formGasto.controls['Usuario'].setValue(this.gastomov.Usuario);
                    this.formGasto.controls['Observaciones'].setValue(this.gastomov.Observaciones);
                    this.formGasto.controls['FormaPago'].setValue(this.gastomov.FormaPago);
                    this.formGasto.controls['Clase'].setValue(this.gastomov.Clase);
                    this.formGasto.controls['Subclase'].setValue(this.gastomov.Subclase);
                    this.formGasto.controls['Estatus'].setValue(this.gastomov.Estatus);
                    this.formGasto.controls['Condicion'].setValue(this.gastomov.Condicion);
                    this.formGasto.controls['Vencimiento'].setValue(Datefuctions.getFechaSinHora_ymd(this.gastomov.Vencimiento));
                    this.formGasto.controls['Importe'].setValue(this.gastomov.Importe);
                    this.formGasto.controls['Retencion'].setValue(this.gastomov.Retencion);
                    this.formGasto.controls['Impuestos'].setValue(this.gastomov.Impuestos);
                    this.formGasto.controls['FechaRequerida'].setValue(Datefuctions.getFechaSinHora_ymd(this.gastomov.FechaRequerida));
                    this.formGasto.controls['Sucursal'].setValue(this.gastomov.Sucursal);
                    this.formGasto.controls['SucursalOrigen'].setValue(this.gastomov.Sucursal);
                    this.formGasto.controls['Comentarios'].setValue(this.gastomov.Comentarios);
                    this.formGasto.controls['Prioridad'].setValue(this.gastomov.Prioridad);
                    this.formGasto.controls['SubModulo'].setValue(this.gastomov.SubModulo); 
                    this.formGasto.controls['detalle'].setValue(this.gastomovdet);
                   
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
    ngAfterViewInit() {  
      //this._scriptLoaderService.load('./assets/js/scripts/form-plugins.js');  

      // Proyecto
      $(".select2_proyecto").select2({
        placeholder: "Select Proyecto ",
        allowClear: true
      });  
      $('#Proyecto').on('change', (event) => { 
        let arrayProy = this.proylst.filter( ele => ele.descripcion == event.target.value);
        this.formGasto.controls['Proyecto'].setValue(arrayProy[0].proyecto);                
      });

      // Acreedor
      $(".select2_acreedor").select2({
        placeholder: "Select Acreedor ",
        allowClear: true
      });
      $('#Acreedor').on('change', (event) => {  
        let arrayAcre = this.acreedorlst.filter( ele => ele.Nombre == event.target.value);
        this.formGasto.controls['Acreedor'].setValue(arrayAcre[0].Proveedor);
      });

      //Establecimiento
      $(".select2_establecimiento").select2({
        placeholder: "Select Establecimiento",
        allowClear: true
      });        
      $('#Establecimiento').on('change', (event) => { 
        let arrayEst = this.acreedorlst.filter( ele => ele.Nombre == event.target.value);
        this.formaGastoDetalle.controls['Establecimiento'].setValue(arrayEst[0].Proveedor);        
      });

    }

    createFormaGasto(){
      this.formGasto = this._fb.group({
        ID : [{value: ''}, Validators.required], 
        Empresa : [{value: ''}, Validators.required], 
        Mov : [{value: ''}, Validators.required], 
        MovID : [{value: ''}, Validators.required], 
        FechaEmision : [{value: ''}, Validators.required], 
        UltimoCambio : [{value: ''}, Validators.required], 
        Acreedor : [{value: ''}, Validators.required], 
        Moneda : [{value: ''}, Validators.required],
        TipoCambio : [{value: ''}, Validators.required], 
        Proyecto : [{value: ''}, Validators.required],
        Usuario : [{value: ''}, Validators.required], 
        Observaciones : [{value: ''}, Validators.required], 
        FormaPago  : [{value: ''}, Validators.required],       
        Clase : [{value: ''}, Validators.required], 
        Subclase : [{value: ''}, Validators.required], 
        Estatus : [{value: ''}, Validators.required], 
        Condicion : [{value: ''}, Validators.required], 
        Vencimiento : [{value: ''}, Validators.required], 
        Importe : [{value: ''}, Validators.required], 
        Retencion : [{value: ''}, Validators.required], 
        Impuestos : [{value: ''}, Validators.required], 
        FechaRequerida : [{value: ''}, Validators.required],
        Sucursal : [{value: ''}, Validators.required], 
        SucursalOrigen : [{value: ''}, Validators.required], 
        Comentarios : [{value: ''}, Validators.required], 
        Prioridad : [{value: ''}, Validators.required],
        SubModulo : [{value: ''}, Validators.required],
        TieneRetencion: [{value: ''}, Validators.required],
        detalle :[],
      });  
      this.formGasto.reset();    
    
    }
    createFormaGastoDetalle() {
      this.formaGastoDetalle = this._fb.group({
        ID : [{value: ''}, Validators.required],
        Renglon : [{value: ''}, Validators.required], 
        RenglonSub : [{value: ''}, Validators.required],
        Fecha : [{value: ''}, Validators.required],
        Concepto : [{value: ''}, Validators.required],
        Referencia : [{value: ''}, Validators.required],
        Cantidad : [{value: ''}, Validators.required],
        Precio : [{value: ''}, Validators.required],
        Importe : [{value: ''}, Validators.required],
        Impuestos : [{value: ''}, Validators.required],
        ContUso : [{value: ''}, Validators.required],
        Sucursal : [{value: ''}, Validators.required],
        SucursalOrigen : [{value: ''}, Validators.required],
        Proyecto : [{value: ''}, Validators.required],
        PorcentajeDeducible : [{value: ''}, Validators.required],
        TipoImpuesto1 : [{value: ''}, Validators.required],
        Impuesto1 : [{value: ''}, Validators.required],
        Retencion : [{value: ''}, Validators.required],
        ImpRetencion : [{value: ''}, Validators.required],
        Retencion2 : [{value: ''}, Validators.required],
        ImpRetencion2 : [{value: ''}, Validators.required],                
        ClavePresupuestal : [{value: ''}, Validators.required],
        Total : [{value: ''}, Validators.required],
        Establecimiento : [{value: ''}, Validators.required],
        Personal : [{value: ''}, Validators.required],
      });
        this.formaGastoDetalle.reset();
        this.formaGastoDetalle.controls['ID'].setValue('this.movid');
        this.formaGastoDetalle.controls['Renglon'].setValue('');
        this.formaGastoDetalle.controls['RenglonSub'].setValue('');
        this.formaGastoDetalle.controls['Fecha'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));
        this.formaGastoDetalle.controls['Concepto'].setValue('');
        this.formaGastoDetalle.controls['Referencia'].setValue('');
        this.formaGastoDetalle.controls['Cantidad'].setValue('1');
        this.formaGastoDetalle.controls['Precio'].setValue('0.0');
        this.formaGastoDetalle.controls['Importe'].setValue('0.0');
        this.formaGastoDetalle.controls['Impuestos'].setValue('');
        this.formaGastoDetalle.controls['ContUso'].setValue('');
        this.formaGastoDetalle.controls['Sucursal'].setValue(this.identity.Sucursal);
        this.formaGastoDetalle.controls['SucursalOrigen'].setValue(this.identity.Sucursal);
        this.formaGastoDetalle.controls['Proyecto'].setValue('');
        this.formaGastoDetalle.controls['PorcentajeDeducible'].setValue('');
        this.formaGastoDetalle.controls['TipoImpuesto1'].setValue('');
        this.formaGastoDetalle.controls['Impuesto1'].setValue('');
        this.formaGastoDetalle.controls['ClavePresupuestal'].setValue('');
        this.formaGastoDetalle.controls['Total'].setValue('');
        this.formaGastoDetalle.controls['Establecimiento'].setValue('');
        this.formaGastoDetalle.controls['Personal'].setValue('');
       
        this.formaGastoDetalle.controls['Retencion'].setValue('');
        this.formaGastoDetalle.controls['ImpRetencion'].setValue('');
        this.formaGastoDetalle.controls['Retencion2'].setValue('');
        this.formaGastoDetalle.controls['ImpRetencion2'].setValue('');
 
    }

   
    getcondicion(){
      this._condicionService.condicion_list().subscribe(
        response => {
          if (response) {
            this.condicionlst=response;
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
    getconcepto(){
      this._conceptoService.concepto_list().subscribe(
        response => {
          if (response) {
            this.conceptolst=response;
            //console.log(this.conceptolst);
            this.conceptoselect=this.conceptolst;
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
    getconceptosub(){
      this._conceptoService.conceptosub_list().subscribe(
        response => {
          if (response) {
            this.conceptosublst=response;
            this.conceptosubselect=this.conceptosublst;
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
    getconceptocla(){
      this._conceptoService.conceptocla_list().subscribe(
        response => {
          if (response) {
            this.conceptoclalst=response;
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
    getformapago(){
      this._formaPagoService.formapago_list().subscribe(
        response => {
          if (response) {
            this.formapagolst=response;
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
    getprov(){
      this._acreedorService.acreedor_list().subscribe(
        response => {
          if (response) {
            this.acreedorlst=response;
            this.establelst=this.acreedorlst;
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
    getmov(){
      this._movService.mov_list().subscribe(
        response => {
          if (response) {
            this.movlst=response;
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

    // Accioness
    mk_guardar(){
      if (this.mkid==0 && this.formGasto.value.Estatus=='SINAFECTAR'){
        if (this.formGasto.value.Mov == '' || !this.formGasto.value.Mov  ){
          Swal.fire(this.devempresa, 'El movimiento es un dato obligatorio ', 'error');
        } else  if (this.formGasto.value.Acreedor == '' || !this.formGasto.value.Acreedor  ){
          Swal.fire(this.devempresa, 'El acreedor es un dato obligatorio ', 'error');
        } else if (this.formGasto.value.Moneda == '' || !this.formGasto.value.Moneda  ){
          Swal.fire(this.devempresa, 'La moneda es un dato obligatorio ', 'error');
        } else if (this.formGasto.value.FechaEmision == '' || !this.formGasto.value.FechaEmision  ){
          Swal.fire(this.devempresa, 'La fecha emision es un dato obligatorio ', 'error');
        } else if (this.formGasto.value.FormaPago == '' || !this.formGasto.value.FormaPago  ){
          Swal.fire(this.devempresa, 'La formapago es un dato obligatorio ', 'error');
        } else if (this.formGasto.value.Clase == '' || !this.formGasto.value.Clase  ){
          Swal.fire(this.devempresa, 'La clase del concepto es un dato obligatorio ', 'error');
        } else if (this.formGasto.value.Condicion == '' || !this.formGasto.value.Condicion  ){
          Swal.fire(this.devempresa, 'La condicion  es un dato obligatorio ', 'error');
        } else if (this.gastomovdet.length==0) {
          Swal.fire(this.devempresa, 'Debe agregar por lo menos un concepto', 'error');
        } else {
          
          this.total1 = this.gastomovdet.reduce((sum, value) => (typeof value.ImpRetencion === 'number' ? sum + value.ImpRetencion : sum), 0);
          this.total2 = this.gastomovdet.reduce((sum, value) => (typeof value.ImpRetencion2 === 'number' ? sum + value.ImpRetencion2 : sum), 0);
          if (this.total1 > 0 || this.total2 > 0){
            this.formGasto.controls['TieneRetencion'].setValue('1');
          } else {
            this.formGasto.controls['TieneRetencion'].setValue('0');
          }
          this.formGasto.controls['detalle'].setValue(this.gastomovdet);


          this._gastoService.gasto_new(this.formGasto.value).subscribe(
            response => {
              if (response) {
                this.mkid=response.gastoid;
                this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
                this._router.navigate(['gasto/edit/'+this.mkid]));
                Swal.fire(this.devempresa, 'Se guardo correctamente',"success");
            }
          },
          error => {
            var errorMessage = <any>error;
            //console.log(errorMessage);
            if (errorMessage != null) {
              var mkerrores =JSON.parse(error._body);
              Swal.fire(this.devempresa, mkerrores.message, 'error');
            }
          });
        }
      } else if (this.mkid >0 && this.formGasto.value.Estatus=='SINAFECTAR' ){
        this._gastoService.gasto_edit(this.mkid,this.formGasto.value).subscribe(
          response => {
            if (response) {
              this.movid=response[0].ID;         
              Swal.fire(this.devempresa, 'Se guardo correctamente',"success");
          }
        },
        error => {
          var errorMessage = <any>error;
          //console.log(errorMessage);
          if (errorMessage != null) {
            var mkerrores =JSON.parse(error._body);
            Swal.fire(this.devempresa, mkerrores.message, 'error');
          }
        });

      } else if (this.formGasto.value.Estatus !='SINAFECTAR' ){
        Swal.fire(this.devempresa, 'El movimiento no se puede guardar con estatus: '+this.formGasto.value.Estatus, 'error');
      }

    }
    mk_afectar(){
      if (this.formGasto.value.Estatus !='SINAFECTAR' ){
        Swal.fire(this.devempresa, 'El movimiento no se puede afectar con estatus: '+this.formGasto.value.Estatus, 'error');
      } else {
        
        this._gastoService.gasto_afectar(this.formGasto.value).subscribe(
          response => {
            if (response) {
              //this.movid=response[0].ID;
              //console.log(response);
              if ( response[0].Ok==0 ) {
                Swal.fire(this.devempresa, 'El Movimiento se afecto correctamente',"success");
              } else {
                Swal.fire(this.devempresa, response[0].OkRef,"error");
                
              }
              
              this._router.navigate(['gasto/list/'+this.identity.Empresa]);

          }
        },
        error => {
          var errorMessage = <any>error;
          //console.log(errorMessage);
          if (errorMessage != null) {
            var mkerrores =JSON.parse(error._body);
            Swal.fire(this.devempresa, mkerrores.message, 'error');
          }
        });
      }
    }
    mk_eliminar(){

      if (this.formGasto.value.Estatus !='SINAFECAR' ){
        Swal.fire(this.devempresa, 'El movimiento no se puede guardar con estatus: '+this.formGasto.value.Estatus, 'error');
      }
    }
    mk_agregarDetalle(){

       if (this.formGasto.value.Estatus !='SINAFECTAR' ){                                   
         Swal.fire(this.devempresa, 'no se pude agregar partidas con estatus: '+this.formGasto.value.Estatus, 'error');
       } else if (this.formaGastoDetalle.value.Concepto == '' || !this.formaGastoDetalle.value.Concepto ){
         Swal.fire(this.devempresa, 'El concepto es un dato obligatorio', 'error');
       } else if (this.formaGastoDetalle.value.Fecha == '' || !this.formaGastoDetalle.value.Fecha ){
         Swal.fire(this.devempresa, 'La fecha es un dato obligatorio', 'error');      
       } else if (this.formaGastoDetalle.value.Cantidad == 0 || !this.formaGastoDetalle.value.Cantidad ){
        Swal.fire(this.devempresa, 'La cantidad es un dato obligatorio', 'error');      
      }  else if (this.formaGastoDetalle.value.Precio == 0 ||  !this.formaGastoDetalle.value.Precio ){
        Swal.fire(this.devempresa, 'El precio es un dato obligatorio', 'error');    
      // } else if (this.formaGastoDetalle.value.TipoImpuesto1 == '' || !this.formaGastoDetalle.value.TipoImpuesto1 ){
      //   Swal.fire(this.devempresa, 'El tipo impuesto es un dato obligatorio', 'error');    
      } else if (this.formGasto.value.Mov.indexOf('Caja Chica') >=0 && ( this.formaGastoDetalle.value.Establecimiento =='' || !this.formaGastoDetalle.value.Establecimiento ) ){
        console.log(this.formGasto.value.Mov.indexOf('Caja Chica'));
        console.log(this.formaGastoDetalle.value.Establecimiento);
      

        Swal.fire(this.devempresa, 'El establecimiento es un dato obligatorio', 'error');    
      } else  {         

         this.gastomovdet.push(this.formaGastoDetalle.value); 
         this.formaGastoDetalle.reset(); 
         this.formaGastoDetalle.controls['ID'].setValue(this.movid);
         this.formaGastoDetalle.controls['Renglon'].setValue('');
         this.formaGastoDetalle.controls['RenglonSub'].setValue('');
         this.formaGastoDetalle.controls['Fecha'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));
         this.formaGastoDetalle.controls['Concepto'].setValue('');
         this.formaGastoDetalle.controls['Referencia'].setValue('');
         this.formaGastoDetalle.controls['Cantidad'].setValue('1');
         this.formaGastoDetalle.controls['Precio'].setValue('0.0');
         this.formaGastoDetalle.controls['Importe'].setValue('0.0');
         this.formaGastoDetalle.controls['Impuestos'].setValue('');
         this.formaGastoDetalle.controls['ContUso'].setValue('');
         this.formaGastoDetalle.controls['Sucursal'].setValue(this.identity.Sucursal);
         this.formaGastoDetalle.controls['SucursalOrigen'].setValue(this.identity.Sucursal);
         this.formaGastoDetalle.controls['Proyecto'].setValue('');
         this.formaGastoDetalle.controls['PorcentajeDeducible'].setValue('');
         this.formaGastoDetalle.controls['TipoImpuesto1'].setValue('');
         this.formaGastoDetalle.controls['Impuesto1'].setValue('');
         this.formaGastoDetalle.controls['ClavePresupuestal'].setValue('');
         this.formaGastoDetalle.controls['Total'].setValue('');
 
       }
       
     } 
    mk_borrarDetalle(i){
      this.gastomovdet.splice(i);
    }
    
    // Refrescar
    onChangetipoMov(event){
      
      // let Mov=event;
     
      // if (Mov.indexOf('Caja Chica')>=0) {
      // this.mostrarCaja=true;
      // //this._scriptLoaderService.load('./assets/js/scripts/form-plugins.js');     
      // } else {
      //   this.mostrarCaja=false;
      // }
    }

    onChangeClase(event){
      this.conceptosubselect = this.conceptosublst.filter( sup => sup.Clase == this.formGasto.value.Clase);
      this.conceptoselect = this.conceptolst.filter( sup => sup.Clase == this.formGasto.value.Clase);
    }

    onChangeSubClase(event){
      this.conceptoselect = this.conceptoselect.filter( sup => sup.SubClase == this.formGasto.value.Subclase);
    }

    onChangeCantidad(event){

      if (this.formaGastoDetalle.value.TipoImpuesto1=='IVA 16%'){
        let mkImporte = this.formaGastoDetalle.value.Cantidad*this.formaGastoDetalle.value.Precio
        let mkImpRetencion=mkImporte*(this.formaGastoDetalle.value.Retencion/100.0);
        let mkImpRetencion2=mkImporte*(this.formaGastoDetalle.value.Retencion2/100.0);        
        let mkimpuesto= (mkImporte)*(0.16)

        this.formaGastoDetalle.controls['Impuesto1'].setValue('16')        
        this.formaGastoDetalle.controls['Importe'].setValue(mkImporte);
        this.formaGastoDetalle.controls['Impuestos'].setValue(mkimpuesto);        
        
        this.formaGastoDetalle.controls['ImpRetencion'].setValue(mkImpRetencion);
        this.formaGastoDetalle.controls['ImpRetencion2'].setValue(mkImpRetencion2);
        
        this.formaGastoDetalle.controls['Total'].setValue((mkImporte+mkimpuesto)-(mkImpRetencion+mkImpRetencion2));

      } else {
        let mkImporte = this.formaGastoDetalle.value.Cantidad*this.formaGastoDetalle.value.Precio
        let mkImpRetencion=mkImporte*(this.formaGastoDetalle.value.Retencion/100.0);
        let mkImpRetencion2=mkImporte*(this.formaGastoDetalle.value.Retencion2/100.0);        
        let mkimpuesto= (mkImporte)*(0)

        this.formaGastoDetalle.controls['Impuesto1'].setValue('0')        
        this.formaGastoDetalle.controls['Importe'].setValue(mkImporte);
        this.formaGastoDetalle.controls['Impuestos'].setValue(mkimpuesto);        
        
        this.formaGastoDetalle.controls['ImpRetencion'].setValue(mkImpRetencion);
        this.formaGastoDetalle.controls['ImpRetencion2'].setValue(mkImpRetencion2);
        
        this.formaGastoDetalle.controls['Total'].setValue((mkImporte+mkimpuesto)-(mkImpRetencion+mkImpRetencion2));
      }

    }
    
    onChangeret(event){
      if (this.formaGastoDetalle.value.TipoImpuesto1=='IVA 16%'){
        let mkImporte = this.formaGastoDetalle.value.Cantidad*this.formaGastoDetalle.value.Precio
        let mkImpRetencion=mkImporte*(this.formaGastoDetalle.value.Retencion/100.0);
        let mkImpRetencion2=mkImporte*(this.formaGastoDetalle.value.Retencion2/100.0);        
        let mkimpuesto= (mkImporte)*(0.16)

        this.formaGastoDetalle.controls['Impuesto1'].setValue('16')        
        this.formaGastoDetalle.controls['Importe'].setValue(mkImporte);
        this.formaGastoDetalle.controls['Impuestos'].setValue(mkimpuesto);        
        
        this.formaGastoDetalle.controls['ImpRetencion'].setValue(mkImpRetencion);
        this.formaGastoDetalle.controls['ImpRetencion2'].setValue(mkImpRetencion2);
        
        this.formaGastoDetalle.controls['Total'].setValue((mkImporte+mkimpuesto)-(mkImpRetencion+mkImpRetencion2));

      } else {
        let mkImporte = this.formaGastoDetalle.value.Cantidad*this.formaGastoDetalle.value.Precio
        let mkImpRetencion=mkImporte*(this.formaGastoDetalle.value.Retencion/100.0);
        let mkImpRetencion2=mkImporte*(this.formaGastoDetalle.value.Retencion2/100.0);        
        let mkimpuesto= (mkImporte)*(0)

        this.formaGastoDetalle.controls['Impuesto1'].setValue('0')        
        this.formaGastoDetalle.controls['Importe'].setValue(mkImporte);
        this.formaGastoDetalle.controls['Impuestos'].setValue(mkimpuesto);        
        
        this.formaGastoDetalle.controls['ImpRetencion'].setValue(mkImpRetencion);
        this.formaGastoDetalle.controls['ImpRetencion2'].setValue(mkImpRetencion2);
        
        this.formaGastoDetalle.controls['Total'].setValue((mkImporte+mkimpuesto)-(mkImpRetencion+mkImpRetencion2));
      }   
    }
    onChangeret2(event){
      if (this.formaGastoDetalle.value.TipoImpuesto1=='IVA 16%'){
        let mkImporte = this.formaGastoDetalle.value.Cantidad*this.formaGastoDetalle.value.Precio
        let mkImpRetencion=mkImporte*(this.formaGastoDetalle.value.Retencion/100.0);
        let mkImpRetencion2=mkImporte*(this.formaGastoDetalle.value.Retencion2/100.0);        
        let mkimpuesto= (mkImporte)*(0.16)

        this.formaGastoDetalle.controls['Impuesto1'].setValue('16')        
        this.formaGastoDetalle.controls['Importe'].setValue(mkImporte);
        this.formaGastoDetalle.controls['Impuestos'].setValue(mkimpuesto);        
        
        this.formaGastoDetalle.controls['ImpRetencion'].setValue(mkImpRetencion);
        this.formaGastoDetalle.controls['ImpRetencion2'].setValue(mkImpRetencion2);
        
        this.formaGastoDetalle.controls['Total'].setValue((mkImporte+mkimpuesto)-(mkImpRetencion+mkImpRetencion2));

      } else {
        let mkImporte = this.formaGastoDetalle.value.Cantidad*this.formaGastoDetalle.value.Precio
        let mkImpRetencion=mkImporte*(this.formaGastoDetalle.value.Retencion/100.0);
        let mkImpRetencion2=mkImporte*(this.formaGastoDetalle.value.Retencion2/100.0);        
        let mkimpuesto= (mkImporte)*(0)

        this.formaGastoDetalle.controls['Impuesto1'].setValue('0')        
        this.formaGastoDetalle.controls['Importe'].setValue(mkImporte);
        this.formaGastoDetalle.controls['Impuestos'].setValue(mkimpuesto);        
        
        this.formaGastoDetalle.controls['ImpRetencion'].setValue(mkImpRetencion);
        this.formaGastoDetalle.controls['ImpRetencion2'].setValue(mkImpRetencion2);
        
        this.formaGastoDetalle.controls['Total'].setValue((mkImporte+mkimpuesto)-(mkImpRetencion+mkImpRetencion2));
      }   
    }

    onChangePrecio(event){

      if (this.formaGastoDetalle.value.TipoImpuesto1=='IVA 16%'){
        let mkImporte = this.formaGastoDetalle.value.Cantidad*this.formaGastoDetalle.value.Precio
        let mkImpRetencion=mkImporte*(this.formaGastoDetalle.value.Retencion/100.0);
        let mkImpRetencion2=mkImporte*(this.formaGastoDetalle.value.Retencion2/100.0);        
        let mkimpuesto= (mkImporte)*(0.16)

        this.formaGastoDetalle.controls['Impuesto1'].setValue('16')        
        this.formaGastoDetalle.controls['Importe'].setValue(mkImporte);
        this.formaGastoDetalle.controls['Impuestos'].setValue(mkimpuesto);        
        
        this.formaGastoDetalle.controls['ImpRetencion'].setValue(mkImpRetencion);
        this.formaGastoDetalle.controls['ImpRetencion2'].setValue(mkImpRetencion2);
        
        this.formaGastoDetalle.controls['Total'].setValue((mkImporte+mkimpuesto)-(mkImpRetencion+mkImpRetencion2));

      } else {
        let mkImporte = this.formaGastoDetalle.value.Cantidad*this.formaGastoDetalle.value.Precio
        let mkImpRetencion=mkImporte*(this.formaGastoDetalle.value.Retencion/100.0);
        let mkImpRetencion2=mkImporte*(this.formaGastoDetalle.value.Retencion2/100.0);        
        let mkimpuesto= (mkImporte)*(0)

        this.formaGastoDetalle.controls['Impuesto1'].setValue('0')        
        this.formaGastoDetalle.controls['Importe'].setValue(mkImporte);
        this.formaGastoDetalle.controls['Impuestos'].setValue(mkimpuesto);        
        
        this.formaGastoDetalle.controls['ImpRetencion'].setValue(mkImpRetencion);
        this.formaGastoDetalle.controls['ImpRetencion2'].setValue(mkImpRetencion2);
        
        this.formaGastoDetalle.controls['Total'].setValue((mkImporte+mkimpuesto)-(mkImpRetencion+mkImpRetencion2));
      }
           
    }

    onChangeConcepto(event){
     
      let conceptofin=event.substring(event.indexOf(':',0)+1);
      conceptofin=conceptofin.trim()
      this.conceptoselectfinal = this.conceptoselect.filter( sup => sup.Concepto == conceptofin);     

      console.log(this.conceptoselectfinal);
      let mkImpuesto=this.conceptoselectfinal[0].Impuestos;
      let mkretencion=this.conceptoselectfinal[0].Retencion;
      let mkretencion2=this.conceptoselectfinal[0].Retencion2;
      if (mkImpuesto=='16'){
        this.formaGastoDetalle.controls['TipoImpuesto1'].setValue('IVA 16%')  
        this.formaGastoDetalle.controls['Impuesto1'].setValue('16')   
        let mkImporte = this.formaGastoDetalle.value.Cantidad*this.formaGastoDetalle.value.Precio
        this.formaGastoDetalle.controls['Importe'].setValue(mkImporte);
        let mkimpuesto= (mkImporte)*(0.16)       
        this.formaGastoDetalle.controls['Impuestos'].setValue(mkimpuesto); 

        this.formaGastoDetalle.controls['Retencion'].setValue(mkretencion);
        let mkImpRetencion=mkImporte*mkretencion;
        this.formaGastoDetalle.controls['ImpRetencion'].setValue(mkImpRetencion);

        this.formaGastoDetalle.controls['Retencion2'].setValue(mkretencion2);
        let mkImpRetencion2=mkImporte*mkretencion2;
        this.formaGastoDetalle.controls['ImpRetencion2'].setValue(mkImpRetencion2);

        this.formaGastoDetalle.controls['Total'].setValue((mkImporte+mkimpuesto)-(mkImpRetencion+mkImpRetencion2));

      } else {

        this.formaGastoDetalle.controls['TipoImpuesto1'].setValue('')  
        this.formaGastoDetalle.controls['Impuesto1'].setValue('0')   
        let mkImporte = this.formaGastoDetalle.value.Cantidad*this.formaGastoDetalle.value.Precio
        this.formaGastoDetalle.controls['Importe'].setValue(mkImporte);
        let mkimpuesto= (mkImporte)*(0)       
        this.formaGastoDetalle.controls['Impuestos'].setValue(mkimpuesto); 

        this.formaGastoDetalle.controls['Retencion'].setValue(mkretencion);
        let mkImpRetencion=mkImporte*mkretencion;
        this.formaGastoDetalle.controls['ImpRetencion'].setValue(mkImpRetencion);

        this.formaGastoDetalle.controls['Retencion2'].setValue(mkretencion2);
        let mkImpRetencion2=mkImporte*mkretencion2;
        this.formaGastoDetalle.controls['ImpRetencion2'].setValue(mkImpRetencion2);

        this.formaGastoDetalle.controls['Total'].setValue((mkImporte+mkimpuesto)-(mkImpRetencion+mkImpRetencion2));
      }
     
    } 

    onChangetipoiva(event){
      let tipoiva=event;     

      if (tipoiva=='IVA 16%'){
          let mkImporte = this.formaGastoDetalle.value.Cantidad*this.formaGastoDetalle.value.Precio
          let mkImpRetencion=mkImporte*(this.formaGastoDetalle.value.Retencion/100.0);
          let mkImpRetencion2=mkImporte*(this.formaGastoDetalle.value.Retencion2/100.0);        
          let mkimpuesto= (mkImporte)*(0.16)
  
          this.formaGastoDetalle.controls['Impuesto1'].setValue('16')        
          this.formaGastoDetalle.controls['Importe'].setValue(mkImporte);
          this.formaGastoDetalle.controls['Impuestos'].setValue(mkimpuesto);        
          
          this.formaGastoDetalle.controls['ImpRetencion'].setValue(mkImpRetencion);
          this.formaGastoDetalle.controls['ImpRetencion2'].setValue(mkImpRetencion2);
          
          this.formaGastoDetalle.controls['Total'].setValue((mkImporte+mkimpuesto)-(mkImpRetencion+mkImpRetencion2));
  
        } else {
          let mkImporte = this.formaGastoDetalle.value.Cantidad*this.formaGastoDetalle.value.Precio
          let mkImpRetencion=mkImporte*(this.formaGastoDetalle.value.Retencion/100.0);
          let mkImpRetencion2=mkImporte*(this.formaGastoDetalle.value.Retencion2/100.0);        
          let mkimpuesto= (mkImporte)*(0)
  
          this.formaGastoDetalle.controls['Impuesto1'].setValue('0')        
          this.formaGastoDetalle.controls['Importe'].setValue(mkImporte);
          this.formaGastoDetalle.controls['Impuestos'].setValue(mkimpuesto);        
          
          this.formaGastoDetalle.controls['ImpRetencion'].setValue(mkImpRetencion);
          this.formaGastoDetalle.controls['ImpRetencion2'].setValue(mkImpRetencion2);
          
          this.formaGastoDetalle.controls['Total'].setValue((mkImporte+mkimpuesto)-(mkImpRetencion+mkImpRetencion2));
        }

    } 

}
