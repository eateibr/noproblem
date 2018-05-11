import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AccordionModule } from 'primeng/components/accordion/accordion';
//import { PanelModule } from 'primeng/components/panel/panel';
import { ButtonModule } from 'primeng/components/button/button';
import { RadioButtonModule } from 'primeng/components/radioButton/radioButton';
import { DataGridModule } from 'primeng/datagrid';
import { TableModule } from 'primeng/table';
import {PanelModule} from 'primeng/panel';

import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';

import {TabViewModule} from 'primeng/tabview';
import {CarouselModule} from 'primeng/carousel';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpModule } from "@angular/http";
//import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { FileUploadModule } from 'primeng/fileupload';
//import { Router } from '@angular/router';
import {PaginatorModule} from 'primeng/paginator';

import { AppComponent } from './app.component';
import {ChartModule} from 'primeng/primeng';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    DataGridModule,
    TreeTableModule,
    HttpModule,
    TableModule,
    FileUploadModule,
    TabViewModule,
    CarouselModule,
    PaginatorModule,
    ChartModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private http: Http) {

  }

  ngOnInit() {

  }
}
