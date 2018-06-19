$(document).ready(function(){

	//*************************************** REGISTER ***********************************************

	$('#addVolunteer').click(function(){

		var fname = $('#fname').val().toLowerCase().trim();
		var lname = $('#lname').val().toLowerCase().trim();
		var region = $('#region option:selected').text().toLowerCase();
		var regionVal = $('#region option:selected').val();
		var qiadat = $('#qiadat').val().toLowerCase().trim();
		var tel = $('#tel').val().toLowerCase().trim();
		var email = $('#email').val().toLowerCase().trim();
		var age = $('#age').val().toLowerCase().trim();
		var dietary = $('#dietary').val().toLowerCase().trim();
		var stay = $('#stay').val().toLowerCase().trim();

		 var mandatory = [$('#fname'), $('#lname'), $('#region'), $('#qiadat'), $('#tel'), $('#email')];
		// var mandatory = [fname, lname, regionVal, qiadat, tel, email];

		var validation = 0;

		mandatory.forEach(function(x) {
			if (x.val() == "" || x.find('option:selected').val() == "default") {
				x.addClass('is-invalid');
			} else {
				x.removeClass('is-invalid');
				validation++;
			}
		})

		if (validation == 6) {
	        var docuName = fname.charAt(0)+"."+lname+"."+regionVal+"."+qiadat.charAt(0)+qiadat.charAt(1)+qiadat.charAt(2);
	        db.collection("volunteers").doc(docuName).set({
				fname:fname,
				lname:lname,
				region:region,
				qiadat:qiadat,
				age: age,
				tel: tel,
				email: email,
				dietary: dietary,
				stay: stay
			}).then(function(docRef) {
	                $('#operationStatus').html('<div class="alert alert-success"><strong>Success!</strong> ' + $('#fname').val() + ' ' + $('#lname').val() + ' registered successfully!</div>').delay(10000);
	                $('#fname').val("");
	                $('#lname').val("");
	                $('#region').val("default");
	                $('#qiadat').val("");
	                $('#age').val("");
	                $('#tel').val("");
	                $('#email').val("");
	                $('#dietary').val("");
	                $('#stay').val("");
					$('#operationStatus')[0].scrollIntoView();
					$('#registrationForm').attr('hidden', true);
					$('#registerAgain').attr('hidden', false);
	                // loadData();
	           }).catch(function(error) {
	            $('#operationStatus').html('<div class="alert alert-danger"><strong>Error!</strong> Unable to save ' + fname + ' ' + lname + '!</div>');
			});
		} else {
            $('#operationStatus').html('<div class="alert alert-danger"><strong>Error!</strong> Please fill all mandatory fields!</div>');
			$('#operationStatus')[0].scrollIntoView();
		}
	});

	$('#registerAgain').click(function(){
        $('#operationStatus').html('');
		$('#registrationForm').attr('hidden', false);
		$('#registerAgain').attr('hidden', true);
	});

	//*************************************** /REGISTER ***********************************************



	//*************************************** CHECK IN ***********************************************

	$('#search').click(function(){
        var searchValue = $('#searchfield').val().toLowerCase().trim();
        var searchByValue = $('input[name=searchBy]:checked').val();
        jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
            if(querySnapshot.empty) {
            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
            	$('#searchResult').attr('hidden', true);
				$('#searchResult .tbodyData').html('');
            } else {
	            $('#operationStatus').html('');
            	LoadTableData(querySnapshot); 
            }
        });
    });
    
    $('#searchfield').keypress(function(e){
    	if (e.which == 13) {
	        var searchValue = $(this).val().toLowerCase().trim();
	        var searchByValue = $('input[name=searchBy]:checked').val();
	        jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
		        if(querySnapshot.empty) {
	            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
            		$('#searchResult').attr('hidden', true);
					$('#searchResult .tbodyData').html('');
	            } else {
	            	$('#operationStatus').html('');
	            	LoadTableData(querySnapshot); 
	            }
	        });
    	}
    });

    $('input[name=searchBy]').change(function(){
        var searchValue = $('#searchfield').val().toLowerCase().trim();
        var searchByValue = $('input[name=searchBy]:checked').val();
        jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
	        if(querySnapshot.empty) {
            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
            	$('#searchResult').attr('hidden', true);
				$('#searchResult .tbodyData').html('');
            } else {
	            $('#operationStatus').html('');
            	LoadTableData(querySnapshot); 
            }
        });
    });


	//checkin
	$("tbody.tbodyData").on("click","td.checkin .btn", function(){
		var docuName = $(this).attr('id');
		var fname = $($(this)[0]).parents('tr').find('td.fname').text();
		var lname = $($(this)[0]).parents('tr').find('td.lname').text();
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		var hours = date.getHours();
		var minutes = date.getMinutes();

		db.collection("volunteers").doc(docuName).set({
			[day+"-"+month+"-"+year]:true
		},
		{
			merge: true
		}).then(function(docRef) {
                $('#operationStatus').html('<div class="alert alert-success"><strong>' + fname + ' ' + lname +' Signed in successfully!</strong></div>');
				$('#operationStatus')[0].scrollIntoView();
           }).catch(function(error) {
            $('#operationStatus').html('<div class="alert alert-danger"><strong>Error!</strong> Unable to sign in!</div>');
			$('#operationStatus')[0].scrollIntoView();
		});
	});
	//*************************************** /CHECK IN ***********************************************

	//*************************************** SUMMARY ***********************************************


	$('#searchSummary').click(function(){
        var searchValue = $('#summaryfield').val().toLowerCase().trim();
        var searchByValue = $('input[name=summaryBy]:checked').val();
        if(searchByValue == "date") {
	        jsRef.where(searchValue, "==", true).onSnapshot(function(querySnapshot) {
		        if(querySnapshot.empty) {
	            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
	            	$('#searchResult').attr('hidden', true);
					$('#searchResult .tbodyData').html('');
	            } else {
		            $('#operationStatus').html('');
	            	LoadTableData(querySnapshot, true); 
		        };
		    });
    	} else {
    		jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
	        	if(querySnapshot.empty) {
	            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
	            	$('#searchResult').attr('hidden', true);
					$('#searchResult .tbodyData').html('');
	            } else {
		            $('#operationStatus').html('');
	            	LoadTableData(querySnapshot, true); 
	            }
            });
    	}
    });
    
    $('#summaryfield').keypress(function(e){
    	if (e.which == 13) {
	        var searchValue = $('#summaryfield').val().toLowerCase().trim();
	        var searchByValue = $('input[name=summaryBy]:checked').val();
	        if(searchByValue == "date") {
		        jsRef.where(searchValue, "==", true).onSnapshot(function(querySnapshot) {
			        if(querySnapshot.empty) {
		            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
		            	$('#searchResult').attr('hidden', true);
						$('#searchResult .tbodyData').html('');
		            } else {
			            $('#operationStatus').html('');
		            	LoadTableData(querySnapshot, true); 
			        };
			    });
	    	} else {
	    		jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
		        	if(querySnapshot.empty) {
		            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
		            	$('#searchResult').attr('hidden', true);
						$('#searchResult .tbodyData').html('');
		            } else {
			            $('#operationStatus').html('');
		            	LoadTableData(querySnapshot, true); 
		            }
	            });
	    	}
    	}
    });

    $('input[name=summaryBy]').change(function(){
        var searchValue = $('#summaryfield').val().toLowerCase().trim();
        var searchByValue = $('input[name=summaryBy]:checked').val();
        if(searchByValue == "date") {
	        jsRef.where(searchValue, "==", true).onSnapshot(function(querySnapshot) {
		        if(querySnapshot.empty) {
	            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
	            	$('#searchResult').attr('hidden', true);
					$('#searchResult .tbodyData').html('');
	            } else {
		            $('#operationStatus').html('');
	            	LoadTableData(querySnapshot, true); 
		        };
		    });
    	} else {
    		jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
	        	if(querySnapshot.empty) {
	            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
	            	$('#searchResult').attr('hidden', true);
					$('#searchResult .tbodyData').html('');
	            } else {
		            $('#operationStatus').html('');
	            	LoadTableData(querySnapshot, true); 
	            }
            });
    	}
    });

	$('#viewSummary').click(function(){
        jsRef.orderBy('region').startAt('a').endAt('z').onSnapshot(function(querySnapshot) {
            LoadSummaryData(querySnapshot);
        });
    });


	//*************************************** /SUMMARY ***********************************************

	function LoadTableData(querySnapshot, summary) {
		var tableRow='';
		querySnapshot.forEach(function(doc) {
			var id = doc.id;
			var document = doc.data();
			tableRow += '<tr>';
			tableRow += '<td class="fname">' + toTitleCase(document.fname) + '</td>';
			tableRow += '<td class="lname">' + toTitleCase(document.lname) + '</td>';
			tableRow += '<td class="region">' + toTitleCase(document.region) + '</td>';
			tableRow += '<td class="qiadat">' + toTitleCase(document.qiadat) + '</td>';
			if(summary != true) {
            	tableRow += '<td class="checkin"><button class="btn btn-success" id="'+id+'"">Check in ></button></td>'
        	}
			tableRow += '</tr>';
		});
        $('#searchResult').attr('hidden', false);
		$('#searchResult .tbodyData').html(tableRow);
	}


	function LoadSummaryData(querySnapshot) {
		var tableRow='';
		var i = 0;
		var regionList = [];
		querySnapshot.forEach(function(doc) {
			var document = doc.data();
			regionList[i] =  document.region;
			i++;
		});

		var counts = {};

		for (var i = 0; i < regionList.length; i++) {
		    counts[regionList[i]] = 1 + (counts[regionList[i]] || 0);
		}

		var keys = Object.keys(counts);
		var values = Object.values(counts);
		var total = values.reduce(function(acc, val) {return acc + val;});

		for (var i = 0; i < keys.length; i++) {
		    tableRow += "<tr>";
		    tableRow += "<td>" + toTitleCase(keys[i]) + "</td>" + "<td>" + values[i] + "</td></tr>";
		}

	    tableRow += '<tr class="bold"><td>Total</td><td>' + total + '</td></tr>'


        $('#summaryResult').attr('hidden', false);
		$('#summaryResult .tbodyData').html(tableRow);
	}


	
	function toTitleCase(str) {
	    return str.replace(/\w\S*/g, function(txt){
	        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    });
	}

	$('.menu-icon').click(function(){
		$('.nav').toggle();
	});



});