/*Custom Search header*/
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const expand = () => {
  searchBtn.classList.toggle("close");
  input.classList.toggle("square");
};
searchBtn.addEventListener("click", expand);
/*End Custom Search header*/


/******For Structure Change Mobile Menu 991*******/
if($(window).width() <= 991){
 $('#main-wrapper').addClass("menu-toggle");

$(".hamburger").addClass("is-active");
}
/**/

/*left Side bar When Click on Deliver Address landing page*/
function openNav() {
  document.getElementById("delivery_add").style.width = "37%";
    
   var mn_wrapper=document.getElementById("main-wrapper");
   mn_wrapper.classList.add("full_body_opacity");
   mn_wrapper.parentElement.classList.add("no_scroll");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("delivery_add").style.width = "0";
    var mn_wrapper=document.getElementById("main-wrapper");
    mn_wrapper.classList.remove("full_body_opacity");
    mn_wrapper.parentElement.classList.remove("no_scroll");
}

/***/
