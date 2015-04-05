$(document).ready(function() {
  var socket = io.connect(window.location.host),
      $textarea = $('#markdown'),
      textarea = document.getElementById('markdown');

  $.getJSON('/api/', function (data) {
      if (data !== null) {
        $textarea.val(data.before);
        $('#preview').html(data.after);
      }
  });

  $('#print').click(function () {
    socket.emit('change', {before: $textarea.val()});
    window.print();
  });

  $('#math').click(function () {
    socket.emit('katex', {before: $textarea.val()});
  });

  $textarea.keyup(function () {
    socket.emit('change', {before: $textarea.val()});
  });

  socket.on('change', function (data){
        var positions = {
          start: getPositionStart(),
          end: getPositionEnd()
        };
        $textarea.val(data.before);
        setPosition(positions.start, positions.end);
        $('#preview').html(data.after);
  });

  var getPositionStart = function () {
    if ( typeof textarea.selectionStart != 'undefined' ){
      return textarea.selectionStart;
    }
    // IE Support
    textarea.focus();
    var range = textarea.createTextRange();
    range.moveToBookmark(document.selection.createRange().getBookmark());
    range.moveEnd('character', textarea.value.length);
    return textarea.value.length - range.text.length;
  };

  var getPositionEnd = function (input) {
    if (typeof textarea.selectionEnd != 'undefined'){
      return textarea.selectionEnd;
    }
    // IE Support
    textarea.focus();
    var range = textarea.createTextRange();
    range.moveToBookmark(document.selection.createRange().getBookmark());
    range.moveStart('character', - textarea.value.length);
    return range.text.length;
  };

  var setPosition = function (end, start) {
    end = end || start;   textarea.focus();
      if (textarea.setSelectionRange){
        textarea.setSelectionRange(start, end);
      } else if (document.selection) {
        var range = textarea.createTextRange();
        range.moveStart('character', start);
        range.moveEnd('character', - textarea.value.length + end);
        range.select();
      }
  };

});
