
import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: '[app-footer]',
  templateUrl: './app-footer.component.html'
})
export class AppFooter implements OnInit {
  public usuario: string;
  public empresa: string;
  public sucursal: string;
  public devEmpresa: string;
  public devEmpLink: string;
  public devEmpFrace: string;
  public fechaTrabajo: string;
  public anio: number;
  public identity: any;



  constructor (
  )
  {
    this.anio = (new Date).getFullYear();
    this.identity=JSON.parse(localStorage.getItem('identity'));
  }
  ngOnInit () {    
      this.usuario=this.identity.Usuario;
      this.empresa = this.identity.Empresa;
      this.fechaTrabajo = this.identity.FechaTrabajo;
      this.sucursal = this.identity.Sucursal;
  }
}


