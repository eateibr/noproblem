import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpModule } from "@angular/http";
import { ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { FileUpload } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { Profiler } from './profiler';
//import { DoughnutChartDemo } from './doughnutchartdemo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('fileInput') fileInput: FileUpload;

  profilerList: Profiler[];
  files: TreeNode[];
  http: Http;
  //dougnut: DoughnutChartDemo;

  constructor(private http1: Http) {
    this.http = http1;
  }


  loadTreeView(fileName) {
    this.http.get(fileName)
      .toPromise()
      .then(res => this.profilerList = <Profiler[]>res.json().rootElements);
    /*this.http.get(fileName)
      .toPromise()
      .then(res => this.files = <TreeNode[]>res.json().data);
    console.log("FILES: " + this.files);*/
  }


  startUpload() {
    //this.fileInput.upload();
    var fileInput = document.getElementById('fileInput');
    if (fileInput && fileInput['files']) {
      var fileName = fileInput['files'].item(0).name;
      this.loadTreeView('./assets/' + fileName);
    }
  }

}
