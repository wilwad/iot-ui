 // Sample IoT UI 
 // Requires Bootstrap/ Bootstrap switch / Jquery / Font awesome
 // Originally PHP
 //
 // William Sengdara
 // November 01, 2016

 // Using weather API 
 var api_weather_url     = "http://api.openweathermap.org/data/2.5/forecast/city?id=";
 var api_weather_key     = "062aae0b997f7a626359bd1df49b0d55";
 var api_weather_cityid  = "3352136"; // Windhoek, Namibia
 							
 // define our controls
 var controls = [
				{'icon':'fa-tv fa-2x',
				'text':'TV (Samsung)', 
				'type':'button',
				'deviceid': 'samsung1',
				'single':false,
				'vibrate': true,
				'color': 'blue',
				'tip':'Turn Samsung TV ON or OFF',
				'onchange':{'url':'http://localhost/iot/device-api.php',
								'data': {'deviceid': '0x0', 'state': '0x0'}, 
								'method':'post'
						}, 
		  'status':{'url':'',
					'method':'post',
					'interval':600000 }
		     },
		     {'icon':'fa-lightbulb-o fa-2x',
			'text':'LAMP #1', 
			'type':'range',
			'deviceid': 'lamp1',
      'min': 0,
      'max':10,
      'default':5,
      'step':1,
			'single':false,
			'color': '#848484',
			'vibrate': true,
			'tip':'Turn lamp 1 ON or OFF',
				'onchange':{'url':'http://localhost/iot/device-api.php',
						'data': {'deviceid': '0x0', 'state': '0x0'}, 
						'method':'post'
						}, 
						'status':{'url':'',
						'method':'post',
						'interval':600000}
		        },
                     {'icon':'fa-video-camera fa-2x',
                        'text':'Video #1',
                        'type':'popup',
                        'deviceid': 'video1',
                        'single':true,
                        'color': '#848484',
                        'vibrate': true,
                        'tip':'Open video feed',
                                'onchange':{'url':'http://localhost/iot/device-api.php',
                                                'data': {'deviceid': '0x0', 'state': '0x0'},
                                                'method':'post'
                                                },
                                'status':{'url':'',
                                                'method':'post',
                                                'interval':600000}
                        },
		     {'icon':'fa-bell-o fa-2x',
			'text':'Ring bell', 
			'type':'button',
			'deviceid': 'bell1',
			'single':true,
			'color': '#848484',
			'vibrate': true,
			'tip':'Ring the bell',
				'onchange':{'url':'http://localhost/iot/device-api.php',
						'data': {'deviceid': '0x0', 'state': '0x0'}, 
						'method':'post'
						}, 
						'status':{'url':'',
						'method':'post',
						'interval':600000}
		        },		        
		     {'icon':'fa-road fa-2x',
			'text':'Open gate', 
			'type':'button',
			'deviceid': 'gate1',
			'single':true,
			'color': '#848484',
			'vibrate': true,
			'tip':'Open/close the gate',
				'onchange':{'url':'http://localhost/iot/device-api.php',
						'data': {'deviceid': '0x0', 'state': '0x0'}, 
						'method':'post'
						}, 
						'status':{'url':'',
						'method':'post',
						'interval':600000}
		        },		        
 						{
 						 'icon':'fa-sun-o fa-2x fa-spin',
 						 'text':'Temperature', 
 						 'type':'span',
 						 'deviceid': 'temp1',
 						 'single':false,
 						 'color': '#ffbf59',
 						 'vibrate': false,
 						 'tip':'Turn lamp 2 ON or OFF',
						'onchange':{'url':'',
										'data': {'deviceid': '', 'state': ''},
										'method':'post'
 									  }, 
 							 'status':{'url':api_weather_url + api_weather_cityid + "&APPID=" + api_weather_key,
 										  'method':'get',
 										  'interval':600000
 										  } 	
  						 }		
 		];
  
  var panels = "";
  var datas = [];
  
  $(document).ready(function () {
  
	  for (var idx = 0; idx < controls.length; idx++){
	  	    var script        = "";
	  	    var ctl           = "";
	  	    var color         = controls[idx].color;
	  	  	 var icon          = controls[idx].icon;
	  	    var text          = controls[idx].text;
	  	    var tip           = controls[idx].tip;
		    
	  	    var type      	 = controls[idx].type; // new
	  	    var deviceid	    = controls[idx].deviceid || 'undefined'; // new
		    var min        	 = controls[idx].min; //new
		    var max        	 = controls[idx].max; // new
		    var original    	 = controls[idx].default; // new
		    
	  	    var single        = controls[idx].single == true;
	  	    var onchange      = controls[idx].onchange;
	  	    var data          = onchange.data || null;
	  	    
	  	    if (onchange.data){
	  	    	// deviceid is fixed, only state is variable
	  	    	data.deviceid = deviceid;
	  	    	datas.push(data);
	  	    }
	  	    
	  	    var vibrate       = controls[idx].vibrate == true;
			 var status        = controls[idx].status;
			 
			 var onchange_url      = "";
			 var onchange_method   = 'post';
			 var onchange_interval = 60000;

			 var status_url      = "";
			 var status_method   = 'post';
			 var status_interval = 60000;
			 
 			 if (onchange){
			 	onchange_url      = onchange.url || "";
				onchange_method   = onchange.method || onchange.method == 'post' ? 'post' : 'get';
				onchange_interval = onchange.interval || 60000;
			 }
			 				
 			 if (status){
			 	status_url      = status.url || "";
				status_method   = status.method || status.method == 'post' ? 'post' : 'get';
				status_interval = status.interval || 60000;
			 }
			
	  	    var single = single ? "setTimeout(function(){\$('#chk"+idx+"').bootstrapSwitch('state', false, false)}, 1000);" : "";
	  	    var icon = font_awesome(icon, idx, color);
	  	    vibrate = vibrate ? "vibrate();" : "";
			
		    switch (type){
		       case 'button':
					ctl    = "<input type='checkbox' id='chk"+idx+"'><script>$('#chk"+idx+"').bootstrapSwitch();<\/script>";
					
					console.log('url',onchange_url.trim().length);
					
					if (onchange_url.trim().length){
						script = "$('#chk"+idx+"').on('switchChange.bootstrapSwitch', function(event, state) { console.log('state change',state); onchange"+idx+"(state); $('#icon"+idx+"').css('color', state ? 'red' : '"+color+"');"+single+vibrate+";});";
						script += "function onchange"+idx+"(state){ var url='"+onchange_url+"'; var data = datas["+idx+"]; /* substitute */ data.state = state;  console.log('onchange',data, url); $.ajax({type:'"+onchange_method+"',data: data, url: url, success: function(data){console.log('ajax',data); },error: function(xhr,b,text){ console.error('ajax error',xhr.statusText);} });}";
					} else {
						script = "$('#chk"+idx+"').on('switchChange.bootstrapSwitch', function(event, state) { console.log('state change',state); $('#icon"+idx+"').css('color', state ? 'red' : '"+color+"');"+single+vibrate+";});";
					}
			     break;
			     
		       case 'range':
					ctl    = "<input type='range' id='chk"+idx+"' min='"+min+"' max='"+max+"' value='"+original+"'><script><\/script>";
					
					if (onchange_url.trim().length){
					}
					else {
						script = "$('#chk"+idx+"').on('change mousemove', function() {var val=$(this).val(); console.log('range',val); $('#icon"+idx+"').css('color',val>0?'red':'"+color+"');}); /* trigger with current val */ $('#chk"+idx+"').trigger('change');";
						script += "function onchange"+idx+"(state){ var data = datas["+idx+"]; /* substitute */ data.state = state;  $.ajax({type:'"+method+"',data: data, url: '"+url+"',success: function(data){ },error: function(a,b,c){} });}";
					}		       
		         break;
			     
		       case 'span':
		           /* spans are for info */
					if (status_url.trim().length){
						script = "function update"+idx+"(){ console.log($('div').length); $.ajax({type:'"+status_method+"', url: '"+status_url+"',success: function(data){ var cell = data.list[0].main.temp;cell = cell - 273.15; cell = Math.round(cell); $('#chk"+idx+"').html('<b>'+cell + '&deg;C'+'</b>');setTimeout(update"+idx+", "+status_interval+");},error: function(a,b,c){setTimeout(update"+idx+", "+status_interval+");}});} update"+idx+"();";
					}

				ctl = "<span class='statusinfo' id='chk"+idx+"'><span class='fa fa-spinner fa-spin'></span></span>";
		         break;
			 
		       original:
		         break;
		    }
			panels += "<div class='panel-original'>" +
	 		             "<div class='panel-body'>" +
	 		               icon + " "+ text +
	 		               "<span class='pull-right' data-toggle='tooltip' title='"+tip+"'>" +
	 		                 ctl +
	 		               "</span>" +
	 		               "<p></p>" +
	 		             "</div>" +
			            "</div>" + 
                                    "<script>" + 
                                      script +
                                    "</script>";
	  }  
	  
	 $('#pane').html(panels);  	
  });
  
  // generates the font-awesome span
  function font_awesome(icon, id, color) {
 		return "<span class='fa fa-fw " +icon+"' id='icon"+id+"' style='color:"+color+";'></span>";  	
  }
  
  // vibrates the phone
  function vibrate() {
   	if ('vibrate' in navigator){
   		navigator.vibrate(1000);
   	}  	
  }
