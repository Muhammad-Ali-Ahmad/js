$(document).ready(function(){

	//*************************************** CHECK IN ***********************************************

	$('#search').click(function(){
        var searchValue = $('#searchfield').val().toLowerCase().trim();
        var searchByValue = $('input[name=searchBy]:checked').val();
        jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
            if(querySnapshot.empty) {
            	noRecordFound();
            } else {
	            LoadCheckinData(querySnapshot); 
            }
        });
    });	

    $('#searchfield').keypress(function(e){
    	if (e.which == 13) {
	        var searchValue = $(this).val().toLowerCase().trim();
	        var searchByValue = $('input[name=searchBy]:checked').val();
	        jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
		        if(querySnapshot.empty) {
            		noRecordFound();
	            } else {
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
            		noRecordFound();
	            } else {
	            	LoadCheckinData(querySnapshot); 
	            }
	        });
    	}
    });

    $('#regionList select').change(function() {
    	var region = $('option:selected').text();
    	jsRef.where('region', "==", region.toLowerCase()).onSnapshot(function(querySnapshot) {
	        if(querySnapshot.empty) {
            	noRecordFound();
            } else {
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
		$('#searchResult').css('display', 'block');
		$('#operationStatus').html('');
		var tableRow='';
		querySnapshot.forEach(function(doc) {
			var id = doc.id;
			var document = doc.data();
			tableRow += '<tr>';
			tableRow += '<td> <span class="fname checkinvalue">' + toTitleCase(document.fname) + '</span><span class="lname checkinvalue">' + toTitleCase(document.lname) + '</span></td>';
			tableRow += '<td> <span class="qiadat checkinvalue">' + toTitleCase(document.qiadat) + '</span><span class="region checkinvalue">' + toTitleCase(document.region) + '</span></td>';
            tableRow += '<td class="checkin"><button class="btn btn-success" id="'+id+'"">Check in ></button></td>'
			tableRow += '</tr>';
		});
        $('#searchResult').css("display", "block");
		$('#searchResult .tbodyData').html(tableRow);
	}

	//*************************************** /CHECK IN ***********************************************
});