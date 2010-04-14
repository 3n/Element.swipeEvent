Element.swipeEvent
================

Adds the 'swipe' event to Element.Events. This means you can do this:
	
	my_element.addEvent('swipe', fn);

How to use
----------
	
Add and remove the event as you would normally. The event will only fire under these conditions: 
	
1. The user starts his touch inside of the element and moves horizontally in either direction for 70 pixels (configurable).

You can configure the following properties by assigning a value to them in your script:

	Element.Events.swipe.swipeWidth // default is 70
	Element.Events.swipe.cancelVertical // default is true