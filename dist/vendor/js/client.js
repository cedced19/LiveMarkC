var socket = io.connect(window.location.host);
var $textarea = $('textarea'); // jQuery
var textarea = document.getElementById('markdown'); // JavaScript

function initTextArea () {
    textarea.addEventListener('keyup', function(event) {
        socket.emit('change', {before: $textarea.val()});
    }, false)
}

socket.on('change', function(data){
        var start = getPositionStart(),
        end = getPositionEnd();
        $textarea.val(data.before);
        setPosition(start, end);
        $('#preview').html(data.after);
});


function initPrint () {
  var button = document.getElementById('print');
  button.addEventListener('click', function(event) {
    socket.emit('change', {before: $textarea.val()});
    window.print();
  });
}

function initReset () {
  var button = document.getElementById('reset');
  button.addEventListener('click', function(event) {
    $textarea.val('');
    socket.emit('change', {before: textarea.val()});
  });
}

function getPositionStart () {
  if ( typeof textarea.selectionStart != 'undefined' ){
    return textarea.selectionStart;
  }
  // IE Support
  textarea.focus();
  var range = textarea.createTextRange();
  range.moveToBookmark(document.selection.createRange().getBookmark());
  range.moveEnd('character', textarea.value.length);
  return textarea.value.length - range.text.length;
}

function getPositionEnd () {
  if ( typeof textarea.selectionEnd != 'undefined' ){
    return textarea.selectionEnd;
  }
  // IE Support
  textarea.focus();
  var range = textarea.createTextRange();
  range.moveToBookmark(document.selection.createRange().getBookmark());
  range.moveStart('character', - textarea.value.length);
  return range.text.length;
}

function setPosition (end, start) {
  end = end || start;   textarea.focus();
    if (textarea.setSelectionRange){
      textarea.setSelectionRange(start, end);
    } else if (document.selection) {
      var range = textarea.createTextRange();
      range.moveStart('character', start);
      range.moveEnd('character', - textarea.value.length + end);
      range.select();
    }
}


function init() {
  $.getJSON('/data', function (data) {
      if (data != null){
        $textarea.val(data.before);
        $('#preview').html(data.after);
      }
  });
  initTextArea();
  initPrint();
  initReset();
}