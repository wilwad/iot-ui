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
 						 'button':true,
 						 'single':false,
 						 'vibrate': true,
 						 'color': 'blue',
 						 'tip':'Turn lamp 2 ON or OFF',
 						 'control':{'url_on':'', 
 										'url_off':'',
 										'method':'post'
 										}, 
 						 'status':{'url':'',
 									  'method':'post',
 									  'interval':600000
 									 }
  						 },
  						  
					 {'icon':'fa-lightbulb-o fa-2x',
                  'text':'LAMP #1', 
 						'button':true,
 						'single':false,
 						'color': '#848484',
 						'vibrate': false,
 						'spin':false,
 						'tip':'Turn lamp 1 ON or OFF',
 						'control':{'url_on':'', 
 									  'url_off':'',
 									  'method':'post'
 									 }, 
 						'status':{'url':'',
 									 'method':'post',
 									 'interval':600000
 									 }
 						},
 						{
 						 'icon':'fa-lightbulb-o fa-2x',
 						 'text':'LAMP #2', 
 						 'button':true,
 						 'single':false,
 						 'color': '#848484',
 						 'vibrate': false,
 						 'spin':false,
 						 'tip':'Turn lamp 2 ON or OFF',
 						 'control':{'url_on':'', 
 										'url_off':'',
 										'method':'post'
 									  }, 
 						 'status':{'url':'',
 									  'method':'post',
 									  'interval':600000
 									  }
  						 }, 
 						 {'icon':'fa-bell-o fa-2x', 
 							'text':'Door Bell', 
 							'button':true,
 							'single':true,
 							'color': '#848484',
 							'tip':'Ring the bell',
 							'vibrate': false,
 							'spin':false,
 							'control':{'url_on':'', 
 							  		     'url_off':'',
 										  'method':'post'
 										  }, 
 							'status':{'url':'',
 										 'method':'post',
 										 'interval':60000
 										 }
 							}, 									
							{'icon':'fa-road fa-2x', 
							 'text':'Gate', 
							 'button':true,
							 'single':true,
							 'color': '#848484',
							 'vibrate': false,
							 'spin':false,
 							 'control':{'url_on':'http://192.168.8.102/iot/index.php', 
 								         'url_off':'',
 											'data': {'view':'gate','action':'open'},
 											'method':'post'}, 
 							 'status':{'url':'',
 										  'method':'post',
 										  'interval':60000
 										  },
 							 'tip':'Open or close the gate'
 							},	
							{'icon':'fa-sun-o fa-2x', 
							 'text':'Temperature', 
							 'button':false,
							 'single':true,
							 'color': '#F2FF00',
							 'tip':'Get current temperature',
							 'vibrate': false,
							 'spin':true,
 							 'control':{'url_on':'',
 											'url_off':'',
 											'method':'post'
 											}, 
 							 'status':{'url':api_weather_url + api_weather_cityid + "&APPID=" + api_weather_key,
 										  'method':'get',
 										  'interval':600000
 										  } 							 
 							}						
 						];
  
  var panels = "";
  
  $(document).ready(function () {
  
	  for (var idx = 0; idx < controls.length; idx++){
	  		 var script        = "";
	  		 var ctl           = "";
	  		 var color         = controls[idx].color;
	  		 var icon          = controls[idx].icon;
	  	    var text          = controls[idx].text;
	  	    var tip           = controls[idx].tip;
	  	    var button        = controls[idx].button == true;
	  	    var single        = controls[idx].single == true;
	  	    var smart_control = controls[idx].control;
	  	    var smart_status  = controls[idx].status;
	  	    var vibrate       = controls[idx].vibrate == true;
	  	    var spin          = controls[idx].spin    == true;

	  	    var single = single ? "setTimeout(function(){\$('#chk"+idx+"').bootstrapSwitch('state', false, false)}, 1000);" : "";
	  	    var icon = font_awesome(icon, idx, spin, color);
	  	    vibrate = vibrate ? "if (state)vibrate();" : "";
			
			if (button){
				ctl    = "<input type='checkbox' id='chk"+idx+"'><script>$('#chk"+idx+"').bootstrapSwitch();<\/script>";
				script = "<script>$('#chk"+idx+"').on('switchChange.bootstrapSwitch', function(event, state) {$('#icon"+idx+"').css('color', state ? 'red' : '"+color+"');"+single+vibrate+"});<\/script>";
					
			} else {
				if (smart_status){
					var url      = smart_status.url || "";
					var method   = smart_status.method || smart_status.method == 'post' ? 'post' : 'get';
					var interval = smart_status.interval || 60000;
	
					if (url.trim().length){
						script = "<script>function update"+idx+"(){ console.log($('div').length); $.ajax({type:'"+method+"', url: '"+url+"',success: function(data){ var cell = data.list[0].main.temp;cell = cell - 273.15; cell = Math.round(cell); $('#chk"+idx+"').html('<b>'+cell + '&deg;C'+'</b>');setTimeout(update"+idx+", "+interval+");},error: function(a,b,c){setTimeout(update"+idx+", "+interval+");}});} update"+idx+"();<\/script>";
					}
				}
				
				ctl = "<span class='statusinfo' id='chk"+idx+"'><span class='fa fa-spinner fa-spin'></span></span>";
			}
			
			panels += "<div class='panel-default'>" +
	 		             "<div class='panel-body'>" +
	 		               icon + " "+ text +
	 		               "<span class='pull-right' data-toggle='tooltip' title='"+tip+"'>" +
	 		                 ctl +
	 		               "</span>" +
	 		               "<p></p>" +
	 		             "</div>" +
			            "</div>" + script;
	  }  
	  
	 $('#pane').html(panels);  	
  });
  
  // generates the font-awesome span
  function font_awesome(icon, id, spin, color) {
      spin = spin ? ' fa-spin' : '';
 		return "<span class='fa fa-fw " +icon+spin+"' id='icon"+id+"' style='color:"+color+";'></span>";  	
  }
  
  // vibrates the phone
  function vibrate() {
   	if ('vibrate' in navigator){
   		navigator.vibrate(1000);
   	}  	
  }
