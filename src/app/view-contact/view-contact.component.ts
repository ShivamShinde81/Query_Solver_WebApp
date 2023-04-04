import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ContactService } from '../shared/contact.service';
import { IContact } from '../models/iContact';
import { IGroup } from '../models/iGroup';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  public group:IGroup = {} as IGroup;
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;

  constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });
    if(this.contactId)
    {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe((data:IContact)=>{
        this.contact = data;
        this.loading = false;
        this.contactService.getGroup(data).subscribe((data:IGroup)=>{
          this.group = data;
        });
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
   });

    }

  }


  public isNotEmpty(){
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }

}
