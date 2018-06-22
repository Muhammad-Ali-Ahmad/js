$(document).ready(function(){

	//*************************************** CHECK IN ***********************************************

	$('#search').click(function(){
        var searchValue = $('#searchfield').val().toLowerCase().trim();
        var searchByValue = $('input[name=searchBy]:checked').val();
        jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
            if(querySnapshot.empty) {
            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
            	$('#searchResult').css('display', 'none');
				$('#searchResult .tbodyData').html('');
            } else {
	            $('#searchResult').css('display', 'block');
	            $('#operationStatus').html('');
            	LoadCheckinData(querySnapshot); 
            }
        });
    });	

    // $('#search').click(function(){
    //     var searchValue = $('#searchfield').val().toLowerCase().trim();
    //     var searchByValue = $('input[name=searchBy]:checked').val();   
	   //  db.collection("volunteers").where(searchByValue, "==", searchValue).onSnapshot({ includeMetadataChanges: true }, function(querySnapshot) {
		  //     querySnapshot.docChanges().forEach(function(change) {
		  //           if(querySnapshot.empty) {
		  //           	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
		  //           	$('#searchResult').attr('hidden', true);
				// 		$('#searchResult .tbodyData').html('');
		  //           } else {
			 //            $('#operationStatus').html('');
		  //           	LoadCheckinData(querySnapshot); 
		  //           }

		  //           var source = querySnapshot.metadata.fromCache ? "local cache" : "server";
		  //           console.log("Data came from " + source);
		  //     });
		  // });

    // });

    $('#searchfield').keypress(function(e){
    	if (e.which == 13) {
	        var searchValue = $(this).val().toLowerCase().trim();
	        var searchByValue = $('input[name=searchBy]:checked').val();
	        jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
		        if(querySnapshot.empty) {
	            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
            		$('#searchResult').css('display', 'none');
					$('#searchResult .tbodyData').html('');
	            } else {
	            	$('#searchResult').css('display', 'block');
	            	$('#operationStatus').html('');
	            	LoadCheckinData(querySnapshot); 
	            }
	        });
    	}
    });

    $('input[name=searchBy]').change(function(){
        var searchValue = $('#searchfield').val().toLowerCase().trim();
        var searchByValue = $('input[name=searchBy]:checked').val();
        if (searchByValue == "region") {
        	$('.inputAndSearch, #searchResult').css('display', 'none');
        	$('#regionList').css('display', 'block');
        	$('#searchResult .tbodyData').html('');
        } else {
        	$('.inputAndSearch').css('display', 'block');
        	$('#regionList').css('display', 'none');
        	$('#regionList select').val("default");
	        jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
		        if(querySnapshot.empty) {
	            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
	            	$('#searchResult').css('display', 'none');
					$('#searchResult .tbodyData').html('');
	            } else {
	            	$('#searchResult').css('display', 'block');
		            $('#operationStatus').html('');
	            	LoadCheckinData(querySnapshot); 
	            }
	        });
    	}
    });

    $('#regionList select').change(function() {
    	var region = $('option:selected').text();
    	jsRef.where('region', "==", region.toLowerCase()).onSnapshot(function(querySnapshot) {
	        if(querySnapshot.empty) {
            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
            	$('#searchResult').css('display', 'none');
				$('#searchResult .tbodyData').html('');
            } else {
            	$('#searchResult').css('display', 'block');
	            $('#operationStatus').html('');
            	LoadCheckinData(querySnapshot); 
            }
        });
    });




	//checkin
	$("tbody.tbodyData").on("click","td.checkin .btn", function(){
		var docuName = $(this).attr('id');
		var fname = $($(this)[0]).parents('tr').find('td .fname').text();
		var lname = $($(this)[0]).parents('tr').find('td .lname').text();
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

	function LoadCheckinData(querySnapshot) {
		var tableRow='';
		querySnapshot.forEach(function(doc) {
			var id = doc.id;
			var document = doc.data();
			tableRow += '<tr>';
			tableRow += '<td> <span class="fname checkinvalue">' + toTitleCase(document.fname) + '</span><span class="lname checkinvalue">' + toTitleCase(document.lname) + '</span></td>';
			// tableRow += '<td class="lname">' + toTitleCase(document.lname) + '</td>';
			tableRow += '<td> <span class="qiadat checkinvalue">' + toTitleCase(document.qiadat) + '</span><span class="region checkinvalue">' + toTitleCase(document.region) + '</span></td>';
			// tableRow += '<td class="qiadat">' + toTitleCase(document.qiadat) + '</td>';
            tableRow += '<td class="checkin"><button class="btn btn-success" id="'+id+'"">Check in ></button></td>'
			tableRow += '</tr>';
		});
        $('#searchResult').attr('hidden', false);
		$('#searchResult .tbodyData').html(tableRow);
	}

	//*************************************** /CHECK IN ***********************************************
});