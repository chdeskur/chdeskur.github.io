$(function() {
    $('.calculate-score').on('click', function() {
      $('#results').prepend("Your Score:");
      $('#number').append($('.checkboxes input:checkbox:checked').length);
      $('p').empty();
      var table = document.getElementById('table');
      table.parentNode.removeChild(table);
    });
    $('.uncheck-all').on('click', function() {
      $('.checkboxes input:checkbox').prop('checked', false);
    });
  });