import { Component } from '@angular/core';
import {Auth} from './services/auth.service';
import {GithubService} from './services/github.service';
import {HttpModule} from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [HttpModule, GithubService]
  
  
})
export class AppComponent {
  constructor(public auth:Auth){

  }
}
