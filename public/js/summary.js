$(document).ready(function(){

	//*************************************** SUMMARY ***********************************************

	$('#searchSummary').click(function(){
        var searchValue = $('#summaryfield').val().toLowerCase().trim();
        var searchByValue = $('input[name=summaryBy]:checked').val();
        if(searchByValue == "date") {
	        jsRef.where(searchValue, "==", true).onSnapshot(function(querySnapshot) {
		        if(querySnapshot.empty) {
	            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
	            	hide('#searchResult');
					$('#searchResult .tbodyData').html('');
	            } else {
		            $('#operationStatus').html('');
	            	show('#searchResult');
	            	LoadTableData(querySnapshot, true); 
		        };
		    });
    	} else if (searchByValue == "region") {
	    	var region = $('option:selected').text();
	    	jsRef.where('region', "==", region.toLowerCase()).where(searchValue, "==", true).onSnapshot(function(querySnapshot) {
		        if(querySnapshot.empty) {
	            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
	            	hide('#searchResult');
					$('#searchResult .tbodyData').html('');
	            } else {
	            	show('#searchResult');
		            $('#operationStatus').html('');
	            	LoadTableData(querySnapshot); 
	            }
	        });
    	} else if (searchByValue == "noOfDays") {
    		calculateDays(searchValue);
    	} else {
    		jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
	        	if(querySnapshot.empty) {
	            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
	            	hide('#searchResult');
					$('#searchResult .tbodyData').html('');
	            } else {
		            $('#operationStatus').html('');
	            	show('#searchResult');
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
		            	hide('#searchResult');
						$('#searchResult .tbodyData').html('');
		            } else {
			            $('#operationStatus').html('');
	            		show('#searchResult');
		            	LoadTableData(querySnapshot, true); 
			        };
			    });
	    	} else if (searchByValue == "region") {
		    	var region = $('option:selected').text();
		    	jsRef.where('region', "==", region.toLowerCase()).where(searchValue, "==", true).onSnapshot(function(querySnapshot) {
			        if(querySnapshot.empty) {
		            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
		            	hide('#searchResult');
						$('#searchResult .tbodyData').html('');
		            } else {
		            	show('#searchResult');
			            $('#operationStatus').html('');
		            	LoadTableData(querySnapshot); 
		            }
		        });
	    	} else {
	    		jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
		        	if(querySnapshot.empty) {
		            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
		            	hide('#searchResult');
						$('#searchResult .tbodyData').html('');
		            } else {
			            $('#operationStatus').html('');
	            		show('#searchResult');
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
    		show('.inputAndSearch');
        	$('#searchResult .tbodyData').html('');
        	hide('#summaryResult');
        	hide('.regionList');
        	hide('#searchResult');
    		$('#regionList select').val("default");
	        jsRef.where(searchValue, "==", true).onSnapshot(function(querySnapshot) {
		        if(querySnapshot.empty) {
	            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
	            	hide('#searchResult');
					$('#searchResult .tbodyData').html('');
	            } else {
	            	show('#searchResult');
		            $('#operationStatus').html('');
	            	LoadTableData(querySnapshot, true); 
		        };
		    });
    	} else if (searchByValue == "region") {
        	hide('#summaryResult');
        	hide('.inputAndSearch');
        	hide('#searchResult');
        	show('.regionList');
        	$('#searchResult .tbodyData').html('');
        } else if (searchByValue == "totalSummary"){
    		hide('.inputAndSearch');
    		show('#summaryResult');
    		$('#searchResult .tbodyData').html('');
    		hide('.regionList');
    		$('#regionList select').val("default");
	        jsRef.orderBy('region').startAt('a').endAt('z').onSnapshot(function(querySnapshot) {
	            LoadSummaryData(querySnapshot);
	        });
    	} else {
    		show('.inputAndSearch');
    		hide('#summaryResult');
    		hide('.regionList');
    		$('#regionList select').val("default");
    		jsRef.where(searchByValue, "==", searchValue).onSnapshot(function(querySnapshot) {
	        	if(querySnapshot.empty) {
	            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
	            	hide('#searchResult');
					$('#searchResult .tbodyData').html('');
	            } else {
	            	show('#searchResult');
		            $('#operationStatus').html('');
	            	LoadTableData(querySnapshot, true); 
	            }
            });
    	}
    });


    $('#addDate').click(function(){
    	$('#summaryfield').val("");
    	$(this).text("Add/Remove date");
		$('.inputAndSearch').toggle();
	});

    $('#regionList select').change(function() {
    	hide('.inputAndSearch');
    	$('#addDate').text("Add Date (optional)");
    	var region = $('option:selected').text();
    	jsRef.where('region', "==", region.toLowerCase()).onSnapshot(function(querySnapshot) {
	        if(querySnapshot.empty) {
            	$('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
            	hide('#searchResult');
				$('#searchResult .tbodyData').html('');
            } else {
            	show('#searchResult');
	            $('#operationStatus').html('');
            	LoadTableData(querySnapshot); 
            }
        });
    });



	function LoadTableData(querySnapshot) {
		var tableRow='';
		var total = 0;
		querySnapshot.forEach(function(doc) {
			var id = doc.id;
			var document = doc.data();
			tableRow += '<tr>';
			tableRow += '<td class="fname">' + toTitleCase(document.fname) + '</td>';
			tableRow += '<td class="lname">' + toTitleCase(document.lname) + '</td>';
			tableRow += '<td class="region">' + toTitleCase(document.region) + '</td>';
			tableRow += '<td class="qiadat">' + toTitleCase(document.qiadat) + '</td>';
			tableRow += '</tr>';
			total++
		});
		tableRow += '<tr class="bold">';
		tableRow += '<td colspan="2">Total</td>';
		tableRow += '<td colspan="2">' + total + '</td>';
		tableRow += '</tr>';

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


	function calculateDays(days) {
		show('#summaryResult');
        jsRef.orderBy('region').startAt('a').endAt('z').onSnapshot(function(querySnapshot) {
            LoadSummaryData(querySnapshot);
        });
	}

	//*************************************** /SUMMARY ***********************************************

});