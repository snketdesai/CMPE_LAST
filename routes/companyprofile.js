var dbConn = require('../model/dbConnection');
var db = dbConn.getDBconnection();
var uuid = require('node-uuid');
var fs = require("fs");
var cprofile = require('./companyprofile');
var redis = require("redis");
var client = redis.createClient(6379,"127.0.0.1");

exports.getSearchView = function(req,res){
	res.render('search');
}

exports.getCompanyProfileViewName = function(req,res){
	var query = req.params.companyName;
	client.get(query, function(err, companyId) {
		res.render('companyprofile', {companyId:companyId});
	}); 
}

exports.getCompanyView = function(req,res){
	console.log(req.session.companyId);
	res.render('companyhomepage', {companyId:req.session.companyId});
}

exports.getCompanyRegisterView = function(req,res){
	console.log(req.session.companyId);
	res.render('companydetailsregistration', {companyId:req.session.companyId});
}

exports.getCompanyProfile = function(req,res){
	var companyId = parseInt(req.params.companyId);
	console.log("  cid  "+companyId);
	db.table('companyprofile').having('companyId').eq(companyId).scan(
	function(err, data) {
		if(!err){
			res.status(200).json({data : data});
		}
	});
}

exports.insertCompanyProfile = function(req,res){	
	var companyId = req.session.companyId;
	var companyName = req.body.name;
	var overview = req.body.overviewText;
	var url = req.body.urlText;
	
	db.table('companyprofile').insert({
		companyId : companyId,
		companyName : companyName,
		overview : overview,
		url : url,
		logo : "junk",
		numFollowers : 0,
		status : "junk"
	},function(err,data) {
		if(err){
			console.log("Error: "+err);
			res.status(400).json({errmsg:err});
		}else{
			client.set(companyName, companyId);
			res.status(200).json({msg:'insert success', companyId:companyId});
		}
    });
}

exports.changeCompanyLogo = function(req,res){
	var companyId = parseInt(req.params.companyId);
	fs.readFile(req.files.logo.path, function (err, data) {
	  fs.writeFile("./public/uploads/"+req.files.logo.name, data, function (err) {
		  cprofile.updateCompanyLogo(req, res, "./uploads/"+req.files.logo.name, companyId, req.body.cId);
	  });
	});
}

exports.updateCompanyLogo = function(req, res, path, companyId, redirectAction){

	db.table('companyprofile').where('companyId').eq(companyId).update({
		logo: path
	}, function( err, data ) {
		if(err){
			console.log( err );
			res.status(400).json({errmsg:err});
		}else{
			res.redirect('/companyhomepage');
			/*if(redirectAction === 'update'){
				res.redirect('/companyhomepage');
			}else{
				res.redirect('/companyhomepage');
			}*/
		}
	});
}

exports.updateCompanyName = function(req,res){
	var companyId = parseInt(req.params.companyId);
	var name = req.body.name;
	
	db.table('companyprofile').where('companyId').eq(companyId).update({
		companyName : name
	}, function( err, data ) {
		if(err){
			console.log( err );
			res.status(400).json({errmsg:err});
		}else{
			//console.log( data );
			//res.status(200).json({msg:'update success'});
			res.redirect("/");
		}
	});
}

exports.updateCompanyOverview = function(req,res){
	var companyId = parseInt(req.params.companyId);
	var overview = req.body.overview;
	
	db.table('companyprofile').where('companyId').eq(companyId).update({
		overview: overview
	}, function( err, data ) {
		if(err){
			console.log( err );
			res.status(400).json({errmsg:err});
		}else{
			console.log( data );
			res.status(200).json({msg:'update success'});
		}
	});
}

exports.updateCompanyURL = function(req,res){
	var companyId = parseInt(req.params.companyId);
	var url = req.body.urlO;
	
	db.table('companyprofile').where('companyId').eq(companyId).update({
		url: url
	}, function( err, data ) {
		if(err){
			console.log( err );
			res.status(400).json({errmsg:err});
		}else{
			console.log( data );
			res.status(200).json({msg:'update success'});
		}
	});
}

exports.addCompanyFollower = function(req,res){
	var companyId = parseInt(req.params.companyId);
	
	db.table('companyprofile').where('companyId').eq(companyId).increment({
		numFollowers : 1
    }, function( err, data ) {
    	if(err){
			console.log( err );
			res.status(400).json({errmsg:err});
		}else{
			console.log( data );
			res.status(200).json({msg:'follower added'});
		}
    })
}

exports.updateCompanyStatus = function(req,res){
	var companyId = parseInt(req.params.companyId);
	var status = req.body.status;
	
	db.table('companyprofile').where('companyId').eq(companyId).update({
		status: status
	}, function( err, data ) {
		if(err){
			console.log( err );
			res.status(400).json({errmsg:err});
		}else{
			console.log( data );
			res.status(200).json({msg:'update success'});
		}
	});
}

exports.autoCompleteCompanySearch = function(req,res){
	var query = req.body.query+"*";
	client.keys(query, function(err, reply) {
	    res.send(reply);
	});
}

exports.companySearch = function(req,res){
	var query = req.body.name+"*";
	
	client.keys(query, function(err, ids) {
		var result = [];
		var counter = 0;
		ids.forEach(function (key, pos) {
	    	client.get(key, function(err, companyId) {
	    		console.log(companyId);
	    		cprofile.companyData(parseInt(companyId), function(err, data){
	    			if(!err){
	    				result.push(data);
	    				counter++;
	    				if(counter == ids.length){
	    					res.send(JSON.stringify(result));
	    				}
	    			}
	    		});
	    	}); 
	    });
	});
}

exports.companyData = function(companyId, callback){
	db.table('companyprofile').having('companyId').eq(companyId).scan(
		function(err, data) {
		var companies = {};
		if(!err){
			companies.id = companyId;
			companies.name = data[0].companyName;
			companies.overview = data[0].overview;
			callback(err, companies);
		}else{
			callback(err, companies);
		}
	});
}

exports.logout = function(req, res){
	res.render('login');
}