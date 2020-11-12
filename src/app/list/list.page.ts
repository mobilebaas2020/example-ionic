import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  users = [];
  page: any;
  constructor(
    public usersService: UsersService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    let tableName = 'user';
    let pageNumber = 0;
    let totalRecordsPerPage = 10;
    let sortField = 'name';
    let filters = 'age=41';

    this.usersService.getAll(tableName,pageNumber,totalRecordsPerPage,sortField,filters).then( usersReturn => {
        let data = JSON.parse(usersReturn.data);
        this.users =  data[tableName];
        this.page = data['page'];
    })
    .catch(error => {
      console.log('Error ',error);
      console.log('Error status ',error.status);
      console.log('Error error ',error.error);
      console.log('Error headers ',error.headers);
    })
  }

  back(){
    this.navCtrl.navigateForward('home');
  }

  edit(u:any) {
    this.navCtrl.navigateForward(`edit/${u.id}`);
  }

  delete(u:any) {
    let tableName = 'user';
    this.usersService.delete(u.id,tableName).then( reponse => {
      console.log('excluded !');
      this.ngOnInit();
    })
    .catch(error => {
      console.log('Error ',error);
      console.log('Error status ',error.status);
      console.log('Error error ',error.error);
      console.log('Error headers ',error.headers);
    });
  }

}
