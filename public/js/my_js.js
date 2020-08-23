/** ****For Structure Change Mobile Menu 991****** */
if ($(window).width() <= 991) {
    $('#main-wrapper').addClass('menu-toggle');

    $('.hamburger').addClass('is-active');
}
/** ************************************************************************************** */
/** ************************************************************************************** */

/* left Side bar When Click on Deliver Address landing page */
function openNav() {
    document.getElementById('delivery_add').style.width = '37%';

    const mn_wrapper = document.getElementById('main-wrapper');
    mn_wrapper.classList.add('full_body_opacity');
    mn_wrapper.parentElement.classList.add('no_scroll');
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById('delivery_add').style.width = '0';
    const mn_wrapper = document.getElementById('main-wrapper');
    mn_wrapper.classList.remove('full_body_opacity');
    mn_wrapper.parentElement.classList.remove('no_scroll');
}
/** ************************************************************************************** */
/** ************************************************************************************** */

/** ****For SUb Modal Background Opacity and Scroll*** */
$("[data-dismiss='modal']").click(() => {
    $('.close').click(() => {
        $('body').removeClass('for_sub_modal');
    });
    if ($('body').hasClass('modal-open')) {
        $('body').addClass('for_sub_modal');
    }
});
// Get the modal
// When the user clicks anywhere outside of the modal, close it
const modal1 = document.getElementById('log_in_modal');
const modal2 = document.getElementById('sign_up_modal');
window.onclick = function (event) {
    if (event.target == modal1) {
        $('body').removeClass('for_sub_modal');
    } else if (event.target == modal2) {
        $('body').removeClass('for_sub_modal');
    }
};

/** ************************************************************************************** */
/** ************************************************************************************** */

/** ****For East Responsive Tab For Food Page*** */
// if ($('#food_tab').length > 0) {

// }

/** ************************************************************************************** */
/** ************************************************************************************** */

/** ****Qty Plus Minus Js*** */
$('.minus').click(function () {
    const $input = $(this).parent().find('input');
    let count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
});
$('.plus').click(function () {
    const $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
});

/** ************************************************************************************** */
/** ************************************************************************************** */
