import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shop-categorys',
  templateUrl: './shop-categorys.component.html',
  styleUrls: ['./shop-categorys.component.css']
})
export class ShopCategorysComponent implements OnInit {

  constructor(public fb : FormBuilder, public productService: ProductsService) { }
  
  @Output() addItem = new EventEmitter();
  public categorys
  public categoryProducts = 0
  public products = []
  public ifPopup = false;
  public productPopup
  public quantity = 1
  public theSearch = "";
  public messageHere = "Welcome to Shiri-Store Please select your category"
  public GlobalyPathInto = this.productService.GlobalyPath;

  ngOnInit() {
    this.productService.getcategorys().subscribe(
      (res: any) => {
        this.categorys = res.message
      },err=> window.location.href = "/"
    )
  }

  public changeCategory(cat,catName){
    this.categoryProducts = cat;
    this.productService.getproducts({category_id:cat}).subscribe(
      (res:any)=>{
        this.products = res.message
        this.messageHere = "Category "+catName
      },err=>console.log(err)
    )
  }

  public popupProduct(product){
    this.productPopup = product
    this.ifPopup = true;
  }

  public closePopup(event){
    if(event.target.id === "backgroundPopup"){this.ifPopup = false; this.quantity=1}
  }

  public closePopupCross(){
    this.ifPopup = false
    this.quantity = 1
  }

  public changeQuantity(x){
    if (x === '+'){this.quantity<20?this.quantity++:'no'}
    else if(x === '-'){this.quantity>1?this.quantity--:'no'}
  }

  public search(){
    this.categoryProducts = 1
    this.productService.searchProduct(this.theSearch).subscribe(
      (res:any)=>{
        this.products = res.message
        this.messageHere = "Results for: "+this.theSearch
        this.theSearch = "";
      },err=>console.log(err)
    )
  }

  public addToCart(product_id){
    this.addItem.emit({product_id,quantity:this.quantity})
    this.ifPopup=false;
    this.quantity = 1
  }

}
