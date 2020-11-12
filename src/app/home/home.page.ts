import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CreatePage } from '../create/create.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  create: CreatePage;

  constructor(public navCtrl: NavController) { }

  openCreate() {
    this.navCtrl.navigateForward('create');
  }

  findAll() {
    this.navCtrl.navigateForward('list');
  }

}
