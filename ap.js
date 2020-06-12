var g = Gonzalo$("John", "Doe");
g.greet().setLang('es').greet(true); //POR ESO SON CHAINABLE

g.setLang('es').greet(); //POR ESO SON CHAINABLE

$('#login').on(' click', function(){

    var loginGrtr = Gonzalo$('Gonzalo', 'De Genaro');

    $('#logindiv').hide();

    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).logFunction();
});




