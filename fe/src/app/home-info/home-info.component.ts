import { Component, OnInit,Input } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home-info',
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.css']
})
export class HomeInfoComponent implements OnInit {

  constructor(public usersService:UsersService) { }

  public countProducts = []
  public countOrders = []
  @Input() toHomeInfo;

  ngOnInit() {
    this.usersService.getinfo().subscribe(
      (res:any) => {
        if(res.message === 'No results!!!'){return}
        console.log(res.message)
        let countp:string = res.message.countp.toString();
        let counto:string = res.message.counto.toString();
        for(let i=0; i<countp.length;i++){
          this.countProducts[i] = countp[i]
        }
        for(let j=0; j<counto.length;j++){
          this.countOrders[j] = counto[j]
        }
      },err=>console.log(err)
    )
  }

}
