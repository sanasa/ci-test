/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

'use strict';

class Helper{

	constructor(){

		this.Mongodb = require("./db");
	}

	getProjects(callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('projects').find().toArray( (err, result) => {
				callback(result);
				db.close();
			});
		});
	}


	addProject(data,callback){

		var response = {};

		delete data['_id']; 

		console.log(data);

		this.Mongodb.onConnect( (db,ObjectID) => {

			/* Checking if projects Existsin DB starts */

			db.collection('projects').findOne(data,function(err, result){
				
				if(err){
					
					response.error = true;
					response.isProjectExists = false;
					response.message = `Something went Wrong,try after sometime.`;
					callback(response);	

				}else{

					if(result != null ){
						
						response.error = true;
						response.isProjectExists = true;				
						response.message = `Project already exists.`;

						callback(response);	

					}else{

						/* Inserting data into DB starts */

						db.collection('projects').insertOne(data, (err, result) => {
							
							if(err){
								response.error = true;
								response.isProjectExists = false;
								response.message = `Something went Wrong,try after sometime.`;
							}else{
								response.error = false;
								response.isProjectExists = false;
								response.isProjectAdded = true;
								response.id=result.ops[0]._id;
								response.message = `Project added.`;
							}

							callback(response);	
						});

						/* Inserting data into DB ends */

					}
				}
			});	

			/* Checking if projects Existsin DB ends */
		});
	}



	removeProjects( projectID, callback ){
		
		this.Mongodb.onConnect( (db,ObjectID) => {
			
			db.collection('projects').deleteOne(
				{
					_id : new ObjectID(projectID)
				},
				(err, results) => {
					if(err){
						callback({
							error : true
						});
					}else{
						callback({
							error : false
						});
					}
				}
			);

		});

	}

	updateProject( projectID , data , callback){

		this.Mongodb.onConnect( (db,ObjectID) => {

			db.collection('projects').updateOne(
				{
					_id: new ObjectID(projectID)
				},
				{
					$set : {
						name:data.name,
						gender:data.gender,
						country:data.country
					}		
				}, (err, results) => {

					
					if(err){
						callback({
							error : true
						});
					}else{
						callback({
							error : false
						});
					}

				}
			);
		});
	}
}

module.exports = new Helper();