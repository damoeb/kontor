import {Component, OnInit, Input} from '@angular/core';
import {Post} from "../post";

@Component({
  selector: 'app-inbox-item',
  templateUrl: './inbox-item.component.html',
  styleUrls: ['./inbox-item.component.css']
})
export class InboxItemComponent implements OnInit {

  @Input() item: Post;

  constructor() { }

  ngOnInit() {
  }

}
