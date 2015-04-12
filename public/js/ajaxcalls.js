$("#savename").hide();
$("#saveoverview").hide();
$("#saveurl").hide();

$(document).ready(function(){
      
      $( "#editname" ).click(function() {
        $("#editname").hide();
        $("#savename").show();
        $("#name").prop('disabled', false);
      });

      $( "#savename" ).click(function() {
        var name = $("#name").val();
          var nameObj = {
          name : name
        };

        $.ajax({
          type: "POST",
          url: "/company/"+$("#companyId").val()+"/name",
          contentType: "application/json; charset=UTF-8",
          dataType: 'json',
          data: JSON.stringify(nameObj),
          crossDomain : true,
          success: function( d ) {
             console.log(d);
          }
        });
        $("#savename").hide();
        $("#editname").show();
        $("#name").prop('disabled', true);
      });

      $( "#editoverview" ).click(function() {
          $("#editoverview").hide();
          $("#saveoverview").show();
          $("#overviewText").prop('disabled', false);
       });
      
      $( "#saveoverview" ).click(function() {
        var overview = document.getElementById('overviewText').value;
          var overviewObj = {
          overview : overview
        };

        $.ajax({
          type: "POST",
          url: "/company/"+$("#companyId").val()+"/overview",
          contentType: "application/json; charset=UTF-8",
          dataType: 'json',
          data: JSON.stringify(overviewObj),
          crossDomain : true,
          success: function( d ) {
             console.log(d);
          }
        });
        $("#saveoverview").hide();
        $("#editoverview").show();
        $("#overviewText").prop('disabled', true);
      });
      
      $( "#editurl" ).click(function() {
          $("#editurl").hide();
          $("#saveurl").show();
          $("#urlText").prop('disabled', false);
       });
      
      $( "#saveurl" ).click(function() {
        var urlO = document.getElementById('urlText').value;
          var urlObj = {
          urlO : urlO
        };

        $.ajax({
          type: "POST",
          url: "/company/"+$("#companyId").val()+"/url",
          contentType: "application/json; charset=UTF-8",
          dataType: 'json',
          data: JSON.stringify(urlObj),
          crossDomain : true,
          success: function( d ) {
             console.log(d);
          }
        });
        $("#saveurl").hide();
        $("#editurl").show();
        $("#urlText").prop('disabled', true);
      });
      
      $( "#editLogo" ).click(function() {
          $("#editLogo").hide();
         
          var html = '';
          html += '<form id = "updateLogoForm" enctype = "multipart/form-data" action = "/company/'+document.getElementById("companyId").value+'/logo" method = "post">';
          html += '<input type="file" id="companyLogo" name="logo"/>';
          html += '<input type="text" id="cId" name="cId" value="update" hidden/>';
          html += ' <button id="cLogo" class="btn btn-success pull-right" type="submit" name="submit">Upload Logo</button><ul class="list-inline"><li></li></ul><br>';
          html += '</form>';
          
          $('#up').append(html);
      });
    	 
      $('#updateLogoForm').submit(function() {
          $(this).ajaxSubmit({
              error: function(xhr) {
                      status('Error: ' + xhr.status);
              },

              success: function(response) {
                        console.log(response);
              }
          });
          $("#changeL").hide();
          return false;
      });
      
      $( "#postStatus" ).click(function() {
        var status = document.getElementById('statusText').value;
          var statusObj = {
          status : status
        };

        $.ajax({
          type: "POST",
          url: "/company/"+$("#companyId").val()+"/status",
          contentType: "application/json; charset=UTF-8",
          dataType: 'json',
          data: JSON.stringify(statusObj),
          crossDomain : true,
          success: function( d ) {
             console.log(d);
             $("#statusText").val("");
          }
        });
      });
      
      $( "#companyProfile" ).click(function() {
    	  var id = document.getElementById('companyId').value;
          var name = document.getElementById('name').value;
          var overviewText = document.getElementById('overviewText').value;
          var urlText = document.getElementById('urlText').value;
          var profileObj = {
        	  id : id,
        	  name : name,
        	  overviewText : overviewText,
        	  urlText : urlText
          };

          $.ajax({
            type: "POST",
            url: "/company",
            contentType: "application/json; charset=UTF-8",
            dataType: 'json',
            data: JSON.stringify(profileObj),
            crossDomain : true,
            success: function( d ) {
               console.log(d.companyId);
               var html = '';
               html += '<div class="form-group" name="up">';
               html += '<form id = "uploadForm" enctype = "multipart/form-data" action = "/company/'+d.companyId+'/logo" method = "post">';
               html += '<label for="companyLogo" name="labLogo">Company Logo</label>';
               html += '<input type="file" id="companyLogo" name="logo"/>';
               html += '<input type="text" id="cId" name="cId" value="insert" hidden/>';
               html += ' <button id="cLogo" class="btn btn-success pull-right" type="submit" name="submit">Upload Logo</button><ul class="list-inline"><li></li></ul>';
               html += '</form></div>';
               
               $('#cprofile').append(html);
               $('#cform').hide();
               $("#cId").val(d.companyId);
            }
          });
       });
      
      $('#uploadForm').submit(function() {
          $(this).ajaxSubmit({
              error: function(xhr) {
                      status('Error: ' + xhr.status);
              },

              success: function(response) {
                        console.log(response);
              }
          });
          return false;
      }); 
      
      
      $("#cName").autocomplete({
			delay: 500,
			minLength: 3,
			source: function(request, response) {
				var autocompleteQuery = {
			    	query : $("#cName").val()
	    	    };
				$.ajax({
		    		  type: "POST",
		              url: "/company/autocompletelist",
		              contentType: "application/json; charset=UTF-8",
		              data: JSON.stringify(autocompleteQuery),
		              crossDomain : true,
		              success: function( d ) {
		            	  response(d);
		              }
		    	 });
			},
			focus: function(event, ui) {
				event.preventDefault();
			},
			select: function(event, ui) {
				event.preventDefault();
				window.location = '/companyprofilepagename/'+ui.item.value;
			}
		});
      
      $( "#companySearch" ).click(function() {
          var name = $('#cName').val();
          console.log(name);
          var companyname = {
        	  name : name
          };
          
          $.ajax({
            type: "POST",
            url: "/company/companylist",
            contentType: "application/json; charset=UTF-8",
            dataType: 'json',
            data: JSON.stringify(companyname),
            crossDomain : true,
            success: function( d ) {
               var html = '';
               html += '<div class="panel panel-default">';
               html += '<div class="panel-heading">';
               html += '<table class="table"><thead><tr><th>Company Name</th><th>Overview</th></tr></thead><tbody>';
               for(i=0;i<d.length;i++){
            	   html += '<tr class="clickable-row" data-href="/companyprofilepagename/'+d[i].name+'"><td>'+d[i].name+'</td><td>'+d[i].overview+'</td></tr>';
               }      
               html += ' </tbody></table></div></div>';
               
               $('#cprofile').append(html);
               $(".clickable-row").click(function() {
                   window.location = $(this).data("href");
               });
            }
          });
       });
      
      $( "#companySearch" ).click(function() {
    	  var id = $('#companyId').val();
    	  var name = $('#cName').val();
    	  var title = $('#jobTitle').val();
    	  var desc = $('#jobDesc').val();
    	  var expiry = $('#expiry').val();
    	  var location = $('#location').val();
    	  
          var jobDetails = {
        	  id : id,
        	  name : name,
        	  title : title,
        	  desc : desc,
        	  expiry : expiry,
        	  location : location
          };
          
          $.ajax({
            type: "POST",
            url: "/insertJobDetailsPage",
            contentType: "application/json; charset=UTF-8",
            dataType: 'json',
            data: JSON.stringify(jobDetails),
            crossDomain : true,
            success: function( d ) {
            	console.log(d);
            }
          });
      });
});
        