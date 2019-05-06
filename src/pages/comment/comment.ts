import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DishdetailPage } from '../dishdetail/dishdetail';
import { Dish } from '../../shared/dish';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  dish: Dish;
  comment: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder) {
      this.comment = this.formBuilder.group({
        rating: 2,
        author: ['', Validators.required],
        comment: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  } 

  onSubmit() {
    var currentDate = new Date();
    var modifiedCurrentDate = currentDate.toISOString();
    let data = this.comment.value;
    data.date = modifiedCurrentDate;
    console.log(JSON.stringify(data)); //prints the data
    this.viewCtrl.dismiss(data);    
  }

}
