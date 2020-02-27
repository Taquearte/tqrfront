
import { DocumentoService } from './../../../_services/gasto/documento.service';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HTMLfuctions } from '../../../_functions/HTML.fuctions';
import { Datefuctions } from '../../../_functions/date.function';
import { Cfg } from '../../../_config/gral.config';
import { AcreedorService } from '../../../_services/gasto/acreedor.service';
import { ProyService } from '../../../_services/gasto/proy.service';
import { FormaPagoService } from '../../../_services/gasto/formapago.service';
import { ConceptoService } from '../../../_services/gasto/concepto.service';
import { CondicionService } from '../../../_services/gasto/condicion.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { HttpClient } from '@angular/common/http';
import { AdjuntoService } from '../../../_services/adjunto/adjunto.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-compra-edit',
  templateUrl: './compra.edit.component.html',
  providers: [AcreedorService,ProyService,FormaPagoService,ConceptoService,DocumentoService,CondicionService,ScriptLoaderService,AdjuntoService]
})

export class CompraEditComponent implements OnInit, AfterViewInit {
  @ViewChild('myInput') mkfile: ElementRef;
  public title: string;
  public empresa: string;
  public devempresa: string;
  public fechaformato: string;
  public movlst: any;
  public mov: any;
  public movdet: any[];
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
  public loading: boolean; 

  public identity: any;

  public frmCabecero: FormGroup;
  public frmDetalle: FormGroup;
  public frmUpload: FormGroup;

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
  public backendUrl: string;
  public backendUrladj: string;
  public adjunto:any;
  public adjuntolst:any;
  public perfil:any;



