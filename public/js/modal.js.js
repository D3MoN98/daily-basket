
/******For SUb Modal Background Opacity and Scroll****/
/*
$( document ).ready(function() {
    $("[data-dismiss='modal'][data-toggle='modal']").click(function() {
    setTimeout(function() {
        $('body').addClass('modal-open');
    }, 1000);
});
});*/

$("[data-dismiss='modal'][data-dismiss='modal']").click(function() {
     $(".close").click(function() {
           $('body').removeClass('for_sub_modal');
    });
    if($('body').hasClass('modal-open')) {
        $('body').addClass('for_sub_modal');
       
    }
});


// Get the modal
var modal1 = document.getElementById('log_in_modal');
var modal2 = document.getElementById('sign_up_modal');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal1) {
    $('body').removeClass('for_sub_modal');
  }
    else if (event.target == modal2) {
        $('body').removeClass('for_sub_modal');
  }
}

/********/
