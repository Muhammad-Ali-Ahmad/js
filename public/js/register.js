	//*************************************** REGISTER ***********************************************
$(document).ready(function(){
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
    		var date = new Date();
			var day = date.getDate();
			var month = date.getMonth() + 1;
			var year = date.getFullYear();
	        db.collection("volunteers").doc(docuName).set({
				fname:fname,
				lname:lname,
				region:region,
				qiadat:qiadat,
				age: age,
				tel: tel,
				email: email,
				dietary: dietary,
				stay: stay,
				[day+"-"+month+"-"+year]:true
			}).then(function(docRef) {
	                $('#operationStatus').html('<div class="alert alert-success"><strong>Success!</strong> ' + toTitleCase($('#fname').val()) + ' ' + toTitleCase($('#lname').val()) + ' registered successfully!</div>').delay(10000);
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
});
//*************************************** /REGISTER ***********************************************
