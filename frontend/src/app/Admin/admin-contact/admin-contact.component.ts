import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../Services/contact.service';
import { Contact } from 'src/app/Models/contact';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.scss']
})
export class AdminContactComponent implements OnInit {

  opened: boolean = false;
  messages: any = []
  constructor(private contact: ContactService, private toastr: ToastrService) { }

  ngOnInit() {
    this.contact.getMessageFromUsers().subscribe(data => {
      this.messages = data.message
    }, () => {
      this.toastr.error('Fetching message error', 'Message', {
        closeButton: false,
        progressAnimation: 'increasing',
        progressBar: true,
        easing: 'linear',
        positionClass: 'toast-top-left'
      });
    })
  }

  deleteMessage(message: any) {
    let index = this.messages.indexOf(message)
    this.messages.splice(index, 1)
    this.contact.deleteUsersMessage(message._id).subscribe(data => {
      this.toastr.success('Successfully deleted', 'Message', {
        closeButton: false,
        progressAnimation: 'increasing',
        progressBar: true,
        easing: 'linear',
        positionClass: 'toast-top-left'
      });
    }, () => {
      this.toastr.error('Something went wrong', 'Message', {
        closeButton: false,
        progressAnimation: 'increasing',
        progressBar: true,
        easing: 'linear',
        positionClass: 'toast-top-left'
      });
    })
  }

}
