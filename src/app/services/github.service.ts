import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs';

@Injectable()
export class GithubService {
    

    constructor(private _http:Http){
        console.log('Github service started...')
        
    }

  
getRepos(name:any) { 
        return this._http.get('https://api.github.com/users/'+name+'/repos')
        .map(res=> res.json());
}
}