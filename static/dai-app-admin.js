 $(function(){
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
            center: new google.maps.LatLng(24.7895711, 120.9967021),
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

        function close_form()
        {
          $('#add-obstacle').hide();
          $('#add-camera').hide();
          $('#delete-obstacle').hide();
          $('#delete-camera').hide();
          $('#Video-Display').attr('src', '');
          $('#Video-Display').hide();
          $('#fuck_off').hide();
          $("#ob_add").removeClass('active');
          $("#cam_add").removeClass('active');
          if(marker_now != null)marker_now.setMap(null);
        }
        var marker_listener = [];
        load_markers();
        
        function load_markers()
        { console.log(marker_listener);
          
          if(marker_listener.length > 0)
          {
            for (var i = 0; i < markers.length; i++) {
              // console.log("markers remove");
              markers[i].setMap(null);
            }

            markers = [];
            
            for(var i=0; i<marker_listener.length; i++)
            {
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
                      var high_cam = $("#Video-Display").height()+$("#delete-camera").height();
                      var bounds = map.getBounds();
                      var ne = bounds.getNorthEast(); // LatLng of the north-east corner
                      var sw = bounds.getSouthWest(); // LatLng of the south-west corder
                      var LatLng = marker.getPosition();
                      var percent = ((high-high_cam)/2)/high;
                      var cen = sw.lat() + (ne.lat()-sw.lat())*percent;
                      var latlng = new google.maps.LatLng({lat: map.getCenter().lat()-(cen-LatLng.lat()), lng:LatLng.lng()});
                      map.setCenter(latlng);
                    }
                    // google.maps.event.addListener(map, 'zoom_changed', function() {resetCenter();});

                    if(marker.title == 'camera'){
                          $('#new_url').val(marker.content);
                          close_form();
                          $("#delete-camera").show();
                          $("#cam_info").val(marker.id);
                          $("#cam_del").val(marker.id);
                          $("#cam_cancel").val(marker.id);
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
                        //google.maps.event.clearInstanceListeners(marker);
                         $('#new_info').val(marker.content);
                         if(infowindow != null) {infowindow.close();}
                          infowindow = new google.maps.InfoWindow({
                            content: marker.content //+'</br><button type="submit" id="obstacle_info" value='+marker.id+'>修改</button><button type="submit" id="obstacle_del" value='+marker.id+'>刪除</button>'
                          });

                          //infowindow.setContent('<button onclick="myFunction()">修改</button>');
                          infowindow.open(map, marker);
                          close_form();
                          $("#delete-obstacle").show();
                          $("#ob_info").val(marker.id);
                          $("#ob_del").val(marker.id);
                          $("#ob_cancel").val(marker.id);

                      } 
                });
                marker_listener.push(marker_listen);
            
            });
          markers.forEach(function(marker) { marker.setMap(map); });
          console.log(markers.length);
        });  
        }

            $(document).on('click', '#ob_info', function(){            
                      //var marker_id = $(this).val();
                      var marker_id = $(this).val();
                      var new_info = $('#new_info').val();
                      console.log("新說明：" + new_info);
                      $.getJSON($SCRIPT_ROOT + '/secure/_modify_markers',{
                          id: marker_id,
                          content: encodeURIComponent(new_info)
                        }, function(data) {
                        
                        for (var i = 0; i < markers.length; i++) {
                            if (markers[i].id == marker_id) {
                                infowindow.setContent(new_info);
                                infowindow.open(map, markers[i]);//console.log(data.result);
                                markers[i].content = new_info;
                                $("#delete-obstacle").hide();
                            }
                        }
                      });
                            
            });

            $(document).on('click', '#cam_info', function(){            
                      //var marker_id = $(this).val();
                      var marker_id = $(this).val();
                      var new_info = $('#new_url').val();
                      $.getJSON($SCRIPT_ROOT + '/secure/_modify_markers',{
                          id: marker_id,
                          content: new_info
                        }, function(data) {
                        $("#delete-camera").hide();
                        $('#Video-Display').attr('src', '');
                        $('#Video-Display').hide();
                        $('#fuck_off').hide();
                        $('#Video-Display').attr('src', new_info);
                        $('#Video-Display').show();
                        $('#fuck_off').show();
                        for (var i = 0; i < markers.length; i++) {
                          markers[i].setMap(null);
                        }

                        markers = [];
                        load_markers();
                        // for (var i = 0; i < markers.length; i++) {
                        //     if (markers[i].id == marker_id) {
                        //         infowindow.setContent('<button type="submit" id="obstacle_info" value='+marker_id+'>修改</button><button type="submit" id="obstacle_del" value='+marker_id+'>刪除</button>');
                        //         infowindow.open(map, markers[i]);//console.log(data.result);
                        //         markers[i].content = new_info;
                        //     }
                        // }
                      });
                            
            });

            $(document).on('click', '#ob_del', function(){            

                      //toast($(this).val());

                      var marker_id = $(this).val();
                      console.log(marker_id);
                      for(var i=0; i< markers.length; i++)
                      {
                        if(markers[i].id == marker_id)
                        {
                          markers[i].setMap(null);
                          infowindow.close();
                        }
                      }
                      $.getJSON($SCRIPT_ROOT + '/secure/_del_markers',{
                          id: marker_id
                        }, function(data) {
                        //console.log(data.result);
                        //Find and remove the marker from the Array
                        // for (var i = 0; i <= markers.length; i++) {
                        //     if (markers[i].id == marker_id) {
                        //         //Remove the marker from Map  
                        //         //console.log(markers[i].id);                
                        //         markers[i].setMap(null);console.log(markers[i].id);
                        //         //Remove the marker from array.
                        //         markers.splice(i, 1);
                                
                        //     }
                        // }
                        /*for (var i = 0; i < markers.length; i++) {
                          markers[i].setMap(null);
                          markers[i] = null;
                        }*/
                        // markers = [];
                        $("#delete-obstacle").hide();
                        load_markers();

                      });
                        
            });

            $(document).on('click', '#cam_del', function(){            

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
                                $("#delete-camera").hide();
                            }
                        }

                      });
                        
            });


        $(document).on('click', '#cam_cancel_2', function(){            
                  $('#delete-camera').hide();
                  infowindow.close();
                  $('#Video-Display').attr('src', '');
                  $('#Video-Display').hide();
                  $('#fuck_off').hide();
        });

        $(document).on('click', '#ob_cancel_2', function(){            
                  $('#delete-obstacle').hide();
                  infowindow.close();
                  $('#Video-Display').attr('src', '');
                  $('#Video-Display').hide();
                  $('#fuck_off').hide();
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
        

//         var flightPath;
//         var flag_history = 0;
//         var his_markers = [];
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
//                   path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
//                   scale: 3,
//                   //strokeColor: '#393'
//                 };

//                 flightPath = new google.maps.Polyline({
//                 path: flightPlanCoordinates,
//                 icons: [{
//                   icon: lineSymbol,
//                   offset: '100%'
//                 }],
//                 geodesic: true,
//                 strokeColor: '#FF0000',
//                 strokeOpacity: 1.0,
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

        var flag_route = 0;

        $(document).on('click', '#button_route', function(){
          if (flag_route == 0){
            flag_route = 1;
            $('#input_destination').show();
            // document.getElementById("button_route").innerHTML="結束規劃";
            
            $("#text").html('結束規劃');
            $('#button_route').addClass('active');
          }
          else{
            flag_route = 0;
            $('#input_destination').hide();
            // str1 = '<li role="presentation" id="button_route" style="cursor:pointer"><a>路徑規劃</a></li>';
            // $("#button_route").html(str1);
            $("#text").html('路徑規劃');
            $('#button_route').removeClass('active');
          }
        });


        var flag_routing = 0;

        


        $(document).on('click', '#button_s5', function(){

          if (flag_routing == 0)
          {

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
                    var marker = new google.maps.Marker({
                      position: location,
                      label: "現在位置",
                      map: map,
                      //icon: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png'
                    });
                    //markers.push(marker);
                    console.log(marker);

                  }
                  /*
                  function setMapOnAll(map) {
                    for (var i = 0; i < markers.length; i++) {
                      markers[i].setMap(map);
                    }
                  }*/
                  //markers.push(marker);

                  //marker.setMap(map);
                  var directionsDisplay;
                  var directionsService = new google.maps.DirectionsService();
                  var haight = new google.maps.LatLng(lat,lng);//origin: (24.7882499,121.01580720000001)(24.782146, 120.997231)(24.7872622,120.9979454)
                  var oceanBeach //= new google.maps.LatLng(24.7852481, 120.9979445);

                  

                  function initialize() {
                    directionsDisplay = new google.maps.DirectionsRenderer();
                    directionsDisplay.setMap(map);
                  }

                  function calcRoute() {

                    // toast("Please click your destination on the map.");

                    var listener_routing = google.maps.event.addListener(map, 'click', function(event) {
                      oceanBeach = event.latLng;
                      //console.log(oceanBeach);
                      var marker_routing = new google.maps.Marker({
                      position:oceanBeach,
                      map: map
                    });
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
                            var line_color = ['#0044BB','#FF0000', '#db8555', '#806b63'];
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
                                          
                                          if(ob_flag == 0)
                                          {

                                            //var path = response.routes[i].overview_path;
                                            var flightPath = new google.maps.Polyline({
                                            path: path,
                                            geodesic: true,
                                            strokeColor: line_color[i],
                                            strokeOpacity: 1.0,
                                            strokeWeight: 2,
                                            //map: map
                                            });

                                            flightPath.setMap(map);
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

                                              // toast("There is no road to destination.");

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
                    });
                    
                  }
                  initialize();
                  calcRoute();
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
              


        

        

        var marker_dog = [];
        var online_list = []; 
        var str = '';
        var flag_marker = [];
        var flag_active = []; 
        var flag_his = [];
        var arr_latlng = [];
        var active_id;
        var history_hour = [];
        var history_day = [];
        $(document).on('click','#history',function(){
            
            var now = new Date();
            active_id = $(this).val();
            console.log(now.getSeconds() +" "+active_id);
            if(flag_marker[active_id] == 0)
            { 
              
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
                    var t = 1;
                    flag_marker[active_id] = 1;
                    flag_his[active_id] = 1;
                    $.getJSON($SCRIPT_ROOT + '/secure/history',{
                      dog_id: online_list[active_id],
                      time: t
                    }, function(data) {
                      //console.log(data.result);
                      var flightPlanCoordinates = data.result.map(function(dog) {return  {lat:dog.lat, lng:dog.lon}; });
                      console.log(flightPlanCoordinates);
                      //$("#result").text(courseStr);
                      // console.log(flightPlanCoordinates);

                      // var StartPosition = flightPlanCoordinates[0];
                      // addMarker_Start(StartPosition);
                        //setMapOnAll(map);

                      // function addMarker_Start(location) {
                      //   var marker = new google.maps.Marker({
                      //     position: location,
                      //     //label: "起點",
                      //     map: map,
                      //     icon: "/static/img/history_start_icon.png"
                      //   });
                      //   //markers.push(marker);
                      //   console.log(marker);
                      //   his_markers.push(marker);
                      // }

                      // var EndPosition = flightPlanCoordinates[flightPlanCoordinates.length - 1];
                      // addMarker_End(EndPosition);
                      //   //setMapOnAll(map);

                      // function addMarker_End(location) {
                      //   var marker = new google.maps.Marker({
                      //     position: location,
                      //     //label: "終點",
                      //     map: map,
                      //     icon: '/static/img/history_end_icon.png'
                      //   });
                      //   //markers.push(marker);
                      //   console.log(marker);
                      //   his_markers.push(marker);
                      // }

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
                      history_hour[active_id] = flightPath;

                      function animateCircle(line) {
                        // console.log("animateCircle comein");
                        var count = 0;
                        window.setInterval(function() {
                          count = (count + 1) % 200;

                          var icons = line.get('icons');
                          icons[0].offset = (count / 20) + '%';
                          line.set('icons', icons);
                      }, 50);
                    }

            });
                  }
                  if(optradio == "recent_day")
                  {
                    var t = 2;
                    flag_marker[active_id] = 1;
                    flag_his[active_id] = 1;
                    $.getJSON($SCRIPT_ROOT + '/secure/history',{
                      dog_id: online_list[active_id],
                      time: t
                    }, function(data) {
                      //console.log(data.result);
                      var flightPlanCoordinates = data.result.map(function(dog) {return  {lat:dog.lat, lng:dog.lon}; });
                      console.log(flightPlanCoordinates);
                      //$("#result").text(courseStr);
                      // console.log(flightPlanCoordinates);

                      // var StartPosition = flightPlanCoordinates[0];
                      // addMarker_Start(StartPosition);
                        //setMapOnAll(map);

                      // function addMarker_Start(location) {
                      //   var marker = new google.maps.Marker({
                      //     position: location,
                      //     //label: "起點",
                      //     map: map,
                      //     icon: "/static/img/history_start_icon.png"
                      //   });
                      //   //markers.push(marker);
                      //   console.log(marker);
                      //   his_markers.push(marker);
                      // }

                      // var EndPosition = flightPlanCoordinates[flightPlanCoordinates.length - 1];
                      // addMarker_End(EndPosition);
                      //   //setMapOnAll(map);

                      // function addMarker_End(location) {
                      //   var marker = new google.maps.Marker({
                      //     position: location,
                      //     //label: "終點",
                      //     map: map,
                      //     icon: '/static/img/history_end_icon.png'
                      //   });
                      //   //markers.push(marker);
                      //   console.log(marker);
                      //   his_markers.push(marker);
                      // }

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
                      history_day[active_id] = flightPath;

                      function animateCircle(line) {
                        // console.log("animateCircle comein");
                        var count = 0;
                        window.setInterval(function() {
                          count = (count + 1) % 200;

                          var icons = line.get('icons');
                          icons[0].offset = (count / 100) + '%';
                          line.set('icons', icons);
                      }, 50);
                    }

            });
                  }
                  document.body.removeChild(form);


              });

              
            }
            if(flag_marker[active_id] == 1)
            {
              //console.log(flag_active.length);
              flag_active[active_id] = 0;
              flag_marker[active_id] = 0;
              flag_his[active_id] = 0;
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


        function IDGeoLoData_O(data){
           var time = data[0];
           var Latitude = parseFloat(data[1][0]);
           var Longitude = parseFloat(data[1][1]);
           var val = data[1][2];
           var meta = JSON.stringify(data[1][3]);

           
           if(Latitude != -1 && Longitude != -1 && flag == 0) // check is the data come in for the first time
           {
              flag = 1;
              $('#dog').removeClass('disabled'); 
              $('#dog_dropdown').attr("data-toggle", "dropdown");
              document.getElementById("dog_dropdown").style.cursor = "pointer";
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
                str = str + '<li style="cursor:pointer" ><button type="submit" id="history" value='+online_list.length+'>'+val+'</button></li>';
                // console.log(str);
                online_list.push(val);
                flag_active.push(0);
                flag_marker.push(0);
                flag_his.push(0);
                marker_dog.push(null);
                history_hour.push(null);
                history_day.push(null);
                arr_latlng.push({lat:Latitude, lng:Longitude});
                console.log(marker_dog);
               }
               $("#dog-list").html(str);

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
                    label: online_list[i].toString(),
                    icon:'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png',
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
        
        function getLocation_admin() {
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
              marker_now = new google.maps.Marker({
                position: location,
                label: "現在位置",
                map: map
              });

              map.setCenter(location);
            }
           
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
        }

        var flag_ob_add = false;
        var lat_ob_add;
        var lng_ob_add;
        var title_ob_add = 'obstacle';
        var marker_ob_add;
        $(document).on('click', '#ob_add', function(){
          if(marker_cam_add!=null) marker_cam_add.setMap(null);
          if(marker_ob_add!=null) marker_ob_add.setMap(null);
          $('#add_content').val("");
          if(marker_now != null)marker_now.setMap(null);
          close_form();
          $(this).addClass('active');
          $('#add-obstacle').show();
          flag_ob_add = true;

          // toast("Please click where you want to add obstacle.");
          getLocation_admin();
          google.maps.event.clearInstanceListeners(map);
          icon = 'http://maps.google.com/mapfiles/kml/pal3/icon33.png';
          // prompt("Add Description: ");
          
            
            google.maps.event.addListener(map, 'click', function(event) {
                if(marker_ob_add!=null) marker_ob_add.setMap(null);
                if(marker_cam_add!=null) marker_cam_add.setMap(null);
                if(flag_ob_add == true)
                {
                  var LatLng = event.latLng;
                  var RoadAPI = "https://roads.googleapis.com/v1/nearestRoads?points="+LatLng.lat()+","+LatLng.lng()+"&key=AIzaSyCT1MkhTlOJjKg1NLqb0yyD_0o3Q6_-dr8";
                  $.getJSON( RoadAPI, {
                  })
                    .done(function(data) {
                      if(jQuery.isEmptyObject(data)){
                        toast("Please click on the road");
                        return;
                      }

                      lat_ob_add = data.snappedPoints[0].location.latitude;
                      lng_ob_add = data.snappedPoints[0].location.longitude;

                      marker_ob_add = new google.maps.Marker({
                          position: {lat: lat_ob_add, lng: lng_ob_add},
                          icon: icon,
                          map: map,
                          title: title_ob_add,
                      });



                    });

                }

            });

            $(document).on('click', '#ob_in', function(){
            if(marker_ob_add!=null) marker_ob_add.setMap(null);
            if(marker_now != null)marker_now.setMap(null);
            $("#ob_add").removeClass('active');
            $('#add-obstacle').hide();
            flag_ob_add = false;
            console.log("addicon");
            var infofo = $('#add_content').val();
            $('#add_content').val("");
            console.log(lat_ob_add);
            if(!infofo || !lat_ob_add || !lng_ob_add || !title_ob_add) return 0;

            $.getJSON($SCRIPT_ROOT + '/secure/_add_markers',{
                lat: lat_ob_add,
                lon: lng_ob_add,
                type:title_ob_add,
                content: encodeURIComponent(infofo)
              }, function(data) {
                console.log(data.result);
                /*for (var i = 0; i < markers.length; i++) {
                  markers[i].setMap(null);
                }

                markers = [];*/
                load_markers();
                
            });

          });

          $(document).on('click', '#ob_cancel', function(){
            if(marker_now != null)marker_now.setMap(null);
            $("#ob_add").removeClass('active');
            $('#add-obstacle').hide();
            flag_ob_add = false;
            $('#add_url').val("");
            marker_ob_add.setMap(null);
            marker_ob_add = null;
            lat_ob_add = null;
            lng_ob_add = null;
          });           
          
        });

        var flag_cam_add = false;
        var lat_cam_add;
        var lng_cam_add;
        var title_cam_add = 'camera';
        var marker_cam_add;
        $(document).on('click', '#cam_add', function(){
          if(marker_cam_add!=null) marker_cam_add.setMap(null);
          if(marker_ob_add!=null) marker_ob_add.setMap(null);
          if(marker_now != null)marker_now.setMap(null);
          close_form();
          $(this).addClass('active');
          $('#add-camera').show();
          flag_cam_add = true;

          // toast("Please click where you want to add camera.");
          getLocation_admin();
          google.maps.event.clearInstanceListeners(map);
          icon = 'http://i.imgur.com/Eh9U0qI.png';
          // prompt("Add Description: ");
          

          google.maps.event.addListener(map, 'click', function(event) {
                if(marker_cam_add!=null) marker_cam_add.setMap(null);
                if(marker_ob_add!=null) marker_ob_add.setMap(null);
                if(flag_cam_add == true)
                {
                  var LatLng = event.latLng;
                  var RoadAPI = "https://roads.googleapis.com/v1/nearestRoads?points="+LatLng.lat()+","+LatLng.lng()+"&key=AIzaSyCT1MkhTlOJjKg1NLqb0yyD_0o3Q6_-dr8";
                  $.getJSON( RoadAPI, {
                  })
                    .done(function(data) {
                      if(jQuery.isEmptyObject(data)){
                        toast("Please click on the road");
                        return;
                      }

                      lat_cam_add = data.snappedPoints[0].location.latitude;
                      lng_cam_add = data.snappedPoints[0].location.longitude;

                      marker_cam_add = new google.maps.Marker({
                          position: {lat: lat_cam_add, lng: lng_cam_add},
                          icon: icon,
                          map: map,
                          title: title_cam_add,
                      });



                    });

                }

            });

            $(document).on('click', '#cam_in', function(){
            if(marker_now != null)marker_now.setMap(null);
            if(marker_cam_add!=null) marker_cam_add.setMap(null);
            $("#cam_add").removeClass('active');
            $('#add-camera').hide();
            flag_cam_add = false;
            console.log("addicon");
            var infofo = $('#add_url').val();
            $('#add_url').val("");
            console.log(lat_cam_add);
            if(!infofo || !lat_cam_add || !lng_cam_add || !title_cam_add) return 0;

            $.getJSON($SCRIPT_ROOT + '/secure/_add_markers',{
                lat: lat_cam_add,
                lon: lng_cam_add,
                type:title_cam_add,
                content: infofo
              }, function(data) {
                console.log(data.result);
                for (var i = 0; i < markers.length; i++) {
                  markers[i].setMap(null);
                }

                markers = [];
                load_markers();
                
            });

          });     

          $(document).on('click', '#cam_cancel', function(){
            if(marker_now != null)marker_now.setMap(null);
            $("#cam_add").removeClass('active');
            $('#add-camera').hide();
            flag_cam_add = false;
            $('#add_url').val("");
            marker_cam_add.setMap(null);
            marker_cam_add = null;
            lat_cam_add = null;
            lng_cam_add = null;
          });     
          
        });
        /*var Parkingmarker = new google.maps.Marker({
                position:{lat:24.78838016, lng:120.99908091},
                map: map,
                label: {text: "P", fontSize: "20px", color:"#FFFFFF"},
                //label: online_list[i].toString(),
                icon:{
                  path: 'M -1.5,-0.5 1.5,-0.5 1.5,0.5 -1.5,0.5 z',//google.maps.SymbolPath.CIRCLE,
                  scale: 15,
                  strokeWeight:10,
                  fillColor:'#5cb85c',
                  fillOpacity: 1,
                  strokeColor:'#5cb85c'
                },
              });*/

		// Parkingmarker.setMap(map);
		if(infowindow != null) {infowindow.close();}
		  infowindow = new google.maps.InfoWindow({
		    content: '<div style="color:#FF0000">Emergency</div>' //+'</br><button type="submit" id="obstacle_info" value='+marker.id+'>修改</button><button type="submit" id="obstacle_del" value='+marker.id+'>刪除</button>'
		  });

		  //infowindow.setContent('<button onclick="myFunction()">修改</button>');
		  // infowindow.open(map, Parkingmarker);
      

      $(document).on('click', '#app_add', function(){
        $('#MainMenu').collapse('hide');
        refresh_all_form();

        for(var letter=0; letter<26; letter++)
        {
          $("#app_icon_select").append($("<option></option>").attr("value", String.fromCharCode(65+letter)).text(String.fromCharCode(65+letter)));    
          for(var i=0; i<already_use_letter.length; i++)
          {
            if(String.fromCharCode(65+letter) == already_use_letter[i])
            {
              $("#app_icon_select option[value='"+String.fromCharCode(65+letter)+"']").remove();
            }
          }
        }
        $('#app_form').show();
      });   

      $(document).on('click', '#app_mobility_select', function(){
        if(app_mobility_select_on_off == 0)
          app_mobility_select_on_off = 1;
        else       //app_mobility_select_on_off == 1
        {
          app_mobility_select_on_off = 0;
          var mobility = $("#app_mobility_select").val();
          console.log(mobility);
        }
        
      });

      $(document).on('click', '#app_icon_select', function(){
        if(app_icon_select_on_off == 0)
          app_icon_select_on_off = 1;
        else       //app_icon_select_on_off == 1
        {
          app_icon_select_on_off = 0;
          var icon = $("#app_icon_select").val();
          console.log(icon);
          if(icon.localeCompare("Picture") == 0)
          {
          $('#Picture').modal('show');
          $('#Visual').hide();
          $('#Color').modal('hide');
          }
          else if(icon.localeCompare("NoLetter") == 0)
          {
            $('#Picture').modal('hide');
            $('#Visual').hide();

            $('#Color').modal('hide');
          }
          else
          {
            $('#Visual').show();
            $('#Picture').modal('hide');
          }
        }
        
      });

      $('#Quick_Access_decide').attr("checked", false);
      $(document).on('click', '#app_visual_select', function(){
        if(app_visual_select_on_off == 0)
          app_visual_select_on_off = 1;
        else
        {
          app_visual_select_on_off = 0;
          var Visual = $("#app_visual_select").find(":selected").val();
          console.log(Visual);
          if(Visual.localeCompare("Color") == 0)
          {
             $('#Color').modal('show');
          }
          else
          {
             $('#Color').modal('hide');
          }
        } 
        
      });  

      $(document).on('click', '#app_save', function(){
        app_form_value.push($('#app_name').val());
        app_form_value.push($('#app_mobility_select').val());
        app_form_value.push($('#app_icon_select').val());
        app_form_value.push($('#picture_URL').val());
        app_form_value.push($('#app_visual_select').val());
        app_form_value.push($('#color_min').val());
        app_form_value.push($('#color_max').val());
        if($("#Quick_Access_decide").prop('checked') == true)
          app_form_value.push(1);
        else
          app_form_value.push(0);


        if(app_form_value[1] == "Stationary")
        {
          if(app_form_value[2] == "NoLetter")
          {
            app_form_value.push(1);
            app_form_value[4] = null;
          }
          else if(app_form_value[2] == "Picture")
          {
            app_form_value.push(2);
            app_form_value[4] = null;
          }
          else
          {
            if(app_form_value[4] == "Text")
            {
              app_form_value.push(3);   
            }
            else if(app_form_value[4] == "Color")
            {
              app_form_value.push(4);    
            }
          }
        }
        else if(app_form_value[1] == "Movable")
        {
          if(app_form_value[2] == "NoLetter")
          {
            app_form_value.push(5);
            app_form_value[4] = null;
          }
          else if(app_form_value[2] == "Picture")
          {
            app_form_value.push(6);
            app_form_value[4] = null;
          }
          else
          {
            if(app_form_value[4] == "Text")
            {
              app_form_value.push(7);   
            }
            else if(app_form_value[4] == "Color")
            {
              app_form_value.push(8);    
            }
          }
        }
        if(app_num == null)
        {
          $.getJSON($SCRIPT_ROOT + '/secure/_add_app',{
              app: app_form_value[0],
              kind: app_form_value[8],
              mobility: app_form_value[1],
              icon: app_form_value[2],
              picture: app_form_value[3],
              visual: app_form_value[4],
              color_min: app_form_value[5],
              color_max: app_form_value[6],
              quick_access: app_form_value[7]
            }, function(data) {
              console.log(app_form_value);
              app_form_value = [];
              load_all_app();
              refresh_app_form();
          });
        }
        else
        {
          $.getJSON($SCRIPT_ROOT + '/secure/_modify_app',{
              number: all_app_list[app_num].number,
              app: app_form_value[0],
              kind: app_form_value[8],
              mobility: app_form_value[1],
              icon: app_form_value[2],
              picture: app_form_value[3],
              visual: app_form_value[4],
              color_min: app_form_value[5],
              color_max: app_form_value[6],
              quick_access: app_form_value[7]
            }, function(data) {
              console.log( app_num+ " " + app_form_value);
              app_form_value = [];
              load_all_app();
              refresh_app_form();
          });
        }
      });    

      $(document).on('click', '#app_del', function(){
        console.log('app_del num:' + app_num);
        if(app_num != null)
        {
          $.getJSON($SCRIPT_ROOT + '/secure/_del_app',{
              number: all_app_list[app_num].number
            }, function(data) {
              load_all_app();
          });
        }
        refresh_app_form();
        
      });

      $(document).on('click', '#app_cancel', function(){
        refresh_app_form();
      });

      function refresh_app_form()
      {
        app_num = null;
        $('#app_name').val('');
        $("#app_mobility_select").val("Stationary");
        $("#app_icon_select").val("NoLetter");
        $('#picture_URL').val('');
        $("#app_visual_select").val("Text");
        $('#color_min').val('');
        $('#color_max').val('');
        $('#Quick_Access_decide').prop('checked', false);
        $('#Visual').hide();
        for(var letter=0; letter<26; letter++)
        {
          $("#app_icon_select option[value='"+String.fromCharCode(65+letter)+"']").remove();
        }
        $('#app_form').hide();
      }

      $(document).on('click', '#icon_save', function(){
        icon_loc = $('#icon_loc').val().split(",");
        if(icon_num != null)
            all_static_icon_list[icon_num].marker.setVisible(false);
        if(icon_num == null)
        {
          $.getJSON($SCRIPT_ROOT + '/secure/_add_static_icon',{
              app_num: all_app_list[app_num].number,
              name: $('#icon_name').val(),
              lat: icon_loc[0],
              lng: icon_loc[1],
              description: $('#icon_desc').val()
            }, function(data) {
              load_all_app();
              refresh_icon_form();
          });
        }
        else
        {
          $.getJSON($SCRIPT_ROOT + '/secure/_modify_static_icon',{
              number: all_static_icon_list[icon_num].number,
              name: $('#icon_name').val(),
              lat: icon_loc[0],
              lng: icon_loc[1],
              description: $('#icon_desc').val()
            }, function(data) {
              load_all_app();
              refresh_icon_form();
          });
        }
      });

      $(document).on('click', '#icon_del', function(){
        console.log('icon_del num:' + icon_num);
        if(icon_num != null)
        {
          $.getJSON($SCRIPT_ROOT + '/secure/_del_static_icon',{
              number: all_static_icon_list[icon_num].number
            }, function(data) {
              load_all_app();
              refresh_icon_form();
          });
        }
        else
        {
          refresh_icon_form();
        }
      });

      $(document).on('click', '#icon_cancel', function(){
        refresh_icon_form();
      });

      function refresh_icon_form()
      {
        app_num = null;
        icon_num = null;
        icon_loc = null;
        if(marker_now != null) marker_now.setMap(null);
        if(icon_loc_marker != null) icon_loc_marker.setMap(null);
        if(icon_loc_listener != undefined) google.maps.event.removeListener(icon_loc_listener);
        $('#icon_name').val('');
        $('#icon_loc').val('');
        $('#icon_loc').removeAttr('disabled');
        $('#icon_desc').val('');
        $('#icon_form').hide();
      }

      function icon_loc_update()
      {
        if(icon_loc_listener != undefined) google.maps.event.removeListener(icon_loc_listener);
        icon_loc_listener = google.maps.event.addListener(map, 'click', function(event) {
          if(icon_num != null)
          {
            all_static_icon_list[icon_num].marker.setVisible(false);
            all_static_icon_list[icon_num].info.close();
          }
          if(icon_loc_marker != null) icon_loc_marker.setMap(null);
          icon_loc = event.latLng;

          var lat = icon_loc.lat();
          var lng = icon_loc.lng();

          icon_loc_marker = icon_style(app_num, lat, lng);
          icon_loc_marker.setVisible(true);

          icon_loc_marker.addListener('click', function() {
            icon_loc_marker.setMap(null);
            $('#icon_loc').val('');
          });

          $('#icon_loc').val(lat.toFixed(8)+ ", " + lng.toFixed(8));

          // var RoadAPI = "https://roads.googleapis.com/v1/nearestRoads?points="+icon_loc.lat()+","+icon_loc.lng()+"&key=AIzaSyCT1MkhTlOJjKg1NLqb0yyD_0o3Q6_-dr8";
          // $.getJSON( RoadAPI, {
          // }).done(function(data) {
          //   if(jQuery.isEmptyObject(data))
          //   {
          //     return;
          //   }
          //   var lat = data.snappedPoints[0].location.latitude;
          //   var lng = data.snappedPoints[0].location.longitude;

          //   icon_loc_marker = icon_style(app_num, lat, lng);
          //   icon_loc_marker.setVisible(true);

          //   icon_loc_marker.addListener('click', function() {
          //     icon_loc_marker.setMap(null);
          //     $('#icon_loc').val('');
          //   });

          //   $('#icon_loc').val(lat.toFixed(8)+ ", " + lng.toFixed(8));
          // });
          
        });
      }

      function refresh_all_form()
      {
        refresh_icon_form();
        refresh_app_form();
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
            $(document).off('click', '#add_'+i);
            $('#'+i+'_menu').remove();
            $('#'+i+'_quick_menu').remove();  
          }
          for(var i=0; i<all_static_icon_list.length; i++)
          {
            $(document).off('click', '#icon_'+i);
            all_static_icon_list[i].marker.setMap(null);
            google.maps.event.removeListener(all_static_icon_list[i].marker_listener);
          }
          already_use_letter = [];
          all_static_icon_list = [];
          all_app_list = [];
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
          console.log(all_app_list);

          $.getJSON($SCRIPT_ROOT + '/secure/_take_all_static_icon', function(data) {
            all_static_icon_list = data.result.map(function(obj) {return  {
                'number': obj.number,
                'ori_app_num': obj.app_num,
                'name': obj.name,
                'lat': obj.lat,
                'lng': obj.lng,
                'description': obj.description
              }; 
            });
            console.log(all_static_icon_list);

            // all_app_list.sort((a, b) => a.app.localeCompare(b.app));
            
            for(var i=0; i<all_app_list.length; i++)
            {            
              var app_name = all_app_list[i].app;
              // if(all_app_list[i].kind == 3 || all_app_list[i].kind == 7)
              //       app_name = all_app_list[i].icon+":"+all_app_list[i].app;Add 

              // str = '<li class="menu-item dropdown dropdown-submenu" id="'+i+'_menu"> \
              //           <button  type="button" style="border-color:white ;background-color:  #eee; min-width:138px; color:#337ab7" class="dropdown-toggle history btn btn-outline-primary" data-toggle="dropdown" id="app_'+i+'" value="'+i+'">'+app_name+'</button> \
              //       </li>'
              str = '<div id="'+i+'_menu"><button type="button" style="cursor:default;background-color:#fff; min-width:138px; color:#555" class="list-group-item history btn btn-outline-primary" data-toggle="collapse" data-parent="#MainMenu" data-target="#'+i+'_list" id="app_'+i+'" value="'+i+'">'+app_name+' &#9662;</button></div>';
              $('#app_list').append(str);

              if(all_app_list[i].quick_access == 1)
              {
                console.log('quick_access == 1: ' + all_app_list[i].app);
                str = '<li id="'+i+'_quick_menu" role="presentation" class="menu-item dropdown dropdown-hover" class="active"> \
                        <button type="button" id="app_'+i+'" style="min-width:120px;height:40px;cursor:pointer;color:#fff;background:'+color_shape[i]+';" class="dropdown-toggle history btn btn-outline-primary" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" value="'+i+'">'+app_name+'<span class="caret"></span></button> \
                      </li>';
                $('#list').append(str);
              }
              

              if(all_app_list[i].kind>=1 && all_app_list[i].kind<=8)
              {
                console.log("app: " + $('#app_'+i).val() + ", kind: " + all_app_list[i].kind);


                // str = '<ul class="dropdown-menu pre-scrollable" style="min-width: 140px;" id="'+i+'_list"></ul>'
                // $('#'+i+'_menu').append(str);
                str = '<div class="collapse subnav" style="min-width: 140px;" id="'+i+'_list"></div>';
                $('#'+i+'_menu').append(str);

                if(all_app_list[i].kind>=1 && all_app_list[i].kind<=4)
                {
                // str = '<li class="menu-item" style="cursor:pointer;min-width: 140px;" ><button type="button" style="border-color:white ;background-color:  #eee; min-width:100%; color:#337ab7" class="history btn btn-outline-primary" id="add_'+i+'" value="'+i+'">Add '+all_app_list[i].app+'</button></li>';
                str = '<button type="button" style="border-color:white ;background-color:  #eee; min-width:100%; color:#337ab7" class="list-group-item history btn btn-outline-primary" id="add_'+i+'" value="'+i+'">Add '+all_app_list[i].app+'</button>';
                $('#'+i+'_list').append(str);
                }
                // str = '<li class="menu-item" style="cursor:pointer;min-width: 140px;" ><button type="button" style="border-color:white ;background-color:  #eee; min-width:100%; color:#337ab7" class="history btn btn-outline-primary" id="show_'+i+'" value="'+i+'">Show All</button></li>';
                str = '<button type="button" style="border-color:white ;background-color:  #eee; min-width:100%; color:#337ab7" class="list-group-item history btn btn-outline-primary" id="show_'+i+'" value="'+i+'">Show All</button>';
                $('#'+i+'_list').append(str);

                if(all_app_list[i].quick_access == 1)
                {
                  str = '<ul class="dropdown-menu pre-scrollable" id="'+i+'_quick_list" style="min-width: 130px;"></ul>';
                  $('#'+i+'_quick_menu').append(str);

                  if(all_app_list[i].kind>=1 && all_app_list[i].kind<=4)
                  {
                  str = '<li style="cursor:pointer;min-width: 140px;" ><button  type="button" style="border-color:white ;background-color:#eee; min-width:100%; color:#337ab7" class="history btn btn-outline-primary" id="add_'+i+'" value="'+i+'">Add '+all_app_list[i].app+'</button></li>';
                  $('#'+i+'_quick_list').append(str);
                  }
                  str = '<li style="cursor:pointer;min-width: 140px;" ><button  type="button" style="border-color:white ;background-color:#eee; min-width:100%; color:#337ab7" class="history btn btn-outline-primary" id="show_'+i+'" value="'+i+'">Show All</button></li>';
                  $('#'+i+'_quick_list').append(str);
                }

                all_app_list[i].show = 0;
                all_app_list[i].show_count = 0;
                // all_app_list[i].marker_list = [];

                for(var j=0; j<all_static_icon_list.length; j++)
                {
                  if(all_static_icon_list[j].ori_app_num == all_app_list[i].number)
                  {
                    var marker = icon_style(i, all_static_icon_list[j].lat, all_static_icon_list[j].lng);
                    all_static_icon_list[j].app_num = i;
                    var marker_listener = icon_listener(j, marker);
                    all_static_icon_list[j].show = 0;
                    all_static_icon_list[j].marker = marker;
                    all_static_icon_list[j].marker_listener = marker_listener[0];
                    all_static_icon_list[j].info = marker_listener[1];

                    // str = '<li class="menu-item" style="cursor:pointer;min-width: 140px;" ><button type="button" style="border-color:white ;background-color:  #eee; min-width:100%; color:#337ab7" class="history btn btn-outline-primary" id="icon_'+j+'" value="'+j+'">'+all_static_icon_list[j].name+'</button></li>';
                    str = '<button type="button" style="border-color:white ;background-color:  #eee; min-width:100%; color:#337ab7" class="list-group-item history btn btn-outline-primary" id="icon_'+j+'" value="'+j+'">'+all_static_icon_list[j].name+'</button>';
                    $('#'+i+'_list').append(str);

                    if(all_app_list[i].quick_access == 1)
                    {
                      str = '<li style="cursor:pointer;min-width: 140px;" ><button  type="button" style="border-color:white ;background-color:#eee; min-width:100%; color:#337ab7" class="history btn btn-outline-primary" id="icon_'+j+'" value="'+j+'">'+all_static_icon_list[j].name+'</button></li>';
                      $('#'+i+'_quick_list').append(str);
                    }

                    $(document).on('click', '#icon_'+j, function(){
                      refresh_all_form();
                      icon_num = $(this).val();
                      app_num = all_static_icon_list[icon_num].app_num;
                      $('#MainMenu').collapse('hide');
                      $('#'+app_num+'_list').collapse('hide');
                      console.log('all_static_icon_list[icon_num].show: '+ all_static_icon_list[icon_num].show);
                      if(all_static_icon_list[icon_num].show == 0)
                      {
                        // add_app_show_count();
                        all_static_icon_list[icon_num].show = 1;
                        $('[id="icon_'+icon_num+'"]').css("background-color", color_shape[app_num]);
                        $('[id="icon_'+icon_num+'"]').css("color", "white");
                        $('#icon_name').val(all_static_icon_list[icon_num].name);
                        $('#icon_loc').val(all_static_icon_list[icon_num].lat.toFixed(8)+ ", " + all_static_icon_list[icon_num].lng.toFixed(8));
                        if(all_app_list[app_num].kind>=5 && all_app_list[app_num].kind<=8)
                          $('#icon_loc').attr('disabled', true);
                        else
                          $('#icon_loc').removeAttr('disabled');
                        $('#icon_desc').val(all_static_icon_list[icon_num].description);
                        map.setCenter({lat: all_static_icon_list[icon_num].lat, lng: all_static_icon_list[icon_num].lng});
                        if(all_app_list[app_num].kind>=1 && all_app_list[app_num].kind<=4)
                          icon_loc_update();
                        all_static_icon_list[icon_num].info.open(map, all_static_icon_list[icon_num].marker);
                        all_static_icon_list[icon_num].marker.setVisible(true);
                        // if(all_app_list[app_num].app == 'Camera')  
                        // {
                        //   $('#desc').html("URL");
                        // }
                        // else
                        // {
                        //   $('#desc').html("Description");
                        // }

                        $('#icon_form').show();
                      }
                      else //all_static_icon_list[icon_num].show == 1
                      {
                        // decrease_app_show_count();
                        if(all_app_list[app_num].show > 0)
                        {
                          all_app_list[app_num].show = 0;
                          $('[id="show_'+app_num+'"]').css("background-color", "#eee");
                          $('[id="show_'+app_num+'"]').css("color", "#337ab7");
                          $('[id="show_'+app_num+'"]').html('Show All');
                        }
                        all_static_icon_list[icon_num].show = 0;
                        $('[id="icon_'+icon_num+'"]').css("background-color", "#eee");
                        $('[id="icon_'+icon_num+'"]').css("color", "#337ab7");
                        all_static_icon_list[icon_num].info.close();
                        all_static_icon_list[icon_num].marker.setVisible(false);
                        refresh_icon_form();
                      }
                      
                    });

                  }
                }
              }
              
              

              if(all_app_list[i].kind==3 || all_app_list[i].kind==4 || all_app_list[i].kind==7 || all_app_list[i].kind==8)
              {
                already_use_letter.push(all_app_list[i].icon);
                console.log(already_use_letter);
              }

              $(document).on('click', '#show_'+i, function(){
                app_num = $(this).val();
                $('#MainMenu').collapse('hide');
                $('#'+app_num+'_list').collapse('hide');
                console.log('app_num: '+ app_num);
                if(all_app_list[app_num].show == 0)
                {
                  all_app_list[app_num].show = 1;
                  $('[id="show_'+app_num+'"]').css("background-color", color_shape[app_num]);
                  $('[id="show_'+app_num+'"]').css("color", "white");
                  $('[id="show_'+app_num+'"]').html('Hide All');

                  for(var j=0; j<all_static_icon_list.length; j++)
                  {
                    if(all_static_icon_list[j].app_num == app_num)
                    {
                      // if(all_static_icon_list[j].show == 0)
                      //   add_app_show_count();
                      all_static_icon_list[j].show = 1;
                      $('[id="icon_'+j+'"]').css("background-color", color_shape[app_num]);
                      $('[id="icon_'+j+'"]').css("color", "white");
                      all_static_icon_list[j].marker.setVisible(true);
                    }
                  }
                }
                else //all_app_list[app_num].show == 1
                {
                  all_app_list[app_num].show = 0;
                  $('[id="show_'+app_num+'"]').css("background-color", "#eee");
                  $('[id="show_'+app_num+'"]').css("color", "#337ab7");
                  $('[id="show_'+app_num+'"]').html('Show All');
                  for(var j=0; j<all_static_icon_list.length; j++)
                  {
                    if(all_static_icon_list[j].app_num == app_num)
                    {
                      // decrease_app_show_count();
                      all_static_icon_list[j].show = 0;
                      $('[id="icon_'+j+'"]').css("background-color", "#eee");
                      $('[id="icon_'+j+'"]').css("color", "#337ab7");
                      all_static_icon_list[j].info.close();
                      all_static_icon_list[j].marker.setVisible(false);
                    }
                  }
                }
              });

              $(document).on('click', '#app_'+i, function(){
                refresh_all_form();
                app_num = $(this).val();
                /*$('#MainMenu').collapse('hide');
                $('#'+app_num+'_list').collapse('hide');*/
                for(var letter=0; letter<26; letter++)
                {
                  $("#app_icon_select").append($("<option></option>").attr("value", String.fromCharCode(65+letter)).text(String.fromCharCode(65+letter)));    
                  for(var i=0; i<already_use_letter.length; i++)
                  {
                    if(String.fromCharCode(65+letter) == already_use_letter[i])
                    {
                      if(String.fromCharCode(65+letter) != all_app_list[app_num].icon)
                        $("#app_icon_select option[value='"+String.fromCharCode(65+letter)+"']").remove();
                    }
                  }
                }

                $('#app_name').val(all_app_list[app_num].app);
                $("#app_mobility_select").val(all_app_list[app_num].mobility);
                $("#app_icon_select").val(all_app_list[app_num].icon);
                $('#picture_URL').val(all_app_list[app_num].picture);
                if(all_app_list[app_num].visual.length > 0)
                {
                  $("#app_visual_select").val(all_app_list[app_num].visual);
                  $('#Visual').show();
                }
                $('#color_min').val(all_app_list[app_num].color_min);
                $('#color_max').val(all_app_list[app_num].color_max);
                if(all_app_list[app_num].quick_access == 1)
                  $('#Quick_Access_decide').prop('checked', true);
                $('#app_form').show();

              });

              $(document).on('click', '#add_'+i, function(){
                refresh_all_form();
                getLocation_admin();
                icon_loc_update();

                app_num = $(this).val();

                //Add Camera form Description -> URL
                // if(all_app_list[app_num].app == 'Camera')  
                // {
                //   $('#desc').html("URL");
                // }
                // else
                // {
                //   $('#desc').html("Description");
                // }
                $('#icon_form').show();
              });
            }

          });

          

        });
      }

      // $(document).on('mouseover', '#app_btn', function(){
      //     console.log("app_btn in");
      //     $('#MainMenu').collapse('show');  
      // });

      // $(document).on('mouseleave', '#app_btn', function(){
      //     console.log("app_btn in");
      //     $('#MainMenu').collapse('hide');  
      // });

      $(document).on('mouseleave', '#MainMenu', function(){
          $('.collapse').collapse('hide');  
      });

      $(document).click(function(e) {
        console.log(e.target);
        if (!$(e.target).is('.list-group-item')) {
            $('.collapse').collapse('hide');      
          }
      });

      function add_app_show_count()
      {
        if(all_app_list[app_num].show_count == 0)
        {
          $('[id="app_'+app_num+'"]').css("background-color", color_shape[app_num]);
          $('[id="app_'+app_num+'"]').css("color", "white");
        }

        all_app_list[app_num].show_count = all_app_list[app_num].show_count + 1;
      }

      function decrease_app_show_count()
      {
        all_app_list[app_num].show_count = all_app_list[app_num].show_count - 1;

        if(all_app_list[app_num].show_count == 0)
        {
          $('[id="app_'+app_num+'"]').css("background-color", "#fff");
          $('[id="app_'+app_num+'"]').css("color", "#555");
          $("#color_scale_"+app_num).remove();
        }
      }

      function icon_style(app_num, lat, lng)
      {
        if(all_app_list[app_num].kind == 1 || all_app_list[app_num].kind == 5)
        {
          var marker = new google.maps.Marker({
            position:{lat: lat, lng: lng},
            map: map,
            title: all_app_list[app_num].app,
            icon:{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 15,
              strokeWeight:7,
              fillColor:color_shape[app_num],
              fillOpacity: 1,
              strokeColor:color_shape[app_num]
            },
            visible: false,
            zIndex: 999
          });
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
          var marker = new google.maps.Marker({
            position:{lat: lat, lng: lng},
            map: map,
            title: all_app_list[app_num].app,
            label: {text: all_app_list[app_num].icon.toString(), fontSize: "25px"},
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
      }

      function icon_listener(icon, marker)
      {
        var content_text = all_static_icon_list[icon].description;
        // if(content_text.substring(0,4).localeCompare('http') == 0) // && all_app_list[all_static_icon_list[icon].app_num].app != "Camera"
        //   content_text = '<a target="_blank" href="'+content_text+'">'+content_text+'</a>';
        content_text = content_text.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a target="_blank" href="$1">$1</a> ');
        var info = new google.maps.InfoWindow({
          content: content_text
        });
        var marker_listener = marker.addListener('click', function() {
          info.open(map, marker);
          refresh_all_form();
          icon_num = icon;
          app_num = all_static_icon_list[icon].app_num;
          $('#icon_name').val(all_static_icon_list[icon].name);
          $('#icon_loc').val(all_static_icon_list[icon].lat.toFixed(8)+ ", " + all_static_icon_list[icon].lng.toFixed(8));
          if(all_app_list[app_num].kind>=5 && all_app_list[app_num].kind<=8)
            $('#icon_loc').attr('disabled', true);
          else
            $('#icon_loc').removeAttr('disabled');
          $('#icon_desc').val(all_static_icon_list[icon].description);
          map.setCenter({lat: all_static_icon_list[icon].lat, lng: all_static_icon_list[icon].lng});
          if(all_app_list[app_num].kind>=1 && all_app_list[app_num].kind<=4)
            icon_loc_update();
          $('#icon_form').show();
        });
        return [marker_listener, info];
      }

 
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
            google.maps.event.removeListener(listenergg);
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
            'df_list':[IDGeoLoData_O],
        }

        var ida = {
            'iot_app': iot_app,
        }; // How iot device receive data (format)
        // dai(profile,ida); 



});



