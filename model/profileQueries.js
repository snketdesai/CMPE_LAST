var dbConn = require('../model/dbConnection');


var dynamo = dbConn.getAWSConnection();

exports.updateBio = function(userid,bio,callback){
	
	/*db
	.table('user_profile')
	.where('user_id').eq(userid)
	.update({
		
		bio : bio
	},
	function(err,data) {
		console.log("Error______"+err);
		callback(err, data);
    });*/
	
	dynamo.updateItem(
		    {"TableName":"user_profile",
		        "Key":{
		            "user_id":{"S":userid}
		              
		        },
		        "AttributeUpdates":{
		        	"bio":{
		        		"Value" :{
		        			"S":bio
		        		},
		        	
		        	"Action":"PUT"
		        	}
		        }
		    }, 
		    function(err,data) {
		    	console.log("Error______"+err);
				callback(err, data);
		});
	
},

exports.updateCertification = function(userid,certification,callback){
		
	dynamo.updateItem(
		    {"TableName":"user_profile",
		        "Key":{
		            "user_id":{"S":userid}
		              
		        },
		        "AttributeUpdates":{
		        	"certification":{
		        		"Value" :{
		        			"SS":certification
		        		},
		        	
		        	"Action":"ADD"
		        	}
		        }
		    }, function(err,data) {
		    	console.log("Error______"+err);
				callback(err, data);
		});
}

exports.updateSkill = function(userid,skill,callback){
	
	dynamo.updateItem(
		    {"TableName":"user_profile",
		        "Key":{
		            "user_id":{"S":userid}
		              
		        },
		        "AttributeUpdates":{
		        	"skill":{
		        		"Value" :{
		        			"SS":skill
		        		},
		        	
		        	"Action":"ADD"
		        	}
		        }
		    }, function(err,data) {
		    	if(err)
		    		console.log("Error______"+err);
					callback(err, data);
		});	
}

exports.updateCollege = function(userid,college,callback){
	
	dynamo.updateItem(
		    {"TableName":"user_profile",
		        "Key":{
		            "user_id":{"S":userid}
		              
		        },
		        "AttributeUpdates":{
		        	"college":{
		        		"Value" :{
		        			"SS":college
		        		},
		        	
		        	"Action":"ADD"
		        	}
		        }
		    }, function(err,data) {
		    	if(err)
		    		console.log("Error______"+err);
					callback(err, data);
		});
}

exports.updateStatus = function(userid,status,callback){
	
	dynamo.updateItem(
		    {"TableName":"user_profile",
		        "Key":{
		            "user_id":{"S":userid}
		              
		        },
		        "AttributeUpdates":{
		        	"status":{
		        		"Value" :{
		        			"S":status
		        		},
		        	
		        	"Action":"PUT"
		        	}
		        }
		    }, function(err,data) {
		    	if(err)
		    		console.log("Error______"+err);
					callback(err, data);
		});
	
}

exports.updateCompanyFollowed = function(userid,company_followed,callback){
	
	dynamo.updateItem(
		    {"TableName":"user_profile",
		        "Key":{
		            "user_id":{"S":userid}
		              
		        },
		        "AttributeUpdates":{
		        	"company_followed":{
		        		"Value" :{
		        			"SS":company_followed
		        		},
		        	
		        	"Action":"ADD"
		        	}
		        }
		    }, function(err,data) {
		    	if(err)
		    		console.log("Error______"+err);
					callback(err, data);
		});
}

exports.updateUserFollowed = function(userid,user_followed,callback){
	
	dynamo.updateItem(
		    {"TableName":"user_profile",
		        "Key":{
		            "user_id":{"S":userid}
		              
		        },
		        "AttributeUpdates":{
		        	"user_followed":{
		        		"Value" :{
		        			"SS":user_followed
		        		},
		        	
		        	"Action":"ADD"
		        	}
		        }
		    }, function(err,data) {
		    	if(err)
		    		console.log("Error______"+err);
					callback(err, data);
		});
},

exports.insertPost = function(userid,post,callback){
	
	dynamo.updateItem(
		    {"TableName":"user_profile",
		        "Key":{
		            "user_id":{"S":userid}
		              
		        },
		        "AttributeUpdates":{
		        	"post":{
		        		"Value" :{
		        			"SS":post
		        		},
		        	
		        	"Action":"ADD"
		        	}
		        }
		    }, function(err,data) {
		    	if(err)
		    		console.log("Error______"+err);
					callback(err, data);
		});
	
};
var db = dbConn.getDBconnection();
exports.getProfileInfo = function(userid,callback){
	/*db.table('user_profile').where('user_id').eq(userid).get(function( err, data ) {
        console.log( err, data );
        console.log(data);
        console.log(Object.keys(data).length === 0);
        var obj = JSON.parse(JSON.stringify(data));
        console.log(data.keys(obj).length === 0);
        if(obj.length > 1){
        	console.log( "------" );
        }else{
        	console.log( "!!!!!!" );
        }
    });*/
	/*db.table('user_profile').having('user_id').eq(userid).scan(function(err, data) {
		if(data === ""){
			console.log('nodata');
			data = "nodata";
			callback(err,data);
		}else if(err){
			console.log('-------');
			console.log(err);
		}else{*/
			dynamo.getItem({
				"Key":{ 
				      "user_id" : {
				          "S" : userid
				        }
				},
				"AttributesToGet":[
					"bio","certification","skill","college","status","company_followed","user_followed","post"
				],
				"TableName":"user_profile"	
				},
				
				function(err,data){
					console.log("------"+data);
					console.log(data);
					console.log("------"+data);
					if(err){
						console.log("error: "+err);
						
					}else if(Object.keys(data).length===0){
						console.log("------"+data);
						console.log(data);
						console.log('nodata');
						data = "nodata";
						
					}
					callback(err,data);
			});
		//}
	//});
}




