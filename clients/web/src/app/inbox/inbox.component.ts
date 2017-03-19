import { Component, OnInit } from '@angular/core';
import {Post} from "../post";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  unarchived = [
    new Post('Photos', new Date('1/1/16')),
    new Post('Recipes', new Date('1/17/16')),
    new Post('Work', new Date('1/28/16'))
  ];

  constructor() { }

  ngOnInit() {
  }

}
