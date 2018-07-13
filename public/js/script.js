function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
$(document).ready(function(){
	$('.menu-icon').click(function(){
		$('.nav').toggle();
	});
});

function show(e) {
	$(e).css('display', 'block');
}
function hide(e) {
	$(e).css('display', 'none');
}

function noRecordFound() {
    $('#operationStatus').html('<div class="alert alert-danger">No record found.</div>');
	$('#searchResult').css('display', 'none');
	$('#searchResult .tbodyData').html('');
}

