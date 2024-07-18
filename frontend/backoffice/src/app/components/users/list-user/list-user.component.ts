import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { TableService } from 'src/app/shared/service/table.service';
import { UserListDB, USERLISTDB } from 'src/app/shared/tables/list-users';
import {Field} from "../../../models/field";
import {User} from "../../../models/user";
import {FieldServiceService} from "../../../services/FieldService/field-service.service";
import {Router} from "@angular/router";
import {FieldImageService} from "../../../services/field-image/field-image.service";
import {UserServiceService} from "../../../services/UserService/user-service.service";
import {map} from "rxjs/operators";
import {UserImageService} from "../../../services/user-image/user-image.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [TableService, DecimalPipe]
})
export class ListUserComponent implements OnInit {
  userList: User[] = [];

  public tableItem$: Observable<UserListDB[]>;
  public searchText;
  total$: Observable<number>;

  constructor(private userService: UserServiceService, private route: Router, private userImageService: UserImageService) {

  }

  /*@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;

  }*/

  public getAllUsers(){
    this.userService.getAllUser()
        .pipe(

            map((x: User[], i) => x.map((user: User) => this.userImageService.createImagesMal(user)))
        )
        .subscribe(
            (users: User[]) => {
              this.userList = users;
              console.log(this.userList);
            },
            (error) => {
              console.error('Error fetching users:', error);
            }
        );
  }

    deleteUser(id){
        this.userService.deleteUser(id).subscribe((response) => {
            this.getAllUsers();
        });
    }

  ngOnInit() {
    this.getAllUsers();
    console.log(this.getAllUsers());
  }

    editUserDetails(id) {
        this.route.navigate(['/users/update-user', {id}]);
    }
}

