import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http:HttpClient) { }
  public GlobalyPath = 'http://localhost:3001';

  public getcategorys(){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.get(this.GlobalyPath+'/api/products/categorys',{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public getproducts(category_id){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.post(this.GlobalyPath+'/api/products/products',category_id,{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public searchProduct(theSearch){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.post(this.GlobalyPath+'/api/products/search',{theSearch:theSearch},{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public uploadImg(data){
    return this.http.post(this.GlobalyPath+'/api/products/upload',data)
  }

  public addProduct(data){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.post(this.GlobalyPath+'/api/products/addproduct',data,{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public modifyProduct(data){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.post(this.GlobalyPath+'/api/products/modifyproduct',data,{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

}
