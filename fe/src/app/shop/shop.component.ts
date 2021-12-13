import { Component, OnInit } from '@angular/core';
import { CartsService } from '../services/carts.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(public cartsService:CartsService, public usersService:UsersService) {}

  public cart = -1
  public arrItems = []
  public totalPrice:Number = 0
  public ifDisplay = false

  ngOnInit() {
    this.usersService.ifToken().subscribe(
      (res:any)=>{
        if(res.message.admin){
          window.location.href = "/"
        }
        else{this.ifDisplay=true}
      },
      err=>window.location.href = "/"
    )


    this.cartsService.getCart().subscribe(
      (res: any) => {
        if (res.message !== 'No results cart') {
          this.cart = res.message[0].cart_id;
          this.takeItems()
        }
      },
      err => { console.log(err) }
    )
  }

  takeItems() {
    this.cartsService.getItems(this.cart).subscribe(
      (res: any) => {
        if(res.message === "No results!!!"){this.arrItems = []; return}
        this.arrItems = res.message
        let total = 0
        for(let i = 0 ; i<res.message.length; i++){
          total += res.message[i].price * res.message[i].quantity
        }
        this.totalPrice = total;
      },
      err => console.log(err)
    )
  }

  public resizeCart() {
    let cart = document.getElementById('cart')
    if (cart.offsetWidth > 0) { cart.style.minWidth = "0px"; cart.style.width = '0px' }
    else if (cart.offsetWidth <= 0) { cart.style.minWidth = "350px"; cart.style.width = '20%' }
  }

  public changeQuantity(data) {
    this.cartsService.changeQuantity(data).subscribe(
      (res: any) => {
        this.takeItems()
      },err =>{console.log(err)}
    )
  }

  public addItem(data) {
    for(let i=0; i<this.arrItems.length; i++){
      if(this.arrItems[i].product_id === data.product_id){
        let newQuantity = this.arrItems[i].quantity+data.quantity
        this.changeQuantity({cart_item_id:this.arrItems[i].cart_item_id,quantity:newQuantity})
        this.takeItems()
        return
      }
    }
    if (this.cart === -1) {
      this.cartsService.addCart().subscribe(
        (res: any) => {
          this.cart = res.rere.insertId
          this.cartsService.addItem({ ...data, cart_id: res.rere.insertId }).subscribe(
            (res: any) => {
              this.takeItems();
            },err => console.log(err)
          )
        },err => console.log(err)
      )
    }
    else {
      this.cartsService.addItem({ ...data, cart_id: this.cart }).subscribe(
        (res: any) => {
          this.takeItems();
        },err => console.log(err)
      )
    }
  }

  public deleteItem(data){
    if(this.arrItems.length <= 1){
      this.cartsService.deleteCart({cart_id:this.cart}).subscribe(
        (res:any)=>{
          this.cart = -1
          this.totalPrice = 0
          this.takeItems();
        },err=>console.log(err)
      )
    }
    this.cartsService.deleteItem(data).subscribe(
      (res:any)=>{
        this.takeItems();
      },err=>console.log(err)
    )
  }

}
