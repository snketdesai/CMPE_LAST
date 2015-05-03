var mysql = require('mysql2');
var AWS = require('aws-sdk');

var dynomoDb;
var pool;

var redis = require("redis");
var client = redis.createClient(6379,"127.0.0.1");
//redis-cmpe282.cysnho.0001.usw1.cache.amazonaws.com

function getRedisConnection(){
	return client;
}

var $credentials = {

		"accessKeyId": "AKIAIB5XNPU3ZK72HZEA", 
		"secretAccessKey": "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", 
		"region": "us-west-1"

}

function getAWS_SDK(){
	AWS.config.loadFromPath('./public/access.json');

	var aws = new AWS.DynamoDB();
	
	return aws;
}

function getDBconnection(){
	if(dynomoDb){
		return dynomoDb;
	}
	else{
		var dynomoDb = require('aws-dynamodb')($credentials)
		return dynomoDb;
	}
	 
}

exports.getPoolInstance = function(){
	
	if(pool != null){
		return pool;
	}
	else
	{
		pool  = mysql.createPool({

			host     : 'cmpe282lab.cckbiaous4u7.us-west-1.rds.amazonaws.com',

			user     : 'CMPE282',

			password : 'cmpe282shim',

			port : '3306',

			database : 'busi_soc_net'

		});
		return pool;
	}
		
};
exports.getDBconnection = getDBconnection;
exports.getAWSConnection = getAWS_SDK;
exports.getRedisConnection = getRedisConnection;