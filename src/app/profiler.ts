export class Profiler {
  name;
  timeImprovement;
  addedScripts;
  removedScripts;
  existingScripts;
  allScripts;
  doughnut;

  /*getDoughnut() {
    var addedScrLen = (this.addedScripts ?  this.addedScripts.scripts.length:0);
    var removedScrLen = (this.removedScripts ?  this.removedScripts.scripts.length:0);
    var existingScrLen = (this.existingScripts ?  this.existingScripts.scripts.length:0);
    console.log("getDougnutData : "+addedScrLen );
    return {labels: ['Added', 'Removed', 'Existing'],datasets: [{data: [addedScrLen, removedScrLen, existingScrLen]}]};
  }*/
}
