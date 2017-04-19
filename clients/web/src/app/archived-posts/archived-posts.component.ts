import {Component, OnInit} from '@angular/core';
import {DefaultApi as KontorApi} from '../generated/client/api/DefaultApi';
import {Post} from '../generated/client/model/Post';

@Component({
  selector: 'app-archived-posts',
  templateUrl: './archived-posts.component.html',
  styleUrls: ['./archived-posts.component.css']
})
export class ArchivedPostsComponent implements OnInit {

  kontorApi: KontorApi;
  archived: [Post];

  constructor(kontorApi: KontorApi) {
    this.kontorApi = kontorApi;
  }

  ngOnInit() {
    const self = this;
    this.kontorApi.filterArchivePosts().subscribe(
      response => { console.log(response); self.archived = <[Post]>response.posts;},
      error => console.log(error),
      () => console.log('finished')
    )
  }

  onDelete(post:Post) {
    console.log('delete', post);
  }

}
