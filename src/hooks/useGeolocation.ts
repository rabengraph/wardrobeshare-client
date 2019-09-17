import { useEffect, useState, useRef } from "react";

export interface GeoLocationSensorState {
    loading: boolean;
    isAvailable: boolean;
    isEnabled: boolean;
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number | null;
    longitude: number | null;
    speed: number | null;
    timestamp: number | null;
    error?: Error | PositionError;
}

const useGeolocation = (needed = true, options?: PositionOptions): GeoLocationSensorState => {
    const [state, setState] = useState<GeoLocationSensorState>({
        loading: true,
        isAvailable: false,
        isEnabled: false,
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: null,
        longitude: null,
        speed: null,
        timestamp: Date.now(),
    });

    // dont know if this does the job
    const mounted = useRef(true);

    const onEvent = (event: any) => {
        if (mounted.current) {
            setState({
                loading: false,
                isAvailable: true,
                isEnabled: true,
                accuracy: event.coords.accuracy,
                altitude: event.coords.altitude,
                altitudeAccuracy: event.coords.altitudeAccuracy,
                heading: event.coords.heading,
                latitude: event.coords.latitude,
                longitude: event.coords.longitude,
                speed: event.coords.speed,
                timestamp: event.timestamp,
            });
        }
    };
    const onEventError = (error: PositionError) =>
        mounted.current &&
        setState(oldState => ({
            ...oldState,
            loading: false,
            isEnabled: false,
            error,
        }));

    useEffect(() => {
        if (needed) {
            if (typeof navigator !== "undefined") {
                setState(oldState => ({
                    ...oldState,
                    loading: false,
                    isAvailable: false,
                }));
            }
            navigator.geolocation.getCurrentPosition(onEvent, onEventError, options);
            const watchId = navigator.geolocation.watchPosition(onEvent, onEventError, options);
            return () => {
                mounted.current = false;
                if (watchId) {
                    navigator.geolocation.clearWatch(watchId);
                }
            };
        }
    }, [needed]);

    return state;
};

export default useGeolocation;
