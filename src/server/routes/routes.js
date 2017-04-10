/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

'use strict';
const helper = require("./helper");

class Routes{

	constructor(app){
		this.app = app;
	}


	/* creating app Routes starts */
	appRoutes(){


		/* Route to get all projects starts*/
		this.app.get('/api/projects',(request,response) =>{

			helper.getProjects( (result) => {
				if (result) {
					response.status(200).json({
						projects:result
					});
				}else{
					response.status(404).json({
						message:`No projects found.`
					});
				}
			});
		});
		/* Route to get all projects ends*/
		

		/* Route to add new project starts*/
		this.app.post('/api/projects/',(request,response) =>{


				helper.addProject( request.body , (result)=>{
					
					if (result.error) {
						
						response.status(403).json({
							error : true,
							message : `Error.` 
						});

					} else{

						helper.getProjects( (result) => {
							if (result) {
								response.status(200).json({
									error : false,
									projects:result
								});
							}else{
								response.status(404).json({
									error : true,
									message:`No usres found.`
								});
							}
						});
					};
				});
		});
		/* Route to add new project ends*/


		/* Route to delete project starts*/
		this.app.delete('/api/projects/:id',(request,response) =>{

			if (request.params.id && request.params.id!='') {

				helper.removeProjects( request.params.id, (result)=>{
					
					if (result.error) {
						
						response.status(403).json({
							error : true,
							message : `Error.` 
						});

					} else{

						helper.getProjects( (result) => {
							if (result) {
								response.status(200).json({
									error : false,
									projects:result
								});
							}else{
								response.status(404).json({
									error : true,
									message:`No usres found.`
								});
							}
						});

						
					};

				});

			}else{
				response.status(403).json({
					error : true,
					message : `Invalid project Id.` 
				});
			}
		});
		/* Route to delete project ends*/
		

		/* Route to update project starts*/
		this.app.put('/api/projects/:id',(request,response) =>{


			if (request.params.id && request.params.id!='') {

				helper.updateProject( request.params.id, request.body , (result)=>{
					
					if (result.error) {
						
						response.status(403).json({
							error : true,
							message : `Error.` 
						});

					} else{


						helper.getProjects( (result) => {
							if (result) {
								response.status(200).json({
									error : false,
									projects:result
								});
							}else{
								response.status(404).json({
									error : true,
									message:`No usres found.`
								});
							}
						});

						
					};

				});

			}else{
				response.status(403).json({
					error : true,
					message : `Invalid project Id.` 
				});
			}			
		});
		/* Route to update project ends*/
		
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;