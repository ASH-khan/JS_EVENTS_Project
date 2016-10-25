// custome code vanilla js to handle cross browser event handling

// lets define an object EventUtil
var EventUtil = {

    addHandler : function(element, type, handler) {
        if(element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent(type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    getEvent: function(event) {
        return event? event: window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    preventDefault: function(event) {
        if(event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    getoffsetx: function(event){
        return event.offsetX || event.layerX;
    },
    getoffsety: function(event) {
        return event.offsetY || event.layerY;
    },
    removeHandler : function(element, type, handler) {
        if(element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent(type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    stopPropagation: function(event) {
        if(event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};

// lets start our js for the draganddrop using yahoo style self excuting funtion which is also called protected funtion.

var dragndrop = (function (){
    var myX = '';
    var myY = '';
    var whichArt = '';

    function resetZ() {
        var myElement = document.querySelectorAll("img");
        for(var i = myElement.length - 1; i >= 0; i--) {
            myElement[i].style.zIndex = 5;
        }
    };

    function moveStart(event) {
        whichArt = event.target;
        console.log(event);
        var offsetX = EventUtil.getoffsetx(event);
        var offsetY = EventUtil.getoffsety(event);
        myX = offsetX;
        myY = offsetY;
        resetZ();
        whichArt.style.zIndex = 10;
    };

    function moveDragOver(event) {
        EventUtil.preventDefault(event);

    };

    function moveDrop(event) {
        EventUtil.preventDefault(event);
        whichArt.style.left = event.pageX - myX + 'px';
        whichArt.style.top = event.pageY - myY + 'px';
    };

    function touchStart(event) {
        EventUtil.preventDefault(event);
        var whichArt = event.target;
        var touch = event.touches[0];
        var moveoffsetX = whichArt.offsetLeft - touch.pageX;
        var moveoffsetY = whichArt.offsetTop - touch.pageY;

        resetZ();
        whichArt.style.zIndex = 10;

        whichArt.addEventListener('touchmove', function(e) {
            var positionX = touch.pageX + moveoffsetX;
            var positionY = touch.pageY + moveoffsetY;

            whichArt.style.left = positionX + 'px';
            whichArt.style.top = positionY + 'px';
        }, false);

    };

    var body = document.querySelector("body");
    EventUtil.addHandler(body, 'dragstart', moveStart);
    EventUtil.addHandler(body, 'dragover', moveDragOver);
    EventUtil.addHandler(body, 'drop', moveDrop);

    EventUtil.addHandler(body, 'touchstart', touchStart);
})();