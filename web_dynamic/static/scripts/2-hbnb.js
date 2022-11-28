$(document).ready(function () {
    let checkedAmenities = {};
    $(document).on('change', "input[type='checkbox']", function () {
        if (this.checked) {
            checkedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete checkedAmenities[$(this).data('id')];
        }
        let  chk_lst = Object.values(checkedAmenities);
        if (chk_lst.length > 0) {
            $('div.amenities > h4').text(Object.values(checkedAmenities).join(', '));
        } else {
            $('div.amenities > h4').html('&nbsp;');
        }
    });

    $.get('http://0.0.0.0:5001/api/v1/status/', (data, textSt) => {
        if (textSt === 'success' ){
            if (data.status === 'OK') {
                $('div#api_status').addClass('div#api_status');
            } else {
                $('div#api_status').removeClass('div#api_status');
            }
        }
    });
});