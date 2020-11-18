$(document).ready(function() {

    $("#submitDate").on("click", function() {
        $("#dateError").html("");
        $("#output").html("");
        if(!isFormValid()){
            return;
        };
        findVillager();
    });

    function isFormValid() {
        var isValid = true;
        let userDate = $("#day").val() + "/" + $("#month").val();
        var invalidDates = ["31/4", "31/6", "31/9", "31/11", "30/2", "31/2"];

        for (i = 0; i < invalidDates.length; i++){
        if (userDate === invalidDates[i]) {
            isValid = false;
            $("#dateError").html("Please enter a valid date.<br />");
            $("#dateError").css("color", "red");
        };
        }
        return isValid;
    };

    async function findVillager() {
        let userDate = $("#day").val() + "/" + $("#month").val();
        let dateFound = false;

        let url = `http://acnhapi.com/v1/villagers/`;
        let response = await fetch(url);
        let data = await response.json();

        jQuery.each(data, function(key, value){
            if (userDate == value.birthday){
            dateFound = true;
            $("#output").append(`
                <div class='villagerResult row'>
                <div class='col'><img src='${value["icon_uri"]}' alt='${value.name["name-USen"]}' /></div>
                <div class='col'><span class='villagerName'>${value.name["name-USen"]}</span><br />
                <span class='villagerBday'>${value["birthday-string"]}</span></div>
            </div>`);
        };
        });

        if (dateFound == false){
            $("#output").html("No villagers found. :(");
        }
    };
}); //document ready
