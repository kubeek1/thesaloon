import $ from 'jquery';

$(document).ready(function(){
    $('li:not(.dropdown)>a, a.dropdown-item').click(function(){
        $('#navbarCollapse').collapse('hide');
    });

});

$(document.body).tooltip( { selector: "[title]" , trigger: 'hover', delay: {show: 200, hide: 100}});

$(document).click(function () {
    $('.tooltip').tooltip('hide');
    $('[title]').tooltip();
});
