$(document).ready(function () {
    var btn = document.getElementById('btn1');
    var name = $("#input1").val();
    var name = $("#input2").val();
    var name = $("#input3").val();
    var name = $("#input4").val();


    function showError() {
        console.log("error input");
        if (name == '' || name == undefined || name == null) {
            $("#input1").css('borderColor', 'red'); 
            $("#input2").css('borderColor', 'red'); 
            $("#input3").css('borderColor', 'red'); 
            $("#input4").css('borderColor', 'red'); 

        } else {
            $("#input1").css('borderColor', ''); 
            $("#input2").css('borderColor', ''); 
            $("#input3").css('borderColor', ''); 
            $("#input4").css('borderColor', ''); 


        };
    }

    btn.onclick = showError;

});