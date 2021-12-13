import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CartsService } from '../services/carts.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public fb: FormBuilder, public cartsService: CartsService, public usersService: UsersService) { }
  public ifDisplay = false;
  public cart = -1;
  public arrItems = [];
  public arrList = []
  public totalPrice = 0;
  public dataOrder;
  public minDate;
  public maxDate;
  public user;
  public ifPopup = false;
  public ifPopupError = false;
  public pathPdf = "";
  public btnOrder = "Order"
  public theSearch = ""
  public datesProhibited = []
  public validDate = false
  public errorDate = ""
  public GlobalyPathInto = this.cartsService.GlobalyPath;
  public newArr1 = [];

  public getHighlightItem(item: string): string {
    const index = item.toLowerCase().indexOf(this.theSearch.toLowerCase());
    if (index === -1) return item;
    const compose = item.substr(0, index) + "<span class='highlight'>" + item.substr(index, this.theSearch.length) + "</span>" + item.substr(index + this.theSearch.length);
    return compose;
  }


  ngOnInit() {
    this.usersService.ifToken().subscribe(
      (res: any) => {
        if (res.message.admin) {
          window.location.href = "/"
        }
        else { this.ifDisplay = true }
      },
      err => window.location.href = "/"
    )

    this.cartsService.getCart().subscribe(
      (res: any) => {
        if (res.message !== 'No results cart') {
          this.cart = res.message[0].cart_id;
          this.takeItems()
        }
        else {
          window.location.href = "/shop"
        }
      },
      err => { window.location.href = "/shop" }
    )

    this.usersService.getUser().subscribe(
      (res: any) => {
        this.user = res.message[0];
      }, err => console.log(err)
    )

    this.cartsService.availableDates().subscribe(
      (res: any) => {
        this.datesProhibited = res.message
      }, err => { console.log(err) }
    )

    this.dataOrder = this.fb.group({
      received_city: [, Validators.required],
      received_adress: ["", [Validators.minLength(2), Validators.maxLength(20), Validators.required]],
      received_date: ["", Validators.required],
      payment_number: ["", [Validators.required, this.validateCreditCard]]
    })

    let myDate = new Date()
    myDate.setDate(myDate.getDate() + 2);
    this.minDate = myDate.toISOString().split("T")[0];
    let myMaxDate = new Date()
    myMaxDate.setDate(myMaxDate.getDate() + 90 + this.datesProhibited.length);
    this.maxDate = myMaxDate.toISOString().split("T")[0];
  }

  validateCreditCard(c: FormControl) {
    const VISA_REGEX = /^4[0-9]{12}(?:[0-9]{3})?$/; // Regular Expression 1
    const MASTERCARD_REGEX = /^5[1-5][0-9]{14}$/; // Regular Expression 2
    const AMEX_REGEX = /^3[47][0-9]{13}$/; // Regular Expression 3
    return (VISA_REGEX.test(c.value) || MASTERCARD_REGEX.test(c.value) || AMEX_REGEX.test(c.value) || c.value === "") ? null : {
      validateInput: {
        valid: false
      }
    };
  }

  takeItems() {
    this.cartsService.getItems(this.cart).subscribe(
      (res: any) => {
        if (res.message === "No results!") { this.arrItems = []; return }
        this.arrItems = res.message
        this.arrList = res.message
        let total = 0
        for (let i = 0; i < res.message.length; i++) {
          total += res.message[i].price * res.message[i].quantity
        }
        this.totalPrice = total;
      },
      err => console.log(err)
    )
  }

  public automaticCity() {
    this.dataOrder.controls['received_city'].setValue(this.user.city.toLowerCase())
  }

  public automaticAdress() {
    this.dataOrder.controls['received_adress'].setValue(this.user.adress)
  }

  public submitOrder() {
    this.btnOrder = "one moment ..."
    let datenow = new Date();
    let thedatenow = datenow.toISOString().split("T")[0];
    this.cartsService.addOrder({ ...this.dataOrder.value, user_id: this.user.t_z, cart_id: this.cart, total_price: this.totalPrice.toFixed(2), products: this.arrItems, user_name: this.user.first_name + " " + this.user.last_name, datenow: thedatenow }).subscribe(
      (res: any) => {
        if (res.state = "success") {
          this.ifPopup = true;
          this.pathPdf = res.receiptPdf
        }
        else { this.ifPopupError = true; }
      },
      err => {
        console.log(err)
        this.ifPopupError = true;
      }
    )
  }

  public searchCart() {
    this.newArr1 = [];
    if (this.theSearch === "") {
      this.arrList = this.arrItems;
      return
    }
    let newArr = []
    for (let i = 0; i < this.arrItems.length; i++) {
      if (this.arrItems[i].product_name.toLowerCase().includes(this.theSearch.toLowerCase(), 0)) {
        newArr.push(this.arrItems[i])
      }
    }
    this.arrList = newArr;
    this.newArr1 = newArr;
  }

  public inputDate() {
    let theDate = this.dataOrder.value.received_date
    if (theDate >= this.minDate && theDate <= this.maxDate) {
      for (let i = 0; i < this.datesProhibited.length; i++) {
        if (theDate === this.datesProhibited[i].received_date.split("T")[0]) {
          this.validDate = false;
          this.errorDate = "Please select a different date, the shipping date you specified is not available"
          return
        }
      }
      this.errorDate = ""
      this.validDate = true
    }
    else {
      this.errorDate = "chose date between " + this.minDate + " and " + this.maxDate
      this.validDate = false
    }
  }

}
