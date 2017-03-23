import { Component, OnInit } from '@angular/core';
import {ApiClientService} from '../client';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  client:ApiClientService;

  constructor() {
    this.client = new ApiClientService(undefined);
  }

  ngOnInit() {
  }

}
