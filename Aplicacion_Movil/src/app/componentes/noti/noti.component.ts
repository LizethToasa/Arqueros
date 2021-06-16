import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrls: ['./noti.component.scss'],
})
export class NotiComponent implements OnInit {
  noti:string="../../../assets/notificaciones/notifi.png";
  constructor() { }

  ngOnInit() {}

}
