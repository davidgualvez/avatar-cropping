// Start upload preview image
$(".gambar").attr("src", "/images/default.png");

var $uploadCrop,
tempFilename,
rawImg,
imageId;


function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.upload-demo').addClass('ready');
            $('#cropImagePop').modal('show');
            rawImg = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
    else {
        swal("Sorry - you're browser doesn't support the FileReader API");
    }
}

$uploadCrop = $('#upload-demo').croppie({
    viewport: {
        width: 150,
        height: 150,
        type: 'circle'
    },
    enforceBoundary: false,
    enableExif: true
});

$('#cropImagePop').on('shown.bs.modal', function(){
    // alert('Shown pop');
    $uploadCrop.croppie('bind', {
        url: rawImg
    }).then(function(){
        console.log('jQuery bind complete');
    });
});

$('.item-img').on('change', function () { imageId = $(this).data('id'); tempFilename = $(this).val();

$('#cancelCropBtn').data('id', imageId); readFile(this); });

$('#cropImageBtn').on('click', function (ev) {
    $uploadCrop.croppie('result', {
        type: 'base64',
        format: 'png',
        size: {width: 150, height: 150}
    }).then(function (resp) {
        console.log(resp);
        sendToServer(resp);
        $('#item-img-output').attr('src', resp);
        $('#cropImagePop').modal('hide');
    });
});
// End upload preview image

function sendToServer(image_data){

    var data = {
        image : image_data,
        tag : 'avatar'
    };

    $.ajax({
        type: 'POST',
        url: '/upload',
        //cache: false, 
        dataType: "application/json",
        data: data,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }, 
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data); 
        }
    });
}