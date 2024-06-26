import type { Feature as FeatureType } from "geojson";
export type Feature = FeatureType & {
    id: string;
    text: string;
    place_name: string;
    place_type: string[];
    center: [number, number];
    bbox: [number, number, number, number];
    address?: string;
    matching_text?: string;
};
export type FeatureCollection = {
    type: "FeatureCollection";
    features: Feature[];
};
export type MapEvent = {
    type: "proximityChange";
    proximity: [number, number] | undefined;
} | {
    type: "mapClick";
    coordinates: [number, number];
} | {
    type: "markerClick";
    id: string;
} | {
    type: "markerMouseEnter";
    id: string;
} | {
    type: "markerMouseLeave";
    id: string;
};
export type MapController = {
    setEventHandler(handler: undefined | ((e: MapEvent) => void)): void;
    flyTo(center: [number, number], zoom: number): void;
    fitBounds(bbox: [number, number, number, number], padding: number, maxZoom: number): void;
    indicateReverse(reverse: boolean): void;
    setMarkers(features: Feature[] | undefined, picked: Feature | undefined): void;
    setReverseMarker(coordinates?: [number, number]): void;
    setSelectedMarker(index: number): void;
};
export type Proximity = [number, number] | undefined;
export type ControlOptions = {
    /**
     * Maptiler API key
     */
    apiKey: string;
    /**
     * Sets the amount of time, in milliseconds, to wait before querying the server when a user types into the Geocoder input box.
     * This parameter may be useful for reducing the total number of API calls made for a single query.
     *
     * @default 200
     */
    debounceSearch?: number;
    /**
     * A proximity argument: this is a geographical point given as an object with latitude and longitude properties.
     * Search results closer to this point will be given higher priority.
     */
    proximity?: [number, number];
    /**
     * Override the default placeholder attribute value.
     *
     * @default "Search"
     */
    placeholder?: string;
    /**
     * Override the default error message.
     *
     * @default "Something went wrong…"
     */
    errorMessage?: string;
    /**
     * Override the default message if no results are found.
     *
     * @default "Oops! Looks like you're trying to predict something that's not quite right. We can't seem to find what you're looking for. Maybe try double-checking your spelling or try a different search term. Keep on typing - we'll do our best to get you where you need to go!"
     */
    noResultsMessage?: string;
    /**
     * If true, the geocoder proximity will automatically update based on the map view.
     *
     * @default true
     */
    trackProximity?: boolean;
    /**
     * Minimum number of characters to enter before results are shown.
     *
     * @default 2
     */
    minLength?: number;
    /**
     * A bounding box argument: this is a bounding box given as an array in the format [minX, minY, maxX, maxY].
     * Search results will be limited to the bounding box.
     */
    bbox?: [number, number, number, number];
    /**
     * Maximum number of results to show.
     *
     * @default 5
     */
    limit?: number;
    /**
     * Specify the language to use for response text and query result weighting.
     * Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script.
     * More than one value can also be specified, separated by commas.
     * Defaults to the browser's language settings.
     */
    language?: string | string[];
    /**
     * If `false`, indicates that search will only occur on enter key press.
     * If `true`, indicates that the Geocoder will search on the input box being updated above the minLength option.
     *
     * @default false
     */
    showResultsWhileTyping?: boolean;
    /**
     * Set to `false` to disable fuzzy search.
     *
     * @default true
     */
    fuzzyMatch?: boolean;
    /**
     * On geocoded result what zoom level should the map animate to when a bbox isn't found in the response.
     * If a bbox is found the map will fit to the bbox.
     *
     * @default 16
     */
    zoom?: number;
    /**
     * On geocoded result what max zoom level should the map animate to when a bbox isn't found in the response. Used for small features.
     * If a bbox is found the map will fit to the bbox.
     *
     * @default 18
     */
    maxZoom?: number;
    /**
     * If `true`, the geocoder control will collapse until hovered or in focus.
     *
     * @default false
     */
    collapsed?: boolean;
    /**
     * If true, the geocoder control will clear its value when the input blurs.
     *
     * @default false
     */
    clearOnBlur?: boolean;
    /**
     * A function which accepts a Feature in the Carmen GeoJSON format to filter out results from the Geocoding API response before they are included in the suggestions list.
     * Return true to keep the item, false otherwise.
     */
    filter?: (feature: Feature) => boolean;
    /**
     * Class of the root element.
     */
    class?: string;
    /**
     * Set to `true` to enable reverse geocoding button with title. Set to `"always"` to reverse geocoding be always active.
     *
     * @default false
     */
    enableReverse?: boolean | "always";
    /**
     * Reverse toggle button title.
     *
     * @default "toggle reverse geocoding"
     */
    reverseButtonTitle?: string;
    /**
     * Clear button title.
     *
     * @default "clear"
     */
    clearButtonTitle?: string;
    /**
     * Set to `false` to hide place/POI type. If set to `"always"` then type is shown for all items.
     * If set to `"ifNeeded"` then type is shown only for places/POIs not determined from the icon.
     *
     * @default "ifNeeded"
     */
    showPlaceType?: false | "always" | "ifNeeded";
    showIcons?: boolean;
    /**
     * Set to `true` to show full feature geometry of the chosen result. Otherwise only marker will be shown.
     *
     * @default true
     */
    showFullGeometry?: boolean;
    /**
     * Limit search to specified country(ies).
     *
     * @default undefined use all countries
     */
    country?: string | string[];
    /**
     * Filter of feature types to return.
     *
     * @default undefined all available feature types are returned
     */
    types?: string[];
    /**
     * Geocoding API URL.
     *
     * @default MapTiler Geocoding API URL.
     */
    apiUrl?: string;
    /**
     * Extra fetch parameters.
     *
     * @default undefined
     */
    fetchParameters?: RequestInit;
    /**
     * Base URL for POI icons.
     *
     * @default "icons/"
     */
    iconsBaseUrl?: string;
};
export type DispatcherType = {
    featuresListed: Feature[];
    featuresMarked: Feature[];
    optionsVisibilityChange: boolean;
    pick: Feature;
    queryChange: string;
    response: {
        url: string;
        featureCollection: FeatureCollection;
    };
    reverseToggle: boolean;
    select: Feature;
};
