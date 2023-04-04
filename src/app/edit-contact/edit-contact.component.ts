import { Component, OnInit } from '@angular/core';
import { IContact } from '../models/iContact';
import { IGroup } from '../models/iGroup';
import { ActivatedRoute } from "@angular/router";
import { ContactService } from '../shared/contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit{

  public loading : boolean = false;
  public contactId : string | null = null;
  public contact : IContact = {} as IContact;
  public errorMessage : string | null = null;
  public groups : IGroup[] = [] as IGroup[];

  constructor(private activatedRoute:ActivatedRoute,private contactService: ContactService,private router : Router) { }

  ngOnInit(): void{
    this.loading = true;
     this.activatedRoute.paramMap.subscribe((param)=>{
      this.contactId = param.get('contactId');
     });
     if(this.contactId)
     {
        this.contactService.getContact(this.contactId).subscribe((data:IContact)=>{
          this.contact = data;
          this.loading = false;
          this.contactService.getAllGroups().subscribe((data:IGroup[])=>{
            this.groups = data;
          });
        },(error)=>{
          this.errorMessage = error;
          this.loading = false;
        })
     }
  }

  public submitUpdate(){
    if(this.contactId)
    {
      this.contactService.updateContact(this.contact, this.contactId).subscribe((data:IContact)=>{
        this.router.navigate(['/managerdash']).then();
      },(error)=>{
        this.errorMessage = error;
        this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
      });
    }
  }
}
