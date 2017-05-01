import { Component } from '@angular/core';
import {Auth} from '../../services/auth.service';
import {GithubService} from '../../services/github.service';

@Component({
    moduleId: module.id,
    selector: 'profile',
    templateUrl: 'profile.component.html',
  
  
})
export class ProfileComponent {
    profile:any;
    repos:any;
    user:any;
  constructor(private auth:Auth, private _githubService:GithubService ){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        if (this.profile.html_url)
        {
            this.user=true;
        }
        else 
        {
            this.user=false;
        }
        this._githubService.getRepos(this.profile.nickname).subscribe(repos=>{
            this.repos=repos;
         //console.log(this.repos);
        });
        //console.log(this.profile);
        console.log(this.user);
}

}
