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

        <div id="gmap" class="w-100">
          <GmapMap
            ref="mapRef"
            :center="currentPos"
            :zoom="18"
            style="width: 100%; height: 100%"
            :options="{disableDefaultUI: true, gestureHandling: 'cooperative'}"
            @dragend="updateCoordinatesOnMapDrag"
          >
            <GmapMarker
              ref="markerRef"
              :position="currentPos"
              :clickable="true"
              :draggable="true"
              @click="center=currentPos"
              @dragend="updateCoordinates"
            />
          </GmapMap>
        </div>
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
      <div class="saved_address" v-if="this.$store.getters['auth/check']">
        <h3 type="button" v-b-toggle.collapse-1>Saved Addresses</h3>
        <b-collapse id="collapse-1" class="mt-2">
          <div class="address_otr">
            <div
              @click="setLocation({lat: address.latitude, lng: address.longitude})"
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
      this.$store.dispatch('auth/userAddresses').then(() => { this.isLoaded = this.userAddresses.length > 0; });
    }
  },
  mounted () {
    this.$refs.mapRef.$mapPromise.then((map) => {
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
      map.setOptions({ styles: styles.hide });

      if (this.$store.getters['auth/currentLocation'] === null) {
        this.reCenter(map);
      } else {
        this.setLocation(this.$store.getters['auth/currentLocation']);
      }
    });

    //   const input = document.getElementById('area-input');
    //   const searchBox = new google.maps.places.SearchBox(input);

    //   // more details for that place.
    //   searchBox.addListener('places_changed', () => {
    //     const places = searchBox.getPlaces();
    //     if (places.length !== 0) {
    //       console.log(places);
    //     }
    //   });
    // };
  },
  computed: {
    ...mapGetters({
      userAddresses: 'auth/userAddresses',
      currentLocation: 'auth/currentLocation',
    }),
  },

  methods: {
    setLocation ({ lat, lng }) {
      this.currentPos = {
        lat,
        lng,
      };
    },
    reCenter () {
      this.$refs.mapRef.$mapPromise.then((map) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.currentPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            this.reverseGeocode(this.currentPos, (result) => {
              this.currentPos.formatted_address = result;
              this.$store.dispatch('auth/setCurrentLocation', this.currentPos);
            });

            const reCenterPosition = new window.google.maps.LatLng(this.currentPos.lat, this.currentPos.lng);
            map.setZoom(18);
            map.setCenter(reCenterPosition);
            this.rePositioned = false;
          }, () => {
            console.error('Please turn on your geolocation');
          });
        } else {
          console.error('Please turn on your geolocation');
        }
      });
    },
    reverseGeocode (latlong, callback) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: latlong }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            const address = results[0].formatted_address;
            return callback(address); // call the callback function here
          }
          console.log('No results found');
          return false;
        }
        console.log(`Geocoder failed due to: ${status}`);
        return false;
      });
    },
    zoom (level) {
      this.$refs.mapRef.$mapPromise.then((map) => {
        const zoom = map.getZoom() + level;
        map.setZoom(zoom);
      });
    },
    saveLocation () {
      this.rePositioned = false;
    },
    updateCoordinates (location) {
      this.currentPos = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      };
      this.reverseGeocode(this.currentPos, (result) => {
        this.currentPos.formatted_address = result;
        this.$store.dispatch('auth/setCurrentLocation', this.currentPos);
      });
    },
    updateCoordinatesOnMapDrag () {
      this.$refs.mapRef.$mapPromise.then((map) => {
        this.currentPos = map.getCenter();
      });
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
