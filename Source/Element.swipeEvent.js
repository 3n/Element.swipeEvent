/*
--- 
provides: 
- Element.swipeEvent
license: MIT-style
requires: 
  core/1.2.3: 
  - Element.Event
description: Adds element.addEvent('swipe', fn). fn is passed information about the swipe location and direction.
authors: 
- 3n
...
*/

['touchstart', 'touchmove', 'touchend'].each(function(type){
  Element.NativeEvents[type] = 2;
});

Element.Events.swipe = {
  onAdd: function(fn){
    var startX, startY, active = false;

    var touchStart = function(event){
      active = true;
      startX = event.event.touches[0].pageX;
      startY = event.event.touches[0].pageY;
    };
    var touchMove = function(event){
      var endX   = event.event.touches[0].pageX,
          endY   = event.event.touches[0].pageY,          
          diff   = endX - startX,
          isLeftSwipe = diff < -1 * Element.Events.swipe.swipeWidth,
          isRightSwipe = diff > Element.Events.swipe.swipeWidth;

      if (active && (isRightSwipe || isLeftSwipe)          
          && (event.onlySwipeLeft ? isLeftSwipe : true)
          && (event.onlySwipeRight ? isRightSwipe : true) ){
        active = false;
        fn.call(this, {
          'direction' : isRightSwipe ? 'right' : 'left', 
          'startX'    : startX,
          'endX'      : endX
        });
      }
      
      if (Element.Events.swipe.cancelVertical
          && Math.abs(startY - endY) < Math.abs(startX - endX)){
        return false;
      }
    }

    this.addEvent('touchstart', touchStart);    
    this.addEvent('touchmove', touchMove);
    
    var swipeAddedEvents = {};
    swipeAddedEvents[fn] = {
      'touchstart' : touchStart,
      'touchmove'  : touchMove
    };
    this.store('swipeAddedEvents', swipeAddedEvents);
  },
  
  onRemove: function(fn){
    $H(this.retrieve('swipeAddedEvents')[fn]).each(function(v,k){
      this.removeEvent(k,v);
    }, this);
  }
};

Element.Events.swipe.swipeWidth = 70;
Element.Events.swipe.cancelVertical = true;
