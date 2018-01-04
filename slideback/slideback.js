/*! Slideback v0.0.1 | (c) Richard Liu | MIT License */

/*
    BUGS:
    - works on fullscreen ios, but not on normal
    
    FEATURES:
    - swipe forwards
*/

// (function(window, document) {
    var listenToTouch = false;
    var xStart = -1;
    var yStart = -1;
    
    
    var options = {
        SWIPE_TO_ID: 'swipe-to',
        SWIPE_FROM_ID: 'swipe-from',
        swipeCompleted: function() {
            document.getElementById(options.SWIPE_TO_ID).classList.remove('transition');
            document.getElementById(options.SWIPE_FROM_ID).classList.remove('transition');
            
            window.history.back();
        }
    };
    
    
    
    window.Slideback = function(userOptions) {
        // init options
        for (var option in userOptions) {
            if (userOptions.hasOwnProperty(option) && options[option] !== undefined) {
                options[option] = userOptions[option];
            }
        }
        
        bindEventHandlers();
    };
    
    
    function bindEventHandlers() {
        // remove event handlers
        window.removeEventListener('touchstart', touchstart);
        window.removeEventListener('touchmove', touchmove);
        window.removeEventListener('touchend', touchend);
        
        // add event handlers
        window.addEventListener('touchstart', touchstart);
        window.addEventListener('touchmove', touchmove);
        window.addEventListener('touchend', touchend);
    }
    
    
    
    function touchstart(e) {
        var x = e.changedTouches[0].clientX;
        console.log(e.changedTouches[0].clientX);
        xStart = x;
        yStart = e.changedTouches[0].clientY;
        console.log('start');
        
        touchmove(e);
    }
    
    
    function touchmove(e) {
        var x = e.changedTouches[0].clientX;
        var xDelta = x - xStart;
        var yDelta = e.changedTouches[0].clientY - yStart;
        
        // if this touch event slide to go back and listening to touch and diagnal of right triangle is greater than 40px
        if (xStart < 10 && xDelta > yDelta && Math.sqrt(xDelta * xDelta + yDelta * yDelta) > 15) {
            console.log('start touchmove');
            listenToTouch = true;
            
            // reset
            xStart = -1;
            yStart = -1;
        }
        
        if (listenToTouch) {
            document.getElementById('xr-span').innerHTML = x / window.innerWidth;
            moveContent(x);
        }
    }
    
    
    function touchend(e) {
        if (!listenToTouch) return;
        
        // reset
        console.log('done!');
        listenToTouch = false; 
        
        // half way
        if (e.changedTouches[0].clientX / window.innerWidth > 0.5) {
            moveContent(window.innerWidth);
        } else {
            moveContent(0);
        }
        
        document.getElementById(options.SWIPE_TO_ID).classList.add('transition');
        document.getElementById(options.SWIPE_FROM_ID).classList.add('transition');
        // reset swipe-to
        setTimeout(function() {
            options.swipeCompleted();
        }, 300);
    }
    
    
    function moveContent(x) {
        var ele = document.getElementById(options.SWIPE_TO_ID).style;
        var ele2 = document.getElementById(options.SWIPE_FROM_ID).style
        // add webkitTransform msTransform mozTransform oTransform
        ele2.transform
            = ele2.webkitTransform
            = ele2.mozTransform
            = ele2.msTransform
            = ele2.oTransform
            = ele.transform
            = ele.webkitTransform
            = ele.mozTransform
            = ele.msTransform
            = ele.oTransform
            = 'translate3d(' + x + 'px, 0px, 0px)';
        
        console.log('moving content to ' + x);
    }
// }(window, document));