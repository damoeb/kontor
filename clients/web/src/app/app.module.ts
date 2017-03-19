import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { InboxComponent } from './inbox/inbox.component';
import { ArchiveComponent } from './archive/archive.component';
import { InboxItemComponent } from './inbox-item/inbox-item.component';

const appRoutes: Routes = [
  { path: 'inbox', component: InboxComponent },
  { path: 'archive', component: ArchiveComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  { path: '**', component: InboxComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    ArchiveComponent,
    InboxItemComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

