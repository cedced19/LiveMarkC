var socket = io.connect(window.location.host);
var textarea = $('textarea');

function initTextArea () {
    document.getElementById('markdown').addEventListener('keyup', function(event) {
        socket.emit('change', {txt: textarea.val()});
    }, false)
}

socket.on('change', function(data){
        textarea.val(data.txt);
        $('#preview').html(data.md);
});


function initPrint () {
  var button = document.getElementById('print');
  button.addEventListener('click', function(event) {
    socket.emit('change', {txt: textarea.val()});
    window.print();
  });
}

function initReset () {
  var button = document.getElementById('reset');
  button.addEventListener('click', function(event) {
    textarea.val('');
    socket.emit('change', {txt: textarea.val()});
  });
}


function init() {
  $.getJSON('/data', function (data) {
      if (typeof(data) != "undefined"){
        textarea.val(data.txt);
        $('#preview').html(data.md);
      }
  });
  initTextArea();
  initPrint();
  initReset();
}