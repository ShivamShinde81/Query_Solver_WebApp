import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { CustomerData } from './customer.model';
import { SharedService } from "../shared/shared.service";
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { IContact } from '../models/iContact';
import { ContactService } from '../shared/contact.service';
// import { error } from 'jquery';

@Component({
  selector: 'app-customerdash',
  templateUrl: './customerdash.component.html',
  styleUrls: ['./customerdash.component.css']
})
export class CustomerdashComponent implements OnInit {

  //For Adding Manager
  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;

  formValue!: FormGroup;
  restaurentModelObj: CustomerData = new CustomerData;
  allRestarantData: any;
  showAdd!:boolean;
  showbtn!:boolean;

  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton:any;
  @Input() data:string;
  employeeForm: FormGroup;
  employees: Employee[];
  employeesToDisplay: Employee[];

  constructor(private formBuilder: FormBuilder, private api: ApiService, private shared:SharedService, private employeeService : EmployeeService, private contactService : ContactService) {
        this.employeeForm = formBuilder.group({});
        this.employees = [];
        this.employeesToDisplay = this.employees;
  }
  
   showHideBtn = false;

  message = "Hello I am child 1";

  ngOnInit(): void {
    
    //For Manager
    this.getAllContactsFromServer();



    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData();
    this.shared.setMessage(this.message);

    this.employeeForm = this.formBuilder.group({
      firstname: this.formBuilder.control(''),
      lastname: this.formBuilder.control(''),
      birthday: this.formBuilder.control(''),
      gender: this.formBuilder.control(''),
      education: this.formBuilder.control('default'),
      company: this.formBuilder.control(''),
      jobExperience: this.formBuilder.control(''),
      salary: this.formBuilder.control('')
    });

    this.employeeService.getEmployees().subscribe((res)=>{
      console.log(res);
      for(let emp of res)
      {
        this.employees.unshift(emp);
      }
      this.employeesToDisplay = this.employees;
    });

  }

  
  educationOptions = [
    'Student',
    'Post-Graduate',
    'Under Graduate',
    'Other'
  ];

  addEmployee(){
    let employee: Employee = {
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      birthdate: this.BirthDay.value,
      gender: this.Gender.value,
      education: this.educationOptions[parseInt(this.Education.value)],
      company: this.Company.value,
      jobExperience: this.JobExperience.value,
      salary: this.Salary.value,
      profile: this.fileInput.nativeElement.files[0]?.name,
      
    };
    
    this.employeeService.postEmployee(employee).subscribe((res)=>{
        this.employees.unshift(res);
        this.clearForm();     
    },
    err => {
      alert("Check Again, Error occurs");
    });
  }

  removeEmployee(event:any){
    this.employees.forEach((val,index)=>{
      if(val.id === parseInt(event)){
        this.employeeService.deleteEmployee(event).subscribe((res)=>{
          this.employees.splice(index,1);
        });
      }
    });

  }

  searchEmployees(event:any)
  {
    let filteredEmployees: Employee[] = [];
    if(event === '')
    {
      this.employeesToDisplay = this.employees;
    }
    else
    {
        filteredEmployees = this.employees.filter((val,index)=>{
          let targetKey = val.firstname.toLowerCase() +''+val.lastname.toLowerCase();
          let searchKey = event.toLowerCase();
          return targetKey.includes(searchKey);
        });
        this.employeesToDisplay = filteredEmployees;
    }
  }

  editEmployee(event:any){
    this.employees.forEach((val,ind)=>{
      if(val.id === event)
      {
        this.setForm(val);
      }
    });
    this.removeEmployee(event);
    this.addEmployeeButton.nativeElement.click();
  }

  setForm(emp:Employee)
  {
    this.FirstName.setValue(emp.firstname);
    this.LastName.setValue(emp.lastname);
    this.BirthDay.setValue(emp.birthdate);
    this.Gender.setValue(emp.gender);

    let educationIndex = 0;
    this.educationOptions.forEach((val,index)=>{
      if(val === emp.education)
      {
        educationIndex = index;
      }
    });
    this.Education.setValue(emp.company);
    this.JobExperience.setValue(emp.jobExperience);
    this.Salary.setValue(emp.salary);
    this.fileInput.nativeElement.value='';
  }

  clearForm(){
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.BirthDay.setValue('');
    this.Gender.setValue('');
    this.Education.setValue('');
    this.Company.setValue('');
    this.JobExperience.setValue('');
    this.Salary.setValue('');
    this.fileInput.nativeElement.value = '';
  }

  public get FirstName() : FormControl{
    return this.employeeForm.get('firstname') as FormControl;
  }

  public get LastName() : FormControl{
    return this.employeeForm.get('lastname') as FormControl;
  }
  public get BirthDay() : FormControl{
    return this.employeeForm.get('birthday') as FormControl;
  }
  public get Gender() : FormControl{
    return this.employeeForm.get('gender') as FormControl;
  }
  public get Education() : FormControl{
    return this.employeeForm.get('education') as FormControl;
  }
  public get Company() : FormControl{
    return this.employeeForm.get('company') as FormControl;
  }
  public get JobExperience() : FormControl{
    return this.employeeForm.get('jobExperience') as FormControl;
  }
  public get Salary() : FormControl{
    return this.employeeForm.get('salary') as FormControl;
  }



  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }

  //Subscribe
  addResto() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestuarent(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurent Records Added Successfully!");
      let ref = document.getElementById('clear');
      ref?.click();


      this.formValue.reset();
      this.getAllData();
    },
      err => {
        alert("Check Again, Error occurs");
      })
  }

  getAllData() {
    this.api.getRestuarent().subscribe(res => {
      this.allRestarantData = res;
    })
  }

  deleteResto(data: any) {
    this.api.deleteRestuarent(data.id).subscribe(res => {
      alert("Restaurent Records Deleted!!");
      this.getAllData();
    })
  }

  onEditResto(data: any) {
    console.log("Edit button working");
    this.showAdd=false;
    this.showbtn=true;
    this.restaurentModelObj.id = data.id;

    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
    console.log("OnEdit again working");

  }

  updateResto() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestuarent(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
      alert("Restaurent Records Updated!!");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    })
  }
   
  showHideData(){
    this.showHideBtn = !this.showHideBtn;
    this.getAllData();
    console.log("show hide data buttion is working")
  }

  public getAllContactsFromServer(){
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data :IContact[] ) => {
      this.contacts = data;
      this.loading = false;
    }, (error) => {
         this.errorMessage = error;
         this.loading = false;
    });
  }

  public clickDeleteContact(contactId : string | undefined){
    if(contactId){
      this.contactService.deleteContact(contactId).subscribe((data:{})=>{
         this.getAllContactsFromServer();
      },(error)=>{
        this.errorMessage = error;
      })
    }
  }
  

  
 
}


