$(document).ready(function() {
  $.ajax({
    url: 'api/data', // Url of the method
    method: 'GET', // method of the Url
    success: function(data){ // Clean the List || return the data's in parameter data
      $('#dataList').empty();

      data.forEach(function(row){
        $('#dataList').append('<tr><td>' + row.cod_user + '</td> <td>' + row.username + '</td> <td>Password: ' + row.password + '</td></tr>');
      });
      },
      error:function(){
        console.log('Error in get data from server');
      }
  })
});