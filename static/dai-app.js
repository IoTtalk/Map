$(function(){
            
            window.mac = null;
            window.id = null;

            $('#dog').hide();
            var startPos;
            var map_init_geoOptions = {
               timeout: 10 * 1000
            }

            var map_init_geoSuccess = function(position) {
              console.log('geoSuccess map_init');
              var geolocation_init = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              map_init(geolocation_init);
              hash_tag_check();
              query_string_check();
            };
            var map_init_geoError = function(error) {
              var geolocation_init = { lat:24.7895711, lng:120.9967021};
              console.log('Error occurred. Error code: ' + error.code);
              map_init(geolocation_init);
              hash_tag_check();
              query_string_check();
              // error.code can be:
              //   0: unknown error
              //   1: permission denied
              //   2: position unavailable (error response from location provider)
              //   3: timed out
            };

            navigator.geolocation.getCurrentPosition(map_init_geoSuccess, map_init_geoError, map_init_geoOptions);


        // $('#function_list').hide();
        // $('#Video-Display').hide();

        // while(true)
        // {
        //   var pwd = prompt("Please input password");
        //   if(pwd == null) return;
        //   if(pwd == "pcs54784")
        //   {
        //       $('#function_list').show();
        //       $('#Video-Display').show();
        //       break;
        //   } 
        //   else
        //   {

        //     toast("Wrong password!\nPlease try again.");

        //   }            
        // }
      function map_init(geolocation_init)
      {
        console.log('map_init');
        var map;        
        function initialize_map() {
          // Create an array of styles.
          var styles = 
          [
              {
                  "featureType": "water",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#d3d3d3"
                      }
                  ]
              },
              {
                  "featureType": "transit",
                  "stylers": [
                      {
                          "color": "#808080"
                      },
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#b3b3b3"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#ffffff"
                      },
                      // {
                      //     "weight": 7
                      // }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "color": "#d7d7d7"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#ebebeb"
                      }
                  ]
              },
              {
                  "featureType": "administrative",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#a7a7a7"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#efefef"
                      }
                  ]
              },
              {
                  "featureType": "road",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "color": "#696969"
                      }
                  ]
              },
              {
                  "featureType": "administrative",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#737373"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "labels.icon",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "labels",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "color": "#d6d6d6"
                      }
                  ]
              },
              {
                  "featureType": "road",
                  "elementType": "labels.icon",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {},
              {
                  "featureType": "poi",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#dadada"
                      }
                  ]
              }
          ];
          

          // Create a new StyledMapType object, passing it the array of styles,
          // as well as the name to be displayed on the map type control.
          var styledMap = new google.maps.StyledMapType(styles,
            {name: "Styled Map"});      
          // Create a map object, and include the MapTypeId to add
          // to the map type control.
          var mapOptions = {
            disableDefaultUI: true,
            zoom: 17,
            zoomControl: true,
            scaleControl: true,
            scrollwheel: true,
            center: geolocation_init,//new google.maps.LatLng(24.7895711, 120.9967021),
            gestureHandling: 'greedy',
            mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
          };
          map = new google.maps.Map(document.getElementById('Location-map'), mapOptions);
          //console.log($("#Location-map").height());
          //Associate the styled map with the MapTypeId and set it to display.
          map.mapTypes.set('map_style', styledMap);
          map.setMapTypeId('map_style');
          
          //click(map);
        }

        initialize_map();           
        
        /**************************************************************************************/
        /**************************************************************************************/
        var markers=[];  //store the fixed marker
        var markers_sensor=[[],[]]; //store all the markers
        
        var Latitude = -1;  // store the newest lat from sensor
        var Longitude = -1; // store the newest lng from sensor
        var val;  //store the newest val from sensor
        
        var lastLat=0; 
        var lastLng=0;
        
        var polyCoordinates = []; //store the newest polyline      
        var polyLines = [[],[]]; //store all the visible polylines
        var limit=3;  // the number of lines that we want to remain on the map
        
        var status=[0,0,0,0,0,0]; //status of buttons  
        
        var counterIDs = [0, 0]; // the number of marker
        
        var flag_op=0;
        var flag=0; // 1 : data come in for the first time --> show the dynamic marker 
        var flag_camera=0; // 1 : someone click the camera button , so ignore the triggers from makers who near the camera
        var change = document.getElementById("button_s1");
        
        // var camera1 = {lat:24.789655 , lng:120.997031};
        // var camera2 = {lat:24.788225 , lng:120.998487};  
        /**************************************************************************************/
        /**************************************************************************************/
        
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var icons = {
            parking: {
                icon: iconBase + 'parking_lot_maps.png'
            },
            obstacle: {
                icon: 'https://maps.google.com/mapfiles/kml/pal3/icon33.png'
            },
            info: {
                icon: iconBase + 'info-i_maps.png'
            },
            camera: {
                icon: 'https://i.imgur.com/Eh9U0qI.png'
            },
            dog1: {
                icon: 'http://maps.google.com/mapfiles/kml/paddle/blu-circle.png'
            },
            dog2: {
                icon: 'http://maps.google.com/mapfiles/kml/paddle/blu-stars.png'
            },
            cat1: {
                icon: 'http://maps.google.com/mapfiles/kml/paddle/purple-circle.png'
            },
            cat2: {
                icon: 'http://maps.google.com/mapfiles/kml/paddle/purple-stars.png'
            }
        };
        /*var features = [
            {
                position: new google.maps.LatLng(24.789655, 120.997031),
                type: 'camera',
                content: 'close'
            },{
                position: new google.maps.LatLng(24.788225, 120.998487),
                type: 'camera',
                content: 'close'
            },{
                position: new google.maps.LatLng(24.788312, 120.997101),
                type: 'obstacle',
                content: 'close'
            },{
                position: new google.maps.LatLng(24.789491, 120.995709),
                type: 'obstacle',
                content: 'close'
            },{
                position: new google.maps.LatLng(24.787957, 120.998568),
                type: 'obstacle',
                content: 'close'
            },{
                position: new google.maps.LatLng(24.789076, 120.998096),
                type: 'obstacle',
                content: 'close'
            },{
                position: new google.maps.LatLng(24.789627, 120.994984),
                type: 'obstacle',
                content: 'close'
            },{
                position: new google.maps.LatLng(24.787800, 120.998509),
                type: 'obstacle',
                content: 'close'
            }/*,{
                position: new google.maps.LatLng(24.7887725, 120.9951233333334),
                type: 'dog1'
            },{
                position: new google.maps.LatLng(24.7878311, 120.9943021),
                type: 'dog2'
            },{
                position: new google.maps.LatLng(24.7879711, 120.9931021),
                type: 'cat1'
            },{
                position: new google.maps.LatLng(24.7876111, 120.9913021),
                type: 'cat2'
            },
        ];*/
        
        var features;
        var infowindow;

        function reinitIframe() {         
           var iframe = document.getElementById("Video-Display");                
         try 
        {                          
                           var bwidth = iframe.contentWindow.document.body.scrollwidth; 
                           var bHeight = iframe.contentWindow.document.body.scrollHeight;              
        /*       
                           var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;              
                           var height = Math.max(bHeight, dHeight);                          
                            iframe.height = height;                */                         
                           
                           iframe.width = bwidth;   
                           iframe.height = bHeight;                  
        } 
                  catch (ex) { }                 
        }
        

        function toast(y) {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");

        // Add the "show" class to DIV
        x.className = "show";
        x.innerHTML = y;
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }

        var marker_listener = [];
        var t_load;
        timedCount();
        function timedCount() {
            clearTimeout(t_load);
            load_markers();
            t_load = setTimeout(function(){
                timedCount();
            },43200000);
        }
        
        function load_markers()
        {
          console.log(marker_listener);
          if(marker_listener.length > 0)
          {
            
            for (var i = 0; i < markers.length; i++) {
              // console.log("markers remove");
              markers[i].setMap(null);
            }

            markers = [];

            for(var i=0; i<marker_listener.length; i++)
            {
              // console.log("marker_listener remove");
              google.maps.event.removeListener(marker_listener[i]);
            }
            marker_listener = [];
          }

          $.getJSON($SCRIPT_ROOT + '/secure/_take_markers', function(data) {
              features = data.result.map(function(object) {return  {
                id: object.id,
                position: new google.maps.LatLng(object.lat, object.lon),
                type: object.type,
                content: decodeURIComponent(object.content)
                }
              })
            // Create markers.
            features.forEach(function(feature) {
                var marker = new google.maps.Marker({
                    position: feature.position,
                    icon: icons[feature.type].icon,
                    map: map,
                    title: feature.type,
                    content:feature.content,
                    id: feature.id,
                    //visible: false
                });
                markers.push(marker);

                var marker_listen = marker.addListener('click', function() {
                  resetCenter();
                  function resetCenter(){
                      //console.log($("#Location-map").height());
                      var high = $("#Location-map").height();
                      var high_cam = $("#Video-Display").height();
                      var bounds = map.getBounds();
                      var ne = bounds.getNorthEast(); // LatLng of the north-east corner
                      var sw = bounds.getSouthWest(); // LatLng of the south-west corder
                      var LatLng = marker.getPosition();
                      var percent = ((high-high_cam)/2)/high;
                      var cen = sw.lat() + (ne.lat()-sw.lat())*percent;
                      var latlng = new google.maps.LatLng({lat: map.getCenter().lat()-(cen-LatLng.lat()), lng:LatLng.lng()});
                      map.setCenter(latlng);
                    }
                    //google.maps.event.addListener(map, 'zoom_changed', function() {resetCenter();});

                    if(marker.title == 'camera'){
                          
                          // if(infowindow != null) {infowindow.close();}
                          // infowindow = new google.maps.InfoWindow({
                          //   content: '<button type="submit" id="camera_info" value='+marker.id+'>修改</button><button type="submit" id="camera_del" value='+marker.id+'>刪除</button>'
                          // });

                          // //infowindow.setContent('<button onclick="myFunction()">修改</button>');
                          // infowindow.open(map, marker);

                          if(flag_camera == 1) //if the camera is already open , close it
                          {
                                // $('#function_but').show(); 
                                
                                //marker.content ='close';
                                // $('#Video-Display').attr('src', '');
                                flag_camera = 0;
                                //$('#Video-Display').css({"z-index": -10});
                                // $('#Video-Display').hide();
                                // $('#fuck_off').hide();
                                $('#Video-Display').attr('src', marker.content);
                                //$('#Video-Display').css({"z-index": 10});
                                $('#Video-Display').show();
                                $('#fuck_off').show();
                          }
                          else
                          {
                                
                                // $('#function_but').hide();
                                // $('.button_sm').hide(); 
                                $('#Video-Display').attr('src', marker.content);
                                //$('#Video-Display').css({"z-index": 10});
                                $('#Video-Display').show();
                                $('#fuck_off').show();
                                flag_camera = 1;
                                // if(marker.position == features[0].position)
                                // {
                                    // $('#Video-Display').attr('src', 'http://admin:5131339@140.113.124.220/GetData.cgi?CH=1');
                                    //marker.content ='close';
                                    
                                //     markers.forEach(function(M) {
                                //         if(M.position != features[0].position && M.title == 'camera')
                                //         M.content = 'close';
                                //     });
                                // }
                                // else if(marker.position == features[1].position)
                                // {

                                //        //toast(marker.position[1] + new google.maps.LatLng(24.789655, 120.997031));

                                //     $('#Video-Display').attr('src', "https://www.youtube.com/embed/35FSJVS77Fw" );
                                //     $('#Video-Display').css({"z-index": 10});
                                //     $('#fuck_off').show();                                    
                                //     markers.forEach(function(M) {
                                //         if(M.position != features[1].position && M.title == 'camera')
                                //         M.content = 'close';
                                //     });
                                // }
                                // marker.content ='open';
                                
                                //console.log(latlng);
                                
                          }
                      } 

                      if(marker.title == 'obstacle'){
                         if(infowindow != null) {infowindow.close();}
                          infowindow = new google.maps.InfoWindow({
                            content: marker.content //+'</br><button type="submit" id="obstacle_info" value='+marker.id+'>修改</button><button type="submit" id="obstacle_del" value='+marker.id+'>刪除</button>'
                          });

                          //infowindow.setContent('<button onclick="myFunction()">修改</button>');
                          infowindow.open(map, marker);
                      } 
                });
                marker_listener.push(marker_listen);
            
            });
          markers.forEach(function(marker) { marker.setMap(map); });
        });  
        }

            $(document).on('click', '#obstacle_info', function(){            
                      //var marker_id = $(this).val();
                      var marker_id = $(this).val();
                      var new_info = prompt("Enter new information:");
                      $.getJSON($SCRIPT_ROOT + '/secure/_modify_markers',{
                          id: marker_id,
                          content: new_info
                        }, function(data) {
                        
                        for (var i = 0; i < markers.length; i++) {
                            if (markers[i].id == marker_id) {
                                infowindow.setContent(new_info +'</br><button type="submit" id="obstacle_info" value='+marker_id+'>修改</button><button type="submit" id="obstacle_del" value='+marker_id+'>刪除</button>');
                                infowindow.open(map, markers[i]);//console.log(data.result);
                                markers[i].content = new_info;
                            }
                        }
                      });
                            
            });

            $(document).on('click', '#camera_info', function(){            
                      //var marker_id = $(this).val();
                      var marker_id = $(this).val();
                      var new_info = prompt("Enter new information:");
                      $.getJSON($SCRIPT_ROOT + '/secure/_modify_markers',{
                          id: marker_id,
                          content: new_info
                        }, function(data) {
                        
                        for (var i = 0; i < markers.length; i++) {
                            if (markers[i].id == marker_id) {
                                infowindow.setContent('<button type="submit" id="obstacle_info" value='+marker_id+'>修改</button><button type="submit" id="obstacle_del" value='+marker_id+'>刪除</button>');
                                infowindow.open(map, markers[i]);//console.log(data.result);
                                markers[i].content = new_info;
                            }
                        }
                      });
                            
            });

            $(document).on('click', '#obstacle_del', function(){            

                      //toast($(this).val());

                      var marker_id = $(this).val();
                      console.log(marker_id);
                      $.getJSON($SCRIPT_ROOT + '/secure/_del_markers',{
                          id: marker_id
                        }, function(data) {
                        //console.log(data.result);
                        //Find and remove the marker from the Array
                        for (var i = 0; i < markers.length; i++) {
                            if (markers[i].id == marker_id) {
                                //Remove the marker from Map  
                                //console.log(markers[i].id);                
                                markers[i].setMap(null);console.log(markers[i].id);
                                //Remove the marker from array.
                                markers.splice(i, 1);
                            }
                        }

                      });
                        
            });

            $(document).on('click', '#camera_del', function(){            

                      //toast($(this).val());

                      var marker_id = $(this).val();
                      console.log(marker_id);
                      $.getJSON($SCRIPT_ROOT + '/secure/_del_markers',{
                          id: marker_id
                        }, function(data) {
                        //console.log(data.result);
                        //Find and remove the marker from the Array
                        for (var i = 0; i < markers.length; i++) {
                            if (markers[i].id == marker_id) {
                                //Remove the marker from Map                  
                                markers[i].setMap(null);console.log(markers[i].id);
                                //Remove the marker from array.
                                markers.splice(i, 1);
                                $('#Video-Display').attr('src', '');
                                flag_camera = 0;
                                // $('#Video-Display').css({"z-index": -10});
                                $('#Video-Display').hide();
                                $('#fuck_off').hide();
                            }
                        }

                      });
                        
            });


        


        
       
        $('#button_d1').hide();  // we dont show this button initially        
        $('#fuck_off').hide();
        
        status[0]=1;
        status[1]=1; // i should set obstacle to this flag but i mess up haha (目前無用)
        status[2]=1;
        status[3]=1;
        status[4]=0;
        
        
        $(document).on('click', '#fuck_off', function(){
           // $('#Video-Display').attr('src', '');
           // $('#Video-Display').css({"z-index": -10});
           cam_src = undefined;
           $('#Video-Display').attr('src', $('#Video-Display').attr('src'));
           $('#Video-Display').hide();
           $('#highchart').hide();
           $('#fuck_off').hide();
           
        });
        
        // $(document).on('click', '#button_s1', function(){            
        //     if(status[0] == 1)
        //     {                
        //         change.innerHTML = "全選";
        //         //$(this).css({"opacity": 1});
        //         status[0]=0;
        //         status[2]=0;
        //         status[3]=0;
        //         //$('#button_s2').css({"opacity": 0.5});
        //         //$('#button_s3').css({"opacity": 0.5});
        //         markers.forEach(function(marker) {
        //                marker.setVisible(false);
        //        });

        //         /*for(i = 0; i < infowindowArr.length; i++)
        //                 infowindowArr[i].close();*/

                
        //     }
        //     else
        //     {
        //         change.innerHTML = "取消";
        //         //$(this).css({"opacity": 0.5});
        //         status[0] = 1;
        //         //$('#button_s2').css({"opacity": 1});
        //         //$('#button_s3').css({"opacity": 1});
        //         //$('#button_d1').css({"opacity": 1});
        //         status[2]=0;
        //         status[3]=0;
        //         //status[4]=1;
           
        //         markers.forEach(function(marker) {
        //                 marker.setVisible(true);
        //         });
           
        //         /*markers_sensor.forEach(function(arr) {
        //              HideAllMarkers(arr);
        //        });*/
        //     }
                  
        // });
       
        $(document).on('click', '#button_s2', function(){
           if(status[2] == 1)
           {
               status[2]=0;
               $(this).removeClass('active');               
               markers.forEach(function(marker) {
                   if(marker.title == 'obstacle')
                       marker.setVisible(false);
               });
              infowindow.close();
           }
           else
           {
               status[2]=1;              
               $(this).addClass('active');              
               markers.forEach(function(marker) {
                   if(marker.title == 'obstacle')
                        marker.setVisible(true);                                        
               });
               
           }
        });
       
        $(document).on('click', '#button_s3', function(){
           if(status[3] == 1)
           {
               $('#Video-Display').hide();
               $('#fuck_off').hide();
               // $('#Video-Display').css({"z-index": -10});
               markers.forEach(function(marker) {
                   if(marker.title == 'camera')
                       marker.setVisible(false);
               });
               $('#button_s3').removeClass('active')
               status[3]=0;
               // $(this).css({"opacity": 0.5});
               $('#Video-Display').attr('src', '');
               status[0]=0;
           }
           else
           {
              $('#button_s3').addClass('active')
              status[3]=1;                   
              markers.forEach(function(marker) {
                   if(marker.title == 'camera')
                       marker.setVisible(true);
              });
           }
        });
        

        var flightPath;
        var flag_history = 0;
        var his_markers = [];
