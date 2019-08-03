$(document).on('keypress','.formWA input, .formWA textarea', function() {
    if (event.keyCode === 13) {
        $(this).parents(".formWA").find('.submit').trigger('click');
    }
});

$('.formWA .wajib').each(function() {
    title = $(this).attr('placeholder');
    label = $(this).parents('label');
    $('<span class="validasi"><b>' + title + '</b> (dibutuhkan)</span>').appendTo(label);
});

$(document).on('keyup','.formWA .wajib', function() {
    if ($(this).val() != '') {
        $(this).removeClass('focus');
        $(this).parents('label').find('.validasi').removeClass('show');
    }
});

$(document).on('change','.formWA select', function() {
    $(this).removeClass('focus');
    $(this).parents('label').find('.validasi').removeClass('show');
});

$(document).on('change','#pulsaSeluler .layanan', function() {
    if ($('#pulsaSeluler .layanan').val() == 'Token Listrik') {
        $('#pulsaSeluler .token').addClass('wajib');
        $('#pulsaSeluler .telepon').removeClass('wajib');
        $('#pulsaSeluler .token').parents('.item').show();
        $('#pulsaSeluler .telepon').parents('.item').hide();
    } else {
        $('#pulsaSeluler .telepon').addClass('wajib');
        $('#pulsaSeluler .token').removeClass('wajib');
        $('#pulsaSeluler .telepon').parents('.item').show();
        $('#pulsaSeluler .token').parents('.item').hide();
    }
});

$(document).on('click','.formWA .submit', function(){
    kirimWA($(this).parents('.poptamv').attr('id'));
    return false;
});

function kirimWA(id) {

    var validasi = true;

    $('#'+id+' .wajib').each(function() {
        if ($.trim($(this).val()) == '' || $.trim($(this).val()) == 'default') {
            $(this).addClass('focus');
        }
    });
    $('#'+id+' .wajib').each(function() {

        if ($.trim($(this).val()) == '') {

            validasi = false;

            $(this).parents('label').find('.validasi').addClass('show');
            $(this).focus();
            return false;
        } else if ($.trim($(this).val()) == 'default') {

            validasi = false;

            $(this).parents('label').find('.validasi').addClass('show');
            return false;
        }
    });

    if (validasi === true) {

        var parameter = '';
        var url_wa = 'https://web.whatsapp.com/send';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            url_wa = 'whatsapp://send';
        }

        if (id === 'whatsapp') {

                
            var kode_area = 62,
            nomor_whatsapp = 895423492481;

            var nomor = $('#'+id+' .nomor').val();
                if(nomor != '') {
                    nomor_whatsapp = nomor;
                }

        	var nama_admin = '',
        		pesan_salam = 'Halo',
                judul = $('#'+id+' .title-content').text(),
                nama = $('#'+id+' .nama').val(),
                email = $('#'+id+' .email').val(),
                pesan = $('#'+id+' .pesan').val();

            var parameter = url_wa + '?phone=' + kode_area + nomor_whatsapp + '&text=' +
                pesan_salam + ' ' + nama_admin + '.. ' +
                'saya *' + nama + '*, ingin *' + judul + '*.' +
                '💬 ' + pesan + '%0A%0A' +
                'E-mail: ' + email + '%0A' +
                'via ' + location.href;

        } else if (id === 'pilihJasa') {

            var kode_area = 62,
            nomor_whatsapp = 895423492481;

            var nomor = $('#'+id+' .nomor').val();
                if(nomor != null) {
                    nomor_whatsapp = nomor;
                }

            var nama_admin = '',
                pesan_salam = 'Halo',
                judul = $('#'+id+' .title-content').text(),
                jenis = $('#'+id+' .jenis').val(),
                nama = $('#'+id+' .nama').val(),
                email = $('#'+id+' .email').val();

            var parameter = url_wa + '?phone=' + kode_area + nomor_whatsapp + '&text=' +
                pesan_salam + ' ' + nama_admin + '.. ' +
                'saya *' + nama + '*, mohon penawaran seputar *' + judul + ' - ' + jenis +'*.%0A%0A' +
                'E-mail: *' + email + '*%0A' +
                'via ' + location.href;

        } else {
            alert('id tidak ditemukan');
        }

        // alert(parameter);
        $(this).attr('href', parameter);

        var w = 960,
            h = 540,
            left = Number((screen.width / 2) - (w / 2)),
            tops = Number((screen.height / 2) - (h / 2)),
            popupWindow = window.open(this.href, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
        popupWindow.focus();
        return false;
    }
}
