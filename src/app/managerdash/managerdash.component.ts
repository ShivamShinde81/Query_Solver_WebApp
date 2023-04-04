import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { SharedService } from "../shared/shared.service";
import { IContact } from '../models/iContact';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-managerdash',
  templateUrl: './managerdash.component.html',
  styleUrls: ['./managerdash.component.css']
})
export class ManagerdashComponent implements OnInit {
  // @Input() allRestarantData : any;


  //For Adding Manager
  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;
 
  allRestarantData: any;
  constructor(private shared:SharedService,private api: ApiService, private contactService : ContactService){
    
  }
  checkBtn = false;
  message: string;
  
  ngOnInit(): void {
    //For Manager
    this.getAllContactsFromServer();
    this.message = this.shared.getMessage();
  }
  
  getAllData() {
    this.checkBtn = !this.checkBtn;
    this.api.getRestuarent().subscribe(res => {
      this.allRestarantData = res;
      
    })
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
