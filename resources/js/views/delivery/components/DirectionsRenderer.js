import { MapElementFactory } from "vue2-google-maps";

export default MapElementFactory({
    name: "directionsRenderer",

    ctr() {
        return google.maps.DirectionsRenderer;
    },

    events: [],

    mappedProps: {},

    props: {
        origin: { type: Object },
        destination: { type: Object },
        travelMode: { type: String }
    },

    afterCreate(directionsRenderer) {
        let directionsService = new google.maps.DirectionsService();
        var request = {
            origin: this.origin,
            destination: this.destination,
            travelMode: "DRIVING"
        };
        directionsService.route(request, function(result, status) {
            if (status == "OK") {
                directionsRenderer.setDirections(result);
            }
        });
    }
});
