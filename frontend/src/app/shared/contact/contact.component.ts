import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../../Services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private contactS: ContactService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  contactUs(contact: NgForm) {
    this.contactS.sendMessageToAdmin(contact.value).subscribe(data => {
      this.toastr.success('Successfully send', 'Message', {
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
    contact.resetForm()
  }

}
