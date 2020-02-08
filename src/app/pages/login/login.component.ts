

import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Datefuctions } from '../../_functions/date.function';
import { Cfg } from './../../_config/gral.config';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// servicios
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { UserService } from '../../_services/login/user.service';
import { EmpresaService } from '../../_services/login/empresa.services';
import { SucursalService } from '../../_services/login/sucursal.service';


// sweetalert2
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService, EmpresaService, SucursalService, FormsModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
	public identity: any;	
	public token;
	public empresalst: any;
	public sucursallst: any;
	public message: string;
	public devEmpresa: string;
	public devEmpresaFrase : string;
	public devEmpresaFraseIni : string;
	public devEmpresaFraseIni2 : string;
	public clickMessage = '';
	public hoy = new Date();
	public hoytxt: string;
	public mkuser: any;
	public empresalstlog: any;
	public sucursallstlog: any;
	formaLogin: FormGroup;
	


  constructor(
    private _route: ActivatedRoute,
	private _router: Router,
	private _fb: FormBuilder,
	private _userService: UserService,
	private _empresaService: EmpresaService,
	private _sucusalService: SucursalService,
	private _script: ScriptLoaderService
  ) {
		
	
  }

	ngOnInit() {
		$('body').addClass('empty-layout');	
		this.getEmpresaAll();
		this.getSucursalAll();
		this.createFormLogin();		
	}


	public createFormLogin (){
		this.formaLogin = this._fb.group({
		  usuario : [{value: ''},Validators.required],
		  password : [{value: ''},Validators.required],
		  empresa : [{value: ''},Validators.required],
		  sucursal : [{value: ''},Validators.required],
		  fechatrabajo : [{value: ''},Validators.required],
		});
		this.formaLogin.reset();   
		this.formaLogin.controls['usuario'].setValue('');
		this.formaLogin.controls['password'].setValue('');
		this.formaLogin.controls['empresa'].setValue('');
		this.formaLogin.controls['sucursal'].setValue('');
		this.formaLogin.controls['fechatrabajo'].setValue(Datefuctions.getFechaSinHora_ymd(this.hoy));		
	  }

	ngAfterViewInit() {
		$('#login-form').validate({
			errorClass:"help-block",
			rules: {
						usuario: {required:true},
						password: {required:true},
						empresa: {required:true},
						sucursal: {required:true},
						fechatrabajo: {required:true}
			},
			highlight:function(e){$(e).closest(".form-group").addClass("has-error")},
			unhighlight:function(e){$(e).closest(".form-group").removeClass("has-error")},
		});
		this._script.load('./assets/js/scripts/form-plugins.js');	
  	}

	ngOnDestroy(){
		
	}
	public getSucursalAll(){
		this._sucusalService.sucursal_list().subscribe(
			response => {
				if (response){
					this.sucursallst = response;
				} else {
					console.log('error al responder');
				}
			}
		);
	}

	public getEmpresaAll(){
		this._empresaService.empresa_list().subscribe(
			response => {
				if (response){
					this.empresalst = response;
					console.log(this.empresalst);
				} else {
					console.log('error al responder');
				}
			}
		);
	}
	
	public MkClickLogin(){
		//console.log(this.formaLogin.value);
		if ( this.formaLogin.value.usuario == '' || !this.formaLogin.value.usuario || 
			 this.formaLogin.value.password == '' || !this.formaLogin.value.password ||
			 this.formaLogin.value.empresa == '' || !this.formaLogin.value.empresa ||
			 this.formaLogin.value.fechatrabajo == '' || !this.formaLogin.value.fechatrabajo )
			 {
			Swal.fire(Cfg.devempresa,'El usuario no se ha logueado correctamente', 'error');
		} else {
			this.empresalstlog = this.empresalst.filter( emp => emp.Empresa == this.formaLogin.value.empresa);
			this.sucursallstlog = this.sucursallst.filter( suc => suc.Sucursal == this.formaLogin.value.sucursal);
			this._userService.signup(this.formaLogin.value).subscribe(
				response=>{					
					//console.log(response);
					if (response.OK === 0) {
						//Swal.fire(Cfg.devempresa,'el usuario puede entrar',"success");
						this.identity=response;
						this.identity.FechaTrabajo=this.formaLogin.value.fechatrabajo;
						localStorage.setItem('identity',JSON.stringify(this.identity));
						this._userService.signup(this.formaLogin.value,'true').subscribe(
							response=>{
								this.token = response.token;
								console.log(this.token.length);
								if(this.token.length <=0 ){
									Swal.fire(Cfg.devempresa,'el token no se ha generado', 'error');								
								}else{
									localStorage.setItem('token', this.token);
								}
									Swal.fire(Cfg.devempresa+' Welcome' ,this.identity.nomUsuario, 'success');
									this._router.navigate(['index']);
							},
							error=>{
								var errorMessage =<any>error;
								if (errorMessage != null) {
									var mkerrores =JSON.parse(error._body);
									Swal.fire(Cfg.devempresa,mkerrores.message + '...',  'error');
								}
							}				 			
						);

					}else{
						Swal.fire(Cfg.devempresa+'kk',response.OKRef,'error');
					}
				},
				error=>{
					var errorMessage =<any>error;
					if (errorMessage != null) {
						var mkerrores =JSON.parse(error._body);
						console.log(mkerrores);
						Swal.fire(Cfg.devempresa+'kkddd',mkerrores.message.OKRef + '...', 'error');
					}
				}
			);	
		}
	}
}
