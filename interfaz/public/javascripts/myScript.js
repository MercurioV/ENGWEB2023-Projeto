$(function () {
    $("#formButton").click(function() {
        $("#form").toggle()
      })
})

function myFunction() {
  if( $('.input-search').offsetWidth > 0 || $('.input-search').offsetHeight > 0){
    $.get('http://localhost:3000/api/rutes/search/'+$('.input-search').val(),function(data){
      $.get('http://localhost:7777/'+data._id)
    })
  }
}