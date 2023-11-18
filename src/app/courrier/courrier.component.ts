import { Component, OnInit } from '@angular/core';
import { CourrierService } from '../service/courrier.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourrierRecu } from '../model/courrier';

@Component({
  selector: 'app-courrier',
  templateUrl: './courrier.component.html',
  styleUrls: ['./courrier.component.css']
})
export class CourrierComponent implements OnInit {
    
  courrierForm! : FormGroup;
  courrierList:CourrierRecu[] =  [];
  ngOnInit(): void {
    this.getAllCourriers();
  }

  constructor(private courrierService :CourrierService , private formBuilder:FormBuilder)
  { 
      this.courrierForm =  this.formBuilder.group({
        numInscri:[''],
        subject:[''],
        remarque :[''],
        expediteur :[''],
        destinataire: ['']
  
    })
  }






    public getAllCourriers () : void
       {
        this.courrierService.getAllCourrier().subscribe(courrierList=>{
          this.courrierList = courrierList;
        })  
    }
  


public saveCourrier():void
{
    const courrierRecu:CourrierRecu  = this.courrierForm.value as CourrierRecu;
     this.courrierService.saveCourrier(courrierRecu).subscribe(re=>{
      this.getAllCourriers();
     })
     this.courrierForm.reset();
}  

}
