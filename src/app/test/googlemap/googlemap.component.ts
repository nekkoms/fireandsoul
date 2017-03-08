import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-googlemap',
  templateUrl: 'googlemap.component.html',
  styleUrls: ['googlemap.component.css']
})
export class GooglemapComponent implements OnInit {

  options: any;

  overlays: any[];

  constructor() { }

  ngOnInit() {
    this.options = {
      center: {lat: 13.710257, lng: 100.511417},
      zoom: 12
    };
    this.overlays = [
      new google.maps.Marker({position: {lat: 13.710466, lng: 100.511648}, title:"A"}),
      new google.maps.Marker({position: {lat: 13.713707, lng: 100.511216}, title:"B"}),
      new google.maps.Marker({position: {lat: 13.715233, lng: 100.511323}, title:"C"}),
      new google.maps.Polygon({paths: [
        {lat: 13.7177, lng: 100.5154},{lat: 13.7151, lng: 100.5154},{lat: 13.7151, lng: 100.5111},{lat: 13.7177, lng: 100.5111}
      ], strokeOpacity: 0.5, strokeWeight: 1,fillColor: '#1976D2', fillOpacity: 0.35
      }),
      // new google.maps.Circle({center: {lat: 36.90707, lng: 30.56533}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
      new google.maps.Polyline({path: [{lat: 13.73, lng: 100.51},{lat: 13.71, lng: 100.511}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
    ];
    // google.maps.geometry.spherical.computeArea(yourPolygon.getPath());
  }
  zoomIn(map) {
    map.setZoom(map.getZoom()+1);
  }
  zoomOut(map) {
    map.setZoom(map.getZoom()-1);
  }
  zoomEqual(map,num:number) {
    map.setZoom(num);
  }
  randomMark() {
    for(let i=0;i<20;i++){
      let lat = (Math.random())+13.20;
      let lng = (Math.random())+100.00;
      this.overlays.push(new google.maps.Marker({position: {lat: lat, lng: lng}, title: ("lat :"+lat+"lng :"+lng)}));
    }
  }
  changeView(map) {
    map.setCenter(new google.maps.LatLng(13.710257, 100.511417));
    // map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
  }

  setRountMap(map) {
    // map = new google.maps.Map({position: {lat: 13, lng: 100}});

    let directionsDisplay = new google.maps.DirectionsRenderer;
    let directionsService = new google.maps.DirectionsService;

    directionsDisplay.setMap(map);

    this.route(directionsService, directionsDisplay);
  }

  route(directionsService, directionsDisplay){
    // var selectedMode = document.getElementById('mode').value;
    directionsService.route({
      origin: {lat: (Math.random())+13.709901, lng: (Math.random())+100.511867},
      destination: {lat: (Math.random())+13.709877, lng: (Math.random())+100.541620},
      travelMode: google.maps.TravelMode["DRIVING"],
      // waypoints:
      //     [
      //       {
      //         location: {lat: 13.708097, lng: 100.524677},
      //         stopover: false
      //       },
      //       {
      //         location: {lat: 13.711097, lng: 100.527577},
      //         stopover: false
      //       },
      //       {
      //         location: {lat: 13.704105, lng: 100.526861},
      //         stopover: false
      //       },
      //     ],
      avoidHighways: true,
      avoidTolls: true,
    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

  }

}
