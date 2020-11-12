import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {


  private userForm: FormGroup;
  id: string;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.userForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      city: ['',  Validators.required],
      age: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id != null){
      this.getById(this.id);
    }
  }

  getById(id: string) {
    let tableName = 'user';
    this.usersService.getById(id,tableName).then( userReturn => {
        let data = JSON.parse(userReturn.data);
        this.userForm = this.formBuilder.group({
          id: [data.id, Validators.required],
          name: [data.name, Validators.required],
          city: [data.city,  Validators.required],
          age: [data.age, Validators.required]
        });
    })
    .catch(error => {
      console.log('Error ',error);
      console.log('Error status ',error.status);
      console.log('Error error ',error.error);
      console.log('Error headers ',error.headers);
    });
  }

  insertUpdate(){
     if(this.userForm.value.id != null){
       console.log('update ', this.userForm.value.id);
       this.update();
     } else {
      console.log('insert ', this.userForm.value.id)
       this.insert();
     }
  }

  insert(){
    let tableName = 'user';
    this.usersService.insert(this.userForm.value,tableName).then( data => {
        console.log(data);
    })
    .catch(error => {
      console.log('Error ',error);
      console.log('Error status ',error.status);
      console.log('Error error ',error.error);
      console.log('Error headers ',error.headers);
    });
  }

  update(){
    let tableName = 'user';
    this.usersService.update(this.userForm.value,tableName).then( data => {
        console.log(data);
    })
    .catch(error => {
      console.log('Error ',error);
      console.log('Error status ',error.status);
      console.log('Error error ',error.error);
      console.log('Error headers ',error.headers);
    });
  }

  back(){
    this.navCtrl.navigateForward('home');
  }
}
