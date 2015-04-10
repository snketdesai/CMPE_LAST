/**
 * New node file
 */

var user = require('../model/userQueries');

exports.signUp = function(req,res){
	console.log("Sign up called");
	var firstName;
	var lastName;
	var email = req.body.email;
	var pwd = req.body.password;
	var userType = req.body.userType;
	
	if(userType == 'C'){
		firstName  = req.body.companyName;
		lastName = firstName;
	}
	else{
		firstName = req.body.firstName;
		lastName = req.body.lastName;
	}
	user.signUp(email, pwd, firstName, lastName,userType,function(err,data){
		if(err){
			  res.writeHead(400);
			  res.end("Error while inserting data\n");
		}
		else{	
			console.log(data);
			 res.render("homepage");
		}
	});
}

exports.signIn = function(req,res){
	console.log("Sign In called");
	var email = req.body.username;
	var pwd = req.body.password;
	user.signIn(email, pwd,function(err,data){
		if(err){
			  res.writeHead(400);
			  res.end("Error while signing \n");
		}
		else{	
			if(data.length != 0){
				console.log("User Signed in_______"+data[0].user_type);
				req.session.userId = data[0].user_Id;
				if(data[0].user_type === "U"){
					console.log("USer has signed in");
					res.render('homepage'); // render Newsfeed page for user			
				}
				else if(data.user_type == "C"){
					// render to company Profile page
				}
			}
			else{
				res.render('login');
			}
			
		}
	});
}

exports.searchUsers = function(req,res){
	console.log("searching for the user");
	var str = req.params.str;
	var name = str.split(" ");
	var firstName = name[0];
	var lastName = name[1];
	user.searchUsers(firstName, lastName, function(err,data){
		if(err){
			res.writeHead(400);
			res.end("Error while searching");
		}else{
			console.log("success::"+data);
			//console.log("undefined: " + res.body);
			res.writeHead(200);
			
			res.end(JSON.stringify(data));
			//console.log(JSON.stringify(res.body));
			//res.end(JSON.stringify(data));
		}
	});
};

exports.IsUserPresent = function(req,res){
	console.log("___________IsUserPresent called_____________");
	var email = req.body.email;
	user.isUserPresent(email,function(err,data){
		if(err){
			  res.writeHead(400);
			  res.end("Error while checking unique user \n");
		}
		else{			
			 res.send(data);
		}
	});
}

exports.getUserFromSession = function(req,res){
	console.log("getUserFromSession_________"+req.session.userId);
	var userId = req.session.userId;
	res.send(userId.toString());
}