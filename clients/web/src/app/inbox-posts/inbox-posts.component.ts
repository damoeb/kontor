import { Component, OnInit } from '@angular/core';
import {DefaultApi as KontorApi} from '../generated/client/api/DefaultApi';
import {Post} from '../generated/client/model/Post';

@Component({
  selector: 'app-inbox-posts',
  templateUrl: './inbox-posts.component.html',
  styleUrls: ['./inbox-posts.component.css']
})
export class InboxPostsComponent implements OnInit {

  kontorApi:KontorApi;

  constructor(kontorApi:KontorApi) {
    this.kontorApi = kontorApi;
  }

  ngOnInit() {
    // this.inboxPosts = kontorApi.
  }

}
