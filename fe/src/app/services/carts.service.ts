import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(public http:HttpClient) { }
  public GlobalyPath = 'http://localhost:3001';


  
  
  public getCart(){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.get(this.GlobalyPath+'/api/carts/cart',{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public getItems(data){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.post(this.GlobalyPath+'/api/carts/items',{cart_id:data},{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public changeQuantity(data){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.put(this.GlobalyPath+'/api/carts/changequantity',data,{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public viewCart(){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.get(this.GlobalyPath+'/api/carts/cart',{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public addCart(){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.get(this.GlobalyPath+'/api/carts/addcart',{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public addItem(data){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.post(this.GlobalyPath+'/api/carts/addcartitem',data,{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public deleteItem(data){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.post(this.GlobalyPath+'/api/carts/deleteitem',data,{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public deleteCart(data){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.post(this.GlobalyPath+'/api/carts/deletecart',data,{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public addOrder(data){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.post(this.GlobalyPath+'/api/carts/addorder',data,{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }
  
  public availableDates(){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.get(this.GlobalyPath+'/api/carts/availableDates',{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }



}
