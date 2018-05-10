import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpModule } from "@angular/http";
import { ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { FileUpload } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { Profiler } from './profiler';
import { DoughnutChartDemo } from './doughnutchartdemo';

//import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('fileInput') fileInput: FileUpload;

  profilerList: Profiler[];
  aa: any;

  files: TreeNode[];
  http: Http;
  dougnut: DoughnutChartDemo;

  constructor(private http1: Http) {
    this.http = http1;

    this.dougnut = new DoughnutChartDemo();
    //this.aa = {[{ "name":  "nam1" }, { "name": "nam2" }  ]};
    //console.log("============>"+this.aa);
    //this.dougnut = new DoughnutChartDemo();
    console.log("dougnut:" + this.dougnut.data.labels.length);

  }


  loadTreeView(fileName) {
    this.http.get(fileName)
      .toPromise()
      .then(res => this.profilerList = <Profiler[]>res.json().rootElements);
    /*this.http.get(fileName)
      .toPromise()
      .then(res => this.files = <TreeNode[]>res.json().data);
    console.log("FILES: " + this.files);*/

    //this.loadTreeView('./assets/profiler.json');
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
