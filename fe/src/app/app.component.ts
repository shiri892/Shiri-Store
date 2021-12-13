import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';



window.onload = () =>{
  document.getElementById('section-center').style.height = (window.innerHeight-110) + "px";
}
window.onresize = () =>{
  document.getElementById('section-center').style.height = (window.innerHeight-110) + "px";
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public usersService:UsersService) { }

  login = 'Disconnected';

  ngOnInit(){
    this.usersService.ifToken().subscribe(
      (res:any)=>{
        if(res.state == "success"){this.login = res.message.first_name+ ' ' + res.message.last_name}
        else{console.log(res.message)}
      },err =>{}
    )
  }

  public ifLogin(name:any){
    this.login = name;
  }

  public disconnected(){
    if (localStorage.getItem('Token')) { localStorage.removeItem('Token') }
    if (sessionStorage.getItem('Token')) { sessionStorage.removeItem('Token') }
    window.location.href = "/"
  }
}
