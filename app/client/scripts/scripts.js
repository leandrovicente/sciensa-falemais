var hostname = window.location.hostname;
var protocol = window.location.protocol;

$('form').submit(function(){

  if($('#from').val() !== '' && $('#to').val() !== '' &&  $('#plan').val() !== '' &&  $('#minutes').val()){
    $.ajax({
      url: protocol + '//' + hostname + ':3001/calc',
      type:'GET',
      data: $('form').serialize(),
      success: function(data){
          $('#messages').append(
            createDiv($('#from').val(), $('#to').val(),
                      $('#plan option:selected').text(), $('#minutes').val(),
                      data.withPlan, data.withoutPlan, formatDate(new Date()))
          );
      }
    });
  }

  return false;

});

function formatDate(date){
  Number.prototype.padLeft = function(base,chr){
     var  len = (String(base || 10).length - String(this).length)+1;
     return len > 0? new Array(len).join(chr || '0')+this : this;
  };
  var d = new Date(date),
        dformat = [ (d.getMonth()+1).padLeft(),
                    d.getDate().padLeft(),
                    d.getFullYear()].join('/')+
                    ' ' +
                  [ d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');
  return dformat;
}


function createDiv(from, to, plan, min, withPlan, withoutPlan){
  return (
    '<div class="row row-no-padding alert alert-' + colors(parseFloat(withPlan.replace('$ ', '')), parseFloat(withoutPlan.replace('$ ', ''))) + '" role="alert">' +
      '<div class="row row-no-padding">' +
        '<div class="div-xsmall">DDD de Origem</div> ' +
        '<div class="div-xsmall">DDD de Destino</div> ' +
        '<div class="div-xsmall">Minutos</div> ' +
        '<div class="div-small">Plano FaleMais</div> ' +
        '<div class="div-small">Com Plano FaleMais</div> ' +
        '<div class="div-small">Sem Plano FaleMais</div> ' +
      '</div>' +
      '<div class="row row-no-padding">' +
        '<div class="div-xsmall"><strong>' + from + '</strong></div> ' +
        '<div class="div-xsmall"><strong>' + to + '</strong></div> ' +
        '<div class="div-xsmall"><strong>' + min + '</strong></div> ' +
        '<div class="div-small"><strong>' + plan + '</strong></div> ' +
        '<div class="div-small"><strong>' + withPlan + '</strong></div> ' +
        '<div class="div-small"><strong>' + withoutPlan + '</strong></div> ' +
      '</div>' +
    '</div>'
  );
}

function colors(withPlan, withoutPlan){
  if(withPlan < withoutPlan){
    return 'success';
  } else if(withPlan > withoutPlan){
    return 'warning';  
  } else if(withPlan === withoutPlan){
    return 'info';
  } else {
    return 'danger';
  }
}

function sigin(){
  $('.error').hide();
  var email = $('#email').val();
  if(validateEmail(email)){
    $.cookie('user-chat', email);
    $('#name-user').html($.cookie('user-chat'));
    $('.login').hide(function(){
      $('.chat').show();
    });
  } else {
    $('.error').show();
  }
}

$('#btnEmail').click(function(){
  sigin();
});

$('.exit').click(function(){
  $.removeCookie('user-chat');
  $('.chat').hide(function(){
    $('.login').show();
  });
});

$(document).ready(function() {

  if($.cookie('user-chat')){
    $('#name-user').html($.cookie('user-chat'));
    $('.chat').show();
  } else {
    $('.login').show();
  }

  $('#email').keyup(function(event){
      if(event.keyCode == 13){
          sigin();
      }
  });

});

function getUser(){
  return $.cookie('user-chat');
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