//         $(document).on('click', '#button_s4', function(){
          
//           if (flag_history == 0)
//           {
//             $.getJSON($SCRIPT_ROOT + '/secure/history',{
//                 dog_id: 0
//               }, function(data) {
//                 //console.log(data.result);
//                 flightPlanCoordinates = data.result.map(function(dog) {return  {lat:dog.lat, lng:dog.lon}; })
//                 //$("#result").text(courseStr);
//                 console.log(flightPlanCoordinates);

//                 var StartPosition = flightPlanCoordinates[0];
//                 addMarker_Start(StartPosition);
//                   //setMapOnAll(map);

//                 function addMarker_Start(location) {
//                   var marker = new google.maps.Marker({
//                     position: location,
//                     //label: "起點",
//                     map: map,
//                     icon: "/static/img/history_start_icon.png"
//                   });
//                   //markers.push(marker);
//                   console.log(marker);
//                   his_markers.push(marker);
//                 }

//                 var EndPosition = flightPlanCoordinates[flightPlanCoordinates.length - 1];
//                 addMarker_End(EndPosition);
//                   //setMapOnAll(map);

//                 function addMarker_End(location) {
//                   var marker = new google.maps.Marker({
//                     position: location,
//                     //label: "終點",
//                     map: map,
//                     icon: '/static/img/history_end_icon.png'
//                   });
//                   //markers.push(marker);
//                   console.log(marker);
//                   his_markers.push(marker);
//                 }

//                 var lineSymbol = {
//                       path: google.maps.SymbolPath.CIRCLE,
//                       scale: 10,
//                       strokeWeight:7,
//                 };

//                 flightPath = new google.maps.Polyline({
//                 path: flightPlanCoordinates,
//                 icons: [{
//                   icon: lineSymbol,
//                   offset: '100%'
//                 }],
//                 geodesic: true,
//                 strokeColor: '#FF0000',
//                 strokeOpacity: 0.5,
//                 strokeWeight: 2,
//                 //map: map
//                 });

//                 animateCircle(flightPath);

//                 flightPath.setMap(map);

//                 function animateCircle(line) {
//                   // console.log("animateCircle comein");
//                   var count = 0;
//                   window.setInterval(function() {
//                     count = (count + 1) % 200;

//                     var icons = line.get('icons');
//                     icons[0].offset = (count / 2) + '%';
//                     line.set('icons', icons);
//                 }, 50);
//               }

//               flag_history = 1;

//             });

//           }
//           if (flag_history == 1)
//           {
//             console.log(flightPath);
//             //stopArrow(flightPath);
//             //clearMarkers();
//             flightPath.setMap(null);
//             for(var i=0; i<his_markers.length; i++)
//             {
//                 his_markers[i].setMap(null);
//             }
//             his_markers = [];
//             flag_history = 0;
// /*
//             function stopArrow(line) {
//                 clearInterval(line.handle);
//                 line.setOptions({
//                     icons: null});
//             };*/
//           }

