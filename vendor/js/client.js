var socket = io.connect(window.location.host);
var textarea = $('textarea');

function initTextArea () {
    document.getElementById('markdown').addEventListener('keyup', function(event) {
        socket.emit('change', {before: textarea.val()});
    }, false)
}

socket.on('change', function(data){
        textarea.val(data.before);
        $('#preview').html(data.after);
});


function initPrint () {
  var button = document.getElementById('print');
  button.addEventListener('click', function(event) {
    socket.emit('change', {before: textarea.val()});
    window.print();
  });
}

function initReset () {
  var button = document.getElementById('reset');
  button.addEventListener('click', function(event) {
    textarea.val('');
    socket.emit('change', {before: textarea.val()});
  });
}


function init() {
  $.getJSON('/data', function (data) {
      if (data != null){
        textarea.val(data.before);
        $('#preview').html(data.after);
      }
  });
  initTextArea();
  initPrint();
  initReset();
}