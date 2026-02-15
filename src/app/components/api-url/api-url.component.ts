import { Component } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-api-url',
  templateUrl: './api-url.component.html',
  styleUrls: ['./api-url.component.css']
})
export class ApiUrlComponent {
  edit:boolean=false;
  add:boolean=false;
  items:any=[];
  old:any;
  new:any;
  systemId:any
  
  constructor(private api:ApiserviceService){
   this.getData()
  }
   getData(){
    this.api.getApiData().subscribe((res:any)=>{
      if(res.success){
        this.items=res.data
      }
    })
   }
  updateApi(item:any){
  this.old=item.ipUrlToUi;
  this.new=item.ipUrlToUi;
  this.systemId=item.systemId;
  this.edit=true
  }
  addNew(){
    this.old="";
  this.new="";
  this.systemId="DEV";
  this.add=true
  }
  save(){
   let obj= {
      "systemId":this.systemId,
      "oldIpUrlToUi":this.old,
      "ipUrlToUi":this.new,
      "updatedBy":localStorage.getItem("username")
  }
  if(this.edit){
  this.api.updateApiData(obj).subscribe((res:any)=>{
    if(res.success){
      this.getData()
      this.edit=false;
    }
  })
}else{
  delete obj.oldIpUrlToUi
  this.api.saveApiData(obj).subscribe((res:any)=>{
    if(res.success){
      this.getData()
      this.add=false;
    }
  })
}
  }
}
