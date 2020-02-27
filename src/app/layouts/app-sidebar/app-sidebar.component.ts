import { Component } from '@angular/core';
declare var $: any;
@Component({
  selector: '[app-sidebar]',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebar {
  public identity: any;
  public perfil: any;
  public verCfg: boolean;
  public verMaestros: boolean;
constructor(){
  this.identity=JSON.parse(localStorage.getItem('identity'));
  this.verCfg=false;
  this.verMaestros=false;
}
  ngOnInit() {
    this.perfil=this.identity.PerfilWeb;
    console.log(this.perfil);
    if (this.perfil=='ADMIN'){
      this.verCfg=true;
      this.verMaestros=true;
    } else  if (this.perfil=='LIDER'){
      this.verCfg=false;
      this.verMaestros=true;    
    } else  if (this.perfil=='PROV'){
      this.verCfg=false;
      this.verMaestros=false;
    }
  }
}
