import { Component } from '@angular/core';
import {DefaultApi as KontorApi} from '../generated/client/api/DefaultApi';
import {Post} from '../generated/client/model/Post';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  kontorApi:KontorApi;

  post:Post = {url:'someurl'};

  constructor(kontorApi:KontorApi) {
    this.kontorApi = kontorApi;
  }

  onSubmit() {
    console.log('onSubmit', this.post);
    // this.kontorApi.createPost(post).subscribe(data => console.log(data));
  }
}
