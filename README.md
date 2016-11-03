UI for IoT (Work in progress)

Uses Bootstrap / JQuery / Font Awesome to create controls in HTML

Purpose
Define controls and their functions for IoT devices (not implemented)

Defining a control
This is what I came up with, you may add more to it:

{'icon':'fa-tv fa-2x', /* a font awesome icon */
 'text':'TV (Samsung)', 
 'button':true, /* is this a button or a span in which to write something */
 'single':false, /* click once and reset or hold e.g. Push-and-release or just a toggle button? */
 'vibrate': true, /* invoke phone vibrate onClick */
 'color': 'blue', /* default color when not clicked */
 'tip':'Turn lamp 2 ON or OFF', /* tooltip text */
 'control':{'url_on':'',  /* e.g. http://serverip:port/devs/toaster.php?on=1 */
	    'url_off':'', /* e.g. http://serverip:port/devs/toaster.php?on=0 */
	    'method':'post',
            'arguments': '' /* e.g. on=this.val */
           	}, 
 'status':{'url':'', /* reads the status of the device on load/reset e.g. http://serverip:port/devs/toaster.php?q=status*/
					'method':'post',
					'interval':600000
 			   }
		 },

Future
Use OpenWRT on my TP-Link MR3020 to actually control something with this UI :)

Foreward
Download and test, then extend - use for your own project

