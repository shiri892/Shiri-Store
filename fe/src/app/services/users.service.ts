import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http:HttpClient) { }
  public GlobalyPath = 'http://localhost:3001';

  
  public ifToken(){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.get(this.GlobalyPath+'/api/users/verifytoken',{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public getUser(){
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    return this.http.get(this.GlobalyPath+'/api/users/user',{
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
  }

  public getlogin(data){
    return this.http.post(this.GlobalyPath+'/api/users/login',data)
  }

  public getinfo(){
    return this.http.get(this.GlobalyPath+'/api/users/infocount')
  }

  public verifyIdOrEmail(data){
    return this.http.post(this.GlobalyPath+'/api/users/verifidmail',data)
  }

  public signupNewUser(data){
    return this.http.post(this.GlobalyPath+'/api/users/add',data)
  }

}
