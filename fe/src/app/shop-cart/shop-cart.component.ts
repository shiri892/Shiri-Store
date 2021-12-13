import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartsService } from '../services/carts.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {

  constructor(public cartsService:CartsService) { }
  @Input() cart:Number;
  @Input() arrItems;
  @Input() totalPrice;
  public cartId = -1;
  public GlobalyPathInto = this.cartsService.GlobalyPath;
  @Output() chQuantity = new EventEmitter();
  @Output() delItem = new EventEmitter();

  ngOnInit() {
  }

  public changeQuantity(e ,id){
    this.chQuantity.emit({cart_item_id:id,quantity:e.target.value})
  }

  public deleteItem(data){
    this.delItem.emit({cart_item_id:data})
  }

  public deleteAll(){
    let i = this.arrItems.length
    let delInterval = setInterval(()=>{
      if(i === 0 ){clearInterval(delInterval);return}
      this.deleteItem(this.arrItems[i-1].cart_item_id)
      i--
    },300)
  }
}