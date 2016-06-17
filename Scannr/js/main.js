/* global Dom7 */
/* global Framework7 */
/* global OCRAD */
/* global Cropper */
/* global location */


// Initialize app
var myApp = new Framework7();

// Framework7 custom DOM
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});



$$('.pull-to-refresh-content').on('refresh', function(e) {
    location.reload();
});


var cropper;

$$("#img-input").change(function(){
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $$('#temp').attr('src', e.target.result);
            
            cropper = new Cropper($$('#temp')[0]);
        };

        reader.readAsDataURL(this.files[0]);
    }
});



function doneCropping() {
    var myCanvas = cropper.getCroppedCanvas();
    cropper.destory();
    var ctx = myCanvas.getContext('2d');
    
    
    $$('#input').css('display', 'none');
    $$('#output').css('display', 'block');
    
    $$('#result').html('Calculating...');
    
    
    var result = OCRAD(ctx);
    console.log(result);
    
    $$('#result').html(result);
}