  constructor(

    private _acreedorService:AcreedorService,
    private _formaPagoService:FormaPagoService,
    private _proyService:ProyService,
    private _conceptoService:ConceptoService,
    private _documentoService:DocumentoService,
    private _fb: FormBuilder,
    private _rutaActiva: ActivatedRoute,
    private _adjuntoService:AdjuntoService,
    private _condicionService:CondicionService,
    private _router:Router,
    private _httpClient:HttpClient,
    private _scriptLoaderService:ScriptLoaderService,

    ) 
    {

    this.fechaformato=Cfg.formatoFecha;
    this.devempresa=Cfg.devempresa;
    this.backendUrl=Cfg.BackendUrl;
    this.backendUrladj=Cfg.BackendUrladj;
    this.identity=JSON.parse(localStorage.getItem('identity'));
    this.movdet=[];
    this.mkresControl2=[];
    this.formatofecha = Cfg.formatoFecha;
    this.empresamk=this.identity.Empresa;
    this.perfil = this.identity.PerfilWeb;
    this.mostrarCaja=false;
    this.detalleaddshow=false;
    }




    
    ngOnInit() {

      this.mkid = this._rutaActiva.snapshot.params.id;
      this.ctrFormCabecero();
      this.ctrFormDetalle(); 
      this.ctrFormAdjunto();
      this.getadjunto();
      this.loading=false;
      
      
      if (this.mkid==0){
        this.title='Nuevo';
        this.frmCabecero.controls['id'].setValue(this.mov.ID);
        this.frmCabecero.controls['empresa'].setValue(this.identity.Empresa);
        this.frmCabecero.controls['mov'].setValue(this.mov.Mov);
        this.frmCabecero.controls['movID'].setValue(this.mov.MovID);
        this.frmCabecero.controls['fechaEmision'].setValue(Datefuctions.getFechaSinHora_ymd(this.mov.FechaEmision));
        this.frmCabecero.controls['moneda'].setValue(this.mov.Moneda);
        this.frmCabecero.controls['tipoCambio'].setValue(this.mov.TipoCambio);
        this.frmCabecero.controls['proyecto'].setValue(this.mov.Proyecto);
        this.frmCabecero.controls['usuario'].setValue(this.mov.Usuario);
        this.frmCabecero.controls['referencia'].setValue(this.mov.Referencia);
        this.frmCabecero.controls['proveedor'].setValue(this.mov.Proveedor);
        this.frmCabecero.controls['estatus'].setValue(this.mov.Estatus);
        this.frmCabecero.controls['importe'].setValue(this.mov.Importe);
        this.frmCabecero.controls['impuestos'].setValue(this.mov.Impuestos);
        this.frmCabecero.controls['sucursal'].setValue(this.mov.Sucursal);
        this.frmCabecero.controls['sucursalOrigen'].setValue(this.mov.SucursalOrigen);


     /*    this.frmCabecero.controls['empresa'].setValue(this.identity.Empresa);
        this.frmCabecero.controls['mov'].setValue('Orden Compra');
        this.frmCabecero.controls['fechaEmision'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));
        this.frmCabecero.controls['ultimoCambio'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));
        this.frmCabecero.controls['proveedor'].setValue('');
        this.frmCabecero.controls['moneda'].setValue('Pesos');
        this.frmCabecero.controls['tipoCambio'].setValue('1.0');
        this.frmCabecero.controls['proyecto'].setValue('');
        this.frmCabecero.controls['usuario'].setValue(this.identity.Usuario);
        this.frmCabecero.controls['observaciones'].setValue('');
        this.frmCabecero.controls['estatus'].setValue('SINAFECTAR');
        this.frmCabecero.controls['condicion'].setValue('');
        this.frmCabecero.controls['vencimiento'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));
        this.frmCabecero.controls['importe'].setValue('0');
        this.frmCabecero.controls['impuestos'].setValue('0');
        this.frmCabecero.controls['sucursal'].setValue(this.identity.Sucursal);
        this.frmCabecero.controls['sucursalOrigen'].setValue(this.identity.Sucursal); */
      } else {
        //Cabecero
        this.title='Edit';
        console.log('ID',this.mkid);
        this._documentoService.documento_uno(this.mkid).subscribe(
          response => {
            if (response) { 
              this.mov=response;
              this.frmCabecero.controls['id'].setValue(this.mov.ID);
              this.frmCabecero.controls['empresa'].setValue(this.mov.Empresa);
              this.frmCabecero.controls['mov'].setValue(this.mov.Mov);
              this.frmCabecero.controls['movID'].setValue(this.mov.MovID);
              this.frmCabecero.controls['fechaEmision'].setValue(Datefuctions.getFechaSinHora_ymd(this.mov.FechaEmision));
              this.frmCabecero.controls['moneda'].setValue(this.mov.Moneda);
              this.frmCabecero.controls['tipoCambio'].setValue(this.mov.TipoCambio);
              this.frmCabecero.controls['proyecto'].setValue(this.mov.Proyecto);
              this.frmCabecero.controls['usuario'].setValue(this.mov.Usuario);
              this.frmCabecero.controls['referencia'].setValue(this.mov.Referencia);
              this.frmCabecero.controls['proveedor'].setValue(this.mov.Proveedor);
              this.frmCabecero.controls['estatus'].setValue(this.mov.Estatus);
              this.frmCabecero.controls['importe'].setValue(this.mov.Importe);
              this.frmCabecero.controls['impuestos'].setValue(this.mov.Impuestos);
              this.frmCabecero.controls['sucursal'].setValue(this.mov.Sucursal);
              this.frmCabecero.controls['sucursalOrigen'].setValue(this.mov.SucursalOrigen);

              this.movdet= this.mov.detalle;

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

    }

    ctrFormCabecero(){
      this.frmCabecero = this._fb.group({
        id : [{value: ''}, Validators.required], 
        empresa : [{value: ''}, Validators.required], 
        mov : [{value: ''}, Validators.required], 
        movID : [{value: ''}, Validators.required], 
        fechaEmision : [{value: ''}, Validators.required], 
        moneda : [{value: ''}, Validators.required],
        tipoCambio : [{value: ''}, Validators.required], 
        proyecto : [{value: ''}, Validators.required],
        usuario : [{value: ''}, Validators.required], 
        referencia : [{value: ''}, Validators.required], 
        proveedor : [{value: ''}, Validators.required], 
        estatus : [{value: ''}, Validators.required], 
        importe : [{value: ''}, Validators.required], 
        impuestos : [{value: ''}, Validators.required], 
        sucursal : [{value: ''}, Validators.required], 
        sucursalOrigen : [{value: ''}, Validators.required],         
        detalle :[],
      });  
      this.frmCabecero.reset();    
    
    }

    ctrFormDetalle() {
      this.frmDetalle = this._fb.group({
        articulo : [{value: ''}, Validators.required],
        cantidad : [{value: ''}, Validators.required],
        costoUnitario : [{value: ''}, Validators.required],
        descuento : [{value: ''}, Validators.required],
        importe : [{value: ''}, Validators.required],
        fechaRequerida : [{value: ''}, Validators.required],
        fechaEntrega : [{value: ''}, Validators.required],
        almacen : [{value: ''}, Validators.required],
      });
        this.frmDetalle.reset();
        this.frmDetalle.controls['articulo'].setValue('');
        this.frmDetalle.controls['cantidad'].setValue('');
        this.frmDetalle.controls['costoUnitario'].setValue('0.0');
        this.frmDetalle.controls['descuento'].setValue('0.0');
        this.frmDetalle.controls['importe'].setValue('0.0');
        this.frmDetalle.controls['fechaRequerida'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));
        this.frmDetalle.controls['fechaEntrega'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));
        this.frmDetalle.controls['almacen'].setValue('(TRANSITO)');
    }


    public ctrFormAdjunto () {
      this.frmUpload = this._fb.group({
        id : [{value: ''}],
        rama : [{value: ''}],
        usuario : [{value: ''}],
        fecha : [{value: ''}],
        file : [{value: ''}],        
      });
      this.frmUpload.reset();
      this.frmUpload.controls['id'].setValue(this.mkid);
      this.frmUpload.controls['rama'].setValue('COMS');
      this.frmUpload.controls['usuario'].setValue(this.identity.Usuario);
      this.frmUpload.controls['fecha'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));     
    }

    onFileSelect(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.frmUpload.get('file').setValue(file);
      }
    }

