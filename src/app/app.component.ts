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

  //files: TreeNode[];
  http: Http;
  dougnut1: DoughnutChartDemo;
  dougnut: any;

  constructor(private http1: Http) {
    this.http = http1;

    this.dougnut1 = new DoughnutChartDemo();
    //this.aa = {[{ "name":  "nam1" }, { "name": "nam2" }  ]};
    //console.log("============>"+this.aa);
    //this.dougnut = new DoughnutChartDemo();
    console.log("dougnut:" + this.dougnut1.data.labels.length);

  }


  loadTreeView(fileName) {
    this.http.get(fileName)
      .toPromise()
      .then(res => this.profilerList = <Profiler[]>res.json().rootElements);
      /*console.log("this.profilerList:" + this.profilerList);
      var len = this.profilerList.length;
      console.log("len:::"+len);
      for(var i=0; i<len; i++) {
        this.profilerList[i].doughnut = this.getDougnutData(this.profilerList[i]);
      }*/
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

  getDoughnut(){
    //console.log("prof : "+prof);
    var addedScrLen = 50; // (prof.addedScripts ?  prof.addedScripts.scripts.length:0);
    var removedScrLen = 100; // (prof.removedScripts ?  prof.removedScripts.scripts.length:0);
    var existingScrLen = 20; // (prof.existingScripts ?  prof.existingScripts.scripts.length:0);
    console.log("getDougnutData : "+addedScrLen );
    //this.dougnut = {labels: ['Added', 'Removed', 'Existing'],datasets: [{data: [addedScrLen, removedScrLen, existingScrLen]}]};
    this.dougnut = new DoughnutChartDemo();
    //this.dougnut.datasets.data[0]=99;
  }

}
