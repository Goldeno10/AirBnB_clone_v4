$(document).ready(() => {
    checkedAmenities = {};
    let check_box =  $('input[type="checkbox"]')
    check_box.on('change', function() {
        if (this.checked) {
            [$(this).data('id')] = $(this).data('name');
        } else {
            delete checkedAmenities[$(this).data('id')];
        }
        let lst = Object.values(checkedAmenities);
        if (lst.length > 0) {
            $('div.amenities > h4').text(Object.values(checkedAmenities).join(', '));
        } else {
            $('div.amenities > h4').html('&nbsp;');
        }
    });
})