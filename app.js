
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var http = require('http');
var path = require('path');
var profile = require('./routes/profile');
var job = require('./routes/jobs');
var jobapp = require('./routes/jobapplication');
var user = require('./routes/users');
var companyprofile = require('./routes/companyprofile');
var index = require('./routes/index');
var events = require('events');
var EventEmitter = events.EventEmitter;
var bodyParser = require('body-parser');
var fs = require("fs");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '\public')));
app.use(express.multipart());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/',index.login);

app.post('/signUp',user.signUp);
app.post('/signIn',user.signIn);
app.post('/checkForExistingUser',user.IsUserPresent);
app.get('/usersearch/:firstName/:lastName', user.searchUsers);

app.post('/application', jobapp.postJobApplication);
app.get('/userapplication/:userId', jobapp.getJobApplication);
app.post('/updatejobstatus/:jobId/:userId', jobapp.updateJobStatus);


app.post('/bio/:userid',profile.insertBio);
app.post('/certification/:userid',profile.insertCertification);
app.post('/skill/:userid',profile.insertSkill);
app.post('/college/:userid',profile.insertCollege);
app.post('/status/:userid',profile.insertStatus);
app.post('/company_followed/:userid',profile.insertCompanyFollowed);
app.post('/user_followed/:userid',profile.insertUserFollowed);

app.get('/profile/:userid',profile.getProfile); //profile data

app.get('/userprofile',profile.getUserProfile); //profile page

app.get('/insertJobDetailsPage',job.showInsertJobDetailsView);
app.get('/showJobDetailsPage/:jobId',job.showJobDetailsView);
app.get('/showJobs',job.showJobsView);

app.get('/jobs',job.getJobs);
app.get('/jobs/:jobId',job.getJobDetails);
app.get('/company/:companyId/jobs',job.getJobsByCompany);
app.post('/company/:companyId/jobs/',job.insertJobDetails);
app.delete('/company/:companyId/jobs/:jobId',job.deleteJob);

app.get('/search', companyprofile.getSearchView);
app.get('/registercompanypage', companyprofile.getCompanyRegisterView);
app.get('/companyhomepage', companyprofile.getCompanyView);
app.get('/companyprofilepage', companyprofile.getCompanyProfileView);

app.post('/company',companyprofile.insertCompanyProfile);
app.get('/company/:companyId',companyprofile.getCompanyProfile);
app.post('/company/:companyId/name',companyprofile.updateCompanyName);
app.post('/company/:companyId/overview',companyprofile.updateCompanyOverview);
app.post('/company/:companyId/url',companyprofile.updateCompanyURL);
app.post('/company/:companyId/logo',companyprofile.changeCompanyLogo);
app.post('/company/:companyId/followers',companyprofile.addCompanyFollower);
app.post('/company/:companyId/status',companyprofile.updateCompanyStatus);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
