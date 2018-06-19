$(document).ready(function() {
	$('#onlyNorthEastFilter').click(function(){
	    jsRef.where("region", "==", "North East").onSnapshot(function(querySnapshot) {
	    	LoadTableData(querySnapshot);
	    })
	});

    $('#fullTimeFilter').click(function(){
        employeesRef.where("isFullTime", "==", true)
            .onSnapshot(function(querySnapshot) {
                LoadTableData(querySnapshot);
        });
    });

    $('#olderThenFilter').click(function(){
        //older than 30
        employeesRef.where("age", ">=", 30)
        .onSnapshot(function(querySnapshot) {
            LoadTableData(querySnapshot);
        });
    });

    $('#ageBetweenFilter').click(function(){
        //older than 35, but younger than 50
        employeesRef.where("age", ">=", 35).where("age", "<=", 50)
        .onSnapshot(function(querySnapshot) {
            LoadTableData(querySnapshot);
        });
    });

    $('#yearsOfExperienceFilter').click(function(){
        //female and 5-10 years of experience
        employeesRef.where("gender", "==", "Female")
        employeesRef.where("yearsOfExperience", ">=", 5).where("yearsOfExperience", "<=", 10)
        .onSnapshot(function(querySnapshot) {
            LoadTableData(querySnapshot);
        });
    });


});