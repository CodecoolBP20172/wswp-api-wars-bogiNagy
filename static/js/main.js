$(function(){
    var $items = $('#items');
    var $pagecount = 1;
        //fill the table  
        //handle no data, create button 
        function residentHandler(resident) {
        if (resident.length === 0) {
            return 'No known resident'
        } else {
            return '<button type="button" class="btn btn-secondary residentbutton" data-residents="' + resident + '" >' + resident.length + ' resident(s)</button>'
        }};

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
                            '<td>' + residentHandler(item.residents) + '</td></tr>'
                            );
           });
        },
        error: function(){
                alert('error loading planets');
        }
        });
    $("#next, #previous").click(function() {
        $pagecount = ($(this).attr('id')=='next') ? $pagecount + 1 : $pagecount - 1;
        if ($pagecount === 0) {
            $pagecount = 1;
        } else if ($pagecount === 8){
            $pagecount = 7;
        }
    });
    },
        //handle no data, create button 
        function residentHandler(resident) {
        if (resident.length === 0) {
            return 'No known resident'
        } else {
            return '<button type="button" class="btn btn-secondary residentbutton" data-residents="' + resident + '" >' + resident.length + ' resident(s)</button>'
        }
    });
    
    