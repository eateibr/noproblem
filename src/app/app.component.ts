import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpModule } from "@angular/http";
import { ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { FileUpload } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { Profiler } from './profiler';
import { DoughnutChartDemo } from './doughnutchartdemo';
import { SortEvent } from 'primeng/api';
import {PanelModule} from 'primeng/panel';
import { Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map'; 

//import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('fileInput') fileInput: FileUpload;

  profilerListFull: Profiler[];
  profilerList: Profiler[];

  //files: TreeNode[];
  http: Http;
  dougnut1: DoughnutChartDemo;
  dougnut: any;

  cols: any[];

  constructor(private http1: Http) {
    this.http = http1;

    this.dougnut1 = new DoughnutChartDemo();
    //this.aa = {[{ "name":  "nam1" }, { "name": "nam2" }  ]};
    //console.log("============>"+this.aa);
    //this.dougnut = new DoughnutChartDemo();
    console.log("dougnut:" + this.dougnut1.data.labels.length);
  
  }

  ngOnInit() {
    console.log("Rodolfo - ngOnInit: begin"); 

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'execTimeDiff', header: 'Execution Time Difference' },
      { field: 'totalExecTimeDiff', header: 'Total Execution Time Difference' },
      { field: 'execCountDiff', header: 'Execution Count Difference' },
    ];
    console.log("Rodolfo - ngOnInit: end");
    console.log("Rodolfo - Colunas: "+this.cols);
    
}  

  loadTreeView(fileName) {
    this.http.get(fileName)
      .toPromise()
      .then(res => {
        this.profilerListFull = <Profiler[]>res.json().rootElements;
        console.log("this.profilerListFull:" + this.profilerListFull);
        this.profilerList = [];
        this.profilerListFull.forEach(element => {
          console.log("element.allScripts.scripts.length" + element.allScripts.scripts.length); 
          if (element.allScripts.scripts.length>0)
          {
            this.profilerList.push(element);
          }
          console.log("this.profilerList:" + this.profilerList); 
        });
      console.log("this.profilerList:" + this.profilerList);  
      }      
    
    );

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


  // startUpload() {
  //   //this.fileInput.upload();
  //   var fileInput = document.getElementById('fileInput');
  //   if (fileInput && fileInput['files']) {
  //     if(fileInput['files'].item(0)) {
  //        var fileName = fileInput['files'].item(0).name;
  //        this.loadTreeView('./assets/' + fileName);
  //        console.log("profilerList:::" + this.profilerList)
  //        //this.getDoughnut();
  //     } else {
  //        alert("Please select a file, first!");
  //     }
  //   } 
  // }

  tabClick() {
       alert("tabClick");
 }

  getDoughnut() {
    //console.log("prof : "+prof);
    var addedScrLen = 50; // (prof.addedScripts ?  prof.addedScripts.scripts.length:0);
    var removedScrLen = 100; // (prof.removedScripts ?  prof.removedScripts.scripts.length:0);
    var existingScrLen = 20; // (prof.existingScripts ?  prof.existingScripts.scripts.length:0);
    console.log("getDougnutData : "+addedScrLen );
    //this.dougnut = {labels: ['Added', 'Removed', 'Existing'],datasets: [{data: [addedScrLen, removedScrLen, existingScrLen]}]};
    this.dougnut = new DoughnutChartDemo();
    console.log("=>this.dougnut: "+this.dougnut);
    this.dougnut.data.datasets[0].data[0]=addedScrLen;
    this.dougnut.data.datasets[0].data[1]=removedScrLen;
    this.dougnut.data.datasets[0].data[2]=existingScrLen;
  }

  startUpload(event){
    
    
    let fileList: FileList = event.target.files;

    if(fileList.length > 1) {
     
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file1', file, file.name);
         file = fileList[1];
        formData.append('file2', file, file.name);
        
        let headers = new Headers();
        
        /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        
        this.http.post('http://localhost:8000/LogDiff', formData, options)
        .map(res => this.profilerList = <Profiler[]>res.json().rootElements)
        .subscribe(
          //data => console.log(data));
          res => console.log(res);
        )
    }
  }     

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });

}

}
