var profile = require('../model/profileQueries');
var dbConn = require('../model/dbConnection');
var db = dbConn.getDBconnection();

var client = dbConn.getRedisConnection();

//var multer  = require('multer');
exports.insertBio = function(req,res){
	var userid = req.params.userid;
	var bio = req.body.bio;
	
	profile.updateBio(userid,bio,function(err,data){
		if(err){
			  res.writeHead(400);
			  res.end("Error while inserting data\n");
		}
		else{		
			 res.writeHead(200);
			 res.end("Record Inserted successfully");
			
		}
	});
},

exports.insertCertification = function(req,res){
	var userid = req.params.userid;
	var certification = req.body.certification;
	
	profile.updateCertification(userid,certification,function(err,data){
		if(err){
			  res.writeHead(400);
			  res.end("Error while inserting data\n");
		}
		else{		
			 res.writeHead(200);
			 res.end("Record Inserted successfully");
			
		}
	});
}

exports.insertSkill = function(req,res){
	var userid = req.params.userid;
	var skill = req.body.skill;
	
	profile.updateSkill(userid,skill,function(err,data){
		if(err){
			  res.writeHead(400);
			  res.end("Error while inserting data\n");
		}
		else{		
			 res.writeHead(200);
			 res.end("Record Inserted successfully");
			
		}
	});
},

exports.insertCollege = function(req,res){
	var userid = req.params.userid;
	var college = req.body.college;
	
	profile.updateCollege(userid,college,function(err,data){
		if(err){
			  res.writeHead(400);
			  res.end("Error while inserting data\n");
		}
		else{		
			 res.writeHead(200);
			 res.end("Record Inserted successfully");
			
		}
	});
},

exports.insertStatus = function(req,res){
	var userid = req.params.userid;
	var status = req.body.status;
	
	profile.updateStatus(userid,status,function(err,data){
		
		if(err){
			  res.writeHead(400);
			  res.end("Error while inserting data\n");
		}
		else{		
			 res.writeHead(200);
			 res.end("Record Inserted successfully");
			
		}
		
	});
	
}

exports.insertCompanyFollowed = function(req,res){
	
	console.log("Inside insert Company Followed");
	var userid = req.params.userid;
	var company_followed = req.body.company_followed;
	
	console.log("company_followed"+company_followed);
	
	profile.updateCompanyFollowed(userid,company_followed,function(err,data){
		

		if(err){
			  res.writeHead(400);
			  res.end("Error while inserting data\n");
		}
		else{		
			 res.writeHead(200);
			 res.end("Record Inserted successfully");
			
		}
		
	});
	
}
exports.insertUserFollowed = function(req,res){
	
	//var userid = req.params.userid;
	var userid = req.session.userId;
	var user_followed = req.body.user_followed;
	
	profile.updateUserFollowed(userid.toString(),user_followed,function(err,data){
		
		if(err){
			  res.writeHead(400);
			  res.end("Error while inserting data\n");
		}
		else{		
			 res.writeHead(200);
			 res.end("Record Inserted successfully");
			
		}
		
	});
	
}

exports.insertPost = function(req,res){
	var userid = req.session.userId;
	var post = req.body.post;
	
	profile.insertPost(userid.toString(),post,function(err,data){
		
		if(err){
			  res.writeHead(400);
			  res.end("Error while inserting data\n");
		}
		else{		
			 res.writeHead(200);
			 res.end("Record Inserted successfully");
			
		}
		
	});
	
}

exports.getProfile = function(req,res){
	
	var userid = req.params.userid;
	
	profile.getProfileInfo(userid,function(err,data){
		
		if(err){
			  res.writeHead(400);
			  res.end("Error while inserting data\n");
		}
		else{		
			//console.log(data.Item.college.SS[0]);
			
			 res.writeHead(200);
			 res.end(JSON.stringify(data));
			 //res.write(data);
			
		}
	});
	
}

exports.getUserProfile = function(req,res){
	res.render('userprofile',{user:req.session.userId});
}

exports.getCompanyNewsFeed = function(req,res){
	var userId = req.params.userId;
	profile.getProfileInfo(userId,function(err,data){
		if(data != "nodata"){
			if(typeof data.Item.company_followed === "undefined"){
				res.send('no data');
			}else{
				var companyArr = data.Item.company_followed.SS;
				var posts = [];
				var counter = 0;
				for(var i=0;i<companyArr.length;i++){
					client.get(companyArr[i], function(err, result) {
						db.table('companyprofile').having('companyId').eq(parseInt(result)).scan(
							function(err, data) {
							if(!err){
								var postStr = '{"key":"'+data[0].companyName+'","value":"'+data[0].status+'"}';
								posts.push(postStr);
								counter++;
			    				if(counter == companyArr.length){
			    					res.send(JSON.stringify(posts));
			    				}
							}else{
								res.send('no data');
							}
						});
					});
				}
			}
		}else{
			res.send('no data');
		}
	});
}

exports.getPortfolio = function(req,res){
	
	console.log(storeId.id);
	res.render('portfolio',{id : storeId.id});
	
},

exports.storeProfileId = storeId;

var storeId = {
		id : "003"
}
