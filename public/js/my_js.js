/*****************************************************************************************/
/*****************************************************************************************/

/*Select Custom*/
$("select").each(function() {
    var $this = $(this),
        numberOfOptions = $(this).children("option").length;

    $this.addClass("select-hidden");
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next("div.select-styled");
    $styledSelect.text(
        $this
            .children("option")
            .eq(0)
            .text()
    );

    var $list = $("<ul />", {
        class: "select-options"
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $("<li />", {
            text: $this
                .children("option")
                .eq(i)
                .text(),
            rel: $this
                .children("option")
                .eq(i)
                .val()
        }).appendTo($list);
    }

    var $listItems = $list.children("li");

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $("div.select-styled.active")
            .not(this)
            .each(function() {
                $(this)
                    .removeClass("active")
                    .next("ul.select-options")
                    .hide();
            });
        $(this)
            .toggleClass("active")
            .next("ul.select-options")
            .toggle();
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass("active");
        $this.val($(this).attr("rel"));
        $list.hide();
        //console.log($this.val());
    });

    $(document).click(function() {
        $styledSelect.removeClass("active");
        $list.hide();
    });
});

/*****************************************************************************************/
/*****************************************************************************************/

/******For Structure Change Mobile Menu 991*******/
if ($(window).width() <= 991) {
    $("#main-wrapper").addClass("menu-toggle");

    $(".hamburger").addClass("is-active");
}
/*****************************************************************************************/
/*****************************************************************************************/

/*left Side bar When Click on Deliver Address landing page*/
function openNav() {
    document.getElementById("delivery_add").style.width = "37%";

    var mn_wrapper = document.getElementById("main-wrapper");
    mn_wrapper.classList.add("full_body_opacity");
    mn_wrapper.parentElement.classList.add("no_scroll");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("delivery_add").style.width = "0";
    var mn_wrapper = document.getElementById("main-wrapper");
    mn_wrapper.classList.remove("full_body_opacity");
    mn_wrapper.parentElement.classList.remove("no_scroll");
}
/*****************************************************************************************/
/*****************************************************************************************/

/******For SUb Modal Background Opacity and Scroll****/
$("[data-dismiss='modal']").click(function() {
    $(".close").click(function() {
        $("body").removeClass("for_sub_modal");
    });
    if ($("body").hasClass("modal-open")) {
        $("body").addClass("for_sub_modal");
    }
});
// Get the modal
// When the user clicks anywhere outside of the modal, close it
var modal1 = document.getElementById("log_in_modal");
var modal2 = document.getElementById("sign_up_modal");
window.onclick = function(event) {
    if (event.target == modal1) {
        $("body").removeClass("for_sub_modal");
    } else if (event.target == modal2) {
        $("body").removeClass("for_sub_modal");
    }
};

/*****************************************************************************************/
/*****************************************************************************************/

/*****************************************************************************************/
/*****************************************************************************************/

/******For East Responsive Tab For Food Page****/
$("#food_tab").easyResponsiveTabs({
    type: "default", //Types: default, vertical, accordion
    width: "auto", //auto or any width like 600px
    fit: true, // 100% fit in a container
    closed: "accordion", // Start closed if in accordion view
    activate: function(event) {
        // Callback function if tab is switched
        var $tab = $(this);
        var $info = $("#tabInfo");
        var $name = $("span", $info);
        $name.text($tab.text());
        $info.show();
    }
});

/*****************************************************************************************/
/*****************************************************************************************/

/******For East Responsive Tab For Food Page****/

/*****************************************************************************************/
/*****************************************************************************************/

// $("#tableParentTab").easyResponsiveTabs({
//     type: "default", //Types: default, vertical, accordion
//     width: "auto", //auto or any width like 600px
//     fit: true, // 100% fit in a container
//     closed: "accordion", // Start closed if in accordion view
//     tabidentify: "tab_identifier_parent",
//     activate: function(event) {
//         // Callback function if tab is switched
//         var $tab = $(this);
//         var $info = $("#nested-tabInfo");
//         var $name = $("span", $info);
//         $name.text($tab.text());
//         $info.show();
//     }
// });
//child tab
// $("#tableChildTab").easyResponsiveTabs({
//     type: "default",
//     width: "auto",
//     fit: true,
//     closed: "accordion",
//     tabidentify: "tab_identifier_child" // The tab groups identifier
// });

// //child2 tab
// $("#tableChildTab2").easyResponsiveTabs({
//     type: "default",
//     width: "auto",
//     fit: true,
//     closed: "accordion",
//     tabidentify: "tab_identifier_child2" // The tab groups identifier
// });

/*****************************************************************************************/
/*****************************************************************************************/

/******Qty Plus Minus Js****/
// $(".minus").click(function() {
//     var $input = $(this)
//         .parent()
//         .find("input");
//     var count = parseInt($input.val()) - 1;
//     count = count < 1 ? 1 : count;
//     $input.val(count);
//     $input.change();
//     return false;
// });
// $(".plus").click(function() {
//     var $input = $(this)
//         .parent()
//         .find("input");
//     $input.val(parseInt($input.val()) + 1);
//     $input.change();
//     return false;
// });

/*****************************************************************************************/
/*****************************************************************************************/

/*Data Table Common*/
// $('#myTable').DataTable( {
//     autoFill: true
// });
// $('#individuals_current').DataTable( {
//     autoFill: true
// });
// $('#individuals_past').DataTable( {
//     autoFill: true
// });

// $('#subc_current').DataTable( {
//     autoFill: true
// });
// $('#subc_past').DataTable( {
//     autoFill: true
// });
// $('#subc_future').DataTable( {
//     autoFill: true
// });
