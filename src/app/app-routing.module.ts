import { NgModule, Component } from '@angular/core';
import { Select2Module } from 'ng2-select2';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { LockscreenComponent } from './pages/lockscreen/lockscreen.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { Error500Component } from './pages/error-500/error-500.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FilterPipeModule } from 'ngx-filter-pipe';


import { HomeComponent } from './pages/home/home.component';

import { UploadXMLComponent } from './pages/uploadXML/uploadXML.component';
import { FileXMLCabeceroComponent } from './pages/fileXMLCabecero/fileXMLCabecero.component';
import { FileXMLComponent } from './pages/fileXML/fileXML.component';
import { GastoListComponent } from './pages/gasto/list/gasto.list.component';
import { GastoEditComponent } from './pages/gasto/edit/gasto.edit.component';

import { CompraListComponent } from './pages/compras/list/compra.list.component';
import { CompraEditComponent } from './pages/compras/edit/compra.edit.component';

import { MapeoListComponent } from './pages/mapeo/list/mapeo.list.component';
import { MapeoEditComponent } from './pages/mapeo/edit/mapeo.edit.component';
import { RefreshComponent } from './pages/refresh/refresh.component';

import { CfgEmpresaComponent } from './pages/cfg/empresa/cfg.empresa.component';
import { CfgSucursalComponent } from './pages/cfg/sucursal/cfg.sucursal.component';
import { CfgArticuloComponent } from './pages/cfg/articulo/cfg.articulo.component';
import { CfgUsuarioComponent } from './pages/cfg/usuario/cfg.usuario.component';

import { ListaEmpresaComponent } from './pages/empresa/list/list.empresa.component';
import { ListaSucursalComponent } from './pages/sucursal/list/list.sucursal.component';
import { ListaArticuloComponent } from './pages/articulo/list/list.articulo.component';
import { ListaUsuarioComponent } from './pages/usuario/list/list.usuario.component';


const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {
        'path': '',
        'component': LayoutComponent,
        'children': [
            {
                path: 'index',
                component: HomeComponent
            },
            {
                path: 'gasto/edit/:id',
                component: GastoEditComponent
            },            
            {
                path: 'gasto/list/:id',
                component: GastoListComponent
            },
            {
                path: 'compra/list',
                component: CompraListComponent
            },
            {
                path: 'compra/edit/:id',
                component: CompraEditComponent
            }, 
            
            {
                path: 'mapeo/edit/:id',
                component: MapeoEditComponent
            },            
            {
                path: 'mapeo/list',
                component: MapeoListComponent
            },   
            {
                path: 'refresh',
                component: RefreshComponent
            },         
            {
                path: 'xml',
                component: FileXMLComponent
            },
            {
                path: 'upxml',
                component: UploadXMLComponent
            },     
            {
                path: 'upxmlcab/:id',
                component: FileXMLCabeceroComponent
            },  
            
            {
                path: 'logout',
                component: LogoutComponent
            },
            {
                path: 'cfgempresa',
                component: CfgEmpresaComponent
            },
            {
                path: 'cfgsucursal',
                component: CfgSucursalComponent
            },
            {
                path: 'cfgarticulo',
                component: CfgArticuloComponent
            },
            {
                path: 'cfgusuario',
                component: CfgUsuarioComponent
            },
            {
                path: 'empresa/list',
                component: ListaEmpresaComponent
            },
            {
                path: 'sucursal/list',
                component: ListaSucursalComponent
            },
            {
                path: 'articulo/list',
                component: ListaArticuloComponent
            },
            {
                path: 'usuario/list',
                component: ListaUsuarioComponent
            }              

        ]
    },

    {
        'path': 'login',
        'component': LoginComponent
    },
    {
        'path': 'lockscreen',
        'component': LockscreenComponent
    },
    {
        'path': 'forgot_password',
        'component': ForgotPasswordComponent
    },
    {
        'path': 'error_404',
        'component': Error404Component
    }, 
    {
        'path': 'error_500',
        'component': Error500Component
    },
  
    {
        'path': '**',
        'redirectTo': 'error_404',
        'pathMatch': 'full'
    },
];

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    LockscreenComponent,
    ForgotPasswordComponent,
    Error404Component,
    Error500Component,
    LogoutComponent,
    GastoEditComponent,
    GastoListComponent,
    CompraListComponent,
    CompraEditComponent,
    FileXMLComponent,
    UploadXMLComponent,
    FileXMLCabeceroComponent,
    MapeoListComponent,
    MapeoEditComponent,
    RefreshComponent,

    CfgSucursalComponent,
    CfgEmpresaComponent,
    CfgUsuarioComponent,
    CfgArticuloComponent,

    ListaSucursalComponent,
    ListaEmpresaComponent,
    ListaUsuarioComponent,
    ListaArticuloComponent,
  ],
  imports: [ 
      RouterModule.forRoot(routes), 
      FormsModule, 
      ReactiveFormsModule, 
      CommonModule, 
      BrowserModule, 
      Select2Module,
      NgxDropzoneModule,
      FilterPipeModule
 
    ],
  exports: [
    RouterModule, ReactiveFormsModule, CommonModule
  ]
})

export class AppRoutingModule { }
