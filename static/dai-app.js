 $(function(){
            $('#dog').hide();
            var startPos;
            var geoOptions = {
               timeout: 10 * 1000
            }

            var geoSuccess = function(position) {
              var geolocation_init = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              map_init(geolocation_init);
            };
            var geoError = function(error) {
              var geolocation_init = { lat:24.7895711, lng:120.9967021};
              map_init(geolocation_init);
              console.log('Error occurred. Error code: ' + error.code);
              
              // error.code can be:
              //   0: unknown error
              //   1: permission denied
              //   2: position unavailable (error response from location provider)
              //   3: timed out
            };

            navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);


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
        var map;        
        function initialize() {
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
                      {
                          "weight": 7
                      }
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

        initialize();           
        
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
                icon: 'http://maps.google.com/mapfiles/kml/pal3/icon33.png'
            },
            info: {
                icon: iconBase + 'info-i_maps.png'
            },
            camera: {
                icon: 'http://i.imgur.com/Eh9U0qI.png'
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


        load_markers();
        
        function load_markers()
        {
          $.getJSON($SCRIPT_ROOT + '/secure/_take_markers', function(data) {
              features = data.result.map(function(object) {return  {
                id: object.id,
                position: new google.maps.LatLng(object.lat, object.lon),
                type: object.type,
                content: object.content
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

                marker.addListener('click', function() {
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
                                
                                $('#function_but').hide();
                                $('.button_sm').hide(); 
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
           $('#Video-Display').attr('src', '');
           // $('#Video-Display').css({"z-index": -10});
           $('#Video-Display').hide();
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
        $(document).on('click', '#button_s4', function(){
          
          if (flag_history == 0)
          {
            $.getJSON($SCRIPT_ROOT + '/secure/history',{
                dog_id: 0
              }, function(data) {
                //console.log(data.result);
                flightPlanCoordinates = data.result.map(function(dog) {return  {lat:dog.lat, lng:dog.lon}; })
                //$("#result").text(courseStr);
                console.log(flightPlanCoordinates);

                var StartPosition = flightPlanCoordinates[0];
                addMarker_Start(StartPosition);
                  //setMapOnAll(map);

                function addMarker_Start(location) {
                  var marker = new google.maps.Marker({
                    position: location,
                    //label: "起點",
                    map: map,
                    icon: "/static/img/history_start_icon.png"
                  });
                  //markers.push(marker);
                  console.log(marker);
                  his_markers.push(marker);
                }

                var EndPosition = flightPlanCoordinates[flightPlanCoordinates.length - 1];
                addMarker_End(EndPosition);
                  //setMapOnAll(map);

                function addMarker_End(location) {
                  var marker = new google.maps.Marker({
                    position: location,
                    //label: "終點",
                    map: map,
                    icon: '/static/img/history_end_icon.png'
                  });
                  //markers.push(marker);
                  console.log(marker);
                  his_markers.push(marker);
                }

                var lineSymbol = {
                  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  scale: 3,
                  //strokeColor: '#393'
                };

                flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                icons: [{
                  icon: lineSymbol,
                  offset: '100%'
                }],
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                //map: map
                });

                animateCircle(flightPath);

                flightPath.setMap(map);

                function animateCircle(line) {
                  // console.log("animateCircle comein");
                  var count = 0;
                  window.setInterval(function() {
                    count = (count + 1) % 200;

                    var icons = line.get('icons');
                    icons[0].offset = (count / 2) + '%';
                    line.set('icons', icons);
                }, 50);
              }

              flag_history = 1;

            });

          }
          if (flag_history == 1)
          {
            console.log(flightPath);
            //stopArrow(flightPath);
            //clearMarkers();
            flightPath.setMap(null);
            for(var i=0; i<his_markers.length; i++)
            {
                his_markers[i].setMap(null);
            }
            his_markers = [];
            flag_history = 0;
/*
            function stopArrow(line) {
                clearInterval(line.handle);
                line.setOptions({
                    icons: null});
            };*/
          }

        });

        var directionsDisplay;
        var directionsService;
        var haight;//origin: (24.7882499,121.01580720000001)(24.782146, 120.997231)(24.7872622,120.9979454)
        var oceanBeach; //= new google.maps.LatLng(24.7852481, 120.9979445);
        var listener_routing;

        var flag_route = 0;
        var flightPath_routing;
        var marker_routing;
        var marker_routing_now;
        var placeSearch, autocomplete;
        $(document).on('click', '#button_route', function(){
          if (flag_route == 0){
            flag_route = 1;
            flag_routing = 0;
            $('#input_destination').show();
            $('#autocomplete').val('');
            // document.getElementById("button_route").innerHTML="結束規劃";
            
            $("#text").html('結束規劃');
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
              // When the user selects an address from the dropdown, populate the address
              // fields in the form.
              autocomplete.addListener('place_changed', function(){
                placeSearch = autocomplete.getPlace();
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
              //   });
              // }
            }
          }
          else{
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
            }

            if(marker_routing_now != null) marker_routing_now.setMap(null);
            $('#input_destination').hide();
            // str1 = '<li role="presentation" id="button_route" style="cursor:pointer"><a>路徑規劃</a></li>';
            // $("#button_route").html(str1);
            $("#text").html('路徑規劃');
            $('#button_route').removeClass('active');
          }
        });


        var flag_routing = 0;

        


        $(document).on('click', '#button_route', function(){

          if (flag_routing == 0)
          {
              flag_routing = 1;
              getLocation();

              function getLocation() {
                var startPos;
                var geoOptions = {
                  enableHighAccuracy: true
                }

                var geoSuccess = function(position) {
                  var lat = position.coords.latitude;
                  var lng = position.coords.longitude;
                  var CurrentPosition = {lat: lat, lng: lng};
                  addMarker_routing(CurrentPosition);
                  //setMapOnAll(map);

                  function addMarker_routing(location) {
                    if(marker_routing_now != null) marker_routing_now.setMap(null);
                    marker_routing_now = new google.maps.Marker({
                      position: location,
                      label: "現在位置",
                      map: map,
                      //icon: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png'
                    });
                    //markers.push(marker);

                  }
                  /*
                  function setMapOnAll(map) {
                    for (var i = 0; i < markers.length; i++) {
                      markers[i].setMap(map);
                    }
                  }*/
                  //markers.push(marker);

                  //marker.setMap(map);
                  //var directionsDisplay;
                  directionsService = new google.maps.DirectionsService();
                  haight = new google.maps.LatLng(lat,lng);//origin: (24.7882499,121.01580720000001)(24.782146, 120.997231)(24.7872622,120.9979454)
                  // oceanBeach //= new google.maps.LatLng(24.7852481, 120.9979445);
                  
                  var listener_routing = google.maps.event.addListener(map, 'click', function(event) {
                      oceanBeach = event.latLng;
                      //console.log(oceanBeach);
                      if(marker_routing != null) marker_routing.setMap(null);
                      marker_routing = new google.maps.Marker({
                      position:oceanBeach,
                      map: map
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
                    $('#autocomplete').val(oceanBeach);
                  });

                  function initialize() {
                    directionsDisplay = new google.maps.DirectionsRenderer();
                    directionsDisplay.setMap(map);
                  }

                  

                  function calcRoute() {
                    if(marker_routing == undefined)
                    {
                      oceanBeach = $('#autocomplete').val();
                      console.log(oceanBeach);
                      marker_routing = new google.maps.Marker({
                      position:placeSearch.geometry.location,
                      map: map
                    });
                    }
                    var selectedMode = "DRIVING";
                    var DirectionsRequest = {
                        origin: haight,
                        destination: oceanBeach,
                        //optimizeWaypoints: true,
                        provideRouteAlternatives: true,
                        //waypoints: optimize:true,
                        // Note that Javascript allows us to access the constant
                        // using square brackets and a string value as its
                        // "property."
                        travelMode: google.maps.TravelMode[selectedMode]
                    };

                    directionsService.route(
                        DirectionsRequest,
                        function (response, status) {
                            var line_color = '#0044BB';//[,'#FF0000', '#db8555', '#806b63'];
                            var ob_flag = 0;
                            var ob_array = [];
                            if (status == google.maps.DirectionsStatus.OK) {
                                $.getJSON($SCRIPT_ROOT + '/secure/_take_obstacles', function(data) {
                                        //console.log(data.result);
                                        ob_array = data.result.map(function(obj) {return  {lat:obj.lat, lng:obj.lon}; })
                                        //$("#result").text(courseStr);
                                        // console.log(JSON.stringify(ob_array));

                                        for (var i = 0, len = response.routes.length; i < len; i++) {
                                          /*new google.maps.DirectionsRenderer({
                                              map: map,
                                              directions: response,
                                              routeIndex: i
                                          });*/
                                          //console.log(JSON.stringify(response.routes[i]));
                                          
                                          console.log("response.routes " + i);
                                          var path_bounds = response.routes[i].bounds;
                                          path_bounds = JSON.stringify(path_bounds);
                                          path_bounds = JSON.parse(path_bounds);        //path_bounds.south
                                          console.log(path_bounds.south);
                                          var path = response.routes[i].overview_path;
                                          path = JSON.stringify(path);
                                          path = JSON.parse(path);
                                          // console.log(path);

                                          var ob_array_in_area = [];
                                          for(var m = 0; m < ob_array.length; m++){
                                            if(ob_array[m].lat > path_bounds.south && ob_array[m].lat < path_bounds.north)
                                              if(ob_array[m].lng > path_bounds.west && ob_array[m].lng < path_bounds.east)
                                                ob_array_in_area.push(ob_array[m]);
                                          }

                                          console.log(JSON.stringify(ob_array_in_area));
                                          for (var j = 0; j < path.length-1; j++){
                                              
                                              for(var k = 0; k < ob_array_in_area.length; k++){
                                                var dis = 0;

                                                if(path[j+1].lat == path[j].lat)
                                                {　
                                                  dis = Math.abs(path[j].lat-ob_array_in_area[k].lat);
                                                }
                                                else
                                                {
                                                  var a = (path[j+1].lng-path[j].lng)/(path[j+1].lat-path[j].lat);
                                                  var b = path[j].lng - a*path[j].lat;
                                                  dis = Math.abs(a*ob_array_in_area[k].lat-ob_array_in_area[k].lng+b)/Math.sqrt(a*a+1);
                                                }
                                                //console.log(dis);

                                                if(dis < 0.0000086)   //0.0000086
                                                  {
                                                    console.log("in" + dis);
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
                                            console.log("有進來");
                                            //var path = response.routes[i].overview_path;
                                            flightPath_routing = new google.maps.Polyline({
                                            path: path,
                                            geodesic: true,
                                            strokeColor: line_color,
                                            strokeOpacity: 1.0,
                                            strokeWeight: 2,
                                            //map: map
                                            });

                                            flightPath_routing.setMap(map);
                                            google.maps.event.removeListener(listener_routing);
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
                                            //break;
                                          
                                          }
                                          else
                                          {
                                            if(i == (response.routes.length-1))
                                            {

                                              toast("There is no road to destination.");
                                              console.log(flightPath_routing);
                                              $('#input_destination').show();
                                              marker_routing.setMap(null);
                                            }
                                            ob_flag = 0;
                                          }                                      
                                      }
                                      // marker_routing.addListener('click', function() {
                                      //         infowindow = new google.maps.InfoWindow({
                                      //           content: '<button type="submit" id="routing_cancel">取消</button>'
                                      //         });

                                      //         infowindow.open(map, marker);

                                      //       $(document).on('click', '#routing_cancel', function(){            
                                      //         flightPath.setMap(null);
                                      //       });
                            
                                      //       });

                                });
                                
                            } else {
                                $("#error").append("Unable to retrieve your route<br />");
                            }
                        }
                    );
                    
                    
                  }
                  initialize();
                  $(document).on('click', '#button_s5', function(){
                  calcRoute();
                  $('#input_destination').hide();
                });
                  console.log(lat+","+lng);

                  //console.log(typeof lat);
                  //marker.setVisible(true);
                };
                var geoError = function(error) {
                  console.log('Error occurred. Error code: ' + error.code);
                  // error.code can be:
                  //   0: unknown error
                  //   1: permission denied
                  //   2: position unavailable (error response from location provider)
                  //   3: timed out
                };

                navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
              };
              
          }
          /*if (flag_routing == 1)
          {
            
          }*/

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
        var interval;
        var marker_dog = [];
        var online_list = []; 
        var str = '';
        var flag_marker = [];
        var flag_active = []; 
        var flag_his_hour = [];
        var flag_his_day = [];
        var arr_latlng = [];
        var active_id;
        var history_hour = [];
        var history_day = [];
        var color123 = ['#708090','#4682b4','#008080','#3cb371','#800080'];



        $(document).on('click','.history',function(){
            
            var now = new Date();
            active_id = $(this).val();
            console.log(now.getSeconds() +" "+active_id);
            if(flag_marker[active_id] == 0)
            { 
              $("#"+active_id).css("background-color", color123[active_id]);
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
                      var lineSymbol = {
                        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                        scale: 3
                      };

                      flightPath = new google.maps.Polyline({
                      path: flightPlanCoordinates,
                      icons: [{
                        icon: lineSymbol,
                        offset: '100%'
                      }],
                      geodesic: true,
                      strokeColor: color123[active_id],
                      strokeOpacity: 1.0,
                      strokeWeight: 2
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

                      var lineSymbol = {
                        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                        scale: 3
                      };

                      flightPath = new google.maps.Polyline({
                      path: flightPlanCoordinates,
                      icons: [{
                        icon: lineSymbol,
                        offset: '100%'
                      }],
                      geodesic: true,
                      strokeColor: color123[active_id],
                      strokeOpacity: 1.0,
                      strokeWeight: 2
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
                          var lineSymbol = {
                            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            scale: 3
                          };

                          flightPath = new google.maps.Polyline({
                          path: flightPlanCoordinates,
                          icons: [{
                            icon: lineSymbol,
                            offset: '100%'
                          }],
                          geodesic: true,
                          strokeColor: color123[color_line],
                          strokeOpacity: 1.0,
                          strokeWeight: 2,
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
                        $.ajaxSettings.async = false;
                        $.getJSON($SCRIPT_ROOT + '/secure/history',{
                          dog_id: online_list[i],
                          time: t_his
                        }, function(data) {
                          var flightPlanCoordinates = data.result.map(function(dog) {return  {lat:dog.lat, lng:dog.lon}; });
                          console.log(flightPlanCoordinates);

                          var lineSymbol = {
                            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            scale: 3
                          };

                          flightPath = new google.maps.Polyline({
                          path: flightPlanCoordinates,
                          icons: [{
                            icon: lineSymbol,
                            offset: '100%'
                          }],
                          geodesic: true,
                          strokeColor: color123[color_line],
                          strokeOpacity: 1.0,
                          strokeWeight: 2
                          });

                          flightPath.setMap(map);
                          history_day[color_line] = flightPath;
                        });
                        $.ajaxSettings.async = true;
                      }
                     }
                    },10000);
                      

                    
                    
                  
                  
                  document.body.removeChild(form);


              });

              
            }
            if(flag_marker[active_id] == 1)
            {
              $("#"+active_id).css("background-color", "white");
              $("#"+active_id).css("color", "black");
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
              if(history_day[active_id] != null)
              {
                history_day[active_id].setMap(null);
                history_day[active_id] = null;
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


        function GeoLoData_O(data){
           var time = data[0];
           var Latitude = parseFloat(data[1][0]);
           var Longitude = parseFloat(data[1][1]);
           var val = data[1][2];
           var meta = JSON.stringify(data[1][3]);
           meta = JSON.parse(meta);
           
           if(Latitude != -1 && Longitude != -1 && flag == 0) // check is the data come in for the first time
           {
              flag = 1;
              $('#dog').show();
              // $('#dog').removeClass('disabled');              
              $('#dog_dropdown').attr("data-toggle", "dropdown");
              document.getElementById("dog_dropdown").style.cursor = "pointer";
              if(meta.type != undefined)
                $("#dog_dropdown").html(meta.type + '<span class="caret"></span>');
              status[4] = 1;              
           }
           if( Number.isInteger(val) && !isNaN(Latitude) && !isNaN(Longitude) && (Latitude>=-90) && (Latitude<=90) && (Longitude>=-180) && (Longitude<=180))//status[4]==1 &&
           {              
               var val = parseInt(val);
               var new_online = 1; // 0:this id is not a new one, 1:this is a new id             
               for (var i = 0; i < online_list.length; i++) {
                 if(val == online_list[i]){
                    new_online = 0;
                    break;
                 }
               }

               if (new_online == 1){
                
                if(meta.name != undefined)
                  str = '<li style="cursor:pointer" ><button style="width:140px;border-radius: 4px;margin:2px;height:30px;font-size:18px; background-color:white" type="submit" class="history" id='+online_list.length+' value='+online_list.length+'>'+meta.name+'</button></li>';
                else
                  str = '<li style="cursor:pointer" ><button style="width:140px;border-radius: 4px;margin:2px;height:30px;font-size:18px; background-color:white" type="submit" class="history" id='+online_list.length+' value='+online_list.length+'>Mark'+val+'</button></li>';
                // console.log(str);
                online_list.push(val);
                flag_active.push(0);
                flag_marker.push(0);
                flag_his_hour.push(0);
                flag_his_day.push(0);
                marker_dog.push(null);
                history_hour.push(null);
                history_day.push(null);
                t.push(null);
                arr_latlng.push({lat:Latitude, lng:Longitude});
                console.log(marker_dog);
                $("#dog-list").append(str);
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
                    var marker = new google.maps.Marker({
                    position:arr_latlng[i],
                    map: map,
                    //label: online_list[i].toString(),
                    icon:{
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 10,
                      strokeWeight:7,
                      strokeColor:color123[i]
                    },
                    visible: false
                    });
                    marker_dog[i] = marker;
                    if(flag_active[i]==1)
                    {
                      marker_dog[i].setVisible(true);
                    }
                  //}
                }
               }

                


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
           // else
           //     HideAllMarkers(markers_sensor[val]);
            
            
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
          icon = 'http://maps.google.com/mapfiles/kml/pal3/icon33.png';
          // prompt("Add Description: ");
          var title = 'obstacle';

          balala(icon,title);
          
        });

        var flag_cam_add = false;
        $(document).on('click', '#cam_add', function(){
          flag_cam_add = true;

          // toast("Please click where you want to add camera.");

          google.maps.event.clearInstanceListeners(map);
          icon = 'http://i.imgur.com/Eh9U0qI.png';
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
        
                
        function iot_app(){}
        
        var profile = {
            'dm_name': 'Map',          
            'is_sim': false,
            'df_list':[GeoLoData_O],
        }

        var ida = {
            'iot_app': iot_app,
        }; // How iot device receive data (format)
        dai(profile,ida);     
 }
});

 function detach() {
            window.d_name = null;
            IoTtalk.detach(mac);
        }
        window.onunload = detach;
        window.onbeforeunload = detach;
        window.onclose = detach;
        window.onpagehide = detach;

