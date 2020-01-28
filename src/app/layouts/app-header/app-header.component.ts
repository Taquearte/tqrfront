
import { Component,  OnInit } from '@angular/core';
import { Cfg } from './../../_config/gral.config';
//Servicios
import { UserService } from '../../_services/login/user.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: '[app-header]',
  templateUrl: './app-header.component.html',
  providers: [UserService]

})
export class AppHeader implements OnInit {
  public identity: any;
  public login: any;
  public perfil: string;
  public empresa: string;
  public sucursal: string;
  public fechaTrabajo : string;
  public usuario : string;
  public database : string;
  public backend : string;
  public foto : any;
  public perfil_lst : any;
  public perfilnew : any;
  public mensajes: any;
  public notificacion : any;
  public noti_lst : any[];
  public noticia_lst : Array<object> = [];



constructor ( 
  private _userService: UserService,

   ) {
    this.backend = Cfg.BackendUrl;
    this.identity=JSON.parse(localStorage.getItem('identity'));

}

  ngOnInit () {  
      this.empresa = this.identity.EmpresaNombre;
      this.fechaTrabajo = this.identity.FechaTrabajo;
      this.sucursal = this.identity.SucursalNombre;
      this.usuario = this.identity.Nombre ;
      this.perfil = this.identity.Usuario;
  }
}