    mk_verarchivo(file){
      let mkfile=file;
      let mkurl = this.backendUrladj + '/assets/compra/' + mkfile;
      window.open(mkurl, '_blank');
    }
    

    // GET
  getadjunto(){
    this._adjuntoService.adjunto_list(this.mkid).subscribe(
      response => {
        if (response) {
          this.adjuntolst = response;
          console.log(this.adjuntolst);        
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


    onSubmit() {
      //console.log(this.frmUpload.value);

      const formData = new FormData(); 
      formData.append('id', this.frmUpload.get('id').value);
      formData.append('rama', this.frmUpload.get('rama').value);
      formData.append('usuario', this.frmUpload.get('usuario').value);
      formData.append('fecha', this.frmUpload.get('fecha').value);      
      formData.append('file', this.frmUpload.get('file').value);
  
      this._httpClient.post<any>(this.backendUrl + '/adjunto/new', formData).subscribe(
        response => {
          Swal.fire(this.devempresa, response.Ref, "success");
          this.getadjunto();
        },
        error => {
            Swal.fire(this.devempresa, error.error, 'error');          
        });
        this.mkfile.nativeElement.value = '';
        //this.closeFileUploadModal();
        //this.getadjunto();
        //this.ngOnInit();
    }
  
    closeFileUploadModal() {
      $("#modal_file").modal('hide');//ocultamos el modal
      $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
      $('.modal-backdrop').remove();//eliminamos el backdrop del modal
    }


    mk_guardar(){
      console.log('guardar');
    }

    mk_afectar(){


      if (this.frmCabecero.value.estatus !='PENDIENTE' ){
        Swal.fire(this.devempresa, 'El movimiento no se puede afectar con estatus: '+this.frmCabecero.value.estatus, 'error');
      } else  if (this.perfil == 'PROV' ){
        Swal.fire(this.devempresa, 'Esta acción no esta disponible para tu perfil', 'error');
      } else {

        this.loading=true;
        this._documentoService.documento_afectar(this.mkid).subscribe(          
          response => {
            console.log(this.mkid);
            if (response) {
              console.log(response);
              this.loading=false;
              if ( response.Ok == 0 ) {
                Swal.fire(this.devempresa, response.OkRef,"success");
              } else {
                Swal.fire(this.devempresa, response[0].OkRef,"error");                
              }              
              this._router.navigate(['compra/list']);
          }
        },
        error => {   
          this.loading=false;
          console.log(error);         
            Swal.fire(this.devempresa, error._body, 'error');          
        });
      }
    }
 
    mk_eliminar(){
      Swal.fire(this.devempresa, 'Funcion de Cancelacion', 'success');
    }

    mk_adjuntar(){
      console.log('adjuntar');

    }
    mk_agregarDetalle(){
      console.log('agrega detalle');
     } 
    mk_borrarDetalle(i){
      console.log('borrar detalle');
    }
    
    // Refrescar
    onChangetipoMov(event){
      console.log(event);
    }

    onChangeClase(event){
      console.log(event);

    }

    onChangeSubClase(event){
      console.log(event);

    }

    onChangeCantidad(event){
      console.log(event);
    }
    
    onChangeret(event){
      console.log(event);
    }
    onChangeret2(event){
      console.log(event);
    }

    onChangePrecio(event){
      console.log(event);
    }

    onChangeConcepto(event){    
      console.log(event); 
    } 

    onChangetipoiva(event){
      console.log(event);
    } 

}
