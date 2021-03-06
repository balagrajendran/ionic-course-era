import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../../pages/comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL, private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController, public actionSheetController: ActionSheetController,
    public modalCtrl: ModalController) {
    this.dish = navParams.get('dish');
    this.favorite = favoriteservice.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);

    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000}).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetController.create({

      buttons: [{
        text: 'Add to Favorites',
        handler: () => {
          console.log('Add to Favorites clicked');
          this.addToFavorites();
          this.toastCtrl.create({
            message: 'Dish ' + this.dish.id + ' added as favorite successfully',
            position: 'middle',
            duration: 3000}).present();
        }
      }, {
        text: 'Add a Comment',
        handler: () => {
          console.log('Add a Comment clicked');
          this.addToComments();
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  addToComments() {
    let modal = this.modalCtrl.create(CommentPage);
    modal.onDidDismiss(commentDts => {
      console.log(JSON.stringify(commentDts)); //Always prints undefined
      this.dish.comments.push(commentDts);
      });
    modal.present();
  }

}