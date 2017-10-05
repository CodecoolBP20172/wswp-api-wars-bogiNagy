//get the data
$(function(){
    var $items = $('#items');
    $.ajax({
       type: 'GET',
       url: 'https://swapi.co/api/planets/',
       success: function(items) {
           $.each(items.results, function(i, item){
            $items.append('<tr><td>' + item.name + '</td>' +
                          '<td>' + item.diameter + '</td>' +
                          '<td>' + item.climate + '</td>' +
                          '<td>' + item.terrain + '</td>' +
                          '<td>' + item.surface_water + '</td>' +
                          '<td>' + item.population + '</td>' +
                          '<td>' + item.residents + '</td></tr>'
                         );
           })
       }
    });
    var i = 1;
        $('#next').on('click', function(){
            i++;
            listObj.show(i, 10); 
        })

        $('#prev').on('click', function(){
            i--;
            listObj.show(i, 10); 
        })
});
//next-prev button