//         });

        var directionsDisplay;
        var directionsService;
        var haight, routing_locate_now,count;//origin: (24.7882499,121.01580720000001)(24.782146, 120.997231)(24.7872622,120.9979454)
        var oceanBeach; //= new google.maps.LatLng(24.7852481, 120.9979445);
        var listener_routing, listener_routing2;

        var flag_route = 0;
        var flightPath_routing;
        var marker_routing, marker_routing2;
        var marker_routing_now;
        var placeSearch, placeSearch2, autocomplete, autocomplete2;
        $(document).on('click', '#button_route', function(){
          if (flag_route == 0){
            if(listener_routing2 != undefined) google.maps.event.removeListener(listener_routing2);
            if(listener_routing != undefined) google.maps.event.removeListener(listener_routing);
            flag_route = 1;
            flag_routing = 0;
            $('#input_destination').show();
            $('#autocomplete').val('');
            $('#autocomplete2').val('');
            // document.getElementById("button_route").innerHTML="結束規劃";
            load_markers();
            $("#text").html('End Routing');
            $('#button_route').addClass('active');
            initAutocomplete();
            geolocate();
            
            var componentForm = {
              street_number: 'short_name',
              route: 'long_name',
              locality: 'long_name',
              administrative_area_level_1: 'short_name',
              country: 'long_name',
              postal_code: 'short_name'
            };
            function initAutocomplete() {

              // Create the autocomplete object, restricting the search to geographical
              // location types.
              autocomplete = new google.maps.places.Autocomplete(
                  /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
                  {types: []});
              autocomplete2 = new google.maps.places.Autocomplete(
                  /** @type {!HTMLInputElement} */(document.getElementById('autocomplete2')),
                  {types: []});
              // When the user selects an address from the dropdown, populate the address
              // fields in the form.
              autocomplete.addListener('place_changed', function(){
                placeSearch = autocomplete.getPlace();
              });
              autocomplete2.addListener('place_changed', function(){
                placeSearch2 = autocomplete2.getPlace();
              });
            }
  
            // Bias the autocomplete object to the user's geographical location,
            // as supplied by the browser's 'navigator.geolocation' object.
            function geolocate() {
              // if (navigator.geolocation) {

              //   navigator.geolocation.getCurrentPosition(function(position) {
              //     var geolocation = {
              //       lat: position.coords.latitude,
              //       lng: position.coords.longitude
              //     };
              //     console.log("有進來");
              //     console.log(geolocation);
                  var circle = new google.maps.Circle({
                    center: geolocation_init,
                    radius: 500
                  });
                  autocomplete.setBounds(circle.getBounds());
                  autocomplete2.setBounds(circle.getBounds());
              //   });
              // }
            }
          }
          else{   //flag_route == 1
            flag_route = 0;
            flag_routing = 1;
            if(flightPath_routing != null) 
            {
              flightPath_routing.setMap(null);
              flightPath_routing = null;
            }
            console.log(flightPath_routing);
            if(marker_routing != null){
              marker_routing.setMap(null);
              marker_routing = null;
              google.maps.event.removeListener(listener_routing);
            }
            if(marker_routing2 != null){
              marker_routing2.setMap(null);
              marker_routing2 = null;
              google.maps.event.removeListener(listener_routing2);
            }

            if(marker_routing_now != null) marker_routing_now.setMap(null);
            $('#input_destination').hide();
            // str1 = '<li role="presentation" id="button_route" style="cursor:pointer"><a>路徑規劃</a></li>';
            // $("#button_route").html(str1);
            $("#text").html('Routing');
            $('#button_route').removeClass('active');
          }
        });


        var flag_routing = 0;

        $("#autocomplete").focus(function(){
            console.log("autocomplete focus in");
            if(listener_routing2 != undefined) google.maps.event.removeListener(listener_routing2);
            if(listener_routing != undefined) google.maps.event.removeListener(listener_routing);
            listener_routing = google.maps.event.addListener(map, 'click', function(event) {
              oceanBeach = event.latLng;
              //console.log(oceanBeach);
              if(marker_routing != null) marker_routing.setMap(null);
              marker_routing = new google.maps.Marker({
              position:oceanBeach,
              label: "終點",
              map: map
            });
            marker_routing.addListener('click', function() {
              marker_routing.setMap(null);
              $('#autocomplete').val('');
            });
            // var service = new google.maps.places.PlacesService(map);
            // service.nearbySearch({
            //   location: oceanBeach,
            //   radius: 50,
            //   type: []
            // }, callback);
            // function callback(results, status) {
            //   if (status === google.maps.places.PlacesServiceStatus.OK) {
            //     for (var i = 0; i < results.length; i++) {
            //       console.log(results[i].name);
            //     }
            //   }
            // }
            $('#autocomplete').val("(" + oceanBeach.lat().toFixed(8)+ ", " +oceanBeach.lng().toFixed(8) + ")");//oceanBeach
            // $('#autocomplete').val(oceanBeach);
          });
        });

        $("#autocomplete2").focus(function(){
            console.log("autocomplete2 focus in");
            if(listener_routing != undefined) google.maps.event.removeListener(listener_routing);
            if(listener_routing2 != undefined) google.maps.event.removeListener(listener_routing2);
            listener_routing2 = google.maps.event.addListener(map, 'click', function(event) {
              haight = event.latLng;
              //console.log(oceanBeach);
              if(marker_routing2 != null) marker_routing2.setMap(null);
              marker_routing2 = new google.maps.Marker({
              position:haight,
              label: "起點",
              map: map
            });
            marker_routing2.addListener('click', function() {
              marker_routing2.setMap(null);
              $('#autocomplete2').val('');
            });
            // var service = new google.maps.places.PlacesService(map);
            // service.nearbySearch({
            //   location: oceanBeach,
            //   radius: 50,
            //   type: []
            // }, callback);
            // function callback(results, status) {
            //   if (status === google.maps.places.PlacesServiceStatus.OK) {
            //     for (var i = 0; i < results.length; i++) {
            //       console.log(results[i].name);
            //     }
            //   }
            // }
            $('#autocomplete2').val("(" + haight.lat().toFixed(8)+ ", " +haight.lng().toFixed(8) + ")");//"(" + haight.lat().toFixed(2)+ ", " +haight.lng().toFixed(2) + ")"
            // $('#autocomplete2').val(haight);
          });
        });

        function getLocation(callback) {
                var startPos;
                var geoOptions = {
                  enableHighAccuracy: true
                }

                var geoSuccess = function(position) {
                  var lat = position.coords.latitude;//24.789189;
                  var lng = position.coords.longitude;//120.999858;

                  var CurrentPosition = {lat: lat, lng: lng};  //交大校門24.789189, 120.999858

                  if(callback && typeof(callback) === "function")
                    callback(CurrentPosition);
                };
                var geoError = function(error) {
                  alert("Please open your GPS.");
                  $('#autocomplete2').attr("placeholder", "Choose starting point");
                  console.log('Error occurred. Error code: ' + error.code);
                  // $('#autocomplete').attr("placeholder", "選擇起點");
                  // error.code can be:
                  //   0: unknown error
                  //   1: permission denied
                  //   2: position unavailable (error response from location provider)
                  //   3: timed out
                };

                navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
        };

        $(document).on('click', '#get_current_location_btn', function(){
            if(window.trackingCoord != null){
              console.log("get_current_location_btn", "trackingCoord");
              map.setCenter(window.trackingCoord);
            }
            else{
              console.log("get_current_location_btn", "CurrentPosition");
              getLocation(addMarker_routing);
              marker_routing_now_timeout();
            }
        });

        //map center change
        map.addListener('dragend', function() {
          console.log('dragend');
        });

        //zoom in, zoom out
        map.addListener('idle', function() {
          console.log('idle');
        });

        function marker_routing_now_timeout() {
            setTimeout(function(){
              if(marker_routing_now != null) marker_routing_now.setMap(null);
            }, 10000);
        }


        function addMarker_routing(location) {
          console.log(location);
          map.setCenter(location);
          if(marker_routing_now != null) marker_routing_now.setMap(null);
          marker_routing_now = new google.maps.Marker({
            position: location,
            label: "現在位置",
            map: map,
          });

          haight = new google.maps.LatLng(location.lat,location.lng);
          routing_locate_now = haight;
        }

        $(document).on('click', '#button_route', function(){
          if (flag_routing == 0)
          {
              flag_routing = 1;
              getLocation(addMarker_routing);
              
          }
        });

        directionsService = new google.maps.DirectionsService();
        function initialize() {
          directionsDisplay = new google.maps.DirectionsRenderer();
          directionsDisplay.setMap(map);
        }

        function sleep(milliseconds) {
          var start = new Date().getTime();
          for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
              break;
            }
          }
        } 

        function setRoutePoint()
        {
          if($('#autocomplete').val()[0].localeCompare('(') != 0)
          {
            oceanBeach = $('#autocomplete').val();
            console.log(oceanBeach);
            if(marker_routing != null) marker_routing.setMap(null);
            marker_routing = new google.maps.Marker({
            position:placeSearch.geometry.location,
            label: "終點",
            map: map
            });
          }

          console.log($('#autocomplete2').val()[0]);

          if($('#autocomplete2').val()[0] == undefined || $('#autocomplete2').val()[0].localeCompare('(') != 0)
          {
            console.log("autocomplete2 in");
            if($('#autocomplete2').val().length == 0)
            {
              if(marker_routing2 != null) marker_routing2.setMap(null);
              //haight = new google.maps.LatLng(lat,lng);
              haight = routing_locate_now;
            }
            else
            {
              haight = $('#autocomplete2').val();
              console.log(haight);
              if(marker_routing_now != null) marker_routing_now.setMap(null);
              if(marker_routing2 != null) marker_routing2.setMap(null);
              marker_routing2 = new google.maps.Marker({
              position:placeSearch2.geometry.location,
              label: "起點",
              map: map
              });
            }
            
          }
        }

        function calcRoute(count) {
          

          var selectedMode = "DRIVING";
          var waypts = [
          [],
          [{
            location: {lat: 24.789457, lng: 120.995396},  //1  綜合球館前轉角
            stopover: true
          },
          {
            location: {lat: 24.789604, lng: 120.997128},  //  二餐前轉角
            stopover: true
          }],
          [{
            location: {lat: 24.787497, lng: 120.997339},  //2  小木屋前轉角
            stopover: true
          }],
          [{
            location: {lat: 24.784064, lng: 120.997999},  //3  土木結構實驗室前
            stopover: true
          }],
          [{
            location: {lat: 24.783849, lng: 120.998811},  //4  土木結構實驗室前偏右
            stopover: true
          }],
          [{
            location: {lat: 24.789604, lng: 120.997128},  //5  二餐前轉角
            stopover: true
          },
          {
            location: {lat: 24.788613, lng: 120.999540},  //  中正堂旁停車場
            stopover: true
          }],
          [{
            location: {lat: 24.788744, lng: 120.998850},  //6   中正堂三角
            stopover: true
          }],
          [{
            location: {lat: 24.788613, lng: 120.999540},  //7  中正堂旁停車場
            stopover: true
          },
          {
            location: {lat: 24.784992, lng: 121.000237},  //  奈米電子研究大樓
            stopover: true
          }],
          [{
            location: {lat: 24.789604, lng: 120.997128},  //8  二餐前轉角
            stopover: true
          },
          {
            location: {lat: 24.783849, lng: 120.998811},  //  土木結構實驗室前偏右
            stopover: true
          }],
          [{
            location: {lat: 24.784134, lng: 120.999825},  //9  麥當勞轉角
            stopover: true
          }],
          [{
            location: {lat: 24.789457, lng: 120.995396},  //10  綜合球館前轉角
            stopover: true
          },
          {
            location: {lat: 24.789604, lng: 120.997128},  //  二餐前轉角
            stopover: true
          }
          ],
          [{
            location: {lat: 24.785409, lng: 120.995354},  //11  研二舍
            stopover: true
          }],
          [{
            location: {lat: 24.786650, lng: 121.000530},  //12  人社二館
            stopover: true
          }],
          [{
            location: {lat: 24.789604, lng: 120.997128},  //13  二餐前轉角
            stopover: true
          },
          {
            location: {lat: 24.786650, lng: 121.000530},  //  人社二館
            stopover: true
          }],
          [{
            location: {lat: 24.789604, lng: 120.997128},  //14  二餐前轉角
            stopover: true
          },
          {
            location: {lat: 24.785409, lng: 120.995354},  //  研二舍
            stopover: true
          }],
          [{
            location: {lat: 24.784064, lng: 120.997999},  //15 土木結構實驗室前
            stopover: true
          },
          {
            location: {lat: 24.786650, lng: 121.000530},  // 人社二館
            stopover: true
          }],

          ]; 
          var DirectionsRequest = {
              origin: haight,
              destination: oceanBeach,
              optimizeWaypoints: true,
              provideRouteAlternatives: true,
              travelMode: 'DRIVING',
              waypoints: waypts[count]
              //waypoints: optimize:true,
              // Note that Javascript allows us to access the constant
              // using square brackets and a string value as its
              // "property."
              // travelMode: google.maps.TravelMode[selectedMode]
          };

          directionsService.route(
              DirectionsRequest,
              function (response, status) {
                  var line_color = ['#0044BB','#FF0000', '#db8555', '#806b63'];//;
                  
                  var ob_array = [];
                  if (status == google.maps.DirectionsStatus.OK) {
                      $.getJSON($SCRIPT_ROOT + '/secure/_take_obstacles', function(data) {
                              //console.log(data.result);
                              ob_array = data.result.map(function(obj) {return  {lat:obj.lat, lng:obj.lon}; });
                              //$("#result").text(courseStr);
                              // console.log(JSON.stringify(ob_array));
                              console.log("response.routes.length " + response.routes.length);
                              for (var i = 0, len = response.routes.length; i < len; i++) {
                                /*new google.maps.DirectionsRenderer({
                                    map: map,
                                    directions: response,
                                    routeIndex: i
                                });*/
                                //console.log(JSON.stringify(response.routes[i]));
                                var ob_flag = 0;
                                console.log("response.routes " + i);
                                var path_bounds = response.routes[i].bounds;
                                path_bounds = JSON.stringify(path_bounds);
                                console.log(path_bounds);
                                path_bounds = JSON.parse(path_bounds);        //path_bounds.south
                                // console.log(path_bounds.south);
                                var path = response.routes[i].overview_path;
                                path = JSON.stringify(path);
                                path = JSON.parse(path);
                                // path_order = path;
                                // path_order = JSON.stringify(path_order);
                                // path_order = JSON.parse(path_order);
                                // path_order = path_order.sort(function (a, b) {
                                //  return a.lat > b.lat ? 1 : -1;   //order by lat
                                // });
                                // console.log(JSON.stringify(path_order));

                                var ob_array_in_area = [];
                                for(var m = 0; m < ob_array.length; m++){
                                  if(ob_array[m].lat > path_bounds.south && ob_array[m].lat < path_bounds.north)
                                    if(ob_array[m].lng > path_bounds.west && ob_array[m].lng < path_bounds.east)
                                      ob_array_in_area.push(ob_array[m]);
                                }

                                console.log(JSON.stringify(ob_array_in_area));

                                var path_array_in_order = [];
                                for(var m = 0; m < path.length-1; m++){
                                  if(path[m].lat < path[m+1].lat)
                                    path_array_in_order.push([path[m], path[m+1]]);
                                  else
                                    path_array_in_order.push([path[m+1], path[m]]);
                                }
                                // console.log(path_array_in_order[0][0].lat);


                                for (var j = 0; j < path_array_in_order.length; j++){
                                    
                                    for(var k = 0; k < ob_array_in_area.length; k++){
                                      var dis = 10000000;
                                      if(ob_array_in_area[k].lat>(path_array_in_order[j][0].lat-0.000086) && ob_array_in_area[k].lat<(path_array_in_order[j][1].lat+0.000086))
                                      {
                                        // if(ob_array_in_area[k].lng>(path_array_in_order[j][0].lng-0.0000086) && ob_array_in_area[k].lng<(path_array_in_order[j][1].lng+0.0000086))
                                        // {
                                          var dis_flag = 0;
                                          if(path_array_in_order[j][0].lng < path_array_in_order[j][1].lng)
                                          {
                                            if(ob_array_in_area[k].lng>(path_array_in_order[j][0].lng-0.000086) && ob_array_in_area[k].lng<(path_array_in_order[j][1].lng+0.000086))
                                            {
                                              dis_flag = 1;
                                            }
                                          }
                                          else
                                          {
                                            if(ob_array_in_area[k].lng<(path_array_in_order[j][0].lng+0.000086) && ob_array_in_area[k].lng>(path_array_in_order[j][1].lng-0.000086))
                                            {
                                              dis_flag = 1;
                                            }
                                          }

                                          if(dis_flag == 1)
                                          {
                                            // console.log('1111');
                                            v = [(path_array_in_order[j][1].lat-path_array_in_order[j][0].lat), (path_array_in_order[j][1].lng-path_array_in_order[j][0].lng)];
                                            v1 = [(ob_array_in_area[k].lat -path_array_in_order[j][0].lat),(ob_array_in_area[k].lng -path_array_in_order[j][0].lng)];
                                            v2 = [(ob_array_in_area[k].lat -path_array_in_order[j][1].lat),(ob_array_in_area[k].lng -path_array_in_order[j][1].lng)];
                                            // if (dot(v, v1) <= 0) return length(v1);  if (dot(v, v2) >= 0) return length(v2);
                                            
                                            if((v[0]*v1[0]+v[1]*v1[1]) <= 0){
                                              dis = Math.sqrt(v1[0]*v1[0] + v1[1]*v1[1]);
                                              console.log("(v[0]*v1[0]+v[1]*v1[1]) <= 0");
                                            }   
                                            else if((v[0]*v2[0]+v[1]*v2[1]) >= 0){
                                              dis = Math.sqrt(v2[0]*v2[0] + v2[1]*v2[1]);
                                              console.log("(v[0]*v2[0]+v[1]*v2[1]) >= 0");
                                            }   
                                            else{
                                              if(path_array_in_order[j][1].lat == path_array_in_order[j][0].lat)
                                              {　
                                                dis = Math.abs(path_array_in_order[j][0].lat-ob_array_in_area[k].lat);
                                              }
                                              else
                                              {
                                                var a = (path_array_in_order[j][1].lng-path_array_in_order[j][0].lng)/(path_array_in_order[j][1].lat-path_array_in_order[j][0].lat);
                                                var b = path_array_in_order[j][0].lng - a*path_array_in_order[j][0].lat;
                                                dis = Math.abs(a*ob_array_in_area[k].lat-ob_array_in_area[k].lng+b)/Math.sqrt(a*a+1);
                                                console.log("線段內");
                                              }
                                              
                                            }


                                            console.log("ob_array_in_area:"+JSON.stringify(ob_array_in_area[k])+" dis: "+dis);
                                          }
                                        // }
                                      }
                                       ob_flag = 0;
                                      if(dis < 0.000025)   //0.0000086, 0.0000016, 0.000016381
                                        {
                                          console.log("in" + dis);
                                          // path_err = [{lat:(path[j].lat+path[j+1].lat)/2, lng:(path[j].lng+path[j+1].lng)/2}, {lat:ob_array_in_area[k].lat, lng:ob_array_in_area[k].lng}];
                                          // flightPath_routing = new google.maps.Polyline({
                                          // path: path_err,
                                          // geodesic: true,
                                          // strokeColor: '#FF44AA',
                                          // strokeOpacity: 1.0,
                                          // strokeWeight: 2,
                                          // //map: map
                                          // });

                                          // flightPath_routing.setMap(map);
                                          //console.log(path_obj.lat);

                                          ob_flag = 1;
                                          break;
                                        }
                                        // if(Math.abs(path[j].lat - ob_array[k].lat) < 0.00028 && Math.abs(path[j].lng - ob_array[k].lng) < 0.00028)
                                        // {
                                        //   console.log("in" + ob_array[k].lat);
                                        //   //console.log(path_obj.lat);
                                        //   ob_flag = 1;
                                        //   break;
                                        // }
                                    }
                                    if(ob_flag == 1)
                                    {
                                      console.log("break");
                                      break;
                                    }
                                }
                                
                                if(flightPath_routing != null) 
                                {
                                  flightPath_routing.setMap(null);
                                  flightPath_routing = null;
                                }

                                if(ob_flag == 0)
                                {
                                  // console.log("有進來");
                                  //var path = response.routes[i].overview_path;
                                  flightPath_routing = new google.maps.Polyline({
                                  path: path,
                                  geodesic: true,
                                  strokeColor: line_color[0],
                                  strokeOpacity: 1.0,
                                  strokeWeight: 2,
                                  //map: map
                                  });

                                  flightPath_routing.setMap(map);
                                  google.maps.event.removeListener(listener_routing);
                                  google.maps.event.removeListener(listener_routing2);
                                  $('#input_destination').hide();
                                  break;
                                  // console.log(path);
                                  // path = JSON.stringify(path);
                                  // path = JSON.parse(path);
                                  // console.log(path);
                                  // // Snap a user-created polyline to roads and draw the snapped path
                                  // var pathValues = [];
                                  // for (var i = 0; i < path.length; i++) {
                                  //   pathValues.push(path[i].lat+","+path[i].lng);
                                  //   //console.log("snaptoroad:"+pathValues);
                                  // }

                                  // pathValues = pathValues.join('|');
                                  // //console.log("snaptoroad:"+pathValues);
                                  // $.get('https://roads.googleapis.com/v1/snapToRoads', {
                                  //   interpolate: true,
                                  //   key: "AIzaSyCT1MkhTlOJjKg1NLqb0yyD_0o3Q6_-dr8",
                                  //   path: pathValues
                                  // }, function(data) {
                                  //   console.log(data.snappedPoints.length);
                                  //   snappedCoordinates = [];
                                  //   placeIdArray = [];
                                  //   for (var i = 0; i < data.snappedPoints.length; i++) {
                                  //     var latlng = new google.maps.LatLng(
                                  //         data.snappedPoints[i].location.latitude,
                                  //         data.snappedPoints[i].location.longitude);
                                  //     snappedCoordinates.push(latlng);
                                  //     placeIdArray.push(data.snappedPoints[i].placeId);
                                  //   }

                                  //   var snappedPolyline = new google.maps.Polyline({
                                  //     path: snappedCoordinates,
                                  //     strokeColor: 'black',
                                  //     strokeWeight: 3
                                  //   });

                                  //   snappedPolyline.setMap(map);

                                    
                                  // });


                                  

                                  /*new google.maps.DirectionsRenderer({
                                    map: map,
                                    directions: response,
                                    routeIndex: i
                                });*/
                                  // break;
                                
                                }
                                else
                                {
                                  if(i == (response.routes.length-1))
                                  {
                                    console.log("There is no road to destination. count="+count+" waypts.length-1 "+(waypts.length-1));
                                    if(count == (waypts.length-1))
                                    {
                                      toast("There is no road to destination.");
                                      console.log(flightPath_routing);
                                      $('#input_destination').show();
                                      marker_routing.setMap(null);
                                      marker_routing2.setMap(null);
                                    }
                                    count = count + 1;
                                    // if(count % 5 == 0)
                                      sleep(200);
                                    calcRoute(count);
                                    
                                  }
                                  ob_flag = 0;
                                }                                      
                            }
                            // marker_routing.addListener('click', function() {
                            //         infowindow = new google.maps.InfoWindow({
                            //           content: '<button type="submit" id="routing_cancel">取消</button>'
                            //         });

                            //         infowindow.open(map, marker);

                                  // $(document).on('click', '#routing_cancel', function(){            
                                  //   flightPath.setMap(null);
                                  // });
                  
                            //       });

                      });
                      
                  } else {
                      console.log("There is no road to destination. count="+count+" waypts.length-1 "+(waypts.length-1));
                      // if(count == (waypts.length-1))
                      // {
                        toast("There is no road to destination.");
                        console.log(flightPath_routing);
                        $('#input_destination').show();
                        marker_routing.setMap(null);
                        marker_routing2.setMap(null);
                      // }
                      // count = count + 1;
                      // calcRoute(count);
                      // ob_flag = 0;
                      $("#error").append("Unable to retrieve your route<br />");
                  }
              }
          );
          
          
        }
        initialize();

        $(document).on('click', '#button_s5', function(){
        console.log("Start Routing");
        if(listener_routing2 != undefined) google.maps.event.removeListener(listener_routing2);
        if(listener_routing != undefined) google.maps.event.removeListener(listener_routing);
        count = 0;
        setRoutePoint();
        calcRoute(count);
        // $('#input_destination').hide();
        });

        $(document).on('click', '#button_d1', function(){

          

           var button = document.getElementById('button_d1');
           if(status[4] == 1)
           {
              
              $(this).css({"opacity": 0.5});
              $(this).css({"border": ""});
              //$('#button_s1').css({"opacity": 0.5});
              change.innerHTML = "全選";
               status[4] = 0;
               //status[0] = 0;
               markers_sensor.forEach(function(arr) {
                   HideAllMarkers(arr);
               });
               polyLines .forEach(function(arr) {
                   HideAllLines(arr);
               });
               
           }
           else
           {
              /*if(CheckAllButton())
              {
                     $('#button_s1').css({"opacity": 1});
                     status[0] = 1;
                     change.innerHTML = "取消";
              }*/
              $(this).css({"opacity": 1});
              //$(this).css({"border": "2px red double"});
               status[4] = 1;
               markers_sensor.forEach(function(arr) {
                   arr[arr.length-1].setVisible(true);
               });
           }
        });
                
        $('.function').on('click', function(){
          $('.button_sm').toggle();
          $('.button').toggle();

        })
        
        function CheckAllButton(){
              for(var x=1;x < 4;x++)
              {
                     if(status[x]== 0)
                         return false;
              }
              return true;
        }

        //$( document ).ready(function() {
            
             
            
            //return false;
         //});
              


        

        

        var t = [];
        // var interval;
        var marker_dog = [];
        var online_list = []; 
        var type_list = []; 
        var type_map = []; 
        var str = '';
        var flag_marker = [];
        var flag_active = []; 
        var flag_his_hour = [];
        var flag_his_day = [];
        var arr_latlng = [];
        var active_id;
        var history_hour = [];
        var history_hour_marker = [];
        var history_day = [];
        var history_day_marker = [];
        // var color123 = ['#0275d8', '#fa5732','#673569', '#b62b6e', '#9628c6', '#667e49', '#b1a24a', '#abb8af', '#4374b7'];  //#d9534f 紅色 要換553b08
        // var color_shape = ['#5cb85c', '#5bc0de', '#f0ad4e', '#337ab7'];
        //var color123 = ['#356935'深綠,'#f0ad4e'橘,'#1cca96'淺藍綠,'#5bc0de'淺藍,'#0275d8'深藍, '#fa5732'橘紅, '#b62b6e'桃紅, '#9628c6'紫, '#667e49'墨綠, '#b1a24a'黃褐, '#abb8af'灰, '#4374b7'中藍]; 


        $(document).on('click','.history',function(){
            
            var now = new Date();
            active_id = $(this).val();
            console.log(now.getSeconds() +" "+active_id);
            if(flag_marker[active_id] == 0)
            { 
              $("#"+active_id).css("background-color", color_shape[type_map[active_id]]);
              $("#"+active_id).css("color", "white");
              $("#inlineRadio1").prop("checked", true);
              $('#myModal').modal('show');
              $(document).on('click','#history_check',function(){
                  var form = document.getElementById("history_trace");
                  //取得radio的值
                  for (var i=0; i<form.optradio.length; i++)
                  {
                     if (form.optradio[i].checked)
                     {
                        var optradio = form.optradio[i].value;
                        break;
                     }
                  }
                  console.log(now.getSeconds() +" "+active_id);
                  //console.log(optradio);
                  if(optradio == "active_marker")
                  {
                    //if (flag_active[marker_id] == 0) {
                      console.log(now.getSeconds() +" "+active_id);
                      flag_marker[active_id] = 1;
                      flag_active[active_id] = 1;
                      //console.log(now.getSeconds() +" "+marker_id);
                      marker_dog[active_id].setVisible(true);
                      // console.log(flag_active.length);
                      // console.log(flag_active[marker_id]);
                    //} else {
                      
                    //}
                  }
                  if(optradio == "recent_hour")
                  {
                     t[active_id] = 1;
                    flag_marker[active_id] = 1;
                    flag_his_hour[active_id] = 1;
                    $.getJSON($SCRIPT_ROOT + '/secure/history',{
                      dog_id: online_list[active_id],
                      time: t[active_id]
                    }, function(data) {
                      //console.log(data.result);
                      var flightPlanCoordinates = data.result.map(function(dog) {return  {lat:dog.lat, lng:dog.lon}; });
                      /*var lineSymbol = {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 10,
                      strokeWeight:7,
                      strokeOpacity: 1
                      };*/
                      var marker = new google.maps.Marker({
                      position:flightPlanCoordinates[flightPlanCoordinates.length-1],
                      map: map,
                      label: {text: active_id.toString(), color: color123[active_id], fontSize: "25px"},
                      icon:{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 15,
                        strokeWeight:7,
                        fillColor:color_shape[type_map[active_id]],
                        fillOpacity: 1,
                        strokeColor:color_shape[type_map[active_id]]
                      },
                      zIndex: 999
                      });
                      history_hour_marker[active_id] = marker;

                      flightPath = new google.maps.Polyline({
                      path: flightPlanCoordinates,
                      /*icons: [{
                        icon: lineSymbol,
                        offset: '100%',
                        label: active_id.toString()
                      }],*/
                      geodesic: true,
                      strokeColor: color123[active_id],
                      strokeOpacity: 0.5,
                      strokeWeight: 5
                      //map: map
                      });

                      flightPath.setMap(map);
                      history_hour[active_id] = flightPath;


                    });
                    }

                  if(optradio == "recent_day")
                  {
                    t[active_id] = 2;
                    flag_marker[active_id] = 1;
                    flag_his_day[active_id] = 1;
                    $.getJSON($SCRIPT_ROOT + '/secure/history',{
                      dog_id: online_list[active_id],
                      time: t[active_id]
                    }, function(data) {
                      var flightPlanCoordinates = data.result.map(function(dog) {return  {lat:dog.lat, lng:dog.lon}; });
                      console.log(flightPlanCoordinates);

                      /*var lineSymbol = {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 10,
                      strokeWeight:7,
                      strokeOpacity: 1
                      };*/
                      var marker = new google.maps.Marker({
                      position:flightPlanCoordinates[flightPlanCoordinates.length-1],
                      map: map,
                      label: {text: active_id.toString(), color: color123[active_id], fontSize: "25px"},
                      icon:{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 15,
                        strokeWeight:7,
                        fillColor:color_shape[type_map[active_id]],
                        fillOpacity: 1,
                        strokeColor:color_shape[type_map[active_id]]
                      },
                      zIndex: 999
                      });
                      history_day_marker[active_id] = marker;

                      flightPath = new google.maps.Polyline({
                      path: flightPlanCoordinates,
                      /*icons: [{
                        icon: lineSymbol,
                        offset: '100%',
                        label: active_id.toString()
                      }],*/
                      geodesic: true,
                      strokeColor: color123[active_id],
                      strokeOpacity: 0.5,
                      strokeWeight: 3
                      });

                      flightPath.setMap(map);
                      history_day[active_id] = flightPath;
                    });
                  }

                    if(interval != null) window.clearInterval(interval);
                    interval = setInterval(function(){
                    var color_line;
                    var t_his;
                    for(var i=0; i<online_list.length; i++)
                    {
                      if(flag_his_hour[i] == 1)
                      {   color_line = i;
                          t_his = t[i];
                          //console.log(t_his);
                          if(history_hour[i] != null)
                          {
                            history_hour[i].setMap(null);
                            history_hour[i] = null;
                          }
                          if(history_hour_marker[i] != null)
                          {
                            history_hour_marker[i].setMap(null);
                            history_hour_marker[i] = null;
                          }
                          
                          $.ajaxSettings.async = false;
                          //$.ajaxSettings.traditional = true;  //solve %5B%5D
                          //$.ajaxSettings.cache = false; //solve pass last value
                          //var noCache = new Date().getTime();
                          $.getJSON($SCRIPT_ROOT + '/secure/history',{
                          dog_id: online_list[i],
                          time: t_his
                        }, function(data) {
                          console.log(data.result);
                          var flightPlanCoordinates = data.result.map(function(dog) {return  {lat:dog.lat, lng:dog.lon}; });
                          /*var lineSymbol = {
                          path: google.maps.SymbolPath.CIRCLE,
                          scale: 10,
                          strokeWeight:7,
                          strokeOpacity: 1
                          };*/
                          var marker = new google.maps.Marker({
                          position:flightPlanCoordinates[flightPlanCoordinates.length-1],
                          map: map,
                          label: {text: color_line.toString(), color: color123[color_line], fontSize: "25px"},
                          icon:{
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 15,
                            strokeWeight:7,
                            fillColor:color_shape[type_map[color_line]],
                            fillOpacity: 1,
                            strokeColor:color_shape[type_map[color_line]]
                          },
                          zIndex: 999
                          });
                          history_hour_marker[color_line] = marker;

                          flightPath = new google.maps.Polyline({
                          path: flightPlanCoordinates,
                          /*icons: [{
                            icon: lineSymbol,
                            offset: '100%',
                            label: color_line.toString()
                          }],*/
                          geodesic: true,
                          strokeColor: color123[color_line],
                          strokeOpacity: 0.5,
                          strokeWeight: 5,
                          //map: map
                          });
                          console.log(color123[color_line]);
                          flightPath.setMap(map);
                          history_hour[color_line] = flightPath;
                          
                        });
                          //$.ajaxSettings.async = true;
                          
                          //$.ajaxSettings.cache = true;
                        //sleep(5000);
                      }

                      if(flag_his_day[i] == 1)
                      {
                        color_line = i;
                        t_his = t[i];
                        if(history_day[i] != null)
                        {
                          history_day[i].setMap(null);
                          history_day[i] = null;
                        }
                        if(history_day_marker[i] != null)
                        {
                          history_day_marker[i].setMap(null);
                          history_day_marker[i] = null;
                        }
                        $.ajaxSettings.async = false;
                        $.getJSON($SCRIPT_ROOT + '/secure/history',{
                          dog_id: online_list[i],
                          time: t_his
                        }, function(data) {
                          var flightPlanCoordinates = data.result.map(function(dog) {return  {lat:dog.lat, lng:dog.lon}; });
                          console.log(flightPlanCoordinates);

                          /*var lineSymbol = {
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 10,
                                strokeWeight:7,
                                strokeOpacity: 1
                          };*/
                          var marker = new google.maps.Marker({
                          position:flightPlanCoordinates[flightPlanCoordinates.length-1],
                          map: map,
                          label: {text: color_line.toString(), color: color123[color_line], fontSize: "25px"},
                          icon:{
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 15,
                            strokeWeight:7,
                            fillColor:color_shape[type_map[color_line]],
                            fillOpacity: 1,
                            strokeColor:color_shape[type_map[color_line]]
                          },
                          zIndex: 999
                          });
                          history_day_marker[color_line] = marker;

                          flightPath = new google.maps.Polyline({
                          path: flightPlanCoordinates,
                          /*icons: [{
                            icon: lineSymbol,
                            offset: '100%',
                            label: color_line.toString()
                          }],*/
                          geodesic: true,
                          strokeColor: color123[color_line],
                          strokeOpacity: 0.5,
                          strokeWeight: 3
                          });

                          flightPath.setMap(map);
                          history_day[color_line] = flightPath;
                        });
                        $.ajaxSettings.async = true;
                      }
                     }
                    },10000);
                      

                    
                    
                  
                  
                  // document.body.removeChild(form);


              });

              
            }
            if(flag_marker[active_id] == 1)
            {
              $("#"+active_id).css("background-color", "#eee");
              $("#"+active_id).css("color", "#337ab7");
              //console.log(flag_active.length);
              flag_active[active_id] = 0;
              flag_marker[active_id] = 0;
              flag_his_hour[active_id] = 0;
              flag_his_day[active_id] = 0;
              t[active_id] = null;
              marker_dog[active_id].setVisible(false);
              if(history_hour[active_id] != null)
              {
                history_hour[active_id].setMap(null);
                history_hour[active_id] = null;
              }
              if(history_hour_marker[active_id] != null)
              {
                history_hour_marker[active_id].setMap(null);
                history_hour_marker[active_id] = null;
              }
              if(history_day[active_id] != null)
              {
                history_day[active_id].setMap(null);
                history_day[active_id] = null;
              }
              if(history_day_marker[active_id] != null)
              {
                history_day_marker[active_id].setMap(null);
                history_day_marker[active_id] = null;
              }
              //window.clearInterval(interval[active_id]);
              //interval[active_id] = null;
              //$('#myModal').remove();
              // $('#myModal').modal.close();

            }

        });

        // $(document).on('click', '#active_marker', function(){
        //   var marker_id = $(this).val();
        //   console.log(marker_id);
        //   if (flag_active[marker_id] == 0) {
        //     flag_active[marker_id] = 1;
        //     marker_dog[marker_id].setVisible(true);
        //     console.log(flag_active.length);
        //     console.log(flag_active[marker_id]);
        //   } else {
        //     console.log(flag_active.length);
        //     flag_active[marker_id] = 0;
        //     marker_dog[marker_id].setMap(null);
        //     arr_latlng[i] = null;
        //   }
          
        // });


        $.getJSON($SCRIPT_ROOT + '/secure/_take_cameras', function(data) {
          cam_array = data.result.map(function(obj) {return  {lat:obj.lat, lng:obj.lon, content: obj.content}; });
        });

        var old_cam, urgent;

        function RouteGeoData_O(data)
        {
          getLocation(addMarker_routing);
          oceanBeach = new google.maps.LatLng(parseFloat(data[1][0]),parseFloat(data[1][1]));
          if(marker_routing != null) marker_routing.setMap(null);
          marker_routing = new google.maps.Marker({
            position:oceanBeach,
            label: "終點",
            map: map
          });
          count = 0;
          calcRoute(count);
          $("#text").html('End Routing');
          $('#button_route').addClass('active');
          flag_route = 1;
        }

        function CountGeoData_O(data)
        {
          console.log("CountGeoData_O in");
          var Latitude = parseFloat(data[1][0]);
          var Longitude = parseFloat(data[1][1]);
          var val = parseInt(data[1][2]);
          console.log("val:"+val);
          var ParkingLotMap = [{lat:24.788542, lng:120.999116}];
          var ParkingLotMarker = [];

          for(var i=0; i<ParkingLotMap.length; i++)
          {
            
            if(getDistance({ lat: Latitude, lng: Longitude }, ParkingLotMap[i]) <30)
            {
              if(ParkingLotMarker[i] != null)
              {
                ParkingLotMarker[i].setMap(null);
                ParkingLotMarker[i] = null;
              }

              var EmptyColor='#006400', FullColor='#FF0000', ParkingColor;
              if(val>0) ParkingColor = EmptyColor;
              else ParkingColor = FullColor;
              val = 'P: '+val; 
              var marker = new google.maps.Marker({
                position:ParkingLotMap[i],
                map: map,
                label: {text: val.toString(), fontSize: "20px", color:"#FFFFFF"},
                //label: online_list[i].toString(),
                icon:{
                  path: 'M -1.5,-0.5 1.5,-0.5 1.5,0.5 -1.5,0.5 z',//google.maps.SymbolPath.CIRCLE,
                  scale: 15,
                  strokeWeight:10,
                  fillColor:ParkingColor,
                  fillOpacity: 1,
                  strokeColor:ParkingColor
                },
              });

              ParkingLotMarker.push(marker);
              break;
            }
          }

        }

        function IDGeoData_O(data){
           var time = data[0];
           var Latitude = parseFloat(data[1][0]);
           var Longitude = parseFloat(data[1][1]);
           var val = parseInt(data[1][2]);
           // var meta = JSON.stringify(data[1][3]);
           var meta = JSON.parse(data[1][3]);

           
           // meta = JSON.parse(meta);
           
           // if(Latitude != -1 && Longitude != -1 && flag == 0) // check is the data come in for the first time
           // {
           //    flag = 1;
           //    // $('#dog').show();
           //    // $('#dog').removeClass('disabled');              
           //    // $('#dog_dropdown').attr("data-toggle", "dropdown");
           //    // document.getElementById("dog_dropdown").style.cursor = "pointer";
           //    // if(meta.type != undefined)
           //    //   $("#dog_dropdown").html(meta.type + '<span class="caret"></span>');
           //    // status[4] = 1;              
           // }
           if( Number.isInteger(val) && !isNaN(Latitude) && !isNaN(Longitude) && (Latitude>=-90) && (Latitude<=90) && (Longitude>=-180) && (Longitude<=180))//status[4]==1 &&
           {              
               var val = parseInt(val);
               var new_online = 1, new_type = 1, now_type; // 0:this id is not a new one, 1:this is a new id    

               showHistory();

               function showHistory()
               {
                  for(var i = 0; i < type_list.length; i++){
                  if(meta.type == undefined) meta.type = 'marker';
                  if(meta.type == type_list[i]){
                    new_type = 0; now_type = i;
                    break;
                  }
               }      
               if(new_type == 1){
                str = '<li id="'+meta.type+'" role="presentation" class="dropdown" class="active">';
                str = str + '<a id="'+meta.type+'_dropdown" style="cursor:pointer;color:#fff;background:'+color_shape[type_list.length]+';" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" >'+meta.type+' <span class="caret"></span></a>';
                str = str + '<ul class="dropdown-menu" id="'+meta.type+'-list" style="min-width: 120px;"></ul></li>';
                $('#list').append(str);
                now_type = type_list.length;
                type_list.push(meta.type);
               }



               val = meta.type + '_' + val;
               
               for (var i = 0; i < online_list.length; i++) {
                 if(val == online_list[i]){
                    new_online = 0;
                    break;
                 }
               }

               if (new_online == 1){
                // str = '<li style="cursor:pointer;min-width: 120px;" ><button  type="button" style="border-color:white ;background-color:  #eee; width:118px; color:#337ab7" class="history btn btn-outline-primary" id='+online_list.length+' value='+online_list.length+'>Show All</button></li>';
                // str = str+'<li style="cursor:pointer;min-width: 120px;" ><button  type="button" style="border-color:white ;background-color:  #eee; width:118px; color:#337ab7" class="history btn btn-outline-primary" id='+online_list.length+' value='+online_list.length+'>Hide All</button></li>';
                //   $("#"+meta.type+"-list").append(str);
               if(meta.name != undefined)
               {
                  str = '<li style="cursor:pointer;min-width: 120px;" ><button  type="button" style="border-color:white ;background-color:  #eee; width:118px; color:#337ab7" class="history btn btn-outline-primary" id='+online_list.length+' value='+online_list.length+'>'+online_list.length+':'+meta.name+'</button></li>';
                  $("#"+meta.type+"-list").append(str);
               }
               else
               {
                 str = '<li style="cursor:pointer;min-width: 120px;" ><button  type="button" style="border-color:white ;background-color:  #eee; width:118px; color:#337ab7" class="history btn btn-outline-primary" id='+online_list.length+' value='+online_list.length+'>'+online_list.length+':Mark'+val+'</button></li>';
                 $("#"+meta.type+"-list").append(str);
               }
                // console.log(str);
                online_list.push(val);
                type_map.push(now_type);
                flag_active.push(0);
                flag_marker.push(0);
                flag_his_hour.push(0);
                flag_his_day.push(0);
                marker_dog.push(null);
                history_hour.push(null);
                history_hour_marker.push(null);
                history_day.push(null);
                history_day_marker.push(null);
                t.push(null);
                arr_latlng.push({lat:Latitude, lng:Longitude});
                console.log(marker_dog);
                //$("#dog-list").append(str);
               }
               

               old_lat = Latitude;
               old_lng = Longitude;
               // console.log(flag_active.length);

               for(var i=0; i<online_list.length; i++)
               {
                if(val == online_list[i])
                {
                  // console.log(arr_latlng[i].lat);
                  //if(!(arr_latlng[i].lat==Latitude && arr_latlng[i].lng==Longitude))
                  //{
                    // console.log(arr_latlng[i]);
                    arr_latlng[i] = {lat:Latitude, lng:Longitude};
                    if(marker_dog[i] != null)
                     {
                      marker_dog[i].setMap(null);
                     }
                    if((meta.emergency != undefined) && (meta.emergency == 1))
                    {
                      var marker = new google.maps.Marker({
                      position:arr_latlng[i],
                      map: map,
                      // label: {text: i.toString(), fontSize: "25px"},
                      icon:"https://www.shareicon.net/data/32x32/2015/06/16/55304_red_48x48.png",
                      visible: false,
                      zIndex: 999
                      });
                    }
                    else
                    {
                      var marker = new google.maps.Marker({
                      position:arr_latlng[i],
                      map: map,
                      label: {text: i.toString(), fontSize: "25px"},
                      //label: online_list[i].toString(),
                      icon:{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 15,
                        strokeWeight:7,
                        fillColor:color_shape[type_map[i]],
                        fillOpacity: 1,
                        strokeColor:color_shape[type_map[i]]
                      },
                      visible: false
                      });
                    }
                    // var marker = new google.maps.Marker({
                    // position:arr_latlng[i],
                    // map: map,
                    // //label: online_list[i].toString(),
                    // icon:{
                    //   path: google.maps.SymbolPath.CIRCLE,
                    //   scale: 10,
                    //   strokeWeight:7,
                    //   strokeColor:color123[i]
                    // },
                    // visible: false
                    // });
                    marker_dog[i] = marker;
                    if(i == urgent)
                    {
                      if((meta.emergency == undefined) || (meta.emergency == 0))
                        $("#"+i).attr('disabled', false);
                    }
                    if(flag_active[i]==1 || ((meta.emergency != undefined) && (meta.emergency == 1)))
                    {
                      marker_dog[i].setVisible(true);
                      if((meta.emergency != undefined) && (meta.emergency == 1))
                      {
                        urgent = i;
                        $("#"+i).css("background-color", "#FF0000");
                        $("#"+i).css("color", "white");
                        $("#"+i).attr('disabled', true);
                        flag_marker[i] = 1;
                        flag_active[i] = 1;
                      }
                    }
                  //}
                }
               }

               
               if((meta.emergency != undefined) && (meta.emergency == 1))
               {

                if( (old_cam!=undefined)&& (getDistance({ lat: Latitude, lng: Longitude }, { lat: cam_array[old_cam].lat, lng: cam_array[old_cam].lng }) >30))
                {
                  $('#Video-Display').attr('src', '');
                  $('#Video-Display').hide();
                  $('#fuck_off').hide();
                }

                for(var i=0; i<cam_array.length; i++)
                {
                  if(getDistance({ lat: Latitude, lng: Longitude }, { lat: cam_array[i].lat, lng: cam_array[i].lng }) <30)
                  {
                    // console.log("getDistance if in");
                    $('#Video-Display').attr('src', cam_array[i].content);
                    $('#Video-Display').show();
                    $('#fuck_off').show();

                    old_cam = i;
                  }
                }
               }
               meta = JSON.stringify(meta);
               console.log(meta);

               //addMarker(Latitude, Longitude, val);
               $.getJSON($SCRIPT_ROOT + '/secure/_add_numbers',{
                lat: Latitude,
                lon: Longitude,
                dog_id: val,
                data: meta,
                time: time
              }, function(data) {
              //console.log("data in");
              //console.log(data.result);
              //courseStr = data.result.map(function(dog) {return  dog.lat; })
              //$("#result").text(courseStr);
            });
            }  
               
           }
           // else
           //     HideAllMarkers(markers_sensor[val]);
            
            
        }

        load_all_app();
        function load_all_app()
        {
          if(all_app_list.length > 0)
          {
            for(var i=0; i<all_app_list.length; i++)
            {
              $(document).off('click', '#show_'+i);
              $(document).off('click', '#app_'+i);
              $('#'+i+'_menu').remove();
              $('#'+i+'_quick_menu').remove();  
            }
            for(var i=0; i<all_icon_list.length; i++)
            {
              $(document).off('click', '#icon_'+i);
              all_icon_list[i].marker.setMap(null);
              google.maps.event.removeListener(all_icon_list[i].marker_listener);
            }
            all_icon_list = [];
            all_app_list = [];
            all_static_icon_list = [];
            all_iottalk_data_list = [];
          }
          //number(0), app(1), kind(2) mobility(3), icon(4), picture(5), visual(6), color_min(7), color_max(8), quick_access(9)
          $.getJSON($SCRIPT_ROOT + '/secure/_take_all_app', function(data) {
            all_app_list = data.result.map(function(obj) {return {
                'number': obj.number,
                'app': obj.app,
                'kind': obj.kind,
                'mobility': obj.mobility,
                'icon': obj.icon,
                'picture': obj.picture,
                'visual': obj.visual,
                'color_min': obj.color_min,
                'color_max':obj.color_max,
                'quick_access': obj.quick_access
              }; 
            });
            // console.log(all_app_list);

            $.getJSON($SCRIPT_ROOT + '/secure/_take_all_static_icon', function(data) {
              all_static_icon_list = data.result.map(function(obj) {return  {
                  'number': obj.number,
                  'app_num': obj.app_num,
                  'name': obj.name,
                  'lat': obj.lat,
                  'lng': obj.lng,
                  'description': obj.description
                }; 
              });
              // console.log(all_static_icon_list);

              $.getJSON($SCRIPT_ROOT + '/secure/_take_all_iottalk_data', function(data) {
                all_iottalk_data_list = data.result.map(function(obj) {return  {
                    'app_num': obj.app_num,
                    'name': obj.name,
                    'lat': obj.lat,
                    'lng': obj.lng,
                    'value': obj.value
                  }; 
                });
                // console.log(all_iottalk_data_list);

                // all_app_list.sort((a, b) => a.app.localeCompare(b.app));

                for(var i=0; i<all_app_list.length; i++)
                {            
                  var app_name = all_app_list[i].app;
                  // if(all_app_list[i].kind >= 5 || all_app_list[i].kind <= 8)
                  //   app_name = all_app_list[i].value+":"+all_app_list[i].app;

                  // str = '<li class="menu-item dropdown dropdown-submenu" id="'+i+'_menu"> \
                  //           <button  type="button" style="cursor:default;border-color:white ;background-color: #eee; min-width:138px; color:#337ab7" class="dropdown-toggle history btn btn-outline-primary" data-toggle="dropdown" id="app_'+i+'" value="'+i+'">'+app_name+'</button> \
                  //       </li>'
                  str = '<div id="'+i+'_menu"><button type="button" style="cursor:default;background-color:#fff; min-width:138px; color:#555" class="list-group-item history btn btn-outline-primary" data-toggle="collapse" data-parent="#MainMenu" data-target="#'+i+'_list" id="app_'+i+'" value="'+i+'">'+app_name+' &#9662;</button></div>';
                  $('#app_list').append(str);

                  quick_access_space = quick_access_space_check();
                  if(all_app_list[i].quick_access == 1 && quick_access_space)
                  {

                    console.log('quick_access == 1: ' + all_app_list[i].app);
                    str = '<li id="'+i+'_quick_menu" role="presentation" class="menu-item dropdown" class="active"> \
                            <button type="button" id="quick_app_'+i+'" style="min-width:120px;height:40px;cursor:pointer;color:#fff;background:'+color_shape[i]+';" class="dropdown-toggle history btn btn-outline-primary" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" value="'+i+'">'+app_name+'<span class="caret"></span></button> \
                          </li>';
                    $('#list').append(str);
                    quick_access_count++;
                  }
                  
                  // str = '<ul class="dropdown-menu pre-scrollable" style="min-width: 140px;" id="'+i+'_list"></ul>'
                  // $('#'+i+'_menu').append(str);
                  str = '<div class="collapse" style="min-width: 140px;" id="'+i+'_list"></div>';
                  $('#'+i+'_menu').append(str);

                  // str = '<li class="menu-item" style="cursor:pointer;min-width: 140px;" ><button type="button" style="border-color:white ;background-color:  #eee; min-width:100%; color:#337ab7" class="history btn btn-outline-primary" id="show_'+i+'" value="'+i+'">Show All</button></li>';
                  str = '<button type="button" style="border-color:white ;background-color:  #eee; min-width:100%; color:#337ab7" class="list-group-item history btn btn-outline-primary" id="show_'+i+'" value="'+i+'">Show All</button>';
                  $('#'+i+'_list').append(str);

                  if(all_app_list[i].quick_access == 1 && quick_access_space)
                  {
                    str = '<ul class="dropdown-menu pre-scrollable" id="'+i+'_quick_list" style="min-width: 130px;"></ul>';
                    $('#'+i+'_quick_menu').append(str);

                    str = '<li style="cursor:pointer;min-width: 140px;" ><button  type="button" style="border-color:white ;background-color:#eee; min-width:100%; color:#337ab7" class="history btn btn-outline-primary" id="show_'+i+'" value="'+i+'">Show All</button></li>';
                    $('#'+i+'_quick_list').append(str);
                  }

                  all_app_list[i].show = 0;
                  all_app_list[i].count = 0;//此app底下有幾個icon
                  all_app_list[i].show_count = 0;

                  for(var j=0; j<all_iottalk_data_list.length; j++)
                  {
                    if(all_iottalk_data_list[j].app_num == all_app_list[i].number)
                    {
                      for(var k=0; k<all_static_icon_list.length; k++)
                      {
                        if(all_iottalk_data_list[j].app_num == all_static_icon_list[k].app_num && all_iottalk_data_list[j].name == all_static_icon_list[k].name)
                        {
                          all_icon_list.push(all_static_icon_list[k]);
                          all_static_icon_list[k].add = 1;
                          set_all_icon(all_icon_list.length-1, all_iottalk_data_list[j].value, i);
                          //Tracking
                          if(all_icon_list[all_icon_list.length-1].name == window.person && all_icon_list[all_icon_list.length-1].real_app_num == window.trackingAppNum)
                          {
                            console.log("show_tracking_target");
                            show_tracking_target(all_icon_list.length-1, all_icon_list[all_icon_list.length-1].lat, all_icon_list[all_icon_list.length-1].lng, map);
                          }
                          break;
                        }
                      }
                    }
                  }


                  if(all_app_list[i].kind>=1 && all_app_list[i].kind<=4)
                  {
                    for(var j=0; j<all_static_icon_list.length; j++)
                    {
                      if(all_static_icon_list[j].app_num == all_app_list[i].number && all_static_icon_list[j].add == undefined)
                      {
                        all_icon_list.push(all_static_icon_list[j]);
                        all_static_icon_list[j].add = 1;
                        set_all_icon(all_icon_list.length-1, "", i);
                      }
                    }
                  }
                  
                  $(document).on('click', '#show_'+i, function(){
                    app_num = $(this).val();
                    $('#MainMenu').collapse('hide');
                    $('#'+app_num+'_list').collapse('hide');
                    console.log('app_num: '+ app_num);
                    if(all_app_list[app_num].show == 0)
                    {
                      all_app_list[app_num].show = 1;
                      if(all_app_list[app_num].app == "Camera" || all_app_list[app_num].app == "Obstacle")
                      {
                        $('[id="show_'+app_num+'"]').css("background-color", color_shape[app_num]);
                        $('[id="show_'+app_num+'"]').css("color", "white");
                        $('[id="show_'+app_num+'"]').html('Hide All');
                        for(var j=0; j<all_icon_list.length; j++)
                        {
                          if(all_app_list[all_icon_list[j].app_num].app == all_app_list[app_num].app)
                          {
                            if(all_icon_list[j].show == 0)
                              add_app_show_count();
                            all_icon_list[j].show = 1;
                            $('[id="icon_'+j+'"]').css("background-color", color_shape[app_num]);
                            $('[id="icon_'+j+'"]').css("color", "white");

                            // resetCenter(all_icon_list[j].marker);
                            all_icon_list[j].marker.setVisible(true);
                          }
                        } 
                      }
                      else
                      {
                        if(all_app_list[app_num].kind >= 1 && all_app_list[app_num].kind <= 4)
                        {
                          $('[id="show_'+app_num+'"]').css("background-color", color_shape[app_num]);
                          $('[id="show_'+app_num+'"]').css("color", "white");
                          $('[id="show_'+app_num+'"]').html('Hide All');
                          //為了Farm新增_start
                          // if(all_app_list[app_num].number == 80)
                          // {
                          //   map.setCenter({lat: 24.764278, lng: 120.993806});
                          //   map.setZoom(16);
                          // }
                          //為了Farm新增_end
                          for(var j=0; j<all_icon_list.length; j++)
                          {
                            if(all_icon_list[j].app_num == app_num)
                            {
                              icon_num = j;
                              all_icon_list[icon_num].history = 0;
                              if(all_icon_list[j].show == 0)
                                add_app_show_count();
                              set_loc_history_time();
                            }
                          }
                        }
                        else //movable
                        {
                          // history_form();
                          $('[id="show_'+app_num+'"]').css("background-color", color_shape[app_num]);
                          $('[id="show_'+app_num+'"]').css("color", "white");
                          $('[id="show_'+app_num+'"]').html('Hide All');

                          for(var j=0; j<all_icon_list.length; j++)
                          {
                            if(all_icon_list[j].app_num == app_num)
                            {
                              icon_num = j;
                              all_icon_list[icon_num].history = 0;
                              if(all_icon_list[j].show == 0)
                                add_app_show_count();
                              set_loc_history_time();
                            }
                          }
                        }
                        
                      }
                      
                    }
                    else //all_app_list[app_num].show == 1
                    {
                      // all_app_list[app_num].show = 0;
                      // $('[id="show_'+app_num+'"]').css("background-color", "#eee");
                      // $('[id="show_'+app_num+'"]').css("color", "#337ab7");
                      // $('[id="show_'+app_num+'"]').html('Show All');
                      for(var j=0; j<all_icon_list.length; j++)
                      {
                        if(all_icon_list[j].app_num == app_num)
                        {
                          icon_num = j;
                          set_icon_on_null();
                        }
                      }
                    }
                  });
                  
                }
                // alert($(window).width());

              });


            });
            

          });
        }

        function quick_access_space_check()
        {
          if($(window).width() > mobile_width)
            return 1;
          else if($(window).width() <= mobile_width && quick_access_count < 2)
            return 1;
          else
            return 0;
        }

        function set_all_icon(num, value, app)
        {
          all_icon_list[num].count = all_app_list[app].count;//自己的app底下第幾個
          all_app_list[app].count = all_app_list[app].count + 1;
          all_icon_list[num].real_app_num = all_icon_list[num].app_num;
          all_icon_list[num].app_num = app;
          all_icon_list[num].show = 0;
          all_icon_list[num].history = 0;
          // console.log(all_icon_list[num].lat + "******" + all_icon_list[num].lng);
          console.log(all_icon_list[num].name);
          var marker = icon_style(app, all_icon_list[num].lat, all_icon_list[num].lng, value);
          var marker_listener = icon_listener(num, marker);
          all_icon_list[num].marker = marker;
          all_icon_list[num].marker_listener = marker_listener[0];
          all_icon_list[num].info = marker_listener[1];

          // console.log(all_icon_list[num]);
          var icon_name = all_icon_list[num].name;
          if(all_app_list[app].kind >= 5 && all_app_list[app].kind <= 8)
            icon_name = value+":"+all_icon_list[num].name;
          // str = '<li class="menu-item" style="cursor:pointer;min-width: 140px;" ><button type="button" style="border-color:white ;background-color:  #eee; min-width:100%; color:#337ab7" class="history btn btn-outline-primary" id="icon_'+num+'" value="'+num+'">'+icon_name+'</button></li>';
          str = '<button type="button" style="border-color:white ;background-color:  #eee; min-width:100%; color:#337ab7" class="list-group-item history btn btn-outline-primary" id="icon_'+num+'" value="'+num+'">'+icon_name+'</button>';
          $('#'+app+'_list').append(str);

          if(all_app_list[app].quick_access == 1 && quick_access_space)
          {
            str = '<li style="cursor:pointer;min-width: 140px;" ><button  type="button" style="border-color:white ;background-color:#eee; min-width:100%; color:#337ab7" class="history btn btn-outline-primary" id="icon_'+num+'" value="'+num+'">'+icon_name+'</button></li>';
            $('#'+app+'_quick_list').append(str);
          }

          $(document).on('click', '#icon_'+num, function(){
            icon_num = $(this).val();
            app_num = all_icon_list[icon_num].app_num;
            $('#MainMenu').collapse('hide');
            $('#'+app_num+'_list').collapse('hide');
            console.log('all_icon_list[icon_num].show: '+ all_icon_list[icon_num].show);
            if(all_icon_list[icon_num].show == 0)
            {
              if(all_app_list[app_num].app == "Camera")
              {
                add_app_show_count();
                all_icon_list[icon_num].show = 1;
                $('[id="icon_'+icon_num+'"]').css("background-color", color_shape[app_num]);
                $('[id="icon_'+icon_num+'"]').css("color", "white");

                resetCenter(all_icon_list[icon_num].marker);
                // $('#Video-Display').attr('src', all_icon_list[icon_num].description);
                cam_src = all_icon_list[icon_num].description;
                $('#Video-Display').attr('src', $('#Video-Display').attr('src'));
                $('#Video-Display').show();
                $('#fuck_off').show();
                
                all_icon_list[icon_num].marker.setVisible(true);
              }
              else if(all_app_list[app_num].app == "Obstacle")
              {
                add_app_show_count();
                all_icon_list[icon_num].show = 1;
                $('[id="icon_'+icon_num+'"]').css("background-color", color_shape[app_num]);
                $('[id="icon_'+icon_num+'"]').css("color", "white");

                resetCenter(all_icon_list[icon_num].marker);
                all_icon_list[icon_num].marker.setVisible(true);
              }
              else
              {
                if(all_app_list[app_num].kind >= 1 && all_app_list[app_num].kind <= 4)
                {
                  all_icon_list[icon_num].history = optradio;
                  map.setCenter({lat: all_icon_list[icon_num].lat, lng: all_icon_list[icon_num].lng});
                  map.setZoom(16);
                  add_app_show_count();
                  set_loc_history_time();
                }
                else //movable
                {
                  // history_form();
                  all_icon_list[icon_num].history = 0;
                  map.setCenter({lat: all_icon_list[icon_num].lat, lng: all_icon_list[icon_num].lng});
                  map.setZoom(16);
                  add_app_show_count();
                  set_loc_history_time();
                }
              }
            }
            else //all_icon_list[icon_num].show == 1
            {
              set_icon_on_null();
            }
            
          });
        }

        function create_color_scale(app, min, max, title)
        {
          console.log(app);
          console.log(min);
          console.log(max);
          $("#color_scale").append('<svg id="color_scale_'+app+'"></svg><br>');
          d3.select("#color_scale_"+app).append("text")
              .attr('x', 0)
              .attr('y', 20)
              .style('fill', 'black')
              .style('font-size', '15px')
              .style('font-weight', 'bold')
              .text(title);

          //Draw the legend rectangle and fill with color
          for(var i=0; i<color_range.length; i++)
          {
            d3.select("#color_scale_"+app).append("rect")
              .attr("width", 40)
              .attr("height", 20)
              .attr("x", i*40+2+100)  
              .attr("y",0)
              .style("fill", color_range[i]);
          }

          //create tick marks
          var x = d3.scaleLinear()
              .domain([min, max])
              .range([0, 200]);

          var axis = d3.axisBottom(x).tickValues(d3.range(min, max+(max-min)*0.2, (max-min)*0.2));

          d3.select("#color_scale_"+app)
                  .attr("class", "axis")
                  .attr("width", 335)
                  .attr("height", 50)
              .append("g")
                  .attr("id", "g-runoff")
                  .attr("transform", "translate(102,20)")
                  .style('font-size', '15px')
                  .call(axis);
        }

        function add_app_show_count()
        {
          if(all_app_list[app_num].show_count == 0)
          {
            $('[id="app_'+app_num+'"]').css("background-color", color_shape[app_num]);
            $('[id="app_'+app_num+'"]').css("color", "white");
          }

          if((all_app_list[app_num].kind == 4 || all_app_list[app_num].kind == 8) && all_app_list[app_num].show_count == 0)
          {
            create_color_scale(app_num, all_app_list[app_num].color_min, all_app_list[app_num].color_max, all_app_list[app_num].app);
          }

          all_app_list[app_num].show_count = all_app_list[app_num].show_count + 1;
          console.log("add_app_show_count: "+all_app_list[app_num].show_count);
        }

        function decrease_app_show_count()
        {
          
          all_app_list[app_num].show_count = all_app_list[app_num].show_count - 1;
          console.log("decrease_app_show_count: "+all_app_list[app_num].show_count);
          if(all_app_list[app_num].show_count == 0)
          {
            $('[id="app_'+app_num+'"]').css("background-color", "#fff");
            $('[id="app_'+app_num+'"]').css("color", "#555");
            $("#color_scale_"+app_num).remove();
          }
        }

        function set_icon_on_null()
        {
          decrease_app_show_count();

          if(all_app_list[app_num].show > 0)
          {
            all_app_list[app_num].show = 0;
            $('[id="show_'+app_num+'"]').css("background-color", "#eee");
            $('[id="show_'+app_num+'"]').css("color", "#337ab7");
            $('[id="show_'+app_num+'"]').html('Show All');
          }
          all_icon_list[icon_num].show = 0;
          $('[id="icon_'+icon_num+'"]').css("background-color", "#eee");
          $('[id="icon_'+icon_num+'"]').css("color", "#337ab7");
          all_icon_list[icon_num].info.close();
          all_icon_list[icon_num].marker.setVisible(false);
          if(all_icon_list[icon_num].history_marker != undefined)
          {
            all_icon_list[icon_num].history_marker.setMap(null);
            google.maps.event.removeListener(all_icon_list[icon_num].history_marker_listener);
          }
          if(all_icon_list[icon_num].history_path != undefined)
          {
            all_icon_list[icon_num].history_path.setMap(null);
          }
          if(all_icon_list[icon_num].history_line != undefined && jQuery.isEmptyObject(all_icon_list[icon_num].history_line) == 0)
          {
            console.log('history_line: '+all_icon_list[icon_num].history_line);
            all_icon_list[icon_num].history_line.remove();
            all_icon_list[icon_num].history_line = [];

            if(chart.series.length == 0)
            {
              $('#highchart').hide();
              $('#fuck_off').hide();
            }
          }
        }

        $(document).on('click', '#loc_history', function(){
          console.log("loc_history");
          form = document.getElementById("history_trace");
          //取得radio的值
          for (var i=0; i<form.optradio.length; i++)
          {
             if (form.optradio[i].checked)
             {
                optradio = form.optradio[i].value;
                break;
             }
          }

          // if(all_app_list[app_num].show > 0)  //show all
          // {
          //   $('[id="show_'+app_num+'"]').css("background-color", color_shape[app_num]);
          //   $('[id="show_'+app_num+'"]').css("color", "white");
          //   $('[id="show_'+app_num+'"]').html('Hide All');
          //   for(var j=0; j<all_icon_list.length; j++)
          //   {
          //     if(all_icon_list[j].app_num == app_num)
          //     {
          //       icon_num = j;
          //       all_icon_list[icon_num].history = optradio;
          //       add_app_show_count();
          //       set_loc_history_time();
          //     }
          //   }
          // }
          // else  //solo icon
          // {
            all_icon_list[icon_num].history = optradio;
            map.setCenter({lat: all_icon_list[icon_num].lat, lng: all_icon_list[icon_num].lng});
            map.setZoom(16);
            if(all_icon_list[icon_num].show == 0)
              add_app_show_count();
            set_loc_history_time();
          // }

          if(interval != null) window.clearInterval(interval);
          interval = setInterval(function(){
            for(var i=0; i<all_icon_list.length; i++)
            {
              if(all_icon_list[i].show == 1)
              {
                icon_num = i;
                set_loc_history_time();
              }
            }
          },10000);

          // document.body.removeChild(form);
        });

        //偵測手機頁面狀態
        document.onvisibilitychange=function(){
          if(document.visibilityState=="visible"){
            if(left == 1){
              //回復頁面時刷新timer
              left = 0;
              // location.reload();
              for(var i=0; i<all_icon_list.length; i++)
              {
                if(all_icon_list[i].show == 1)
                {
                  icon_num = i;
                  set_loc_history_time();
                }
              }
              if(interval != null) window.clearInterval(interval);
              interval = setInterval(function(){
                for(var i=0; i<all_icon_list.length; i++)
                {
                  if(all_icon_list[i].show == 1)
                  {
                    icon_num = i;
                    set_loc_history_time();
                  }
                }
              },10000);
            }
          }else{
            left = 1;
            if(interval != null) window.clearInterval(interval);
          }
        }

        $(document).on('click', '#val_history', function(){
          console.log("val_history");
          form = document.getElementById("history_trace");
          //取得radio的值
          for (var i=0; i<form.optradio.length; i++)
          {
             if (form.optradio[i].checked)
             {
                optradio = form.optradio[i].value;
                break;
             }
          }

          if(all_app_list[app_num].show > 0)  //show all
          {
            all_app_list[app_num].show = 2;
            $('[id="show_'+app_num+'"]').css("background-color", color_shape[app_num]);
            $('[id="show_'+app_num+'"]').css("color", "white");
            $('[id="show_'+app_num+'"]').html('Hide All');

            for(var j=0; j<all_icon_list.length; j++)
            {
              if(all_icon_list[j].app_num == app_num)
              {
                icon_num = j;
                all_icon_list[icon_num].history = optradio;
                if(all_icon_list[j].show == 0)
                  add_app_show_count();
                set_val_history_time();
              }
            }
          }
          else  //solo icon
          {
            all_icon_list[icon_num].history = optradio;
            map.setCenter({lat: all_icon_list[icon_num].lat, lng: all_icon_list[icon_num].lng});
            map.setZoom(16);
            if(all_icon_list[icon_num].show == 0)
              add_app_show_count();
            set_val_history_time();
          }

          set_time_out();

          // document.body.removeChild(form);
        });

        function set_time_out() {
          clearTimeout(timeout);

          timeout = setTimeout(function(){
              for(var i=0; i<all_icon_list.length; i++)
              {
                if(all_icon_list[i].show == 2)
                {
                  console.log("setTimeout in");
                  icon_num = i;
                  set_val_history_time();
                }
              }
              set_time_out();
          },10000);


        }

        function history_form()
        {
          $("#inlineRadio1").prop("checked", true);
          $('#myModal').modal('show');
        }


        function set_val_history_time()
        {
          console.log("icon_num  " + icon_num);
          all_icon_list[icon_num].show = 2;
          $('[id="icon_'+icon_num+'"]').css("background-color", color_shape[all_icon_list[icon_num].app_num]);
          $('[id="icon_'+icon_num+'"]').css("color", "white");

          if(all_app_list[all_icon_list[icon_num].app_num].kind >= 1 && all_app_list[all_icon_list[icon_num].app_num].kind <= 8)
          {
            if(all_icon_list[icon_num].history_marker != undefined)
            {
              console.log("all_icon_list[icon_num].history_marker != undefined-************");
              all_icon_list[icon_num].history_marker.setMap(null);
              google.maps.event.removeListener(all_icon_list[icon_num].history_marker_listener);
            }

            if(all_icon_list[icon_num].history==0)  //0:active_marker
            {
              // map.setCenter({lat: all_icon_list[icon_num].lat, lng: all_icon_list[icon_num].lng});
              // all_icon_list[icon_num].info.open(map, all_icon_list[icon_num].marker);

              // all_icon_list[icon_num].marker.setVisible(true);
              set_val_history_line();
            }
            else if(all_icon_list[icon_num].history == 1)  //1:recent_minute
            {
              // map.setCenter({lat: all_icon_list[icon_num].lat, lng: all_icon_list[icon_num].lng});
              // all_icon_list[icon_num].marker.setVisible(true);
              set_val_history_line();
            }
            else if(all_icon_list[icon_num].history == 2)  //2:recent_hour
            {
              // map.setCenter({lat: all_icon_list[icon_num].lat, lng: all_icon_list[icon_num].lng});
              // console.log("all_icon_list[icon_num].history == 2");
              // all_icon_list[icon_num].marker.setVisible(true);
              set_val_history_line();
            }
          }
        }

        var chart = Highcharts.chart('highchart', {
            title:{
                text:' '
            },
            xAxis: {
                type: 'datetime',
            },
            legend: {
                maxHeight: 50,
            }
        });

        function set_val_history_line()
        {
          var set_icon_num = icon_num;
          $.getJSON($SCRIPT_ROOT + '/secure/history',{
            app_num: all_icon_list[set_icon_num].real_app_num,
            name: all_icon_list[set_icon_num].name,
            time: all_icon_list[set_icon_num].history
          }, function(data) {
            var history_list = data.result.map(function(obj) {return  {lat:obj.lat, lng:obj.lng, value: obj.value, time:obj.time}; });

            // if(history_list.length == 0)
            // {
            //   console.log("history_list.length");

              // map.setCenter({lat: all_icon_list[set_icon_num].lat, lng: all_icon_list[set_icon_num].lng});
              // all_icon_list[set_icon_num].info.open(map, all_icon_list[set_icon_num].marker);
            //   all_icon_list[set_icon_num].marker.setVisible(true);
            //   return;
            // }

            if(all_app_list[all_icon_list[set_icon_num].app_num].kind >= 5 && all_app_list[all_icon_list[set_icon_num].app_num].kind <= 8)  //movable icon
              var history_marker = icon_style(all_icon_list[set_icon_num].app_num, history_list[history_list.length-1].lat, history_list[history_list.length-1].lng, history_list[history_list.length-1].value);
            else  //stationary icon
              var history_marker = icon_style(all_icon_list[set_icon_num].app_num, all_icon_list[set_icon_num].lat, all_icon_list[set_icon_num].lng, history_list[history_list.length-1].value);
            var history_marker_listener = icon_listener(set_icon_num, history_marker);
            all_icon_list[set_icon_num].history_marker = history_marker;
            all_icon_list[set_icon_num].history_marker_listener = history_marker_listener[0];
            all_icon_list[set_icon_num].history_info = history_marker_listener[1];
            if(all_app_list[all_icon_list[set_icon_num].app_num].kind == 1 || all_app_list[all_icon_list[set_icon_num].app_num].kind == 3 || all_app_list[all_icon_list[set_icon_num].app_num].kind == 5 || all_app_list[all_icon_list[set_icon_num].app_num].kind == 7)
            {
              all_icon_list[set_icon_num].history_marker.label.color = color123[all_icon_list[set_icon_num].app_num][all_icon_list[set_icon_num].count];
            }
            all_icon_list[set_icon_num].history_marker.setVisible(true);

            if(history_list.length >= 0)
            {
              // draw history chart
              var chart_history_list = [];
              for(var i=0; i<history_list.length; i++)
              {
                chart_history_list.push([Date.parse(history_list[i].time), parseFloat(history_list[i].value)]);
              }

              if(all_icon_list[set_icon_num].history_line != undefined && jQuery.isEmptyObject(all_icon_list[set_icon_num].history_line) == 0) // history_line > 0
              {
                all_icon_list[set_icon_num].history_line.setData(chart_history_list);
              }
              else
              {
                chart.addSeries({
                  name: all_icon_list[set_icon_num].name,
                  data: chart_history_list,
                  color: color123[all_icon_list[set_icon_num].app_num][all_icon_list[set_icon_num].count],
                });

                all_icon_list[set_icon_num].history_line = chart.series[chart.series.length-1];
              }
              $('#highchart').show();
              $('#fuck_off').show();
            }
            

          });
        }

        function set_loc_history_time()
        {
          console.log("icon_num  " + icon_num);
          all_icon_list[icon_num].show = 1;
          //為了Farm新增_start
          // if(all_app_list[all_icon_list[icon_num].app_num].number == 80)
          // {
          //   $('[id="icon_'+icon_num+'"]').css("background-color", color_farm[all_icon_list[icon_num].count]);
          //   $('[id="icon_'+icon_num+'"]').css("color", "white");
          // }
          //為了Farm新增_end
          // else
          // {
            //原先的做else配合
            $('[id="icon_'+icon_num+'"]').css("background-color", color_shape[all_icon_list[icon_num].app_num]);
            $('[id="icon_'+icon_num+'"]').css("color", "white");
          // }

          if(all_app_list[all_icon_list[icon_num].app_num].kind >= 1 && all_app_list[all_icon_list[icon_num].app_num].kind <= 4)
          {
            all_icon_list[icon_num].history = 0;
            if(all_app_list[all_icon_list[icon_num].app_num].show == 0)
            {
              // map.setCenter({lat: all_icon_list[icon_num].lat, lng: all_icon_list[icon_num].lng});
              // all_icon_list[icon_num].info.open(map, all_icon_list[icon_num].marker);
            }
            //為了Farm新增_start
            // if(all_app_list[all_icon_list[icon_num].app_num].number == 80)
            // {
            //   all_icon_list[icon_num].marker.icon.fillColor = color_farm[all_icon_list[icon_num].count];
            //   all_icon_list[icon_num].marker.icon.strokeColor = color_farm[all_icon_list[icon_num].count];
            // }
            //為了Farm新增_end
            all_icon_list[icon_num].marker.setVisible(true);
          }
          else if(all_app_list[all_icon_list[icon_num].app_num].kind >= 5 && all_app_list[all_icon_list[icon_num].app_num].kind <= 8)
          {
            if(all_icon_list[icon_num].history_marker != undefined)
            {
              all_icon_list[icon_num].history_marker.setMap(null);
              google.maps.event.removeListener(all_icon_list[icon_num].history_marker_listener);
            }
            if(all_icon_list[icon_num].history_path != undefined)
            {
              all_icon_list[icon_num].history_path.setMap(null);
            }

            if(all_icon_list[icon_num].history==0)  //0:active_marker
            {
              all_icon_list[icon_num].history = 0;
              // map.setCenter({lat: all_icon_list[icon_num].lat, lng: all_icon_list[icon_num].lng});
              // all_icon_list[icon_num].info.open(map, all_icon_list[icon_num].marker);
              all_icon_list[icon_num].marker.setVisible(true);
            }
            else if(all_icon_list[icon_num].history == 1)  //1:recent_minute
            {
              all_icon_list[icon_num].history = 1;
              set_loc_history_path();
            }
            else if(all_icon_list[icon_num].history == 2)  //2:recent_hour
            {
              all_icon_list[icon_num].history = 2;
              set_loc_history_path();
            }
          }
        }

        function set_loc_history_path()
        {
          var set_icon_num = icon_num;
          $.getJSON($SCRIPT_ROOT + '/secure/history',{
            app_num: all_icon_list[icon_num].real_app_num,
            name: all_icon_list[icon_num].name,
            time: all_icon_list[icon_num].history
          }, function(data) {
            var history_list = data.result.map(function(obj) {return  {lat:obj.lat, lng:obj.lng, value: obj.value}; });
            if(all_icon_list[set_icon_num].show == 0) return;
            if(history_list.length == 0)
            {
              // all_icon_list[set_icon_num].history = 0;
              // map.setCenter({lat: all_icon_list[set_icon_num].lat, lng: all_icon_list[set_icon_num].lng});
              // all_icon_list[set_icon_num].info.open(map, all_icon_list[set_icon_num].marker);
              all_icon_list[set_icon_num].marker.setVisible(true);
              return;
            }
            all_icon_list[set_icon_num].marker.setVisible(false);

            var history_marker = icon_style(all_icon_list[set_icon_num].app_num, history_list[history_list.length-1].lat, history_list[history_list.length-1].lng, history_list[history_list.length-1].value);
            var history_marker_listener = icon_listener(set_icon_num, history_marker);
            all_icon_list[set_icon_num].history_marker = history_marker;
            all_icon_list[set_icon_num].history_marker_listener = history_marker_listener[0];
            all_icon_list[set_icon_num].history_info = history_marker_listener[1];
            
            if(all_app_list[all_icon_list[set_icon_num].app_num].kind == 5 || all_app_list[all_icon_list[set_icon_num].app_num].kind == 7)
            {
              all_icon_list[set_icon_num].history_marker.label.color = color123[all_icon_list[set_icon_num].app_num][all_icon_list[set_icon_num].count];
            }
            all_icon_list[set_icon_num].history_marker.setVisible(true);
            var history_path = new google.maps.Polyline({
              path: history_list,
              geodesic: true,
              strokeColor: color123[all_icon_list[set_icon_num].app_num][all_icon_list[set_icon_num].count],
              strokeOpacity: 0.5,
              strokeWeight: 5,
            });

            all_icon_list[set_icon_num].history_path = history_path;
            all_icon_list[set_icon_num].history_path.setMap(map);
            // map.setCenter({lat: all_icon_list[set_icon_num].history_marker.getPosition().lat(), lng: all_icon_list[set_icon_num].history_marker.getPosition().lng()});

          });
        }

        socket.on('server_response', function(msg) { //[app_num, lat, lng, name, value]
            console.log(msg.data);
            var exist = 0, socket_icon_num;
            for(var i=0; i<all_icon_list.length; i++)
            {
              if(all_icon_list[i].real_app_num == msg.data[0] && all_icon_list[i].name == msg.data[3])
              {
                // console.log(all_icon_list[i]);
                exist = 1;
                socket_icon_num = i;
                all_icon_list[i].marker.setMap(null);
                google.maps.event.removeListener(all_icon_list[i].marker_listener);

                if(all_app_list[all_icon_list[i].app_num].kind >=5 && all_app_list[all_icon_list[i].app_num].kind <=8)
                {
                  all_icon_list[i].lat = parseFloat(msg.data[1]);
                  all_icon_list[i].lng = parseFloat(msg.data[2]);
                }
                

                var marker = icon_style(all_icon_list[i].app_num, all_icon_list[i].lat, all_icon_list[i].lng, msg.data[4]);
                var marker_listener = icon_listener(i, marker);
                all_icon_list[i].marker = marker;
                all_icon_list[i].marker_listener = marker_listener[0];
                all_icon_list[i].info = marker_listener[1];

                //為了Farm新增_start
                // if(all_app_list[all_icon_list[i].app_num].number == 80)
                // {
                //   all_icon_list[i].marker.icon.fillColor = color_farm[all_icon_list[i].count];
                //   all_icon_list[i].marker.icon.strokeColor = color_farm[all_icon_list[i].count];
                // }
                //為了Farm新增_end

                if(all_icon_list[i].show == 1 && all_icon_list[i].history == 0)
                  all_icon_list[i].marker.setVisible(true);
                break;
              }
            }
            if(exist == 0)
            {
              for(var i=0; i<all_app_list.length; i++)
              {
                // console.log(all_app_list[i].number + "*****" + all_icon_list[all_icon_list.length-1].app_num);
                if(all_app_list[i].number == msg.data[0] && all_app_list[i].kind>=5 && all_app_list[i].kind<=8)
                {
                  all_icon_list.push({
                    'app_num': Number(msg.data[0]),
                    'name': msg.data[3],
                    'lat': parseFloat(msg.data[1]),
                    'lng': parseFloat(msg.data[2]),
                    'value': parseFloat(msg.data[4])
                  });
                  all_icon_list[all_icon_list.length-1].description = all_icon_list[all_icon_list.length-1].name;
                  socket_icon_num = all_icon_list.length-1;
                  console.log("new " + all_icon_list[all_icon_list.length-1].name);
                  set_all_icon(all_icon_list.length-1, all_icon_list[all_icon_list.length-1].value, i);
                  break;
                }
              }
              
            }

            if(msg.data[3] == window.person && msg.data[0] == window.trackingAppNum)
            {
              window.trackingCoord = {lat: parseFloat(msg.data[1]), lng: parseFloat(msg.data[2])};
              if(all_icon_list[socket_icon_num].show == 0)
                show_tracking_target(socket_icon_num, parseFloat(msg.data[1]), parseFloat(msg.data[2]), map);
            }


        });

        function icon_style(app_num, lat, lng, value)
        {
          if(all_app_list[app_num].kind == 1 || all_app_list[app_num].kind == 5)
          {
            var marker = new google.maps.Marker({
              position:{lat: lat, lng: lng},
              map: map,
              title: all_app_list[app_num].app,
              label: {text: value.toString(), fontSize: "20px"},
              icon:{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 18,
                strokeWeight:2,
                fillColor:color_shape[app_num],
                fillOpacity: 1,
                strokeColor: color_shape[app_num]//"#000000"
              },
              visible: false,
              zIndex: 999
            });

            if(value.length == 0) //no value
              delete marker.label;

            return marker;
          }
          else if(all_app_list[app_num].kind == 2 || all_app_list[app_num].kind == 6)
          {
            var marker = new google.maps.Marker({
                position: {lat: lat, lng: lng},
                icon: all_app_list[app_num].picture,
                map: map,
                title: all_app_list[app_num].app,
                visible: false
            });
            return marker;
          }
          else if(all_app_list[app_num].kind == 3 || all_app_list[app_num].kind == 7)
          {
            if(value.length > 0)
              var text_str = all_app_list[app_num].icon + ': '+value;
            else
              var text_str = all_app_list[app_num].icon;
            var marker = new google.maps.Marker({
              position:{lat: lat, lng: lng},
              map: map,
              title: all_app_list[app_num].app,
              label: {text: text_str.toString(), fontSize: "20px"},
              icon:{
                path: 'M -1.5,-0.5 1.5,-0.5 1.5,0.5 -1.5,0.5 z',
                scale: 15,
                strokeWeight:10,
                fillColor:color_shape[app_num],
                fillOpacity: 1,
                strokeColor:color_shape[app_num]
              },
              visible: false,
              zIndex: 999
            });
            return marker;
          }
          else if(all_app_list[app_num].kind == 4 || all_app_list[app_num].kind == 8)
          {
            var marker = new google.maps.Marker({
              position:{lat: lat, lng: lng},
              map: map,
              title: all_app_list[app_num].app,
              label: {text: all_app_list[app_num].icon.toString(), fontSize: "25px"},
              icon:{
                path: 'M -0.5,-0.5 0.5,-0.5 0.5,0.5 -0.5,0.5 z',
                scale: 20,
                strokeWeight:10,
                fillColor:color_range_decision(all_app_list[app_num].color_min, all_app_list[app_num].color_max, value),
                fillOpacity: 1,
                strokeColor:color_range_decision(all_app_list[app_num].color_min, all_app_list[app_num].color_max, value)
              },
              visible: false,
              zIndex: 999
            });
            console.log(all_app_list[app_num].app);
            return marker;
          }
        }

        function color_range_decision(min, max, value)
        {
          console.log(min);
          console.log(max);
          console.log(value);
          for(var i=0; i<5; i++)
          {
            if(value >= (min+(max-min)*(i/5)) && value <= (min+(max-min)*((i+1)/5)))
            {
              return color_range[i];
            }
            else if(value > max)
            {
              return color_range[4];
            }
          }

        }

        $(document).click(function(e) {
          if (!$(e.target).is('.list-group-item')) {
              $('.collapse').collapse('hide');      
            }
        });

        $(document).on('click', '#history_btn', function(){
          icon_num = $(this).val();
          app_num = all_icon_list[icon_num].app_num;
          history_form();
        });

        $(window).on("orientationchange",function(){
            console.log("orientationchange");
            resizeIframe(1000, $('#Video-Display')[0]);
        });

        function icon_listener(icon, marker)
        {
          // console.log(all_icon_list[icon].app_num);
          if(all_app_list[all_icon_list[icon].app_num].app == "Camera")
          {
            var info = new google.maps.InfoWindow({
              content: all_icon_list[icon].description
            });
            //*******臨時情況新增_start
            // var content_text = all_icon_list[icon].description;
            // if(content_text.substring(0,4).localeCompare('http') == 0)
            //   content_text = '<a target="_blank" href="'+content_text+'">'+content_text+'</a>';
            // info = new google.maps.InfoWindow({
            //   content: content_text
            // });
            //*******臨時情況新增_end
            var marker_listener = marker.addListener('click', function() {
              resetCenter(marker);
              // $('#Video-Display').attr('src', all_icon_list[icon].description);
              cam_src = all_icon_list[icon].description;
              $('#Video-Display').attr('src', $('#Video-Display').attr('src'));
              $('#Video-Display').show();
              $('#fuck_off').show();
              //******臨時情況新增_start
              // info.open(map, marker);
              // icon_num = icon;
              // app_num = all_icon_list[icon].app_num;
              //******臨時情況新增_end
            });
            return [marker_listener, info];
          }
          else
          {
            var content_text = all_icon_list[icon].description;
            // if(content_text.substring(0,4).localeCompare('http') == 0)
            //   content_text = '<a target="_blank" href="'+content_text+'">'+content_text+'</a>';
            content_text = content_text.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a target="_blank" href="$1">$1</a> ');
            if(content_text.length > 0)
              content_text = content_text + '<br>';
            if(all_app_list[all_icon_list[icon].app_num].kind >= 5 && all_app_list[all_icon_list[icon].app_num].kind <= 8)
              content_text = content_text + '<button type="button" style="border-color:black ;background-color:  #eee; height:30px width:70px; color:#337ab7" class="history btn btn-outline-primary" id="history_btn" value="'+icon+'">History</button>';
            var info = new google.maps.InfoWindow({
              content: content_text
            });
            var marker_listener = marker.addListener('click', function() {
              info.open(map, marker);
              icon_num = icon;
              app_num = all_icon_list[icon].app_num;
              // resetCenter(marker);
              // map.setCenter({lat: all_icon_list[icon].lat, lng: all_icon_list[icon].lng});
            });
            return [marker_listener, info];
          }

          
        }

        $(document).on('click', '#history_btn', function(){
          history_form();
        })

        function resetCenter(marker)
        {
          var high = $("#Location-map").height();
          var high_cam = $("#Video-Display").height();
          var bounds = map.getBounds();
          var ne = bounds.getNorthEast(); // LatLng of the north-east corner
          var sw = bounds.getSouthWest(); // LatLng of the south-west corder
          var LatLng = marker.getPosition();
          var percent = ((high-high_cam)/2)/high;
          var cen = sw.lat() + (ne.lat()-sw.lat())*percent;
          var latlng = new google.maps.LatLng({lat: map.getCenter().lat()-(cen-LatLng.lat()), lng:LatLng.lng()});
          map.setCenter(latlng);
        }
               
        function getDistance(p1, p2) {
            function rad(x){
                return x*Math.PI/180;
            }      
            var Earth_R = 6378137; // Earth’s mean radius in meter
            var dLat = rad(p2.lat - p1.lat);
            var dLong = rad(p2.lng - p1.lng);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
                    Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = Earth_R * c;
            return d; // returns the distance in meter       
        }
              
        function HideAllMarkers(markerArr){
              
                  markerArr.forEach(function(marker) {
                         marker.setVisible(false);
                  });   

        }
        
        function HideAllLines(lineArr){
              
              {
                  lineArr.forEach(function(line) {
                         line.setVisible(false);
                  });   
              }
            
        }
           
        function addMarker(lat, lng, val){
            console.log('adding marker: [ lat: ' + lat + ', lng: ' + lng + ', val: ' + val + ' ]');
            if(getDistance({ lat: lat, lng: lng }, { lat: lastLat, lng: lastLng }) > 2 )  //consider 2 markers are the same if their distance < 2
            {
                HideAllMarkers(markers_sensor[val]);
                var marker = new google.maps.Marker({
                    position:{ lat: lat, lng: lng },
                    map: map,
                    title: "fat fuck",
                    label: val,
                    icon:'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png',
                });
            
                markers_sensor[val].push(marker);
                lastLat= lat;
                lastLng= lng;                
                counterIDs[val]++;
                /*************************************************************************************************************/
                /*  Show camera when marker approach                                                                         */
                /*************************************************************************************************************/
                if(getDistance({ lat: lat, lng: lng }, { lat: camera1.lat, lng: camera1.lng }) <30  && flag_camera!=1 && status[3] == 1 )
                {
                     $('#Video-Display').attr('src', 'http://admin:5131339@140.113.124.220/GetData.cgi?CH=1');
                     $('#function_but').hide();
                     $('.button_sm').hide();
                     $('.button').hide();


                }
                else if(getDistance({ lat: lat, lng: lng }, { lat: camera2.lat, lng: camera2.lng }) <30 && flag_camera!=1  && status[3] == 1 )
                {
                     $('#Video-Display').attr('src', 'http://admin:5131339@140.113.124.221/video1.mjpg');
                     $('#function_but').hide();
                     $('.button_sm').hide();
                     $('.button').hide();
               }
                else{
                     if( flag_camera!=1 )
                     {
                         $('#Video-Display').attr('src', '');
                         $('#function_but').show();
                     }
                }
                /*************************************************************************************************************/
                /*  Show camera when marker approach                                                                         */
                /*************************************************************************************************************/
            }
            
        }
        /*      
        function addPolyLine( index, num, markerArr){     
              polyCoordinates = [];              
              polyCoordinates.push(markerArr[num].position);  // point n
              num--;
              polyCoordinates.push(markerArr[num].position);  // point n-1             
                           
              var markersLine = new google.maps.Polyline({     // line n <--> n-1
                  path: polyCoordinates,
                  strokeColor: "#FF0000",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  visible:true
                });
              polyLines[index].push(markersLine);       // put line n <--> n-1 into polyArray according to the index ( dog1 or dog2)
              polyLines[index][polyLines[index].length-1].setMap(map);
              if(polyLines[index].length > limit)          // polyArray can only store 'limit' lines
              {
                  var temp = [];
                  for(var j=1;j<polyLines[index].length;j++)
                  {
                      temp.push(polyLines[index][j]);
                  }
                  polyLines[index][0].setVisible(false);
                  polyLines[index] = temp;                  
              }              
        }
        */

  /***************************************************************************************************************************************************************/      
        var flag_ob_add = false;
        $(document).on('click', '#ob_add', function(){
          flag_ob_add = true;

          // toast("Please click where you want to add obstacle.");

          google.maps.event.clearInstanceListeners(map);
          icon = 'https://maps.google.com/mapfiles/kml/pal3/icon33.png';
          // prompt("Add Description: ");
          var title = 'obstacle';

          balala(icon,title);
          
        });

        var flag_cam_add = false;
        $(document).on('click', '#cam_add', function(){
          flag_cam_add = true;

          // toast("Please click where you want to add camera.");

          google.maps.event.clearInstanceListeners(map);
          icon = 'https://i.imgur.com/Eh9U0qI.png';
          // prompt("Add Description: ");
          var title = 'camera';

          balala(icon,title);
          
        });

    //     $('.button').on('click', function(){
    //         console.log('tared');
    //         console.log(infowindowIndex);
    //         var clicked = false;
    //         if($(this).hasClass('clickClass'))
    //           clicked = true;
    //         $('.button').removeClass('clickClass');
    //         if(clicked)
    //             $(this).removeClass('clickClass');
    //         else
    //            $(this).addClass('clickClass');
    //         /*if($('#ob_upd').hasClass('clickClass'))
    //         {
    //             //var newInfo = prompt('Enter new information');
    //             //infowindowArr[infowindowIndex].setContent(newInfo);

    //         }*/
    //         if($('#ob_add').hasClass('clickClass'))
    //         {
    //             google.maps.event.clearInstanceListeners(map);

    //             icon = 'http://maps.google.com/mapfiles/kml/pal3/icon33.png';
    //       // prompt("Add Description: ");
    //             var title = 'obstacle';

    //             gg1listen = balala(icon,title);
    //         }
    //         else if($('#cam_add').hasClass('clickClass'))
    //         {
    //             google.maps.event.clearInstanceListeners(map);
    // //prompt("Stream URI: ");
    //             icon = 'http://i.imgur.com/Eh9U0qI.png';
    //             var title = 'camera';
    //             gg2listen = balala(icon , title);
    //         }
    //     });

        /*$('#cam_add').on('click', function(){
            $('#ob_add').removeClass('clickClass');
            $(this).toggleClass('clickClass');
            if($('#cam_add').hasClass('clickClass'))
            {
                google.maps.event.clearInstanceListeners(map);
    //prompt("Stream URI: ");
                icon = 'http://i.imgur.com/Eh9U0qI.png';
                var title = 'camera';
                gg2listen = balala(icon , title);
            }
        });*/

        var balala = function(icon , title){        
            var listenergg = google.maps.event.addListener(map, 'click', function(event) {
                
                // var sv = new google.maps.StreetViewService();
                // sv.getPanorama({location: event.latLng, radius: 30}, processSVData);

                // function processSVData(data, status) {
                //   if (status === 'OK') {
                //     // yoo
                //     var URL = 1;
                //     // yoo
                //     if(URL)
                //     {
                        
                //         addIcon(data.location.latLng, icon , title, URL);
                //     }
                //   } else {
                //     console.error('Street View data not found for this location.');
                //   }
                // }
                if(flag_ob_add == true || flag_cam_add ==true)
                {
                  var LatLng = event.latLng;
                  //console.log(LatLng.lat()+","+LatLng.lng());
                  var RoadAPI = "https://roads.googleapis.com/v1/nearestRoads?points="+LatLng.lat()+","+LatLng.lng()+"&key=AIzaSyCT1MkhTlOJjKg1NLqb0yyD_0o3Q6_-dr8";
                  $.getJSON( RoadAPI, {
                  })
                    .done(function(data) {
                      //console.log("done" + data);
                      if(jQuery.isEmptyObject(data))
                      {

                        // toast("Please click on the road");

                        return;
                      }
                      //console.log(data.snappedPoints[0].location.latitude);
                      var lat = data.snappedPoints[0].location.latitude;
                      var lng = data.snappedPoints[0].location.longitude;
                      // if(lat-LatLng.lat() > 0.00001 || lng-LatLng.lng() > 0.00001)
                      // {

                      //   toast("Please click on the road");

                      // }
                      // else
                      // {
                        addIcon(lat,lng, icon , title, URL);
                      // }
                      
                    });

                }
                  

                // return function(){};
            });
      };
        

        

        function addIcon(lat,lng,icon_ ,title, URL)
        {          
        //deleteMarkers();
            // yoo
            flag_ob_add = false;
            flag_cam_add = false;
            console.log("addicon");
            // if(title == 'camera' && !($('#cam_add').hasClass('clickClass')))
            //   return;
            // if(title == 'obstacle' && !($('#ob_add').hasClass('clickClass')))
            //   return;

            var infofo = prompt("Add Information: ");
                        // yoo
            if(!infofo) return 0;
            // var marker = new google.maps.Marker({
            //     icon: icon_,
            //     position:{lat: lat, lng: lng},
            //     map: map, 
            //     fillOpacity: 0.4,
            //     title: title,
            //     // yoo
            //     content: infofo

            //     // yoo
            // //icon: pinImage
            //     });



            $.getJSON($SCRIPT_ROOT + '/secure/_add_markers',{
                lat: lat,
                lon: lng,
                type:title,
                content: infofo
              }, function(data) {
                for (var i = 0; i < markers.length; i++) {
                  markers[i].setMap(null);
                }

                markers = [];
                load_markers();
                // var marker = new google.maps.Marker({
                //     position: {lat: lat, lng: lng},
                //     icon: icon_,
                //     map: map,
                //     title: title,
                //     content:infofo,
                //     id: data.result
                // });
                // console.log(data.result);
            //   if(marker.title == 'camera'){
            //     markers.push(marker);
            //     marker.addListener('click', function() {
            //       if($('#Video-Display').attr('src') == marker.content){
            //             $('#Video-Display').attr('src', '');
            //             $('#function_but').show();

            //       }
            //       else{
            //       $('#Video-Display').attr('src', marker.content);
            //       $('#function_but').hide();
            //       $('.button_sm').hide();
            //       $('.button').hide();
            //     }



            //       if($('#cam_rm').hasClass('clickClass'))
            //               {
            //                 marker.setVisible(false);
            //                 infowindow.close();
            //                 $('#Video-Display').attr('src', '');

            //               }
            //     });
            // }
            // if(marker.title == 'camera'){
            // var infowindow = new google.maps.InfoWindow({
            //               content: '<button type="submit" id="camera_info" value='+data.result+'>修改</button><button type="submit" id="camera_del" value='+data.result+'>刪除</button>'
            // });
            // marker.addListener('click', function() {
            //     infowindow.open(map, marker);
            // });
            // }
            // if(marker.title == 'obstacle'){
              
            // var infowindow = new google.maps.InfoWindow({
            //               content: marker.content +'</br><button type="submit" id="obstacle_info" value='+data.result+'>修改</button><button type="submit" id="obstacle_del" value='+data.result+'>刪除</button>'
            // });
            // marker.addListener('click', function() {
            //     infowindow.open(map, marker);
            // });

            // }
            // markers.push(marker);

            });

            
        }


        var infowindowIndex = -1;
        infowindowArr = [];
        function addListenertoObstacle()
        {
          markers.forEach(function(marker) {
                    if(marker.title == 'obstacle'){
                    
                    var infowindow = new google.maps.InfoWindow({
                          content: marker.content
                        });
                      marker.addListener('click', function() {
                          infowindow.open(map, marker);
                          if($('#ob_upd').hasClass('clickClass'))
                          {
                             var newInfo = prompt('Enter new information');
                              infowindow.setContent(newInfo);
                          }
                          if($('#ob_rm').hasClass('clickClass'))
                          {
                            marker.setVisible(false);
                            infowindow.close();
                            marker.content = "";
                          }
                        });
                    marker.index = infowindowArr.length;

                    infowindowArr.push(infowindow);
                }
            });
        }

        addListenertoObstacle();
    /***************************************************************************************************************************************************************/     
        
        

 }
});


