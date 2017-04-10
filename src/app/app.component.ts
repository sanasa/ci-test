import { Component } from '@angular/core';

import { ProjectListComponent } from './project-list/project-list.component';
import { AddProjectComponent } from './add-project/add-project.component';

import { EmitterService } from './services/emitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {

	public host_id: "HOST_COMPONENT";
	public title:string = 'Angular 2, Nodejs & MongoDB CRUD';

	private projectInfo = 'CRUD_Project_INFO';
    private reset = 'CRUD_RESET_FORM';
    private projectList = 'CRUD_Project_LIST';

	constructor(private _emitterService: EmitterService) {}
}