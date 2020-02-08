import { NgModule } from '@angular/core';
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
import { CompraListComponent } from './pages/compras/list/compra.list.component';
import { GastoEditComponent } from './pages/gasto/edit/gasto.edit.component';
import { MapeoListComponent } from './pages/mapeo/list/mapeo.list.component';
import { MapeoEditComponent } from './pages/mapeo/edit/mapeo.edit.component';
import { RefreshComponent } from './pages/refresh/refresh.component';



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
    FileXMLComponent,
    UploadXMLComponent,
    FileXMLCabeceroComponent,
    MapeoListComponent,
    MapeoEditComponent,
    RefreshComponent

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
