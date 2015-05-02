/*Queries for recommendations*/

var dbConn = require('../model/dbConnection');
var dynamo = dbConn.getAWSConnection();

exports.getUserRecommendation = function(userid, callback){
	console.log(userid);
	dynamo.getItem({
		"Key":{ 
		      "user_id" : {
		          "S" : userid
		        }
		},
		"AttributesToGet":[
			"recommended_user"
		],
		"TableName":"recommended_users"	
		},
		
		function(err,data){
			if(err)
				console.log("error:"+err);
			callback(err,data);
	})
}