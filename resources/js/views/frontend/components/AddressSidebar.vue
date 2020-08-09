<template>
  <div id="delivery_add" class="sidenav delivery_sidebar">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <div class="address_bar">
      <div class="map">
        <div class="map-action">
          <button
            class="btn btn-sm btn-outline-primary"
            :class="{'btn-primary' : rePositioned}"
            @click="reCenter"
          >
            <i class="fas fa-location"></i>
          </button>
          <button class="btn btn-sm btn-outline-primary btn-plus" @click="zoom(+1)">
            <i class="fas fa-plus"></i>
          </button>
          <button class="btn btn-sm btn-outline-primary btn-plus" @click="zoom(-1)">
            <i class="fas fa-minus"></i>
          </button>
        </div>

        <div id="gmap" class="w-100"></div>
      </div>
      <div class="action">
        <button
          class="btn btn-block btn-primary animate__animated animate__fadeIn"
          v-show="rePositioned"
          @click="saveLocation()"
        >Save This Location</button>
      </div>
      <div class="scrh">
        <input type="search" id="area-input" placeholder="Search your area, street name" />
      </div>
      <div class="saved_address" v-if="isLoaded">
        <h3 type="button" v-b-toggle.collapse-1>Saved Addresses</h3>
        <b-collapse id="collapse-1" class="mt-2">
          <div class="address_otr">
            <div
              @click="setAddress(address)"
              class="address_inn"
              v-for="address in userAddresses"
              :key="address.id"
            >
              <h5>{{address.type}}</h5>
              <address>{{address.address}}</address>
            </div>
          </div>
          <div class="adress_view">
            <a href="javaScript:void(0)">View More</a>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      map: null,
      currentPos: {
        lat: 0,
        lng: 0,
      },
      rePositioned: false,
      isLoaded: false,

    };
  },
  created () {
    if (this.$store.getters['auth/check']) {
      this.$store.dispatch('auth/userAddresses').then(() => { this.isLoaded = true; });
    }
  },
  mounted () {
    // Create the script tag, set the appropriate attributes
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCQ50fCTWgDOCjgUmkxARbJCFpIrqq-Uok&callback=initMap&libraries=places&v=weekly';
    script.defer = true;
    script.async = true;
    const instance = this;
    // Attach your callback function to the `window` object
    window.initMap = function () {
      // map init
      window.map = new window.google.maps.Map(document.getElementById('gmap'), {
        center: { lat: 22.5726, lng: 88.3639 },
        zoom: 18,
        gestureHandling: 'cooperative',
        disableDefaultUI: true,
      });

      // map style
      const styles = {
        default: [],
        hide: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
        ],
      };

      // map set style
      window.map.setOptions({ styles: styles.hide });

      // map set marker
      window.marker = new window.google.maps.Marker({
        position: this.currentPos,
        draggable: true,
        raiseOnDrag: true,
        title: 'Drop me to destination',
        map: window.map,
      });

      // map set marker drag event
      google.maps.event.addListener(window.marker, 'dragend', (event) => {
        currentPos = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        window.map.setCenter(currentPos);
        instance.rePositioned = true;
      });

      // map set to current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const reCenterPosition = new window.google.maps.LatLng(this.currentPos.lat, this.currentPos.lng);
          window.map.setCenter(reCenterPosition);
          window.marker.setPosition(reCenterPosition);
        }, () => {
          console.error('Please turn on your geolocation');
        });
      } else {
        console.error('Please turn on your geolocation');
      }

      // Create the search box and link it to the UI element.
      //   const input = document.getElementById('area-input');
      //   const searchBox = new window.google.maps.places.SearchBox(input);

      //   searchBox.addListener('places_changed', () => {
      //     const places = searchBox.getPlaces();

      //     if (places.length === 0) {
      //       return;
      //     }

      //     // console.log(places);

      //     // For each place, get the icon, name and location.
      //     // const bounds = new google.maps.LatLngBounds();
      //     // places.forEach((place) => {
      //     //   if (!place.geometry) {
      //     //     console.log('Returned place contains no geometry');
      //     //     return;
      //     //   }
      //     //   const icon = {
      //     //     url: place.icon,
      //     //     size: new google.maps.Size(71, 71),
      //     //     origin: new google.maps.Point(0, 0),
      //     //     anchor: new google.maps.Point(17, 34),
      //     //     scaledSize: new google.maps.Size(25, 25),
      //     //   };
      //     //   // Create a marker for each place.
      //     //   markers.push(
      //     //     new google.maps.Marker({
      //     //       map,
      //     //       icon,
      //     //       title: place.name,
      //     //       position: place.geometry.location,
      //     //     }),
      //     //   );

      //     //   if (place.geometry.viewport) {
      //     //     // Only geocodes have viewport.
      //     //     bounds.union(place.geometry.viewport);
      //     //   } else {
      //     //     bounds.extend(place.geometry.location);
      //     //   }
      //     // });
      //     // map.fitBounds(bounds);
      //   });
    };

    // Append the 'script' element to 'head'
    document.head.appendChild(script);
  },
  computed: {
    ...mapGetters({
      userAddresses: 'auth/userAddresses',
    }),
  },

  methods: {
    setAddress (address) {
      this.currentPos = {
        lat: address.latitude,
        lng: address.longitude,
      };
      const newPosition = new window.google.maps.LatLng(this.currentPos.lat, this.currentPos.lng);
      window.map.setCenter(newPosition);
      window.marker.setPosition(newPosition);
    },
    reCenter () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const reCenterPosition = new window.google.maps.LatLng(this.currentPos.lat, this.currentPos.lng);
          window.map.setZoom(18);
          window.map.setCenter(reCenterPosition);
          window.marker.setPosition(reCenterPosition);
          this.rePositioned = false;
        }, () => {
          console.error('Please turn on your geolocation');
        });
      } else {
        console.error('Please turn on your geolocation');
      }
    },
    zoom (level) {
      const zoom = window.map.getZoom() + level;
      window.map.setZoom(zoom);
    },
    saveLocation () {
      this.rePositioned = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  padding: 5px;
  margin: 0 0 25px 0;
  border: 1px solid #dcdcdc;
  position: relative;
  .map-action {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
    display: flex;
    flex-flow: column;
    background: transparent;
    .btn {
      margin-bottom: 10px;
      font-weight: bolder;
      &.btn-primary .fas {
        color: white;
      }
    }
  }
}
#gmap {
  height: 300px;
}
.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
}
/* width */
::-webkit-scrollbar {
  width: 0;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: transparent;
  border-radius: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ecebeb;
  border-radius: none;
}
.address_inn {
  cursor: pointer;
}
.action {
  margin-bottom: 10px;
}
</style>
