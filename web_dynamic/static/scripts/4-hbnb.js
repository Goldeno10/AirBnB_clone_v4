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

    fetchPlaces();
    filterPlaces();
});

function fetchPlaces() {
    $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    dataType: 'json',
    data: JSON.stringify({}),
    success: (response) => {
        for (const r of response) {
        const article = ['<article>',
            '<div class="title_box">',
        `<h2>${r.name}</h2>`,
        `<div class="price_by_night">$${r.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${r.description}`,
        '</div>',
        '</article>'];
        $('SECTION.places').append(article.join(''));
        }
    },
    error: function (error) {
        console.log(error);
    }
    });
}

function filterPlaces() {
    $('.filters > button').click(function () {
        $('.places > article').remove();
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            data: JSON.stringify({'amenities': Object.keys(checkedAmenities)}),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    let place = data[i];
                    // const places = []; 
                    $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
                }
            }
        });
    });
}