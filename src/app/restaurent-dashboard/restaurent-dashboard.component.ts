import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ResturentData} from './restaurent.model'

@Component({
  selector: 'app-restaurent-dashboard',
  templateUrl: './restaurent-dashboard.component.html',
  styleUrls: ['./restaurent-dashboard.component.scss']
})
export class RestaurentDashboardComponent implements OnInit {
  formValue! : FormGroup
  restaurentModelObj:ResturentData = new ResturentData
  AllRestaurentData:any='';
  showAdd!:boolean;
  showbtn!:boolean

  constructor(private formbuilder:FormBuilder, private api:ApiService) { }



  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      service:[''],

    })

    this.getRestauentData();

  };
  addRestore(){
    this.formValue.reset
    this.showAdd=true;
    this.showbtn=false

  }




  submit(){
    this.restaurentModelObj.name=this.formValue.value.name
    this.restaurentModelObj.email=this.formValue.value.email
    this.restaurentModelObj.mobile=this.formValue.value.mobile
    this.restaurentModelObj.address=this.formValue.value.address
    this.restaurentModelObj.service=this.formValue.value.service

    this.api.postRestaurant(this.restaurentModelObj).subscribe(res=>{
      console.log(res);
      alert("Restaurent Records Added Sussessfull")
      this.formValue.reset()
      this.getRestauentData()
    },)}

    //Get RestauentData
    getRestauentData(){
    this.api.getRestaurant().subscribe(res=>{
      this.AllRestaurentData=res
    })
    }

    //delete
    deleteRecord(data:any){
      this.api.deleteRestaurant(data.id).subscribe(res=>{
        alert("Restaurent Records Deleted")
        console.log(res);
        this.getRestauentData()

      })
    }

    //update
    onEditRecord(data:any){
      this.showAdd=false;
      this.showbtn=true
      this.restaurentModelObj.id = data.id
      this.formValue.controls['name'].setValue(data.name);
      this.formValue.controls['email'].setValue(data.email);
      this.formValue.controls['mobile'].setValue(data.mobile);
      this.formValue.controls['address'].setValue(data.address);
      this.formValue.controls['service'].setValue(data.service);
      console.log("dffdfdf");


    }

    updateRecord(){
      this.restaurentModelObj.name=this.formValue.value.name;
      this.restaurentModelObj.email=this.formValue.value.email;
      this.restaurentModelObj.mobile=this.formValue.value.mobile;
      this.restaurentModelObj.address=this.formValue.value.address;
      this.restaurentModelObj.service=this.formValue.value.service;

      this.api.updateRestaurant(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
        console.log(res);

        alert("Restaurent Records Updated ")
        this.getRestauentData()
      })
    }




  }


