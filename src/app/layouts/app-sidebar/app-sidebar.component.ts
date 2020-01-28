import { Component } from '@angular/core';
declare var $: any;
@Component({
  selector: '[app-sidebar]',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebar {
  public identity: any;
  public rutasucursal: any;
constructor(){
  this.identity=JSON.parse(localStorage.getItem('identity'));
}
  ngOnInit() {
    this.rutasucursal='/gasto/list/'+this.identity.Empresa;
  }
}
