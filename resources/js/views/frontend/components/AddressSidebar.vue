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
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCQ50fCTWgDOCjgUmkxARbJCFpIrqq-Uok&callback=initMap&libraries=places&v=weekly';
    script.defer = true;
    script.async = true;

    const instance = this;

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

      // map set marker drag end event
      google.maps.event.addListener(window.marker, 'dragend', (event) => {
        this.currentPos = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        const dragPosition = new window.google.maps.LatLng(this.currentPos.lat, this.currentPos.lng);
        window.map.setCenter(dragPosition);
        instance.rePositioned = true;
      });

      // map set marker drag
      window.map.addListener('dragend', () => {
        window.marker.setPosition(window.map.getCenter());
        instance.rePositioned = true;
      });

      // map set to current location
      instance.reCenter();

      //   const latlng = new window.google.maps.LatLng(instance.currentPos.lat, instance.currentPos.lng);
      //   const geocoder = new google.maps.Geocoder();
      //   geocoder.geocode({ latLng: latlng }, (results, status) => {
      //     console.log(result, status);
      //   });

      const input = document.getElementById('area-input');
      const searchBox = new google.maps.places.SearchBox(input);

      // more details for that place.
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length !== 0) {
          console.log(places);
        }
      });
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
          this.$store.dispatch('auth/setCurrentLocation', this.currentPos).then(() => {

          });
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
      toastr.success('This Is Success Message', 'Bottom Center', {
        positionClass: 'toast-bottom-center',
        timeOut: 5e3,
        closeButton: !0,
        debug: !1,
        newestOnTop: !0,
        progressBar: !0,
        preventDuplicates: !0,
        onclick: null,
        showDuration: '300',
        hideDuration: '1000',
        extendedTimeOut: '1000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut',
        tapToDismiss: !1,
      });
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
