import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ProductsService } from '../services/products.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public fb: FormBuilder, public productService:ProductsService, public usersService:UsersService) { }

  public categorys
  public categoryProducts = 0
  public products = []
  public ifPopup = false;
  public theSearch = "";
  public newProduct;
  public ifPopupAdd = false
  public pathImgPopup = this.productService.GlobalyPath+"/imgs/add-photo.png"
  public imgToAdd = "no-img.png"
  public currentProductId = -1
  public ifDisplay = false
  public ifModify = false
  public messageHere = "Chose category or do a search"
  public GlobalyPathInto = this.productService.GlobalyPath;
  

  ngOnInit() {

    this.usersService.ifToken().subscribe(
      (res: any) => {
        if (!res.message.admin) {
          window.location.href = "/"
        }
        else { this.ifDisplay = true }
      },
      err => window.location.href = "/"
    )

    this.productService.getcategorys().subscribe(
      (res: any) => {
        this.categorys = res.message
      }, err => window.location.href = "/"
    )

    this.newProduct = this.fb.group({
      product_name: ["", [Validators.minLength(2), Validators.maxLength(40), Validators.required]],
      category_id: [, Validators.required],
      price: [, Validators.required]
    })

  }

  public changeCategory(cat,catName) {
    this.categoryProducts = cat;
    this.productService.getproducts({ category_id: cat }).subscribe(
      (res: any) => {
        this.products = res.message
        this.messageHere = catName
      }
    )
  }

  public search() {
    this.categoryProducts = 1
    this.productService.searchProduct(this.theSearch).subscribe(
      (res: any) => {
        this.products = res.message
        this.messageHere = "Results for: "+this.theSearch
        this.theSearch = "";
      }
    )
  }

  public openPopupAdd(data = null) {
    if (data) {
      this.newProduct.controls['product_name'].setValue(data.product_name)
      this.newProduct.controls['category_id'].setValue(data.category_id)
      this.newProduct.controls['price'].setValue(data.price)
      this.pathImgPopup = this.productService.GlobalyPath+"/products-imgs/" + data.img
      this.imgToAdd = data.img
      this.currentProductId = data.product_id
      this.ifModify = true
    }
    this.ifPopupAdd = true
  }

  public closePopupAdd(event, pass = false) {
    if (pass || event.target.id === "backgroundPopup") {
      this.ifPopupAdd = false
      this.newProduct.reset()
      this.pathImgPopup = this.productService.GlobalyPath+"/imgs/add-photo.png"
      this.imgToAdd = "no-img.png"
      this.currentProductId = -1
      this.ifModify = false
    }
  }

  public imgFile(e) {
    let data = new FormData();
    data.append('file', e.target.files[0])
    this.productService.uploadImg(data).subscribe(
      (res: any) => {
        this.pathImgPopup = this.productService.GlobalyPath+`/products-imgs/${res.filename}`
        this.imgToAdd = res.filename
      },
      err => console.log(err)
    )
  }

  public addProduct() {
    if (!this.ifModify) {
      this.productService.addProduct({ ...this.newProduct.value, img: this.imgToAdd }).subscribe(
        (res: any) => {
          this.changeCategory(this.newProduct.value.category_id,"Product successfully Added")
          this.closePopupAdd("blah", true)
        },
        err => console.log(err)
      )
    }
    else{
      this.productService.modifyProduct({ ...this.newProduct.value, img: this.imgToAdd, product_id:this.currentProductId}).subscribe(
        (res: any) => {
          this.changeCategory(this.newProduct.value.category_id,"Product successfully Added")
          this.closePopupAdd("blah", true)
        },
        err => console.log(err)
      )
    }

  }

}