import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../shared/chat.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chat-comp',
  templateUrl: './chat-comp.component.html',
  styleUrls: ['./chat-comp.component.css']
})


export class ChatCompComponent implements OnInit, AfterViewInit {

  @ViewChild('popup',{static: false}) popup: any;
 

  public roomId: string;
  public messageText: string;
  public messageArray: { user: string, message: string }[] = [];
  private storageArray = [];

  public showScreen = false;
  public phone: string;
  public currentUser;
  public selectedUser;

  public userList = [
    {
      id: 1,
      name: 'Shivam Shinde',
      phone: '9307870170',
      image: 'assets/profile-image.PNG',
      roomId: {
        2: 'room-1',
        3: 'room-2',
        4: 'room-3'
      }
    },
    {
      id: 2,
      name: 'Adwait Kharkar',
      phone: '9876543210',
      image: 'assets/profile-image.PNG',
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5'
      }
    },
    {
      id: 3,
      name: 'Sanket Houde',
      phone: '9876543211',
      image: 'assets/profile-image.PNG',
      roomId: {
        1: 'room-2',
        2: 'room-4',
        4: 'room-6'
      }
    },
    {
      id: 4,
      name: 'Dexter Morgan',
      phone: '9876543212',
      image: 'assets/profile-image.PNG',
      roomId: {
        1: 'room-3',
        2: 'room-5',
        3: 'room-6'
      }
    }
  ];

  constructor(private modalService: NgbModal, private chatService: ChatService){ 

    // this.chatService.getMessage().subscribe((data:{user: string, message: string})=>{
    //   this.messageArray.push(data);
    // })
    


  }
 
  ngOnInit() : void{
    this.chatService.getMessage()
      .subscribe((data: { user: string, room: string, message: string }) => {
        // this.messageArray.push(data);
        if (this.roomId) {
          setTimeout(() => {
            this.storageArray = this.chatService.getStorage();
            const storeIndex = this.storageArray
              .findIndex((storage) => storage.roomId === this.roomId);
            this.messageArray = this.storageArray[storeIndex].chats;
          }, 500);
        }
      });

  }

  ngAfterViewInit(): void {
    this.openPopup(this.popup);
  }

  // selectUserHandler(phone: string):void {
  //   this.selectedUser = this.userList.find(user => user.phone === phone);
  //   this.roomId = this.selectedUser.roomId[this.selectedUser.id];
  //   this.messageArray = [];

  //   this.join(this.currentUser.name, this.roomId);
  // }

  // join(username: string, roomId: string): void{
  //   this.chatService.joinRoom({user: username, roomId: roomId});
  // }

  // sendMessage(): void {
  //   this.chatService.sendMessage({
  //    data: this.currentUser.name,
  //    room: this.roomId,
  //    message: this.messageText
  //   });

  //   this.messageText = '';
  // }

  openPopup(content: any): void {
    this.modalService.open(content, {backdrop: 'static', centered: true});
  }

  login(dismiss: any): void {
    this.currentUser = this.userList.find(user => user.phone === this.phone.toString());
    this.userList = this.userList.filter((user) => user.phone !== this.phone.toString());

    if (this.currentUser) {
      this.showScreen = true;
      dismiss();
    }
  }

  selectUserHandler(phone: string): void {
    this.selectedUser = this.userList.find(user => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.currentUser.id];
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }

    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      user: this.currentUser.name,
      room: this.roomId,
      message: this.messageText
    });

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.name,
        message: this.messageText
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [{
          user: this.currentUser.name,
          message: this.messageText
        }]
      };

      this.storageArray.push(updateStorage);
    }

    this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }

}
