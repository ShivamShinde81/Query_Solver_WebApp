import { Component, OnInit } from '@angular/core';
import { IContact } from '../models/iContact';
import { IGroup } from '../models/iGroup';
import { ContactService } from '../shared/contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public loading : boolean = false;
  public contact : IContact = {} as IContact;
  public errorMessage : string | null = null;
  public groups : IGroup[] = [] as IGroup[];



  constructor(private contactService : ContactService, private router : Router) {}

  ngOnInit():void{
    this.contactService.getAllGroups().subscribe((data:IGroup[])=>{
      this.groups = data;
    }, (error)=>{
      this.errorMessage = error;
    });
  }

  public createSubmit(){
    this.contactService.createContact(this.contact).subscribe((data:IContact)=>{
      this.router.navigate(['/managerdash']).then();
    },(error)=>{
      this.errorMessage = error;
      this.router.navigate([`/contacts/add`]).then();
    });
  }

}
