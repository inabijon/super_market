import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContactService } from 'src/app/Services/contact.service';
import { User } from '../Models/user';
import { UsersService } from '../Services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit, AfterViewInit {
  opened: boolean = false;
  users!: User[];
  isGetProducts = true;

  displayedColumns: string[] = ['name', 'email', 'isAdmin', 'regDate'];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  TOTAL_USERS: any;
  messages: any = []
  constructor(private contact: ContactService, private UsersService: UsersService, private toastr: ToastrService) { }

  ngOnInit() {
    this.UsersService.getAllUsers().subscribe((data) => {
      this.dataSource = new MatTableDataSource<User>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.TOTAL_USERS = data.length;
      this.isGetProducts = false;
    });

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
  ngAfterViewInit() { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
