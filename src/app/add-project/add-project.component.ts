import { Component,Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpService } from '../services/http.service';
import { EmitterService } from '../services/emitter.service';

import { ProjectModel } from '../projectModel';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [ HttpService ]
})
export class AddProjectComponent implements OnChanges {

	@Input() projectInfo: string;
	@Input() reset: string;
	@Input() projectList: string;

	private isInsert:boolean = true;
	private projectModel:ProjectModel = new ProjectModel('','','','');

	constructor(
			private httpService: HttpService
		) {}

	public addProject(){
		this.httpService.addProject(this.projectModel).subscribe(
                        response =>  {
							if(response.error) { 
	                        	alert(`The project could not be added, server Error.`);
	                        } else {
	                        	EmitterService.get(this.projectList).emit(response.projects);
	                        }
                        },
                        error=> {
                       		alert(`The project could not be added, server Error.`);
                       	}
                    );
	}

	public updateProject(){
		this.httpService.updateProject(this.projectModel).subscribe(
						response => {
							if(response.error) { 
	                        	alert(`The project could not be updated, server Error.`);
	                        } else {
	                        	EmitterService.get(this.projectList).emit(response.projects);
	                        }
                        },
                        error=> { 
                        	alert(`The project could not be updated, server Error.`);
                        }
                    );
	}

	public resetAddProject(){
		this.projectModel = new ProjectModel('','','','');
		EmitterService.get(this.reset).emit(true);
		this.isInsert = true;
	}

	ngOnChanges(changes:any) {
		
		EmitterService.get(this.projectInfo).subscribe( (value:ProjectModel) => {
			this.projectModel = new ProjectModel(value._id,value.name,value.status,value.repository);
			this.isInsert = false;
		});
	}
}