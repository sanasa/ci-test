
import { Component, Input, OnInit,OnChanges } from '@angular/core';

import { HttpService } from '../services/http.service';
import { EmitterService } from '../services/emitter.service';

import { ProjectModel } from '../projectModel';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [ HttpService ]
})
export class ProjectListComponent implements OnInit, OnChanges{

	@Input() reset: string;
	@Input() projectInfo: string;
	@Input() projectList: string;


	private projectsList;
	private currentProject:ProjectModel;
	private isReset:boolean = true;


	constructor(
			private httpService: HttpService
		) {}

	ngOnInit(){
		this.httpService.getAllProject().subscribe(
                       response => this.projectsList = response.projects,
                       error=>  { alert(`Can't get projects.`); }
                    );
	}

	public projectSelected(project){		
		this.currentProject = project;
		EmitterService.get(this.projectInfo).emit(this.currentProject);
		this.isReset = true;
	}

	public isSelected(project): boolean {
		if(!this.currentProject) {
			return false;
		}
		return this.currentProject._id ===  project._id ? true : false;
	}

	public deleteProject(projectId:string){
		this.httpService.deleteProject(projectId).subscribe(
						response => {
							if(response.error) { 
	                        	alert(`The project could not be deleted, server Error.`);
	                        } else {
	                        	this.projectsList = response.projects;
	                        }
                        },
                       error=> { 
                       		alert(`The project could not be deleted, server Error.`);
                       	}
                    );
	}

	ngOnChanges(changes:any) {

		EmitterService.get(this.reset).subscribe( (reset:boolean) => {
			this.isReset = false;
		});


		EmitterService.get(this.projectList).subscribe( (projectList:string) => {
			this.projectsList = projectList;
		});
	}
}