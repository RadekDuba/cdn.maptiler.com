import maplibregl__default from 'maplibre-gl';
export * from 'maplibre-gl';
import { Base64 } from 'js-base64';
import EventEmitter from 'events';
import { config as config$1, MapStyle, mapStylePresetList, expandMapStyle, MapStyleVariant, ReferenceMapStyle, geolocation } from '@maptiler/client';
export { LanguageGeocoding, MapStyle, MapStyleVariant, ReferenceMapStyle, ServiceError, coordinates, data, geocoding, geolocation, staticMaps } from '@maptiler/client';
import { v4 } from 'uuid';

const Language = {
  /**
   * The visitor language mode concatenates the prefered language from the user settings and the "default name".
   * Note: The "default name" is equivalent to OSM's `{name}`, which can be the most recognized names a global
   * scale or the local name.
   * This mode is helpful in the context where a user needs to access both the local names and the names in their
   * own language, for instance when traveling abroad, where signs likely to be only available in the local language.
   */
  VISITOR: "visitor",
  /**
   * The visitor language mode concatenates English and the "default name".
   * Note: The "default name" is equivalent to OSM's `{name}`, which can be the most recognized names a global
   * scale or the local name.
   * This mode is helpful in the context where a user needs to access both the local names and the names in their
   * own language, for instance when traveling abroad, where signs likely to be only available in the local language.
   */
  VISITOR_ENGLISH: "visitor_en",
  /**
   * Language as the style is designed. Not that this is the default state and one
   * the language has been changed to another than `STYLE`, then it cannot be set back to `STYLE`.
   */
  STYLE: "style",
  /**
   * AUTO mode uses the language of the browser
   */
  AUTO: "auto",
  /**
   * STYLE is a custom flag to keep the language of the map as defined into the style.
   * If STYLE is set in the constructor, then further modification of the language
   * with `.setLanguage()` is not possible.
   */
  STYLE_LOCK: "style_lock",
  /**
   * Default fallback languages that uses latin charaters
   */
  LATIN: "name:latin",
  /**
   * Default fallback languages that uses non-latin charaters
   */
  NON_LATIN: "name:nonlatin",
  /**
   * Labels are in their local language, when available
   */
  LOCAL: "name",
  /**
   * International name
   */
  INTERNATIONAL: "name_int",
  ALBANIAN: "name:sq",
  AMHARIC: "name:am",
  ARABIC: "name:ar",
  ARMENIAN: "name:hy",
  AZERBAIJANI: "name:az",
  BASQUE: "name:eu",
  BELORUSSIAN: "name:be",
  BENGALI: "name:bn",
  BOSNIAN: "name:bs",
  BRETON: "name:br",
  BULGARIAN: "name:bg",
  CATALAN: "name:ca",
  CHINESE: "name:zh",
  TRADITIONAL_CHINESE: "name:zh-Hant",
  SIMPLIFIED_CHINESE: "name:zh-Hans",
  CORSICAN: "name:co",
  CROATIAN: "name:hr",
  CZECH: "name:cs",
  DANISH: "name:da",
  DUTCH: "name:nl",
  ENGLISH: "name:en",
  ESPERANTO: "name:eo",
  ESTONIAN: "name:et",
  FINNISH: "name:fi",
  FRENCH: "name:fr",
  FRISIAN: "name:fy",
  GEORGIAN: "name:ka",
  GERMAN: "name:de",
  GREEK: "name:el",
  HEBREW: "name:he",
  HINDI: "name:hi",
  HUNGARIAN: "name:hu",
  ICELANDIC: "name:is",
  INDONESIAN: "name:id",
  IRISH: "name:ga",
  ITALIAN: "name:it",
  JAPANESE: "name:ja",
  JAPANESE_HIRAGANA: "name:ja-Hira",
  JAPANESE_KANA: "name:ja_kana",
  JAPANESE_LATIN: "name:ja_rm",
  JAPANESE_2018: "name:ja-Latn",
  KANNADA: "name:kn",
  KAZAKH: "name:kk",
  KOREAN: "name:ko",
  KOREAN_LATIN: "name:ko-Latn",
  KURDISH: "name:ku",
  ROMAN_LATIN: "name:la",
  LATVIAN: "name:lv",
  LITHUANIAN: "name:lt",
  LUXEMBOURGISH: "name:lb",
  MACEDONIAN: "name:mk",
  MALAYALAM: "name:ml",
  MALTESE: "name:mt",
  NORWEGIAN: "name:no",
  OCCITAN: "name:oc",
  PERSIAN: "name:fa",
  POLISH: "name:pl",
  PORTUGUESE: "name:pt",
  PUNJABI: "name:pa",
  WESTERN_PUNJABI: "name:pnb",
  ROMANIAN: "name:ro",
  ROMANSH: "name:rm",
  RUSSIAN: "name:ru",
  SCOTTISH_GAELIC: "name:gd",
  SERBIAN_CYRILLIC: "name:sr",
  SERBIAN_LATIN: "name:sr-Latn",
  SLOVAK: "name:sk",
  SLOVENE: "name:sl",
  SPANISH: "name:es",
  SWEDISH: "name:sv",
  TAMIL: "name:ta",
  TELUGU: "name:te",
  THAI: "name:th",
  TURKISH: "name:tr",
  UKRAINIAN: "name:uk",
  URDU: "name:ur",
  VIETNAMIAN_LATIN: "name:vi",
  WELSH: "name:cy"
};
const languagesIsoSet = new Set(Object.values(Language));
function isLanguageSupported(lang) {
  return languagesIsoSet.has(lang);
}
const languageCodeSet = new Set(Object.values(Language));
function getBrowserLanguage() {
  if (typeof navigator === "undefined") {
    return `name:${Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0]}`;
  }
  const canditatelangs = Array.from(
    new Set(navigator.languages.map((l) => `name:${l.split("-")[0]}`))
  ).filter((l) => languageCodeSet.has(l));
  return canditatelangs.length ? canditatelangs[0] : Language.LOCAL;
}

const defaults = {
  maptilerLogoURL: "https://api.maptiler.com/resources/logo.svg",
  maptilerURL: "https://www.maptiler.com/",
  maptilerApiHost: "api.maptiler.com",
  rtlPluginURL: "https://cdn.maptiler.com/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.min.js",
  primaryLanguage: Language.STYLE,
  secondaryLanguage: Language.LOCAL,
  terrainSourceURL: "https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json",
  terrainSourceId: "maptiler-terrain"
};
Object.freeze(defaults);

var __defProp$b = Object.defineProperty;
var __defNormalProp$b = (obj, key, value) => key in obj ? __defProp$b(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$8 = (obj, key, value) => {
  __defNormalProp$b(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const MAPTILER_SESSION_ID = v4();
class SdkConfig extends EventEmitter {
  constructor() {
    super();
    /**
     * The primary language. By default, the language of the web browser is used.
     */
    __publicField$8(this, "primaryLanguage", defaults.primaryLanguage);
    /**
     * The secondary language, to overwrite the default language defined in the map style.
     * This settings is highly dependant on the style compatibility and may not work in most cases.
     */
    __publicField$8(this, "secondaryLanguage");
    /**
     * Setting on whether of not the SDK runs with a session logic.
     * A "session" is started at the initialization of the SDK and finished when the browser
     * page is being refreshed.
     * When `session` is enabled (default: true), the extra URL param `mtsid` is added to queries
     * on the MapTiler Cloud API. This allows MapTiler to enable "session based billing".
     */
    __publicField$8(this, "session", true);
    /**
     * Unit to be used
     */
    __publicField$8(this, "_unit", "metric");
    /**
     * MapTiler Cloud API key
     */
    __publicField$8(this, "_apiKey", "");
  }
  /**
   * Set the unit system
   */
  set unit(u) {
    this._unit = u;
    this.emit("unit", u);
  }
  /**
   * Get the unit system
   */
  get unit() {
    return this._unit;
  }
  /**
   * Set the MapTiler Cloud API key
   */
  set apiKey(k) {
    this._apiKey = k;
    config$1.apiKey = k;
    this.emit("apiKey", k);
  }
  /**
   * Get the MapTiler Cloud API key
   */
  get apiKey() {
    return this._apiKey;
  }
  /**
   * Set a the custom fetch function to replace the default one
   */
  set fetch(f) {
    config$1.fetch = f;
  }
  /**
   * Get the fetch fucntion
   */
  get fetch() {
    return config$1.fetch;
  }
}
const config = new SdkConfig();

class LogoControl extends maplibregl__default.LogoControl {
  onAdd(map) {
    return super.onAdd(map);
  }
}

var __defProp$a = Object.defineProperty;
var __defNormalProp$a = (obj, key, value) => key in obj ? __defProp$a(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$7 = (obj, key, value) => {
  __defNormalProp$a(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MaptilerLogoControl extends LogoControl {
  constructor(options = {}) {
    var _a, _b;
    super(options);
    __publicField$7(this, "logoURL", "");
    __publicField$7(this, "linkURL", "");
    this.logoURL = (_a = options.logoURL) != null ? _a : defaults.maptilerLogoURL;
    this.linkURL = (_b = options.linkURL) != null ? _b : defaults.maptilerURL;
  }
  onAdd(map) {
    var _a;
    this._map = map;
    this._compact = (_a = this.options.compact) != null ? _a : false;
    this._container = window.document.createElement("div");
    this._container.className = "maplibregl-ctrl";
    const anchor = window.document.createElement("a");
    anchor.style.backgroundRepeat = "no-repeat";
    anchor.style.cursor = "pointer";
    anchor.style.display = "block";
    anchor.style.height = "23px";
    anchor.style.margin = "0 0 -4px -4px";
    anchor.style.overflow = "hidden";
    anchor.style.width = "88px";
    anchor.style.backgroundImage = `url(${this.logoURL})`;
    anchor.style.backgroundSize = "100px 30px";
    anchor.style.width = "100px";
    anchor.style.height = "30px";
    anchor.target = "_blank";
    anchor.rel = "noopener";
    anchor.href = this.linkURL;
    anchor.setAttribute("aria-label", "MapTiler logo");
    anchor.setAttribute("rel", "noopener");
    this._container.appendChild(anchor);
    this._container.style.display = "block";
    this._map.on("resize", this._updateCompact);
    this._updateCompact();
    return this._container;
  }
}

var __defProp$9 = Object.defineProperty;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$9(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$9(a, prop, b[prop]);
    }
  return a;
};
function enableRTL() {
  if (maplibregl__default.getRTLTextPluginStatus() === "unavailable") {
    maplibregl__default.setRTLTextPlugin(
      defaults.rtlPluginURL,
      (err) => {
        if (err)
          console.error(err);
      },
      true
      // Lazy load the plugin
    );
  }
}
function bindAll(fns, context) {
  fns.forEach((fn) => {
    if (typeof context[fn] !== "function")
      return;
    context[fn] = context[fn].bind(context);
  });
}
function DOMcreate(tagName, className, container) {
  const el = window.document.createElement(tagName);
  if (className !== void 0)
    el.className = className;
  if (container)
    container.appendChild(el);
  return el;
}
function DOMremove(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function maptilerCloudTransformRequest(url, _resourceType) {
  let reqUrl = null;
  try {
    reqUrl = new URL(url);
  } catch (e) {
    return {
      url
    };
  }
  if (reqUrl.host === defaults.maptilerApiHost) {
    if (!reqUrl.searchParams.has("key")) {
      reqUrl.searchParams.append("key", config.apiKey);
    }
    if (config.session) {
      reqUrl.searchParams.append("mtsid", MAPTILER_SESSION_ID);
    }
  }
  return {
    url: reqUrl.href
  };
}
function combineTransformRequest(userDefinedRTF) {
  return function(url, resourceType) {
    var _a;
    if (userDefinedRTF !== void 0) {
      const rp = userDefinedRTF(url, resourceType);
      const rp2 = maptilerCloudTransformRequest((_a = rp == null ? void 0 : rp.url) != null ? _a : "");
      return __spreadValues$5(__spreadValues$5({}, rp), rp2);
    } else {
      return maptilerCloudTransformRequest(url);
    }
  };
}
function generateRandomString() {
  return Math.random().toString(36).substring(2);
}
function isUUID(s) {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(s);
}
function jsonParseNoThrow(doc) {
  try {
    return JSON.parse(doc);
  } catch (e) {
  }
  return null;
}

function styleToStyle(style) {
  if (!style) {
    return MapStyle[mapStylePresetList[0].referenceStyleID].getDefaultVariant().getExpandedStyleURL();
  }
  if (typeof style === "string" || style instanceof String) {
    if (!style.startsWith("http") && style.toLowerCase().includes(".json")) {
      return style;
    } else {
      return expandMapStyle(style);
    }
  }
  if (style instanceof MapStyleVariant) {
    return style.getExpandedStyleURL();
  }
  if (style instanceof ReferenceMapStyle) {
    return style.getDefaultVariant().getExpandedStyleURL();
  }
  return style;
}

var __defProp$8 = Object.defineProperty;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$6 = (obj, key, value) => {
  __defNormalProp$8(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MaptilerTerrainControl {
  constructor() {
    __publicField$6(this, "_map");
    __publicField$6(this, "_container");
    __publicField$6(this, "_terrainButton");
    bindAll(["_toggleTerrain", "_updateTerrainIcon"], this);
  }
  onAdd(map) {
    this._map = map;
    this._container = DOMcreate("div", "maplibregl-ctrl maplibregl-ctrl-group");
    this._terrainButton = DOMcreate(
      "button",
      "maplibregl-ctrl-terrain",
      this._container
    );
    DOMcreate("span", "maplibregl-ctrl-icon", this._terrainButton).setAttribute(
      "aria-hidden",
      "true"
    );
    this._terrainButton.type = "button";
    this._terrainButton.addEventListener("click", this._toggleTerrain);
    this._updateTerrainIcon();
    this._map.on("terrain", this._updateTerrainIcon);
    return this._container;
  }
  onRemove() {
    DOMremove(this._container);
    this._map.off("terrain", this._updateTerrainIcon);
    this._map = void 0;
  }
  _toggleTerrain() {
    if (this._map.hasTerrain()) {
      this._map.disableTerrain();
    } else {
      this._map.enableTerrain();
    }
    this._updateTerrainIcon();
  }
  _updateTerrainIcon() {
    this._terrainButton.classList.remove("maplibregl-ctrl-terrain");
    this._terrainButton.classList.remove("maplibregl-ctrl-terrain-enabled");
    if (this._map.hasTerrain()) {
      this._terrainButton.classList.add("maplibregl-ctrl-terrain-enabled");
      this._terrainButton.title = this._map._getUIString(
        "TerrainControl.disableTerrain"
      );
    } else {
      this._terrainButton.classList.add("maplibregl-ctrl-terrain");
      this._terrainButton.title = this._map._getUIString(
        "TerrainControl.enableTerrain"
      );
    }
  }
}

class NavigationControl extends maplibregl__default.NavigationControl {
  onAdd(map) {
    return super.onAdd(map);
  }
}

var __defProp$7 = Object.defineProperty;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$5 = (obj, key, value) => {
  __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MaptilerNavigationControl extends NavigationControl {
  constructor() {
    super({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    });
    /**
     * Overloading: Limit how flat the compass icon can get
     */
    __publicField$5(this, "_rotateCompassArrow", () => {
      const rotate = this.options.visualizePitch ? `scale(${Math.min(
        1.5,
        1 / Math.pow(
          Math.cos(this._map.transform.pitch * (Math.PI / 180)),
          0.5
        )
      )}) rotateX(${Math.min(70, this._map.transform.pitch)}deg) rotateZ(${this._map.transform.angle * (180 / Math.PI)}deg)` : `rotate(${this._map.transform.angle * (180 / Math.PI)}deg)`;
      this._compassIcon.style.transform = rotate;
    });
    this._compass.removeEventListener(
      "click",
      this._compass.clickFunction
    );
    this._compass.addEventListener("click", (e) => {
      {
        const currentPitch = this._map.getPitch();
        if (currentPitch === 0) {
          this._map.easeTo({ pitch: Math.min(this._map.getMaxPitch(), 80) });
        } else {
          if (this.options.visualizePitch) {
            this._map.resetNorthPitch({}, { originalEvent: e });
          } else {
            this._map.resetNorth({}, { originalEvent: e });
          }
        }
      }
    });
  }
  /**
   * Overloading: the button now stores its click callback so that we can later on delete it and replace it
   */
  _createButton(className, fn) {
    const button = super._createButton(className, fn);
    button.clickFunction = fn;
    return button;
  }
}

class GeolocateControl extends maplibregl__default.GeolocateControl {
  onAdd(map) {
    return super.onAdd(map);
  }
}

var __defProp$6 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$6(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$6(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
var __publicField$4 = (obj, key, value) => {
  __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const Marker$1 = maplibregl__default.Marker;
const LngLat$1 = maplibregl__default.LngLat;
const LngLatBounds$1 = maplibregl__default.LngLatBounds;
class MaptilerGeolocateControl extends GeolocateControl {
  constructor() {
    super(...arguments);
    __publicField$4(this, "lastUpdatedCenter", new LngLat$1(0, 0));
    /**
     * Update the camera location to center on the current position
     *
     * @param {Position} position the Geolocation API Position
     * @private
     */
    __publicField$4(this, "_updateCamera", (position) => {
      var _a, _b, _c;
      const center = new LngLat$1(
        position.coords.longitude,
        position.coords.latitude
      );
      const radius = position.coords.accuracy;
      const bearing = this._map.getBearing();
      const options = __spreadProps$3(__spreadValues$4({
        bearing
      }, this.options.fitBoundsOptions), {
        linear: true
      });
      const currentMapZoom = this._map.getZoom();
      if (currentMapZoom > ((_c = (_b = (_a = this.options) == null ? void 0 : _a.fitBoundsOptions) == null ? void 0 : _b.maxZoom) != null ? _c : 30)) {
        options.zoom = currentMapZoom;
      }
      this._map.fitBounds(LngLatBounds$1.fromLngLat(center, radius), options, {
        geolocateSource: true
        // tag this camera change so it won't cause the control to change to background state
      });
      let hasFittingBeenDisrupted = false;
      const flagFittingDisruption = () => {
        hasFittingBeenDisrupted = true;
      };
      this._map.once("click", flagFittingDisruption);
      this._map.once("dblclick", flagFittingDisruption);
      this._map.once("dragstart", flagFittingDisruption);
      this._map.once("mousedown", flagFittingDisruption);
      this._map.once("touchstart", flagFittingDisruption);
      this._map.once("wheel", flagFittingDisruption);
      this._map.once("moveend", () => {
        this._map.off("click", flagFittingDisruption);
        this._map.off("dblclick", flagFittingDisruption);
        this._map.off("dragstart", flagFittingDisruption);
        this._map.off("mousedown", flagFittingDisruption);
        this._map.off("touchstart", flagFittingDisruption);
        this._map.off("wheel", flagFittingDisruption);
        if (hasFittingBeenDisrupted) {
          return;
        }
        this.lastUpdatedCenter = this._map.getCenter();
      });
    });
    __publicField$4(this, "_setupUI", (supported) => {
      this.lastUpdatedCenter = this._map.getCenter();
      this._container.addEventListener(
        "contextmenu",
        (e) => e.preventDefault()
      );
      this._geolocateButton = DOMcreate(
        "button",
        "maplibregl-ctrl-geolocate",
        this._container
      );
      DOMcreate(
        "span",
        "maplibregl-ctrl-icon",
        this._geolocateButton
      ).setAttribute("aria-hidden", "true");
      this._geolocateButton.type = "button";
      if (supported === false) {
        const title = this._map._getUIString(
          "GeolocateControl.LocationNotAvailable"
        );
        this._geolocateButton.disabled = true;
        this._geolocateButton.title = title;
        this._geolocateButton.setAttribute("aria-label", title);
      } else {
        const title = this._map._getUIString("GeolocateControl.FindMyLocation");
        this._geolocateButton.title = title;
        this._geolocateButton.setAttribute("aria-label", title);
      }
      if (this.options.trackUserLocation) {
        this._geolocateButton.setAttribute("aria-pressed", "false");
        this._watchState = "OFF";
      }
      if (this.options.showUserLocation) {
        this._dotElement = DOMcreate("div", "maplibregl-user-location-dot");
        this._userLocationDotMarker = new Marker$1({ element: this._dotElement });
        this._circleElement = DOMcreate(
          "div",
          "maplibregl-user-location-accuracy-circle"
        );
        this._accuracyCircleMarker = new Marker$1({
          element: this._circleElement,
          pitchAlignment: "map"
        });
        if (this.options.trackUserLocation)
          this._watchState = "OFF";
        this._map.on("move", this._onZoom);
      }
      this._geolocateButton.addEventListener("click", this.trigger.bind(this));
      this._setup = true;
      if (this.options.trackUserLocation) {
        this._map.on("moveend", (event) => {
          const fromResize = event.originalEvent && event.originalEvent.type === "resize";
          const movingDistance = this.lastUpdatedCenter.distanceTo(
            this._map.getCenter()
          );
          if (!event.geolocateSource && this._watchState === "ACTIVE_LOCK" && !fromResize && movingDistance > 1) {
            this._watchState = "BACKGROUND";
            this._geolocateButton.classList.add(
              "maplibregl-ctrl-geolocate-background"
            );
            this._geolocateButton.classList.remove(
              "maplibregl-ctrl-geolocate-active"
            );
            this.fire(new Event("trackuserlocationend"));
          }
        });
      }
    });
    __publicField$4(this, "_onZoom", () => {
      if (this.options.showUserLocation && this.options.showAccuracyCircle) {
        this._updateCircleRadius();
      }
    });
  }
  _updateCircleRadius() {
    if (this._watchState !== "BACKGROUND" && this._watchState !== "ACTIVE_LOCK") {
      return;
    }
    const lastKnownLocation = [
      this._lastKnownPosition.coords.longitude,
      this._lastKnownPosition.coords.latitude
    ];
    const projectedLocation = this._map.project(lastKnownLocation);
    const a = this._map.unproject([projectedLocation.x, projectedLocation.y]);
    const b = this._map.unproject([
      projectedLocation.x + 20,
      projectedLocation.y
    ]);
    const metersPerPixel = a.distanceTo(b) / 20;
    const circleDiameter = Math.ceil(2 * this._accuracy / metersPerPixel);
    this._circleElement.style.width = `${circleDiameter}px`;
    this._circleElement.style.height = `${circleDiameter}px`;
  }
}

class AttributionControl extends maplibregl__default.AttributionControl {
  onAdd(map) {
    return super.onAdd(map);
  }
}

class ScaleControl extends maplibregl__default.ScaleControl {
  onAdd(map) {
    return super.onAdd(map);
  }
}

class FullscreenControl extends maplibregl__default.FullscreenControl {
  onAdd(map) {
    return super.onAdd(map);
  }
}

var __defProp$5 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$5(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _options, _parentMap, _container, _canvasContainer, _parentRect, _differentStyle, _desync, _addParentRect, addParentRect_fn, _setParentBounds, setParentBounds_fn, _syncMaps, syncMaps_fn;
class Minimap {
  constructor(options, mapOptions) {
    __privateAdd(this, _addParentRect);
    __privateAdd(this, _setParentBounds);
    __privateAdd(this, _syncMaps);
    __privateAdd(this, _options, void 0);
    __publicField$3(this, "map");
    __privateAdd(this, _parentMap, void 0);
    __privateAdd(this, _container, void 0);
    __privateAdd(this, _canvasContainer, void 0);
    __privateAdd(this, _parentRect, void 0);
    __privateAdd(this, _differentStyle, false);
    __privateAdd(this, _desync, void 0);
    var _a;
    if (options.style !== void 0)
      __privateSet(this, _differentStyle, true);
    __privateSet(this, _options, __spreadProps$2(__spreadValues$3(__spreadProps$2(__spreadValues$3({
      // set defaults
      zoomAdjust: -4,
      position: "top-right"
    }, mapOptions), {
      // override any lingering control options
      forceNoAttributionControl: true,
      attributionControl: false,
      navigationControl: false,
      geolocateControl: false,
      maptilerLogo: false,
      minimap: false,
      hash: false,
      pitchAdjust: false
    }), options), {
      containerStyle: __spreadValues$3({
        border: "1px solid #000",
        width: "400px",
        height: "300px"
      }, (_a = options.containerStyle) != null ? _a : {})
    }));
    if (options.lockZoom !== void 0) {
      __privateGet(this, _options).minZoom = options.lockZoom;
      __privateGet(this, _options).maxZoom = options.lockZoom;
    }
  }
  setStyle(style, options) {
    if (!__privateGet(this, _differentStyle))
      this.map.setStyle(style, options);
    __privateMethod(this, _setParentBounds, setParentBounds_fn).call(this);
  }
  addLayer(layer, beforeId) {
    if (!__privateGet(this, _differentStyle))
      this.map.addLayer(layer, beforeId);
    __privateMethod(this, _setParentBounds, setParentBounds_fn).call(this);
    return this.map;
  }
  moveLayer(id, beforeId) {
    if (!__privateGet(this, _differentStyle))
      this.map.moveLayer(id, beforeId);
    __privateMethod(this, _setParentBounds, setParentBounds_fn).call(this);
    return this.map;
  }
  removeLayer(id) {
    if (!__privateGet(this, _differentStyle))
      this.map.removeLayer(id);
    __privateMethod(this, _setParentBounds, setParentBounds_fn).call(this);
    return this;
  }
  setLayerZoomRange(layerId, minzoom, maxzoom) {
    if (!__privateGet(this, _differentStyle))
      this.map.setLayerZoomRange(layerId, minzoom, maxzoom);
    __privateMethod(this, _setParentBounds, setParentBounds_fn).call(this);
    return this;
  }
  setFilter(layerId, filter, options) {
    if (!__privateGet(this, _differentStyle))
      this.map.setFilter(layerId, filter, options);
    __privateMethod(this, _setParentBounds, setParentBounds_fn).call(this);
    return this;
  }
  setPaintProperty(layerId, name, value, options) {
    if (!__privateGet(this, _differentStyle))
      this.map.setPaintProperty(layerId, name, value, options);
    __privateMethod(this, _setParentBounds, setParentBounds_fn).call(this);
    return this;
  }
  setLayoutProperty(layerId, name, value, options) {
    if (!__privateGet(this, _differentStyle))
      this.map.setLayoutProperty(layerId, name, value, options);
    __privateMethod(this, _setParentBounds, setParentBounds_fn).call(this);
    return this;
  }
  setGlyphs(glyphsUrl, options) {
    if (!__privateGet(this, _differentStyle))
      this.map.setGlyphs(glyphsUrl, options);
    __privateMethod(this, _setParentBounds, setParentBounds_fn).call(this);
    return this;
  }
  onAdd(parentMap) {
    __privateSet(this, _parentMap, parentMap);
    __privateSet(this, _container, DOMcreate("div", "maplibregl-ctrl maplibregl-ctrl-group"));
    for (const [key, value] of Object.entries(__privateGet(this, _options).containerStyle)) {
      __privateGet(this, _container).style.setProperty(key, value);
    }
    __privateGet(this, _options).container = __privateGet(this, _container);
    __privateGet(this, _options).zoom = parentMap.getZoom() + __privateGet(this, _options).zoomAdjust;
    this.map = new Map(__privateGet(this, _options));
    this.map.once("style.load", () => {
      this.map.resize();
    });
    this.map.once("load", () => {
      __privateMethod(this, _addParentRect, addParentRect_fn).call(this, __privateGet(this, _options).parentRect);
      __privateSet(this, _desync, __privateMethod(this, _syncMaps, syncMaps_fn).call(this));
    });
    return __privateGet(this, _container);
  }
  onRemove() {
    var _a;
    (_a = __privateGet(this, _desync)) == null ? void 0 : _a.call(this);
    DOMremove(__privateGet(this, _container));
  }
}
_options = new WeakMap();
_parentMap = new WeakMap();
_container = new WeakMap();
_canvasContainer = new WeakMap();
_parentRect = new WeakMap();
_differentStyle = new WeakMap();
_desync = new WeakMap();
_addParentRect = new WeakSet();
addParentRect_fn = function(rect) {
  if (rect === void 0 || rect.linePaint === void 0 && rect.fillPaint === void 0) {
    return;
  }
  __privateSet(this, _parentRect, {
    type: "Feature",
    properties: {
      name: "parentRect"
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[], [], [], [], []]]
    }
  });
  this.map.addSource("parentRect", {
    type: "geojson",
    data: __privateGet(this, _parentRect)
  });
  if (rect.lineLayout !== void 0 || rect.linePaint !== void 0) {
    this.map.addLayer({
      id: "parentRectOutline",
      type: "line",
      source: "parentRect",
      layout: __spreadValues$3({}, rect.lineLayout),
      paint: __spreadValues$3({
        "line-color": "#FFF",
        "line-width": 1,
        "line-opacity": 0.85
      }, rect.linePaint)
    });
  }
  if (rect.fillPaint !== void 0) {
    this.map.addLayer({
      id: "parentRectFill",
      type: "fill",
      source: "parentRect",
      layout: {},
      paint: __spreadValues$3({
        "fill-color": "#08F",
        "fill-opacity": 0.135
      }, rect.fillPaint)
    });
  }
  __privateMethod(this, _setParentBounds, setParentBounds_fn).call(this);
};
_setParentBounds = new WeakSet();
setParentBounds_fn = function() {
  if (__privateGet(this, _parentRect) === void 0)
    return;
  const { devicePixelRatio } = window;
  const canvas = __privateGet(this, _parentMap).getCanvas();
  const width = canvas.width / devicePixelRatio;
  const height = canvas.height / devicePixelRatio;
  const unproject = __privateGet(this, _parentMap).unproject.bind(__privateGet(this, _parentMap));
  const northWest = unproject([0, 0]);
  const northEast = unproject([width, 0]);
  const southWest = unproject([0, height]);
  const southEast = unproject([width, height]);
  __privateGet(this, _parentRect).geometry.coordinates = [
    [
      southWest.toArray(),
      southEast.toArray(),
      northEast.toArray(),
      northWest.toArray(),
      southWest.toArray()
    ]
  ];
  const source = this.map.getSource("parentRect");
  source.setData(__privateGet(this, _parentRect));
};
_syncMaps = new WeakSet();
syncMaps_fn = function() {
  const { pitchAdjust } = __privateGet(this, _options);
  const parentCallback = () => {
    sync("parent");
  };
  const minimapCallback = () => {
    sync("minimap");
  };
  const on = () => {
    __privateGet(this, _parentMap).on("move", parentCallback);
    this.map.on("move", minimapCallback);
  };
  const off = () => {
    __privateGet(this, _parentMap).off("move", parentCallback);
    this.map.off("move", minimapCallback);
  };
  const sync = (which) => {
    var _a;
    off();
    const from = which === "parent" ? __privateGet(this, _parentMap) : this.map;
    const to = which === "parent" ? this.map : __privateGet(this, _parentMap);
    const center = from.getCenter();
    const zoom = from.getZoom() + ((_a = __privateGet(this, _options).zoomAdjust) != null ? _a : -4) * (which === "parent" ? 1 : -1);
    const bearing = from.getBearing();
    const pitch = from.getPitch();
    to.jumpTo({
      center,
      zoom,
      bearing,
      pitch: pitchAdjust ? pitch : 0
    });
    __privateMethod(this, _setParentBounds, setParentBounds_fn).call(this);
    on();
  };
  on();
  return () => {
    off();
  };
};

var __defProp$4 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __async$1 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const GeolocationType = {
  POINT: "POINT",
  COUNTRY: "COUNTRY"
};
class Map extends maplibregl__default.Map {
  constructor(options) {
    var _a, _b, _c;
    if (options.apiKey) {
      config.apiKey = options.apiKey;
    }
    const style = styleToStyle(options.style);
    const hashPreConstructor = location.hash;
    if (!config.apiKey) {
      console.warn(
        "MapTiler Cloud API key is not set. Visit https://maptiler.com and try Cloud for free!"
      );
    }
    super(__spreadProps$1(__spreadValues$2({}, options), {
      style,
      maplibreLogo: false,
      transformRequest: combineTransformRequest(options.transformRequest)
    }));
    __publicField$2(this, "isTerrainEnabled", false);
    __publicField$2(this, "terrainExaggeration", 1);
    __publicField$2(this, "primaryLanguage");
    __publicField$2(this, "terrainGrowing", false);
    __publicField$2(this, "terrainFlattening", false);
    __publicField$2(this, "minimap");
    __publicField$2(this, "forceLanguageUpdate");
    __publicField$2(this, "languageAlwaysBeenStyle");
    this.primaryLanguage = (_a = options.language) != null ? _a : config.primaryLanguage;
    this.forceLanguageUpdate = this.primaryLanguage === Language.STYLE || this.primaryLanguage === Language.STYLE_LOCK ? false : true;
    this.languageAlwaysBeenStyle = this.primaryLanguage === Language.STYLE;
    this.terrainExaggeration = (_b = options.terrainExaggeration) != null ? _b : this.terrainExaggeration;
    this.once("styledata", () => __async$1(this, null, function* () {
      if (!options.geolocate) {
        return;
      }
      if (options.center) {
        return;
      }
      if (options.hash && !!hashPreConstructor) {
        return;
      }
      try {
        if (options.geolocate === GeolocationType.COUNTRY) {
          yield this.fitToIpBounds();
          return;
        }
      } catch (e) {
        console.warn(e.message);
      }
      let ipLocatedCameraHash;
      try {
        yield this.centerOnIpPoint(options.zoom);
        ipLocatedCameraHash = this.getCameraHash();
      } catch (e) {
        console.warn(e.message);
      }
      const locationResult = yield navigator.permissions.query({
        name: "geolocation"
      });
      if (locationResult.state === "granted") {
        navigator.geolocation.getCurrentPosition(
          // success callback
          (data) => {
            if (ipLocatedCameraHash !== this.getCameraHash()) {
              return;
            }
            if (this.terrain) {
              this.easeTo({
                center: [data.coords.longitude, data.coords.latitude],
                zoom: options.zoom || 12,
                duration: 2e3
              });
            } else {
              this.once("terrain", () => {
                this.easeTo({
                  center: [data.coords.longitude, data.coords.latitude],
                  zoom: options.zoom || 12,
                  duration: 2e3
                });
              });
            }
          },
          // error callback
          null,
          // options
          {
            maximumAge: 24 * 3600 * 1e3,
            // a day in millisec
            timeout: 5e3,
            // milliseconds
            enableHighAccuracy: false
          }
        );
      }
    }));
    this.on("styledata", () => {
      this.setPrimaryLanguage(this.primaryLanguage);
    });
    this.on("styledata", () => {
      if (this.getTerrain() === null && this.isTerrainEnabled) {
        this.enableTerrain(this.terrainExaggeration);
      }
    });
    this.once("load", () => __async$1(this, null, function* () {
      enableRTL();
    }));
    this.once("load", () => __async$1(this, null, function* () {
      let tileJsonContent = { logo: null };
      try {
        const possibleSources = Object.keys(this.style.sourceCaches).map((sourceName) => this.getSource(sourceName)).filter(
          (s) => s && "url" in s && typeof s.url === "string" && (s == null ? void 0 : s.url.includes("tiles.json"))
        );
        const styleUrl = new URL(
          possibleSources[0].url
        );
        if (!styleUrl.searchParams.has("key")) {
          styleUrl.searchParams.append("key", config.apiKey);
        }
        const tileJsonRes = yield fetch(styleUrl.href);
        tileJsonContent = yield tileJsonRes.json();
      } catch (e) {
      }
      if (options.forceNoAttributionControl !== true) {
        if ("logo" in tileJsonContent && tileJsonContent.logo) {
          const logoURL = tileJsonContent.logo;
          this.addControl(
            new MaptilerLogoControl({ logoURL }),
            options.logoPosition
          );
          if (options.attributionControl === false) {
            this.addControl(
              new AttributionControl({
                customAttribution: options.customAttribution
              })
            );
          }
        } else if (options.maptilerLogo) {
          this.addControl(new MaptilerLogoControl(), options.logoPosition);
        }
      }
      if (options.scaleControl) {
        const position = options.scaleControl === true || options.scaleControl === void 0 ? "bottom-right" : options.scaleControl;
        const scaleControl = new ScaleControl({ unit: config.unit });
        this.addControl(scaleControl, position);
        config.on("unit", (unit) => {
          scaleControl.setUnit(unit);
        });
      }
      if (options.navigationControl !== false) {
        const position = options.navigationControl === true || options.navigationControl === void 0 ? "top-right" : options.navigationControl;
        this.addControl(new MaptilerNavigationControl(), position);
      }
      if (options.geolocateControl !== false) {
        const position = options.geolocateControl === true || options.geolocateControl === void 0 ? "top-right" : options.geolocateControl;
        this.addControl(
          // new maplibregl.GeolocateControl({
          new MaptilerGeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
              maximumAge: 0,
              timeout: 6e3
            },
            fitBoundsOptions: {
              maxZoom: 15
            },
            trackUserLocation: true,
            showAccuracyCircle: true,
            showUserLocation: true
          }),
          position
        );
      }
      if (options.terrainControl) {
        const position = options.terrainControl === true || options.terrainControl === void 0 ? "top-right" : options.terrainControl;
        this.addControl(new MaptilerTerrainControl(), position);
      }
      if (options.fullscreenControl) {
        const position = options.fullscreenControl === true || options.fullscreenControl === void 0 ? "top-right" : options.fullscreenControl;
        this.addControl(new FullscreenControl({}), position);
      }
    }));
    let loadEventTriggered = false;
    let terrainEventTriggered = false;
    let terrainEventData;
    this.once("load", () => {
      loadEventTriggered = true;
      if (terrainEventTriggered) {
        this.fire("loadWithTerrain", terrainEventData);
      }
    });
    this.once("style.load", () => {
      var _a2;
      const { minimap } = options;
      if (typeof minimap === "object") {
        const {
          zoom,
          center,
          style: style2,
          language,
          apiKey,
          maptilerLogo,
          antialias,
          refreshExpiredTiles,
          maxBounds,
          scrollZoom,
          minZoom,
          maxZoom,
          boxZoom,
          locale,
          fadeDuration,
          crossSourceCollisions,
          clickTolerance,
          bounds,
          fitBoundsOptions,
          pixelRatio,
          validateStyle
        } = options;
        this.minimap = new Minimap(minimap, {
          zoom,
          center,
          style: style2,
          language,
          apiKey,
          container: "null",
          maptilerLogo,
          antialias,
          refreshExpiredTiles,
          maxBounds,
          scrollZoom,
          minZoom,
          maxZoom,
          boxZoom,
          locale,
          fadeDuration,
          crossSourceCollisions,
          clickTolerance,
          bounds,
          fitBoundsOptions,
          pixelRatio,
          validateStyle
        });
        this.addControl(this.minimap, (_a2 = minimap.position) != null ? _a2 : "bottom-left");
      } else if (minimap === true) {
        this.minimap = new Minimap({}, options);
        this.addControl(this.minimap, "bottom-left");
      } else if (minimap !== void 0 && minimap !== false) {
        this.minimap = new Minimap({}, options);
        this.addControl(this.minimap, minimap);
      }
    });
    const terrainCallback = (evt) => {
      if (!evt.terrain)
        return;
      terrainEventTriggered = true;
      terrainEventData = {
        type: "loadWithTerrain",
        target: this,
        terrain: evt.terrain
      };
      this.off("terrain", terrainCallback);
      if (loadEventTriggered) {
        this.fire("loadWithTerrain", terrainEventData);
      }
    };
    this.on("terrain", terrainCallback);
    if (options.terrain) {
      this.enableTerrain(
        (_c = options.terrainExaggeration) != null ? _c : this.terrainExaggeration
      );
    }
  }
  /**
   * Awaits for _this_ Map instance to be "loaded" and returns a Promise to the Map.
   * If _this_ Map instance is already loaded, the Promise is resolved directly,
   * otherwise, it is resolved as a result of the "load" event.
   * @returns
   */
  onLoadAsync() {
    return __async$1(this, null, function* () {
      return new Promise((resolve) => {
        if (this.loaded()) {
          return resolve(this);
        }
        this.once("load", () => {
          resolve(this);
        });
      });
    });
  }
  /**
   * Awaits for _this_ Map instance to be "loaded" as well as with terrain being non-null for the first time
   * and returns a Promise to the Map.
   * If _this_ Map instance is already loaded with terrain, the Promise is resolved directly,
   * otherwise, it is resolved as a result of the "loadWithTerrain" event.
   * @returns
   */
  onLoadWithTerrainAsync() {
    return __async$1(this, null, function* () {
      return new Promise((resolve) => {
        if (this.loaded() && this.terrain) {
          return resolve(this);
        }
        this.once("loadWithTerrain", () => {
          resolve(this);
        });
      });
    });
  }
  /**
   * Update the style of the map.
   * Can be:
   * - a full style URL (possibly with API key)
   * - a shorthand with only the MapTIler style name (eg. `"streets-v2"`)
   * - a longer form with the prefix `"maptiler://"` (eg. `"maptiler://streets-v2"`)
   */
  setStyle(style, options) {
    var _a;
    (_a = this.minimap) == null ? void 0 : _a.setStyle(style);
    this.forceLanguageUpdate = true;
    this.once("idle", () => {
      this.forceLanguageUpdate = false;
    });
    return super.setStyle(styleToStyle(style), options);
  }
  /**
   * Adds a [MapLibre style layer](https://maplibre.org/maplibre-style-spec/layers)
   * to the map's style.
   *
   * A layer defines how data from a specified source will be styled. Read more about layer types
   * and available paint and layout properties in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/layers).
   *
   * @param layer - The layer to add,
   * conforming to either the MapLibre Style Specification's [layer definition](https://maplibre.org/maplibre-style-spec/layers) or,
   * less commonly, the {@link CustomLayerInterface} specification.
   * The MapLibre Style Specification's layer definition is appropriate for most layers.
   *
   * @param beforeId - The ID of an existing layer to insert the new layer before,
   * resulting in the new layer appearing visually beneath the existing layer.
   * If this argument is not specified, the layer will be appended to the end of the layers array
   * and appear visually above all other layers.
   *
   * @returns `this`
   */
  addLayer(layer, beforeId) {
    var _a;
    (_a = this.minimap) == null ? void 0 : _a.addLayer(layer, beforeId);
    return super.addLayer(layer, beforeId);
  }
  /**
   * Moves a layer to a different z-position.
   *
   * @param id - The ID of the layer to move.
   * @param beforeId - The ID of an existing layer to insert the new layer before. When viewing the map, the `id` layer will appear beneath the `beforeId` layer. If `beforeId` is omitted, the layer will be appended to the end of the layers array and appear above all other layers on the map.
   * @returns `this`
   *
   * @example
   * Move a layer with ID 'polygon' before the layer with ID 'country-label'. The `polygon` layer will appear beneath the `country-label` layer on the map.
   * ```ts
   * map.moveLayer('polygon', 'country-label');
   * ```
   */
  moveLayer(id, beforeId) {
    var _a;
    (_a = this.minimap) == null ? void 0 : _a.moveLayer(id, beforeId);
    return super.moveLayer(id, beforeId);
  }
  /**
   * Removes the layer with the given ID from the map's style.
   *
   * An {@link ErrorEvent} will be fired if the image parameter is invald.
   *
   * @param id - The ID of the layer to remove
   * @returns `this`
   *
   * @example
   * If a layer with ID 'state-data' exists, remove it.
   * ```ts
   * if (map.getLayer('state-data')) map.removeLayer('state-data');
   * ```
   */
  removeLayer(id) {
    var _a;
    (_a = this.minimap) == null ? void 0 : _a.removeLayer(id);
    return super.removeLayer(id);
  }
  /**
   * Sets the zoom extent for the specified style layer. The zoom extent includes the
   * [minimum zoom level](https://maplibre.org/maplibre-style-spec/layers/#minzoom)
   * and [maximum zoom level](https://maplibre.org/maplibre-style-spec/layers/#maxzoom))
   * at which the layer will be rendered.
   *
   * Note: For style layers using vector sources, style layers cannot be rendered at zoom levels lower than the
   * minimum zoom level of the _source layer_ because the data does not exist at those zoom levels. If the minimum
   * zoom level of the source layer is higher than the minimum zoom level defined in the style layer, the style
   * layer will not be rendered at all zoom levels in the zoom range.
   */
  setLayerZoomRange(layerId, minzoom, maxzoom) {
    var _a;
    (_a = this.minimap) == null ? void 0 : _a.setLayerZoomRange(layerId, minzoom, maxzoom);
    return super.setLayerZoomRange(layerId, minzoom, maxzoom);
  }
  /**
   * Sets the filter for the specified style layer.
   *
   * Filters control which features a style layer renders from its source.
   * Any feature for which the filter expression evaluates to `true` will be
   * rendered on the map. Those that are false will be hidden.
   *
   * Use `setFilter` to show a subset of your source data.
   *
   * To clear the filter, pass `null` or `undefined` as the second parameter.
   */
  setFilter(layerId, filter, options) {
    var _a;
    (_a = this.minimap) == null ? void 0 : _a.setFilter(layerId, filter, options);
    return super.setFilter(layerId, filter, options);
  }
  /**
   * Sets the value of a paint property in the specified style layer.
   *
   * @param layerId - The ID of the layer to set the paint property in.
   * @param name - The name of the paint property to set.
   * @param value - The value of the paint property to set.
   * Must be of a type appropriate for the property, as defined in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/).
   * @param options - Options object.
   * @returns `this`
   * @example
   * ```ts
   * map.setPaintProperty('my-layer', 'fill-color', '#faafee');
   * ```
   */
  setPaintProperty(layerId, name, value, options) {
    var _a;
    (_a = this.minimap) == null ? void 0 : _a.setPaintProperty(layerId, name, value, options);
    return super.setPaintProperty(layerId, name, value, options);
  }
  /**
   * Sets the value of a layout property in the specified style layer.
   * Layout properties define how the layer is styled.
   * Layout properties for layers of the same type are documented together.
   * Layers of different types have different layout properties.
   * See the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/) for the complete list of layout properties.
   * @param layerId - The ID of the layer to set the layout property in.
   * @param name - The name of the layout property to set.
   * @param value - The value of the layout property to set.
   * Must be of a type appropriate for the property, as defined in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/).
   * @param options - Options object.
   * @returns `this`
   */
  setLayoutProperty(layerId, name, value, options) {
    var _a;
    (_a = this.minimap) == null ? void 0 : _a.setLayoutProperty(layerId, name, value, options);
    return super.setLayoutProperty(layerId, name, value, options);
  }
  /**
   * Sets the value of the style's glyphs property.
   *
   * @param glyphsUrl - Glyph URL to set. Must conform to the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/glyphs/).
   * @param options - Options object.
   * @returns `this`
   * @example
   * ```ts
   * map.setGlyphs('https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf');
   * ```
   */
  setGlyphs(glyphsUrl, options) {
    var _a;
    (_a = this.minimap) == null ? void 0 : _a.setGlyphs(glyphsUrl, options);
    return super.setGlyphs(glyphsUrl, options);
  }
  getStyleLanguage() {
    if (!this.style.stylesheet.metadata)
      return null;
    if (typeof this.style.stylesheet.metadata !== "object")
      return null;
    if ("maptiler:language" in this.style.stylesheet.metadata && typeof this.style.stylesheet.metadata["maptiler:language"] === "string") {
      return this.style.stylesheet.metadata["maptiler:language"];
    } else {
      return null;
    }
  }
  /**
   * Define the primary language of the map. Note that not all the languages shorthands provided are available.
   */
  setLanguage(language) {
    var _a, _b;
    (_b = (_a = this.minimap) == null ? void 0 : _a.map) == null ? void 0 : _b.setLanguage(language);
    this.onStyleReady(() => {
      this.setPrimaryLanguage(language);
    });
  }
  /**
   * Define the primary language of the map. Note that not all the languages shorthands provided are available.
   */
  setPrimaryLanguage(language) {
    const styleLanguage = this.getStyleLanguage();
    if (!(language === Language.STYLE && (styleLanguage === Language.AUTO || styleLanguage === Language.VISITOR))) {
      if (language !== Language.STYLE) {
        this.languageAlwaysBeenStyle = false;
      }
      if (this.languageAlwaysBeenStyle) {
        return;
      }
      if (this.primaryLanguage === language && !this.forceLanguageUpdate) {
        return;
      }
    }
    if (!isLanguageSupported(language)) {
      console.warn(`The language "${language}" is not supported.`);
      return;
    }
    if (this.primaryLanguage === Language.STYLE_LOCK) {
      console.warn(
        "The language cannot be changed because this map has been instantiated with the STYLE_LOCK language flag."
      );
      return;
    }
    this.primaryLanguage = language;
    let languageNonStyle = language;
    if (language === Language.STYLE) {
      if (!styleLanguage) {
        console.warn("The style has no default languages.");
        return;
      }
      if (!isLanguageSupported(styleLanguage)) {
        console.warn("The language defined in the style is not valid.");
        return;
      }
      languageNonStyle = styleLanguage;
    }
    let langStr = Language.LOCAL;
    let replacer = `{${langStr}}`;
    if (languageNonStyle == Language.VISITOR) {
      langStr = getBrowserLanguage();
      replacer = [
        "case",
        ["all", ["has", langStr], ["has", Language.LOCAL]],
        [
          "case",
          ["==", ["get", langStr], ["get", Language.LOCAL]],
          ["get", Language.LOCAL],
          [
            "format",
            ["get", langStr],
            { "font-scale": 0.8 },
            "\n",
            ["get", Language.LOCAL],
            { "font-scale": 1.1 }
          ]
        ],
        ["get", Language.LOCAL]
      ];
    } else if (languageNonStyle == Language.VISITOR_ENGLISH) {
      langStr = Language.ENGLISH;
      replacer = [
        "case",
        ["all", ["has", langStr], ["has", Language.LOCAL]],
        [
          "case",
          ["==", ["get", langStr], ["get", Language.LOCAL]],
          ["get", Language.LOCAL],
          [
            "format",
            ["get", langStr],
            { "font-scale": 0.8 },
            "\n",
            ["get", Language.LOCAL],
            { "font-scale": 1.1 }
          ]
        ],
        ["get", Language.LOCAL]
      ];
    } else if (languageNonStyle === Language.AUTO) {
      langStr = getBrowserLanguage();
      replacer = [
        "case",
        ["has", langStr],
        ["get", langStr],
        ["get", Language.LOCAL]
      ];
    } else if (languageNonStyle === Language.LOCAL) {
      langStr = Language.LOCAL;
      replacer = `{${langStr}}`;
    } else {
      langStr = languageNonStyle;
      replacer = [
        "case",
        ["has", langStr],
        ["get", langStr],
        ["get", Language.LOCAL]
      ];
    }
    const { layers } = this.getStyle();
    for (const { id, layout } of layers) {
      if (!layout) {
        continue;
      }
      if (!("text-field" in layout)) {
        continue;
      }
      const textFieldLayoutProp = this.getLayoutProperty(id, "text-field");
      if (typeof textFieldLayoutProp === "string" && (textFieldLayoutProp.toLowerCase().includes("ref") || textFieldLayoutProp.toLowerCase().includes("housenumber"))) {
        continue;
      }
      this.setLayoutProperty(id, "text-field", replacer);
    }
  }
  /**
   * Get the primary language
   * @returns
   */
  getPrimaryLanguage() {
    return this.primaryLanguage;
  }
  /**
   * Get the exaggeration factor applied to the terrain
   * @returns
   */
  getTerrainExaggeration() {
    return this.terrainExaggeration;
  }
  /**
   * Know if terrian is enabled or not
   * @returns
   */
  hasTerrain() {
    return this.isTerrainEnabled;
  }
  growTerrain(exaggeration, durationMs = 1e3) {
    if (!this.terrain) {
      return;
    }
    const startTime = performance.now();
    const currentExaggeration = this.terrain.exaggeration;
    const deltaExaggeration = exaggeration - currentExaggeration;
    const updateExaggeration = () => {
      if (!this.terrain) {
        return;
      }
      if (this.terrainFlattening) {
        return;
      }
      const positionInLoop = (performance.now() - startTime) / durationMs;
      if (positionInLoop < 0.99) {
        const exaggerationFactor = 1 - Math.pow(1 - positionInLoop, 4);
        const newExaggeration = currentExaggeration + exaggerationFactor * deltaExaggeration;
        this.terrain.exaggeration = newExaggeration;
        requestAnimationFrame(updateExaggeration);
      } else {
        this.terrainGrowing = false;
        this.terrainFlattening = false;
        this.terrain.exaggeration = exaggeration;
      }
      this.triggerRepaint();
    };
    this.terrainGrowing = true;
    this.terrainFlattening = false;
    requestAnimationFrame(updateExaggeration);
  }
  /**
   * Enables the 3D terrain visualization
   */
  enableTerrain(exaggeration = this.terrainExaggeration) {
    if (exaggeration < 0) {
      console.warn("Terrain exaggeration cannot be negative.");
      return;
    }
    const dataEventTerrainGrow = (evt) => __async$1(this, null, function* () {
      if (!this.terrain) {
        return;
      }
      if (evt.type !== "data" || evt.dataType !== "source" || !("source" in evt)) {
        return;
      }
      if (evt.sourceId !== "maptiler-terrain") {
        return;
      }
      const source = evt.source;
      if (source.type !== "raster-dem") {
        return;
      }
      if (!evt.isSourceLoaded) {
        return;
      }
      this.off("data", dataEventTerrainGrow);
      this.growTerrain(exaggeration);
    });
    const addTerrain = () => {
      this.isTerrainEnabled = true;
      this.terrainExaggeration = exaggeration;
      this.on("data", dataEventTerrainGrow);
      this.addSource(defaults.terrainSourceId, {
        type: "raster-dem",
        url: defaults.terrainSourceURL
      });
      this.setTerrain({
        source: defaults.terrainSourceId,
        exaggeration: 0
      });
    };
    if (this.getTerrain()) {
      this.isTerrainEnabled = true;
      this.growTerrain(exaggeration);
      return;
    }
    if (this.loaded() || this.isTerrainEnabled) {
      addTerrain();
    } else {
      this.once("load", () => {
        if (this.getTerrain() && this.getSource(defaults.terrainSourceId)) {
          return;
        }
        addTerrain();
      });
    }
  }
  /**
   * Disable the 3D terrain visualization
   */
  disableTerrain() {
    if (!this.terrain) {
      return;
    }
    this.isTerrainEnabled = false;
    const animationLoopDuration = 1 * 1e3;
    const startTime = performance.now();
    const currentExaggeration = this.terrain.exaggeration;
    const updateExaggeration = () => {
      if (!this.terrain) {
        return;
      }
      if (this.terrainGrowing) {
        return;
      }
      const positionInLoop = (performance.now() - startTime) / animationLoopDuration;
      if (positionInLoop < 0.99) {
        const exaggerationFactor = Math.pow(1 - positionInLoop, 4);
        const newExaggeration = currentExaggeration * exaggerationFactor;
        this.terrain.exaggeration = newExaggeration;
        requestAnimationFrame(updateExaggeration);
      } else {
        this.terrain.exaggeration = 0;
        this.terrainGrowing = false;
        this.terrainFlattening = false;
        this.setTerrain();
        if (this.getSource(defaults.terrainSourceId)) {
          this.removeSource(defaults.terrainSourceId);
        }
      }
      this.triggerRepaint();
    };
    this.terrainGrowing = false;
    this.terrainFlattening = true;
    requestAnimationFrame(updateExaggeration);
  }
  /**
   * Sets the 3D terrain exageration factor.
   * If the terrain was not enabled prior to the call of this method,
   * the method `.enableTerrain()` will be called.
   * If `animate` is `true`, the terrain transformation will be animated in the span of 1 second.
   * If `animate` is `false`, no animated transition to the newly defined exaggeration.
   */
  setTerrainExaggeration(exaggeration, animate = true) {
    if (!animate && this.terrain) {
      this.terrainExaggeration = exaggeration;
      this.terrain.exaggeration = exaggeration;
      this.triggerRepaint();
    } else {
      this.enableTerrain(exaggeration);
    }
  }
  /**
   * Perform an action when the style is ready. It could be at the moment of calling this method
   * or later.
   */
  onStyleReady(cb) {
    if (this.isStyleLoaded()) {
      cb();
    } else {
      this.once("styledata", () => {
        cb();
      });
    }
  }
  fitToIpBounds() {
    return __async$1(this, null, function* () {
      const ipGeolocateResult = yield geolocation.info();
      this.fitBounds(
        ipGeolocateResult.country_bounds,
        {
          duration: 0,
          padding: 100
        }
      );
    });
  }
  centerOnIpPoint(zoom) {
    return __async$1(this, null, function* () {
      var _a, _b;
      const ipGeolocateResult = yield geolocation.info();
      this.jumpTo({
        center: [
          (_a = ipGeolocateResult == null ? void 0 : ipGeolocateResult.longitude) != null ? _a : 0,
          (_b = ipGeolocateResult == null ? void 0 : ipGeolocateResult.latitude) != null ? _b : 0
        ],
        zoom: zoom || 11
      });
    });
  }
  getCameraHash() {
    const hashBin = new Float32Array(5);
    const center = this.getCenter();
    hashBin[0] = center.lng;
    hashBin[1] = center.lat;
    hashBin[2] = this.getZoom();
    hashBin[3] = this.getPitch();
    hashBin[4] = this.getBearing();
    return Base64.fromUint8Array(new Uint8Array(hashBin.buffer));
  }
  /**
   * Get the SDK config object.
   * This is convenient to dispatch the SDK configuration to externally built layers
   * that do not directly have access to the SDK configuration but do have access to a Map instance.
   */
  getSdkConfig() {
    return config;
  }
  /**
   * Get the MapTiler session ID. Convenient to dispatch to externaly built component
   * that do not directly have access to the SDK configuration but do have access to a Map instance.
   * @returns
   */
  getMaptilerSessionId() {
    return MAPTILER_SESSION_ID;
  }
  /**
   *  Updates the requestManager's transform request with a new function.
   *
   * @param transformRequest A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.
   *    Expected to return an object with a `url` property and optionally `headers` and `credentials` properties
   *
   * @returns {Map} `this`
   *
   *  @example
   *  map.setTransformRequest((url: string, resourceType: string) => {});
   */
  setTransformRequest(transformRequest) {
    super.setTransformRequest(combineTransformRequest(transformRequest));
    return this;
  }
  /**
   * Loads an image. This is an async equivalent of `Map.loadImage`
   */
  loadImageAsync(url) {
    return __async$1(this, null, function* () {
      return new Promise((resolve, reject) => {
        this.loadImage(
          url,
          (error, image) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(image);
          }
        );
      });
    });
  }
}

class Marker extends maplibregl__default.Marker {
  addTo(map) {
    return super.addTo(map);
  }
}

class Popup extends maplibregl__default.Popup {
  addTo(map) {
    return super.addTo(map);
  }
}

class Style extends maplibregl__default.Style {
  constructor(map, options = {}) {
    super(map, options);
  }
}

class CanvasSource extends maplibregl__default.CanvasSource {
  onAdd(map) {
    super.onAdd(map);
  }
}

class GeoJSONSource extends maplibregl__default.GeoJSONSource {
  onAdd(map) {
    super.onAdd(map);
  }
}

class ImageSource extends maplibregl__default.ImageSource {
  onAdd(map) {
    super.onAdd(map);
  }
}

class RasterTileSource extends maplibregl__default.RasterTileSource {
  onAdd(map) {
    super.onAdd(map);
  }
}

class RasterDEMTileSource extends maplibregl__default.RasterDEMTileSource {
  onAdd(map) {
    super.onAdd(map);
  }
}

class VectorTileSource extends maplibregl__default.VectorTileSource {
  onAdd(map) {
    super.onAdd(map);
  }
}

class VideoSource extends maplibregl__default.VideoSource {
  onAdd(map) {
    super.onAdd(map);
  }
}

class TerrainControl extends maplibregl__default.TerrainControl {
  onAdd(map) {
    return super.onAdd(map);
  }
}

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Point {
  constructor(x, y) {
    __publicField$1(this, "x");
    __publicField$1(this, "y");
    this.x = x;
    this.y = y;
  }
  _matMult(m) {
    const x = m[0] * this.x + m[1] * this.y;
    const y = m[2] * this.x + m[3] * this.y;
    this.x = x;
    this.y = y;
    return this;
  }
  _add(p) {
    this.x += p.x;
    this.y += p.y;
    return this;
  }
  _sub(p) {
    this.x -= p.x;
    this.y -= p.y;
    return this;
  }
  _mult(k) {
    this.x *= k;
    this.y *= k;
    return this;
  }
  _div(k) {
    this.x /= k;
    this.y /= k;
    return this;
  }
  _multByPoint(p) {
    this.x *= p.x;
    this.y *= p.y;
    return this;
  }
  _divByPoint(p) {
    this.x /= p.x;
    this.y /= p.y;
    return this;
  }
  _unit() {
    this._div(this.mag());
    return this;
  }
  _perp() {
    const y = this.y;
    this.y = this.x;
    this.x = -y;
    return this;
  }
  _rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = cos * this.x - sin * this.y;
    const y = sin * this.x + cos * this.y;
    this.x = x;
    this.y = y;
    return this;
  }
  _rotateAround(angle, p) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = p.x + cos * (this.x - p.x) - sin * (this.y - p.y);
    const y = p.y + sin * (this.x - p.x) + cos * (this.y - p.y);
    this.x = x;
    this.y = y;
    return this;
  }
  _round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }
  /**
   * Clone this point, returning a new point that can be modified
   * without affecting the old one.
   * @return {Point} the clone
   */
  clone() {
    return new Point(this.x, this.y);
  }
  /**
   * Add this point's x & y coordinates to another point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  add(p) {
    return this.clone()._add(p);
  }
  /**
   * Subtract this point's x & y coordinates to from point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  sub(p) {
    return this.clone()._sub(p);
  }
  /**
   * Multiply this point's x & y coordinates by point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  multByPoint(p) {
    return this.clone()._multByPoint(p);
  }
  /**
   * Divide this point's x & y coordinates by point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  divByPoint(p) {
    return this.clone()._divByPoint(p);
  }
  /**
   * Multiply this point's x & y coordinates by a factor,
   * yielding a new point.
   * @param {Number} k factor
   * @return {Point} output point
   */
  mult(k) {
    return this.clone()._mult(k);
  }
  /**
   * Divide this point's x & y coordinates by a factor,
   * yielding a new point.
   * @param {Point} k factor
   * @return {Point} output point
   */
  div(k) {
    return this.clone()._div(k);
  }
  /**
   * Rotate this point around the 0, 0 origin by an angle a,
   * given in radians
   * @param {Number} a angle to rotate around, in radians
   * @return {Point} output point
   */
  rotate(a) {
    return this.clone()._rotate(a);
  }
  /**
   * Rotate this point around p point by an angle a,
   * given in radians
   * @param {Number} a angle to rotate around, in radians
   * @param {Point} p Point to rotate around
   * @return {Point} output point
   */
  rotateAround(a, p) {
    return this.clone()._rotateAround(a, p);
  }
  /**
   * Multiply this point by a 4x1 transformation matrix
   * @param {Array<Number>} m transformation matrix
   * @return {Point} output point
   */
  matMult(m) {
    return this.clone()._matMult(m);
  }
  /**
   * Calculate this point but as a unit vector from 0, 0, meaning
   * that the distance from the resulting point to the 0, 0
   * coordinate will be equal to 1 and the angle from the resulting
   * point to the 0, 0 coordinate will be the same as before.
   * @return {Point} unit vector point
   */
  unit() {
    return this.clone()._unit();
  }
  /**
   * Compute a perpendicular point, where the new y coordinate
   * is the old x coordinate and the new x coordinate is the old y
   * coordinate multiplied by -1
   * @return {Point} perpendicular point
   */
  perp() {
    return this.clone()._perp();
  }
  /**
   * Return a version of this point with the x & y coordinates
   * rounded to integers.
   * @return {Point} rounded point
   */
  round() {
    return this.clone()._round();
  }
  /**
   * Return the magnitude of this point: this is the Euclidean
   * distance from the 0, 0 coordinate to this point's x and y
   * coordinates.
   * @return {Number} magnitude
   */
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Judge whether this point is equal to another point, returning
   * true or false.
   * @param {Point} other the other point
   * @return {boolean} whether the points are equal
   */
  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
  /**
   * Calculate the distance from this point to another point
   * @param {Point} p the other point
   * @return {Number} distance
   */
  dist(p) {
    return Math.sqrt(this.distSqr(p));
  }
  /**
   * Calculate the distance from this point to another point,
   * without the square root step. Useful if you're comparing
   * relative distances.
   * @param {Point} p the other point
   * @return {Number} distance
   */
  distSqr(p) {
    const dx = p.x - this.x;
    const dy = p.y - this.y;
    return dx * dx + dy * dy;
  }
  /**
   * Get the angle from the 0, 0 coordinate to this point, in radians
   * coordinates.
   * @return {Number} angle
   */
  angle() {
    return Math.atan2(this.y, this.x);
  }
  /**
   * Get the angle from this point to another point, in radians
   * @param {Point} b the other point
   * @return {Number} angle
   */
  angleTo(b) {
    return Math.atan2(this.y - b.y, this.x - b.x);
  }
  /**
   * Get the angle between this point and another point, in radians
   * @param {Point} b the other point
   * @return {Number} angle
   */
  angleWith(b) {
    return this.angleWithSep(b.x, b.y);
  }
  /*
   * Find the angle of the two vectors, solving the formula for
   * the cross product a x b = |a||b|sin(θ) for θ.
   * @param {Number} x the x-coordinate
   * @param {Number} y the y-coordinate
   * @return {Number} the angle in radians
   */
  angleWithSep(x, y) {
    return Math.atan2(this.x * y - this.y * x, this.x * x + this.y * y);
  }
  /**
   * Construct a point from an array if necessary, otherwise if the input
   * is already a Point, or an unknown type, return it unchanged
   * @param {Array<number> | Point} a any kind of input value
   * @return {Point} constructed point, or passed-through value.
   * @example
   * // this
   * var point = Point.convert([0, 1]);
   * // is equivalent to
   * var point = new Point(0, 1);
   */
  static convert(a) {
    if (a instanceof Point) {
      return a;
    }
    if (Array.isArray(a)) {
      return new Point(a[0], a[1]);
    }
    return a;
  }
}

var __defProp$2 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
function str2xml(str) {
  if (typeof DOMParser !== "undefined") {
    const doc = new DOMParser().parseFromString(str, "application/xml");
    if (doc.querySelector("parsererror")) {
      throw new Error("The provided string is not valid XML");
    }
    return doc;
  } else {
    throw new Error("No XML parser found");
  }
}
function hasChildNodeWithName(doc, nodeName) {
  if (!doc.hasChildNodes()) {
    return false;
  }
  for (const childNode of Array.from(doc.childNodes)) {
    const currentNodeName = childNode.nodeName;
    if (typeof currentNodeName === "string" && currentNodeName.trim().toLowerCase() === nodeName.toLowerCase()) {
      return true;
    }
  }
  return false;
}
function xml2str(node) {
  if (typeof XMLSerializer !== "undefined") {
    return new XMLSerializer().serializeToString(node);
  }
  throw new Error("No XML serializer found");
}
function gpx(doc) {
  if (typeof doc === "string")
    doc = str2xml(doc);
  if (!hasChildNodeWithName(doc, "gpx")) {
    throw new Error("The XML document is not valid GPX");
  }
  const tracks = get(doc, "trk");
  const routes = get(doc, "rte");
  const waypoints = get(doc, "wpt");
  const gj = {
    type: "FeatureCollection",
    features: []
  };
  for (const track of Array.from(tracks)) {
    const feature = getTrack(track);
    if (feature)
      gj.features.push(feature);
  }
  for (const route of Array.from(routes)) {
    const feature = getRoute(route);
    if (feature)
      gj.features.push(feature);
  }
  for (const waypoint of Array.from(waypoints)) {
    gj.features.push(getPoint(waypoint));
  }
  return gj;
}
function kml(doc, xml2string) {
  var _a;
  if (typeof doc === "string")
    doc = str2xml(doc);
  if (!hasChildNodeWithName(doc, "kml")) {
    throw new Error("The XML document is not valid KML");
  }
  const gj = {
    type: "FeatureCollection",
    features: []
  };
  const styleIndex = {};
  const styleByHash = {};
  const styleMapIndex = {};
  const placemarks = get(doc, "Placemark");
  const styles = get(doc, "Style");
  const styleMaps = get(doc, "StyleMap");
  for (const style of Array.from(styles)) {
    const hash = okhash(
      xml2string !== void 0 ? xml2string(style) : xml2str(style)
    ).toString(16);
    styleIndex["#" + attr(style, "id")] = hash;
    styleByHash[hash] = style;
  }
  for (const styleMap of Array.from(styleMaps)) {
    styleIndex["#" + attr(styleMap, "id")] = okhash(
      xml2string !== void 0 ? xml2string(styleMap) : xml2str(styleMap)
    ).toString(16);
    const pairs = get(styleMap, "Pair");
    const pairsMap = {};
    for (const pair of Array.from(pairs)) {
      pairsMap[(_a = nodeVal(get1(pair, "key"))) != null ? _a : ""] = nodeVal(
        get1(pair, "styleUrl")
      );
    }
    styleMapIndex["#" + attr(styleMap, "id")] = pairsMap;
  }
  for (const placemark of Array.from(placemarks)) {
    gj.features = gj.features.concat(
      getPlacemark(placemark, styleIndex, styleByHash, styleMapIndex)
    );
  }
  return gj;
}
function kmlColor(v) {
  if (v === null)
    return ["#000000", 1];
  let color = "";
  let opacity = 1;
  if (v.substring(0, 1) === "#")
    v = v.substring(1);
  if (v.length === 6 || v.length === 3)
    color = v;
  if (v.length === 8) {
    opacity = parseInt(v.substring(0, 2), 16) / 255;
    color = "#" + v.substring(6, 8) + v.substring(4, 6) + v.substring(2, 4);
  }
  return [color != null ? color : "#000000", opacity != null ? opacity : 1];
}
function gxCoord(v) {
  return numarray(v.split(" "));
}
function gxCoords(root) {
  var _a;
  let elems = get(root, "coord");
  const coords = [];
  const times = [];
  if (elems.length === 0)
    elems = get(root, "gx:coord");
  for (const elem of Array.from(elems)) {
    coords.push(gxCoord((_a = nodeVal(elem)) != null ? _a : ""));
  }
  const timeElems = get(root, "when");
  for (const timeElem of Array.from(timeElems))
    times.push(nodeVal(timeElem));
  return {
    coords,
    times
  };
}
function getGeometry(root) {
  var _a, _b, _c;
  const geotypes = ["Polygon", "LineString", "Point", "Track", "gx:Track"];
  let geomNode, geomNodes, i, j, k;
  const geoms = [];
  const coordTimes = [];
  if (get1(root, "MultiGeometry") !== null) {
    return getGeometry(get1(root, "MultiGeometry"));
  }
  if (get1(root, "MultiTrack") !== null) {
    return getGeometry(get1(root, "MultiTrack"));
  }
  if (get1(root, "gx:MultiTrack") !== null) {
    return getGeometry(get1(root, "gx:MultiTrack"));
  }
  for (i = 0; i < geotypes.length; i++) {
    geomNodes = get(root, geotypes[i]);
    if (geomNodes) {
      for (j = 0; j < geomNodes.length; j++) {
        geomNode = geomNodes[j];
        if (geotypes[i] === "Point") {
          geoms.push({
            type: "Point",
            coordinates: coord1((_a = nodeVal(get1(geomNode, "coordinates"))) != null ? _a : "")
          });
        } else if (geotypes[i] === "LineString") {
          geoms.push({
            type: "LineString",
            coordinates: coord((_b = nodeVal(get1(geomNode, "coordinates"))) != null ? _b : "")
          });
        } else if (geotypes[i] === "Polygon") {
          const rings = get(geomNode, "LinearRing");
          const coords = [];
          for (k = 0; k < rings.length; k++) {
            coords.push(coord((_c = nodeVal(get1(rings[k], "coordinates"))) != null ? _c : ""));
          }
          geoms.push({
            type: "Polygon",
            coordinates: coords
          });
        } else if (geotypes[i] === "Track" || geotypes[i] === "gx:Track") {
          const track = gxCoords(geomNode);
          geoms.push({
            type: "LineString",
            coordinates: track.coords
          });
          if (track.times.length)
            coordTimes.push(track.times);
        }
      }
    }
  }
  return { geoms, coordTimes };
}
function getPlacemark(root, styleIndex, styleByHash, styleMapIndex) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const geomsAndTimes = getGeometry(root);
  const properties = {};
  const name = nodeVal(get1(root, "name"));
  const address = nodeVal(get1(root, "address"));
  const description = nodeVal(get1(root, "description"));
  const timeSpan = get1(root, "TimeSpan");
  const timeStamp = get1(root, "TimeStamp");
  const extendedData = get1(root, "ExtendedData");
  const visibility = get1(root, "visibility");
  let i;
  let styleUrl = nodeVal(get1(root, "styleUrl"));
  let lineStyle = get1(root, "LineStyle");
  let polyStyle = get1(root, "PolyStyle");
  if (!geomsAndTimes.geoms.length)
    return [];
  if (name)
    properties.name = name;
  if (address)
    properties.address = address;
  if (styleUrl) {
    if (styleUrl[0] !== "#")
      styleUrl = "#" + styleUrl;
    properties.styleUrl = styleUrl;
    if (styleIndex[styleUrl]) {
      properties.styleHash = styleIndex[styleUrl];
    }
    if (styleMapIndex[styleUrl]) {
      properties.styleMapHash = styleMapIndex[styleUrl];
      properties.styleHash = styleIndex[(_a = styleMapIndex[styleUrl].normal) != null ? _a : ""];
    }
    const style = styleByHash[(_b = properties.styleHash) != null ? _b : ""];
    if (style) {
      if (!lineStyle)
        lineStyle = get1(style, "LineStyle");
      if (!polyStyle)
        polyStyle = get1(style, "PolyStyle");
      const iconStyle = get1(style, "IconStyle");
      if (iconStyle) {
        const icon = get1(iconStyle, "Icon");
        if (icon) {
          const href = nodeVal(get1(icon, "href"));
          if (href)
            properties.icon = href;
        }
      }
    }
  }
  if (description)
    properties.description = description;
  if (timeSpan) {
    const begin = nodeVal(get1(timeSpan, "begin"));
    const end = nodeVal(get1(timeSpan, "end"));
    if (begin && end)
      properties.timespan = { begin, end };
  }
  if (timeStamp !== null) {
    properties.timestamp = (_c = nodeVal(get1(timeStamp, "when"))) != null ? _c : (/* @__PURE__ */ new Date()).toISOString();
  }
  if (lineStyle !== null) {
    const linestyles = kmlColor(nodeVal(get1(lineStyle, "color")));
    const color = linestyles[0];
    const opacity = linestyles[1];
    const width = parseFloat((_d = nodeVal(get1(lineStyle, "width"))) != null ? _d : "");
    if (color)
      properties.stroke = color;
    if (!isNaN(opacity))
      properties["stroke-opacity"] = opacity;
    if (!isNaN(width))
      properties["stroke-width"] = width;
  }
  if (polyStyle) {
    const polystyles = kmlColor(nodeVal(get1(polyStyle, "color")));
    const pcolor = polystyles[0];
    const popacity = polystyles[1];
    const fill = nodeVal(get1(polyStyle, "fill"));
    const outline = nodeVal(get1(polyStyle, "outline"));
    if (pcolor)
      properties.fill = pcolor;
    if (!isNaN(popacity))
      properties["fill-opacity"] = popacity;
    if (fill)
      properties["fill-opacity"] = fill === "1" ? properties["fill-opacity"] || 1 : 0;
    if (outline)
      properties["stroke-opacity"] = outline === "1" ? properties["stroke-opacity"] || 1 : 0;
  }
  if (extendedData) {
    const datas = get(extendedData, "Data"), simpleDatas = get(extendedData, "SimpleData");
    for (i = 0; i < datas.length; i++) {
      properties[(_e = datas[i].getAttribute("name")) != null ? _e : ""] = (_f = nodeVal(get1(datas[i], "value"))) != null ? _f : "";
    }
    for (i = 0; i < simpleDatas.length; i++) {
      properties[(_g = simpleDatas[i].getAttribute("name")) != null ? _g : ""] = (_h = nodeVal(simpleDatas[i])) != null ? _h : "";
    }
  }
  if (visibility !== null) {
    properties.visibility = (_i = nodeVal(visibility)) != null ? _i : "";
  }
  if (geomsAndTimes.coordTimes.length !== 0) {
    properties.coordTimes = geomsAndTimes.coordTimes.length === 1 ? geomsAndTimes.coordTimes[0] : geomsAndTimes.coordTimes;
  }
  const feature = {
    type: "Feature",
    geometry: geomsAndTimes.geoms.length === 1 ? geomsAndTimes.geoms[0] : {
      type: "GeometryCollection",
      geometries: geomsAndTimes.geoms
    },
    properties
  };
  if (attr(root, "id"))
    feature.id = (_j = attr(root, "id")) != null ? _j : void 0;
  return [feature];
}
function getPoints(node, pointname) {
  const pts = get(node, pointname);
  const line = [];
  const times = [];
  let heartRates = [];
  const ptsLength = pts.length;
  if (ptsLength < 2)
    return;
  for (let i = 0; i < ptsLength; i++) {
    const cPair = coordPair(pts[i]);
    line.push(cPair.coordinates);
    if (cPair.time)
      times.push(cPair.time);
    if (cPair.heartRate || heartRates.length) {
      if (heartRates.length === 0)
        heartRates = new Array(i).fill(null);
      heartRates.push(cPair.heartRate);
    }
  }
  return {
    line,
    times,
    heartRates
  };
}
function getTrack(node) {
  const segments = get(node, "trkseg");
  const track = [];
  const times = [];
  const heartRates = [];
  let line;
  for (let i = 0; i < segments.length; i++) {
    line = getPoints(segments[i], "trkpt");
    if (line !== void 0) {
      if (line.line)
        track.push(line.line);
      if (line.times && line.times.length)
        times.push(line.times);
      if (heartRates.length || line.heartRates && line.heartRates.length) {
        if (!heartRates.length) {
          for (let s = 0; s < i; s++) {
            heartRates.push(new Array(track[s].length).fill(null));
          }
        }
        if (line.heartRates && line.heartRates.length) {
          heartRates.push(line.heartRates);
        } else {
          heartRates.push(new Array(line.line.length).fill(null));
        }
      }
    }
  }
  if (track.length === 0)
    return;
  const properties = __spreadValues$1(__spreadValues$1({}, getProperties(node)), getLineStyle(get1(node, "extensions")));
  if (times.length !== 0)
    properties.coordTimes = track.length === 1 ? times[0] : times;
  if (heartRates.length !== 0) {
    properties.heartRates = track.length === 1 ? heartRates[0] : heartRates;
  }
  if (track.length === 1) {
    return {
      type: "Feature",
      properties,
      geometry: {
        type: "LineString",
        coordinates: track[0]
      }
    };
  } else {
    return {
      type: "Feature",
      properties,
      geometry: {
        type: "MultiLineString",
        coordinates: track
      }
    };
  }
}
function getRoute(node) {
  const line = getPoints(node, "rtept");
  if (line === void 0)
    return;
  const prop = __spreadValues$1(__spreadValues$1({}, getProperties(node)), getLineStyle(get1(node, "extensions")));
  return {
    type: "Feature",
    properties: prop,
    geometry: {
      type: "LineString",
      coordinates: line.line
    }
  };
}
function getPoint(node) {
  const prop = __spreadValues$1(__spreadValues$1({}, getProperties(node)), getMulti(node, ["sym"]));
  return {
    type: "Feature",
    properties: prop,
    geometry: {
      type: "Point",
      coordinates: coordPair(node).coordinates
    }
  };
}
function getLineStyle(extensions) {
  var _a, _b;
  const style = {};
  if (extensions) {
    const lineStyle = get1(extensions, "line");
    if (lineStyle) {
      const color = nodeVal(get1(lineStyle, "color"));
      const opacity = parseFloat((_a = nodeVal(get1(lineStyle, "opacity"))) != null ? _a : "0");
      const width = parseFloat((_b = nodeVal(get1(lineStyle, "width"))) != null ? _b : "0");
      if (color)
        style.stroke = color;
      if (!isNaN(opacity))
        style["stroke-opacity"] = opacity;
      if (!isNaN(width))
        style["stroke-width"] = width * 96 / 25.4;
    }
  }
  return style;
}
function getProperties(node) {
  const prop = getMulti(node, [
    "name",
    "cmt",
    "desc",
    "type",
    "time",
    "keywords"
  ]);
  const links = get(node, "link");
  if (links.length !== 0) {
    prop.links = [];
    for (const l of Array.from(links)) {
      const link = __spreadValues$1({
        href: attr(l, "href")
      }, getMulti(l, ["text", "type"]));
      prop.links.push(link);
    }
  }
  return prop;
}
function okhash(x) {
  let h = 0;
  if (!x || !x.length)
    return h;
  for (let i = 0; i < x.length; i++) {
    h = (h << 5) - h + x.charCodeAt(i) | 0;
  }
  return h;
}
function get(x, y) {
  return x.getElementsByTagName(y);
}
function attr(x, y) {
  return x.getAttribute(y);
}
function attrf(x, y) {
  var _a;
  return parseFloat((_a = attr(x, y)) != null ? _a : "0");
}
function get1(x, y) {
  const n = get(x, y);
  return n.length ? n[0] : null;
}
function norm(el) {
  if (el.normalize)
    el.normalize();
  return el;
}
function numarray(x) {
  return x.map(parseFloat).map((n) => isNaN(n) ? null : n);
}
function nodeVal(x) {
  if (x)
    norm(x);
  return x && x.textContent;
}
function getMulti(x, ys) {
  var _a;
  const o = {};
  let n;
  let k;
  for (k = 0; k < ys.length; k++) {
    n = get1(x, ys[k]);
    if (n)
      o[ys[k]] = (_a = nodeVal(n)) != null ? _a : "";
  }
  return o;
}
function coord1(v) {
  return numarray(v.replace(/\s*/g, "").split(","));
}
function coord(v) {
  const coords = v.replace(/^\s*|\s*$/g, "").split(/\s+/);
  const out = [];
  for (const coord2 of coords)
    out.push(coord1(coord2));
  return out;
}
function coordPair(x) {
  var _a, _b;
  const ll = [attrf(x, "lon"), attrf(x, "lat")];
  const ele = get1(x, "ele");
  const heartRate = get1(x, "gpxtpx:hr") || get1(x, "hr");
  const time = get1(x, "time");
  let e;
  if (ele) {
    e = parseFloat((_a = nodeVal(ele)) != null ? _a : "0");
    if (!isNaN(e))
      ll.push(e);
  }
  return {
    coordinates: ll,
    time: time ? nodeVal(time) : null,
    heartRate: heartRate !== null ? parseFloat((_b = nodeVal(heartRate)) != null ? _b : "0") : null
  };
}
function gpxOrKml(doc) {
  try {
    if (typeof doc === "string")
      doc = str2xml(doc);
  } catch (e) {
    return null;
  }
  try {
    const result = gpx(doc);
    return result;
  } catch (e) {
  }
  try {
    const result = kml(doc);
    return result;
  } catch (e) {
  }
  return null;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(rgb) {
  return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]) + (rgb.length === 4 ? componentToHex(rgb[3]) : "");
}
class ColorRamp extends Array {
  constructor(options = {}) {
    super();
    __publicField(this, "min", 0);
    __publicField(this, "max", 1);
    if ("min" in options) {
      this.min = options.min;
    }
    if ("max" in options) {
      this.max = options.max;
    }
    if ("stops" in options) {
      this.setStops(options.stops, { clone: false });
    }
  }
  /**
   * Converts a array-definition color ramp definition into a usable ColorRamp instance.
   * Note: units are not converted and may need to to be converted beforehand (eg. kelvin to centigrade)
   * @param cr
   * @returns
   */
  static fromArrayDefinition(cr) {
    return new ColorRamp({
      stops: cr.map((cs) => ({
        value: cs[0],
        color: cs[1]
      }))
    });
  }
  setStops(stops, options = { clone: true }) {
    const colorRamp = options.clone ? this.clone() : this;
    colorRamp.length = 0;
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < stops.length; i += 1) {
      min = Math.min(min, stops[i].value);
      max = Math.max(max, stops[i].value);
      colorRamp.push({
        value: stops[i].value,
        color: stops[i].color.slice()
        // we want to make sure we do a deep copy and not a reference
      });
    }
    colorRamp.sort(
      (a, b) => a.value < b.value ? -1 : 1
    );
    this.min = min;
    this.max = max;
    return colorRamp;
  }
  scale(min, max, options = { clone: true }) {
    const clone = options.clone;
    const currentMin = this[0].value;
    const currentMax = this.at(-1).value;
    const currentSpan = currentMax - currentMin;
    const newSpan = max - min;
    const stops = [];
    for (let i = 0; i < this.length; i += 1) {
      const currentValue = this[i].value;
      const normalizedValue = (currentValue - currentMin) / currentSpan;
      const newValue = normalizedValue * newSpan + min;
      if (clone) {
        stops.push({
          value: newValue,
          color: this[i].color.slice()
        });
      } else {
        this[i].value = newValue;
      }
    }
    return clone ? new ColorRamp({ stops }) : this;
  }
  // for some reason, I had to reimplement this
  at(pos) {
    if (pos < 0) {
      return this[this.length + pos];
    } else {
      return this[pos];
    }
  }
  clone() {
    return new ColorRamp({ stops: this.getRawColorStops() });
  }
  getRawColorStops() {
    const stops = [];
    for (let i = 0; i < this.length; i += 1) {
      stops.push({ value: this[i].value, color: this[i].color });
    }
    return stops;
  }
  reverse(options = { clone: true }) {
    const colorRamp = options.clone ? this.clone() : this;
    for (let i = 0; i < ~~(colorRamp.length / 2); i += 1) {
      const c = colorRamp[i].color;
      colorRamp[i].color = colorRamp.at(-(i + 1)).color;
      colorRamp.at(-(i + 1)).color = c;
    }
    return colorRamp;
  }
  getBounds() {
    return { min: this.min, max: this.max };
  }
  getColor(value, options = { smooth: true }) {
    if (value <= this[0].value) {
      return this[0].color;
    }
    if (value >= this.at(-1).value) {
      return this.at(-1).color;
    }
    for (let i = 0; i < this.length - 1; i += 1) {
      if (value > this[i + 1].value) {
        continue;
      }
      const colorBefore = this[i].color;
      if (!options.smooth) {
        return colorBefore.slice();
      }
      const valueBefore = this[i].value;
      const valueAfter = this[i + 1].value;
      const colorAfter = this[i + 1].color;
      const beforeRatio = (valueAfter - value) / (valueAfter - valueBefore);
      return colorBefore.map(
        (chan, i2) => Math.round(chan * beforeRatio + colorAfter[i2] * (1 - beforeRatio))
      );
    }
    return [0, 0, 0];
  }
  /**
   * Get the color as an hexadecimal string
   */
  getColorHex(value, options = {
    smooth: true,
    withAlpha: false
  }) {
    return rgbToHex(this.getColor(value, options));
  }
  /**
   * Get the color of the color ramp at a relative position in [0, 1]
   */
  getColorRelative(value, options = { smooth: true }) {
    const bounds = this.getBounds();
    return this.getColor(
      bounds.min + value * (bounds.max - bounds.min),
      options
    );
  }
  getCanvasStrip(options = {
    horizontal: true,
    size: 512,
    smooth: true
  }) {
    const canvas = document.createElement("canvas");
    canvas.width = options.horizontal ? options.size : 1;
    canvas.height = options.horizontal ? 1 : options.size;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      throw new Error("Canvs context is missing");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const imageDataArray = imageData.data;
    const size = options.size;
    const startValue = this[0].value;
    const endValue = this.at(-1).value;
    const valueSpan = endValue - startValue;
    const valueStep = valueSpan / size;
    for (let i = 0; i < size; i += 1) {
      const color = this.getColor(startValue + i * valueStep, {
        smooth: options.smooth
      });
      imageDataArray[i * 4] = color[0];
      imageDataArray[i * 4 + 1] = color[1];
      imageDataArray[i * 4 + 2] = color[2];
      imageDataArray[i * 4 + 3] = color.length > 3 ? color[3] : 255;
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }
  /**
   * Apply a non-linear ressampling. This will create a new instance of ColorRamp with the same bounds.
   */
  resample(method, samples = 15) {
    const inputBounds = this.getBounds();
    const inputNormalized = this.scale(0, 1);
    const step = 1 / (samples - 1);
    let stops;
    if (method === "ease-in-square") {
      stops = Array.from({ length: samples }, (_, i) => {
        const x = i * step;
        const y = Math.pow(x, 2);
        const color = inputNormalized.getColor(y);
        return { value: x, color };
      });
    } else if (method === "ease-out-square") {
      stops = Array.from({ length: samples }, (_, i) => {
        const x = i * step;
        const y = 1 - Math.pow(1 - x, 2);
        const color = inputNormalized.getColor(y);
        return { value: x, color };
      });
    } else if (method === "ease-out-sqrt") {
      stops = Array.from({ length: samples }, (_, i) => {
        const x = i * step;
        const y = Math.pow(x, 0.5);
        const color = inputNormalized.getColor(y);
        return { value: x, color };
      });
    } else if (method === "ease-in-sqrt") {
      stops = Array.from({ length: samples }, (_, i) => {
        const x = i * step;
        const y = 1 - Math.pow(1 - x, 0.5);
        const color = inputNormalized.getColor(y);
        return { value: x, color };
      });
    } else if (method === "ease-out-exp") {
      stops = Array.from({ length: samples }, (_, i) => {
        const x = i * step;
        const y = 1 - Math.pow(2, -10 * x);
        const color = inputNormalized.getColor(y);
        return { value: x, color };
      });
    } else if (method === "ease-in-exp") {
      stops = Array.from({ length: samples }, (_, i) => {
        const x = i * step;
        const y = Math.pow(2, 10 * x - 10);
        const color = inputNormalized.getColor(y);
        return { value: x, color };
      });
    } else {
      throw new Error("Invalid ressampling method.");
    }
    const outputNormalized = new ColorRamp({ stops });
    const output = outputNormalized.scale(inputBounds.min, inputBounds.max);
    return output;
  }
  /**
   * Makes a clone of this color ramp that is fully transparant at the begining of their range
   */
  transparentStart() {
    const stops = this.getRawColorStops();
    stops.unshift({
      value: stops[0].value,
      color: stops[0].color.slice()
    });
    stops[1].value += 1e-3;
    stops.forEach((s) => {
      if (s.color.length === 3) {
        s.color.push(255);
      }
    });
    stops[0].color[3] = 0;
    return new ColorRamp({ stops });
  }
  /**
   * Check if this color ramp has a transparent start
   */
  hasTransparentStart() {
    return this[0].color.length === 4 && this[0].color[3] === 0;
  }
}
const ColorRampCollection = {
  /**
   * A fully transparent [0, 0, 0, 0] colorramp to hide data.
   * Defined in interval [0, 1], without unit.
   */
  NULL: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 0, 0] },
      { value: 1, color: [0, 0, 0, 0] }
    ]
  }),
  GRAY: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 0] },
      { value: 1, color: [255, 255, 255] }
    ]
  }),
  /**
   * Classic jet color ramp.
   * Defined in interval [0, 1], without unit.
   */
  JET: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 131] },
      { value: 0.125, color: [0, 60, 170] },
      { value: 0.375, color: [5, 255, 255] },
      { value: 0.625, color: [255, 255, 0] },
      { value: 0.875, color: [250, 0, 0] },
      { value: 1, color: [128, 0, 0] }
    ]
  }),
  /**
   * Classic HSV color ramp (hue, saturation, value).
   * Defined in interval [0, 1], without unit.
   */
  HSV: new ColorRamp({
    stops: [
      { value: 0, color: [255, 0, 0] },
      { value: 0.169, color: [253, 255, 2] },
      { value: 0.173, color: [247, 255, 2] },
      { value: 0.337, color: [0, 252, 4] },
      { value: 0.341, color: [0, 252, 10] },
      { value: 0.506, color: [1, 249, 255] },
      { value: 0.671, color: [2, 0, 253] },
      { value: 0.675, color: [8, 0, 253] },
      { value: 0.839, color: [255, 0, 251] },
      { value: 0.843, color: [255, 0, 245] },
      { value: 1, color: [255, 0, 6] }
    ]
  }),
  /**
   * Classic hot color ramp.
   * Defined in interval [0, 1], without unit.
   */
  HOT: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 0] },
      { value: 0.3, color: [230, 0, 0] },
      { value: 0.6, color: [255, 210, 0] },
      { value: 1, color: [255, 255, 255] }
    ]
  }),
  /**
   * Classic spring color ramp.
   * Defined in interval [0, 1], without unit.
   */
  SPRING: new ColorRamp({
    stops: [
      { value: 0, color: [255, 0, 255] },
      { value: 1, color: [255, 255, 0] }
    ]
  }),
  /**
   * Classic summer color ramp.
   * Defined in interval [0, 1], without unit.
   */
  SUMMER: new ColorRamp({
    stops: [
      { value: 0, color: [0, 128, 102] },
      { value: 1, color: [255, 255, 102] }
    ]
  }),
  /**
   * Classic autommn color ramp.
   * Defined in interval [0, 1], without unit.
   */
  AUTOMN: new ColorRamp({
    stops: [
      { value: 0, color: [255, 0, 0] },
      { value: 1, color: [255, 255, 0] }
    ]
  }),
  /**
   * Classic winter color ramp.
   * Defined in interval [0, 1], without unit.
   */
  WINTER: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 255] },
      { value: 1, color: [0, 255, 128] }
    ]
  }),
  /**
   * Classic bone color ramp.
   * Defined in interval [0, 1], without unit.
   */
  BONE: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 0] },
      { value: 0.376, color: [84, 84, 116] },
      { value: 0.753, color: [169, 200, 200] },
      { value: 1, color: [255, 255, 255] }
    ]
  }),
  /**
   * Classic copper color ramp.
   * Defined in interval [0, 1], without unit.
   */
  COPPER: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 0] },
      { value: 0.804, color: [255, 160, 102] },
      { value: 1, color: [255, 199, 127] }
    ]
  }),
  /**
   * Classic greys color ramp.
   * Defined in interval [0, 1], without unit.
   */
  GREYS: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 0] },
      { value: 1, color: [255, 255, 255] }
    ]
  }),
  /**
   * Classic yignbu color ramp (blue to light yellow).
   * Defined in interval [0, 1], without unit.
   */
  YIGNBU: new ColorRamp({
    stops: [
      { value: 0, color: [8, 29, 88] },
      { value: 0.125, color: [37, 52, 148] },
      { value: 0.25, color: [34, 94, 168] },
      { value: 0.375, color: [29, 145, 192] },
      { value: 0.5, color: [65, 182, 196] },
      { value: 0.625, color: [127, 205, 187] },
      { value: 0.75, color: [199, 233, 180] },
      { value: 0.875, color: [237, 248, 217] },
      { value: 1, color: [255, 255, 217] }
    ]
  }),
  /**
   * Classic greens color ramp.
   * Defined in interval [0, 1], without unit.
   */
  GREENS: new ColorRamp({
    stops: [
      { value: 0, color: [0, 68, 27] },
      { value: 0.125, color: [0, 109, 44] },
      { value: 0.25, color: [35, 139, 69] },
      { value: 0.375, color: [65, 171, 93] },
      { value: 0.5, color: [116, 196, 118] },
      { value: 0.625, color: [161, 217, 155] },
      { value: 0.75, color: [199, 233, 192] },
      { value: 0.875, color: [229, 245, 224] },
      { value: 1, color: [247, 252, 245] }
    ]
  }),
  /**
   * Classic yiorrd color ramp (red to light yellow).
   * Defined in interval [0, 1], without unit.
   */
  YIORRD: new ColorRamp({
    stops: [
      { value: 0, color: [128, 0, 38] },
      { value: 0.125, color: [189, 0, 38] },
      { value: 0.25, color: [227, 26, 28] },
      { value: 0.375, color: [252, 78, 42] },
      { value: 0.5, color: [253, 141, 60] },
      { value: 0.625, color: [254, 178, 76] },
      { value: 0.75, color: [254, 217, 118] },
      { value: 0.875, color: [255, 237, 160] },
      { value: 1, color: [255, 255, 204] }
    ]
  }),
  /**
   * Classic blue-red color ramp.
   * Defined in interval [0, 1], without unit.
   */
  BLUERED: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 255] },
      { value: 1, color: [255, 0, 0] }
    ]
  }),
  /**
   * Classic rdbu color ramp.
   * Defined in interval [0, 1], without unit.
   */
  RDBU: new ColorRamp({
    stops: [
      { value: 0, color: [5, 10, 172] },
      { value: 0.35, color: [106, 137, 247] },
      { value: 0.5, color: [190, 190, 190] },
      { value: 0.6, color: [220, 170, 132] },
      { value: 0.7, color: [230, 145, 90] },
      { value: 1, color: [178, 10, 28] }
    ]
  }),
  /**
   * Classic picnic color ramp.
   * Defined in interval [0, 1], without unit.
   */
  PICNIC: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 255] },
      { value: 0.1, color: [51, 153, 255] },
      { value: 0.2, color: [102, 204, 255] },
      { value: 0.3, color: [153, 204, 255] },
      { value: 0.4, color: [204, 204, 255] },
      { value: 0.5, color: [255, 255, 255] },
      { value: 0.6, color: [255, 204, 255] },
      { value: 0.7, color: [255, 153, 255] },
      { value: 0.8, color: [255, 102, 204] },
      { value: 0.9, color: [255, 102, 102] },
      { value: 1, color: [255, 0, 0] }
    ]
  }),
  /**
   * Classic rainbow color ramp.
   * Defined in interval [0, 1], without unit.
   */
  RAINBOW: new ColorRamp({
    stops: [
      { value: 0, color: [150, 0, 90] },
      { value: 0.125, color: [0, 0, 200] },
      { value: 0.25, color: [0, 25, 255] },
      { value: 0.375, color: [0, 152, 255] },
      { value: 0.5, color: [44, 255, 150] },
      { value: 0.625, color: [151, 255, 0] },
      { value: 0.75, color: [255, 234, 0] },
      { value: 0.875, color: [255, 111, 0] },
      { value: 1, color: [255, 0, 0] }
    ]
  }),
  /**
   * Classic Portland color ramp.
   * Defined in interval [0, 1], without unit.
   */
  PORTLAND: new ColorRamp({
    stops: [
      { value: 0, color: [12, 51, 131] },
      { value: 0.25, color: [10, 136, 186] },
      { value: 0.5, color: [242, 211, 56] },
      { value: 0.75, color: [242, 143, 56] },
      { value: 1, color: [217, 30, 30] }
    ]
  }),
  /**
   * Classic blackbody color ramp.
   * Defined in interval [0, 1], without unit.
   */
  BLACKBODY: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 0] },
      { value: 0.2, color: [230, 0, 0] },
      { value: 0.4, color: [230, 210, 0] },
      { value: 0.7, color: [255, 255, 255] },
      { value: 1, color: [160, 200, 255] }
    ]
  }),
  /**
   * Classic earth color ramp.
   * Defined in interval [0, 1], without unit.
   */
  EARTH: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 130] },
      { value: 0.1, color: [0, 180, 180] },
      { value: 0.2, color: [40, 210, 40] },
      { value: 0.4, color: [230, 230, 50] },
      { value: 0.6, color: [120, 70, 20] },
      { value: 1, color: [255, 255, 255] }
    ]
  }),
  /**
   * Classic electric color ramp.
   * Defined in interval [0, 1], without unit.
   */
  ELECTRIC: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 0] },
      { value: 0.15, color: [30, 0, 100] },
      { value: 0.4, color: [120, 0, 100] },
      { value: 0.6, color: [160, 90, 0] },
      { value: 0.8, color: [230, 200, 0] },
      { value: 1, color: [255, 250, 220] }
    ]
  }),
  /**
   * Classic viridis color ramp.
   * Defined in interval [0, 1], without unit.
   */
  VIRIDIS: new ColorRamp({
    stops: [
      { value: 0, color: [68, 1, 84] },
      { value: 0.13, color: [71, 44, 122] },
      { value: 0.25, color: [59, 81, 139] },
      { value: 0.38, color: [44, 113, 142] },
      { value: 0.5, color: [33, 144, 141] },
      { value: 0.63, color: [39, 173, 129] },
      { value: 0.75, color: [92, 200, 99] },
      { value: 0.88, color: [170, 220, 50] },
      { value: 1, color: [253, 231, 37] }
    ]
  }),
  /**
   * Classic inferno color ramp.
   * Defined in interval [0, 1], without unit.
   */
  INFERNO: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 4] },
      { value: 0.13, color: [31, 12, 72] },
      { value: 0.25, color: [85, 15, 109] },
      { value: 0.38, color: [136, 34, 106] },
      { value: 0.5, color: [186, 54, 85] },
      { value: 0.63, color: [227, 89, 51] },
      { value: 0.75, color: [249, 140, 10] },
      { value: 0.88, color: [249, 201, 50] },
      { value: 1, color: [252, 255, 164] }
    ]
  }),
  /**
   * Classic magma color ramp.
   * Defined in interval [0, 1], without unit.
   */
  MAGMA: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 4] },
      { value: 0.13, color: [28, 16, 68] },
      { value: 0.25, color: [79, 18, 123] },
      { value: 0.38, color: [129, 37, 129] },
      { value: 0.5, color: [181, 54, 122] },
      { value: 0.63, color: [229, 80, 100] },
      { value: 0.75, color: [251, 135, 97] },
      { value: 0.88, color: [254, 194, 135] },
      { value: 1, color: [252, 253, 191] }
    ]
  }),
  /**
   * Classic plasma color ramp.
   * Defined in interval [0, 1], without unit.
   */
  PLASMA: new ColorRamp({
    stops: [
      { value: 0, color: [13, 8, 135] },
      { value: 0.13, color: [75, 3, 161] },
      { value: 0.25, color: [125, 3, 168] },
      { value: 0.38, color: [168, 34, 150] },
      { value: 0.5, color: [203, 70, 121] },
      { value: 0.63, color: [229, 107, 93] },
      { value: 0.75, color: [248, 148, 65] },
      { value: 0.88, color: [253, 195, 40] },
      { value: 1, color: [240, 249, 33] }
    ]
  }),
  /**
   * Classic warm color ramp.
   * Defined in interval [0, 1], without unit.
   */
  WARM: new ColorRamp({
    stops: [
      { value: 0, color: [125, 0, 179] },
      { value: 0.13, color: [172, 0, 187] },
      { value: 0.25, color: [219, 0, 170] },
      { value: 0.38, color: [255, 0, 130] },
      { value: 0.5, color: [255, 63, 74] },
      { value: 0.63, color: [255, 123, 0] },
      { value: 0.75, color: [234, 176, 0] },
      { value: 0.88, color: [190, 228, 0] },
      { value: 1, color: [147, 255, 0] }
    ]
  }),
  /**
   * Classic cool color ramp.
   * Defined in interval [0, 1], without unit.
   */
  COOL: new ColorRamp({
    stops: [
      { value: 0, color: [125, 0, 179] },
      { value: 0.13, color: [116, 0, 218] },
      { value: 0.25, color: [98, 74, 237] },
      { value: 0.38, color: [68, 146, 231] },
      { value: 0.5, color: [0, 204, 197] },
      { value: 0.63, color: [0, 247, 146] },
      { value: 0.75, color: [0, 255, 88] },
      { value: 0.88, color: [40, 255, 8] },
      { value: 1, color: [147, 255, 0] }
    ]
  }),
  /**
   * Classic rainboz soft color ramp.
   * Defined in interval [0, 1], without unit.
   */
  RAINBOW_SOFT: new ColorRamp({
    stops: [
      { value: 0, color: [125, 0, 179] },
      { value: 0.1, color: [199, 0, 180] },
      { value: 0.2, color: [255, 0, 121] },
      { value: 0.3, color: [255, 108, 0] },
      { value: 0.4, color: [222, 194, 0] },
      { value: 0.5, color: [150, 255, 0] },
      { value: 0.6, color: [0, 255, 55] },
      { value: 0.7, color: [0, 246, 150] },
      { value: 0.8, color: [50, 167, 222] },
      { value: 0.9, color: [103, 51, 235] },
      { value: 1, color: [124, 0, 186] }
    ]
  }),
  /**
   * Classic bathymetry color ramp.
   * Defined in interval [0, 1], without unit.
   */
  BATHYMETRY: new ColorRamp({
    stops: [
      { value: 0, color: [40, 26, 44] },
      { value: 0.13, color: [59, 49, 90] },
      { value: 0.25, color: [64, 76, 139] },
      { value: 0.38, color: [63, 110, 151] },
      { value: 0.5, color: [72, 142, 158] },
      { value: 0.63, color: [85, 174, 163] },
      { value: 0.75, color: [120, 206, 163] },
      { value: 0.88, color: [187, 230, 172] },
      { value: 1, color: [253, 254, 204] }
    ]
  }),
  /**
   * Classic cdom color ramp.
   * Defined in interval [0, 1], without unit.
   */
  CDOM: new ColorRamp({
    stops: [
      { value: 0, color: [47, 15, 62] },
      { value: 0.13, color: [87, 23, 86] },
      { value: 0.25, color: [130, 28, 99] },
      { value: 0.38, color: [171, 41, 96] },
      { value: 0.5, color: [206, 67, 86] },
      { value: 0.63, color: [230, 106, 84] },
      { value: 0.75, color: [242, 149, 103] },
      { value: 0.88, color: [249, 193, 135] },
      { value: 1, color: [254, 237, 176] }
    ]
  }),
  /**
   * Classic chlorophyll color ramp.
   * Defined in interval [0, 1], without unit.
   */
  CHLOROPHYLL: new ColorRamp({
    stops: [
      { value: 0, color: [18, 36, 20] },
      { value: 0.13, color: [25, 63, 41] },
      { value: 0.25, color: [24, 91, 59] },
      { value: 0.38, color: [13, 119, 72] },
      { value: 0.5, color: [18, 148, 80] },
      { value: 0.63, color: [80, 173, 89] },
      { value: 0.75, color: [132, 196, 122] },
      { value: 0.88, color: [175, 221, 162] },
      { value: 1, color: [215, 249, 208] }
    ]
  }),
  /**
   * Classic density color ramp.
   * Defined in interval [0, 1], without unit.
   */
  DENSITY: new ColorRamp({
    stops: [
      { value: 0, color: [54, 14, 36] },
      { value: 0.13, color: [89, 23, 80] },
      { value: 0.25, color: [110, 45, 132] },
      { value: 0.38, color: [120, 77, 178] },
      { value: 0.5, color: [120, 113, 213] },
      { value: 0.63, color: [115, 151, 228] },
      { value: 0.75, color: [134, 185, 227] },
      { value: 0.88, color: [177, 214, 227] },
      { value: 1, color: [230, 241, 241] }
    ]
  }),
  /**
   * Classic freesurface blue color ramp.
   * Defined in interval [0, 1], without unit.
   */
  FREESURFACE_BLUE: new ColorRamp({
    stops: [
      { value: 0, color: [30, 4, 110] },
      { value: 0.13, color: [47, 14, 176] },
      { value: 0.25, color: [41, 45, 236] },
      { value: 0.38, color: [25, 99, 212] },
      { value: 0.5, color: [68, 131, 200] },
      { value: 0.63, color: [114, 156, 197] },
      { value: 0.75, color: [157, 181, 203] },
      { value: 0.88, color: [200, 208, 216] },
      { value: 1, color: [241, 237, 236] }
    ]
  }),
  /**
   * Classic freesurface red color ramp.
   * Defined in interval [0, 1], without unit.
   */
  FREESURFACE_RED: new ColorRamp({
    stops: [
      { value: 0, color: [60, 9, 18] },
      { value: 0.13, color: [100, 17, 27] },
      { value: 0.25, color: [142, 20, 29] },
      { value: 0.38, color: [177, 43, 27] },
      { value: 0.5, color: [192, 87, 63] },
      { value: 0.63, color: [205, 125, 105] },
      { value: 0.75, color: [216, 162, 148] },
      { value: 0.88, color: [227, 199, 193] },
      { value: 1, color: [241, 237, 236] }
    ]
  }),
  /**
   * Classic oxygen color ramp.
   * Defined in interval [0, 1], without unit.
   */
  OXYGEN: new ColorRamp({
    stops: [
      { value: 0, color: [64, 5, 5] },
      { value: 0.13, color: [106, 6, 15] },
      { value: 0.25, color: [144, 26, 7] },
      { value: 0.38, color: [168, 64, 3] },
      { value: 0.5, color: [188, 100, 4] },
      { value: 0.63, color: [206, 136, 11] },
      { value: 0.75, color: [220, 174, 25] },
      { value: 0.88, color: [231, 215, 44] },
      { value: 1, color: [248, 254, 105] }
    ]
  }),
  /**
   * Classic par color ramp.
   * Defined in interval [0, 1], without unit.
   */
  PAR: new ColorRamp({
    stops: [
      { value: 0, color: [51, 20, 24] },
      { value: 0.13, color: [90, 32, 35] },
      { value: 0.25, color: [129, 44, 34] },
      { value: 0.38, color: [159, 68, 25] },
      { value: 0.5, color: [182, 99, 19] },
      { value: 0.63, color: [199, 134, 22] },
      { value: 0.75, color: [212, 171, 35] },
      { value: 0.88, color: [221, 210, 54] },
      { value: 1, color: [225, 253, 75] }
    ]
  }),
  /**
   * Classic phase color ramp.
   * Defined in interval [0, 1], without unit.
   */
  PHASE: new ColorRamp({
    stops: [
      { value: 0, color: [145, 105, 18] },
      { value: 0.13, color: [184, 71, 38] },
      { value: 0.25, color: [186, 58, 115] },
      { value: 0.38, color: [160, 71, 185] },
      { value: 0.5, color: [110, 97, 218] },
      { value: 0.63, color: [50, 123, 164] },
      { value: 0.75, color: [31, 131, 110] },
      { value: 0.88, color: [77, 129, 34] },
      { value: 1, color: [145, 105, 18] }
    ]
  }),
  /**
   * Classic salinity color ramp.
   * Defined in interval [0, 1], without unit.
   */
  SALINITY: new ColorRamp({
    stops: [
      { value: 0, color: [42, 24, 108] },
      { value: 0.13, color: [33, 50, 162] },
      { value: 0.25, color: [15, 90, 145] },
      { value: 0.38, color: [40, 118, 137] },
      { value: 0.5, color: [59, 146, 135] },
      { value: 0.63, color: [79, 175, 126] },
      { value: 0.75, color: [120, 203, 104] },
      { value: 0.88, color: [193, 221, 100] },
      { value: 1, color: [253, 239, 154] }
    ]
  }),
  /**
   * Classic temperature color ramp.
   * Defined in interval [0, 1], without unit.
   */
  TEMPERATURE: new ColorRamp({
    stops: [
      { value: 0, color: [4, 35, 51] },
      { value: 0.13, color: [23, 51, 122] },
      { value: 0.25, color: [85, 59, 157] },
      { value: 0.38, color: [129, 79, 143] },
      { value: 0.5, color: [175, 95, 130] },
      { value: 0.63, color: [222, 112, 101] },
      { value: 0.75, color: [249, 146, 66] },
      { value: 0.88, color: [249, 196, 65] },
      { value: 1, color: [232, 250, 91] }
    ]
  }),
  /**
   * Classic turbidity color ramp.
   * Defined in interval [0, 1], without unit.
   */
  TURBIDITY: new ColorRamp({
    stops: [
      { value: 0, color: [34, 31, 27] },
      { value: 0.13, color: [65, 50, 41] },
      { value: 0.25, color: [98, 69, 52] },
      { value: 0.38, color: [131, 89, 57] },
      { value: 0.5, color: [161, 112, 59] },
      { value: 0.63, color: [185, 140, 66] },
      { value: 0.75, color: [202, 174, 88] },
      { value: 0.88, color: [216, 209, 126] },
      { value: 1, color: [233, 246, 171] }
    ]
  }),
  /**
   * Classic velocity blue color ramp.
   * Defined in interval [0, 1], without unit.
   */
  VELOCITY_BLUE: new ColorRamp({
    stops: [
      { value: 0, color: [17, 32, 64] },
      { value: 0.13, color: [35, 52, 116] },
      { value: 0.25, color: [29, 81, 156] },
      { value: 0.38, color: [31, 113, 162] },
      { value: 0.5, color: [50, 144, 169] },
      { value: 0.63, color: [87, 173, 176] },
      { value: 0.75, color: [149, 196, 189] },
      { value: 0.88, color: [203, 221, 211] },
      { value: 1, color: [254, 251, 230] }
    ]
  }),
  /**
   * Classic velocity green color ramp.
   * Defined in interval [0, 1], without unit.
   */
  VELOCITY_GREEN: new ColorRamp({
    stops: [
      { value: 0, color: [23, 35, 19] },
      { value: 0.13, color: [24, 64, 38] },
      { value: 0.25, color: [11, 95, 45] },
      { value: 0.38, color: [39, 123, 35] },
      { value: 0.5, color: [95, 146, 12] },
      { value: 0.63, color: [152, 165, 18] },
      { value: 0.75, color: [201, 186, 69] },
      { value: 0.88, color: [233, 216, 137] },
      { value: 1, color: [255, 253, 205] }
    ]
  }),
  /**
   * Classic cube helix color ramp.
   * Defined in interval [0, 1], without unit.
   */
  CUBEHELIX: new ColorRamp({
    stops: [
      { value: 0, color: [0, 0, 0] },
      { value: 0.07, color: [22, 5, 59] },
      { value: 0.13, color: [60, 4, 105] },
      { value: 0.2, color: [109, 1, 135] },
      { value: 0.27, color: [161, 0, 147] },
      { value: 0.33, color: [210, 2, 142] },
      { value: 0.4, color: [251, 11, 123] },
      { value: 0.47, color: [255, 29, 97] },
      { value: 0.53, color: [255, 54, 69] },
      { value: 0.6, color: [255, 85, 46] },
      { value: 0.67, color: [255, 120, 34] },
      { value: 0.73, color: [255, 157, 37] },
      { value: 0.8, color: [241, 191, 57] },
      { value: 0.87, color: [224, 220, 93] },
      { value: 0.93, color: [218, 241, 142] },
      { value: 1, color: [227, 253, 198] }
    ]
  }),
  /**
   * The cividis color ramp is color blind friendly.
   * Read more here https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0199239
   * Defined in interval [0, 1], without unit.
   */
  CIVIDIS: new ColorRamp({
    stops: [
      { value: 0, color: [0, 32, 77, 255] },
      { value: 0.125, color: [5, 54, 110, 255] },
      { value: 0.25, color: [65, 77, 108, 255] },
      { value: 0.375, color: [97, 100, 111, 255] },
      { value: 0.5, color: [125, 124, 121, 255] },
      { value: 0.625, color: [156, 149, 120, 255] },
      { value: 0.75, color: [190, 175, 111, 255] },
      { value: 0.875, color: [225, 204, 94, 255] },
      { value: 1, color: [255, 235, 70, 255] }
    ]
  }),
  /**
   * Classic turbo color ramp.
   * This is a luminance-constant alternative to the jet, making it more
   * clor-blind friendly.
   * Defined in interval [0, 1], without unit.
   */
  TURBO: new ColorRamp({
    stops: [
      { value: 0, color: [48, 18, 59, 255] },
      { value: 0.125, color: [70, 107, 227, 255] },
      { value: 0.25, color: [40, 187, 236, 255] },
      { value: 0.375, color: [49, 242, 153, 255] },
      { value: 0.5, color: [162, 252, 60, 255] },
      { value: 0.625, color: [237, 208, 58, 255] },
      { value: 0.75, color: [251, 128, 34, 255] },
      { value: 0.875, color: [210, 49, 5, 255] },
      { value: 1, color: [122, 4, 3, 255] }
    ]
  }),
  /**
   * The rocket color ramp is perceptually uniform, which makes it more
   * color bliend friendly than the classic magma color ramp.
   * Defined in interval [0, 1], without unit.
   */
  ROCKET: new ColorRamp({
    stops: [
      { value: 0, color: [250, 235, 221, 0] },
      { value: 0.133, color: [250, 235, 221, 255] },
      { value: 0.266, color: [246, 170, 130, 255] },
      { value: 0.4, color: [240, 96, 67, 255] },
      { value: 0.533, color: [203, 27, 79, 255] },
      { value: 0.666, color: [132, 30, 90, 255] },
      { value: 0.8, color: [63, 27, 68, 255] },
      { value: 1, color: [3, 5, 26, 255] }
    ]
  }),
  /**
   * The mako color ramp is perceptually uniform and can be seen as
   * a color blind friendly alternative to bathymetry or yignbu.
   * Defined in interval [0, 1], without unit.
   */
  MAKO: new ColorRamp({
    stops: [
      { value: 0, color: [11, 4, 5, 255] },
      { value: 0.125, color: [43, 28, 53, 255] },
      { value: 0.25, color: [62, 53, 107, 255] },
      { value: 0.375, color: [59, 86, 152, 255] },
      { value: 0.5, color: [53, 123, 162, 255] },
      { value: 0.625, color: [53, 158, 170, 255] },
      { value: 0.75, color: [73, 193, 173, 255] },
      { value: 0.875, color: [150, 221, 181, 255] },
      { value: 1, color: [222, 245, 229, 255] }
    ]
  })
};

const colorPalettes = [
  // https://colorhunt.co/palette/1d5b79468b97ef6262f3aa60
  ["#1D5B79", "#468B97", "#EF6262", "#F3AA60"],
  // https://colorhunt.co/palette/614bc333bbc585e6c5c8ffe0
  ["#614BC3", "#33BBC5", "#85E6C5", "#C8FFE0"],
  // https://colorhunt.co/palette/4619597a316fcd6688aed8cc
  ["#461959", "#7A316F", "#CD6688", "#AED8CC"],
  // https://colorhunt.co/palette/0079ff00dfa2f6fa70ff0060
  ["#0079FF", "#00DFA2", "#F6FA70", "#FF0060"],
  //https://colorhunt.co/palette/39b5e0a31acbff78f0f5ea5a
  ["#39B5E0", "#A31ACB", "#FF78F0", "#F5EA5A"],
  // https://colorhunt.co/palette/37e2d5590696c70a80fbcb0a
  ["#37E2D5", "#590696", "#C70A80", "#FBCB0A"],
  // https://colorhunt.co/palette/ffd36efff56d99ffcd9fb4ff
  ["#FFD36E", "#FFF56D", "#99FFCD", "#9FB4FF"],
  // https://colorhunt.co/palette/00ead3fff5b7ff449f005f99
  ["#00EAD3", "#FFF5B7", "#FF449F", "#005F99"],
  // https://colorhunt.co/palette/10a19d540375ff7000ffbf00
  ["#10A19D", "#540375", "#FF7000", "#FFBF00"]
];
function getRandomColor() {
  return colorPalettes[~~(Math.random() * colorPalettes.length)][~~(Math.random() * 4)];
}
function generateRandomSourceName() {
  return `maptiler_source_${generateRandomString()}`;
}
function generateRandomLayerName() {
  return `maptiler_layer_${generateRandomString()}`;
}
function lerpZoomNumberValues(znv, z) {
  if (z <= znv[0].zoom) {
    return znv[0].value;
  }
  if (z >= znv[znv.length - 1].zoom) {
    return znv[znv.length - 1].value;
  }
  for (let i = 0; i < znv.length - 1; i += 1) {
    if (z >= znv[i].zoom && z < znv[i + 1].zoom) {
      const zoomRange = znv[i + 1].zoom - znv[i].zoom;
      const normalizedDistanceFromLowerBound = (z - znv[i].zoom) / zoomRange;
      return normalizedDistanceFromLowerBound * znv[i + 1].value + (1 - normalizedDistanceFromLowerBound) * znv[i].value;
    }
  }
  return 0;
}
function paintColorOptionsToPaintSpec(color) {
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    ...color.map((el) => [el.zoom, el.value]).flat()
  ];
}
function rampedOptionsToLayerPaintSpec(ramp) {
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    ...ramp.map((el) => [el.zoom, el.value]).flat()
  ];
}
function computeRampedOutlineWidth(lineWidth, outlineWidth) {
  if (typeof outlineWidth === "number" && typeof lineWidth === "number") {
    return 2 * outlineWidth + lineWidth;
  } else if (typeof outlineWidth === "number" && Array.isArray(lineWidth)) {
    return [
      "interpolate",
      ["linear"],
      ["zoom"],
      ...lineWidth.map((el) => [el.zoom, 2 * outlineWidth + el.value]).flat()
    ];
  } else if (typeof lineWidth === "number" && Array.isArray(outlineWidth)) {
    return [
      "interpolate",
      ["linear"],
      ["zoom"],
      ...outlineWidth.map((el) => [el.zoom, 2 * el.value + lineWidth]).flat()
    ];
  }
  if (Array.isArray(lineWidth) && Array.isArray(outlineWidth)) {
    const allStops = Array.from(
      /* @__PURE__ */ new Set([
        ...lineWidth.map((el) => el.zoom),
        ...outlineWidth.map((el) => el.zoom)
      ])
    ).sort((a, b) => a < b ? -1 : 1);
    return [
      "interpolate",
      ["linear"],
      ["zoom"],
      ...allStops.map((z) => [
        z,
        2 * lerpZoomNumberValues(outlineWidth, z) + lerpZoomNumberValues(lineWidth, z)
      ]).flat()
    ];
  }
  return 0;
}
function rampedPropertyValueWeight(ramp, property) {
  return [
    "interpolate",
    ["linear"],
    ["get", property],
    ...ramp.map((el) => [el.propertyValue, el.value]).flat()
  ];
}
function dashArrayMaker(pattern) {
  const startTrimmedPattern = pattern.trimStart();
  const fixedPattern = `${startTrimmedPattern}${" ".repeat(
    pattern.length - startTrimmedPattern.length
  )}`;
  const patternArr = Array.from(fixedPattern);
  const isOnlyDashesAndSpaces = patternArr.every((c) => c === " " || c === "_");
  if (!isOnlyDashesAndSpaces) {
    throw new Error(
      "A dash pattern must be composed only of whitespace and underscore characters."
    );
  }
  const hasBothDashesAndWhitespaces = patternArr.some((c) => c === "_") && patternArr.some((c) => c === " ");
  if (!hasBothDashesAndWhitespaces) {
    throw new Error(
      "A dash pattern must contain at least one underscore and one whitespace character"
    );
  }
  const dashArray = [1];
  for (let i = 1; i < patternArr.length; i += 1) {
    const previous = patternArr[i - 1];
    const current = patternArr[i];
    if (previous === current) {
      dashArray[dashArray.length - 1] += 1;
    } else {
      dashArray.push(1);
    }
  }
  return dashArray;
}
function colorDrivenByProperty(style, property) {
  return [
    "interpolate",
    ["linear"],
    ["get", property],
    ...style.map((el) => [el.value, el.color]).flat()
  ];
}
function radiusDrivenByProperty(style, property, zoomCompensation = true) {
  if (!zoomCompensation) {
    return [
      "interpolate",
      ["linear"],
      ["get", property],
      ...style.map((el) => [el.value, el.pointRadius]).flat()
    ];
  }
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    0,
    [
      "interpolate",
      ["linear"],
      ["get", property],
      ...style.map((el) => [el.value, el.pointRadius * 0.025]).flat()
    ],
    2,
    [
      "interpolate",
      ["linear"],
      ["get", property],
      ...style.map((el) => [el.value, el.pointRadius * 0.05]).flat()
    ],
    4,
    [
      "interpolate",
      ["linear"],
      ["get", property],
      ...style.map((el) => [el.value, el.pointRadius * 0.1]).flat()
    ],
    8,
    [
      "interpolate",
      ["linear"],
      ["get", property],
      ...style.map((el) => [el.value, el.pointRadius * 0.25]).flat()
    ],
    16,
    [
      "interpolate",
      ["linear"],
      ["get", property],
      ...style.map((el) => [el.value, el.pointRadius]).flat()
    ]
  ];
}
function radiusDrivenByPropertyHeatmap(style, property, zoomCompensation = true) {
  if (!zoomCompensation) {
    return [
      "interpolate",
      ["linear"],
      ["get", property],
      ...style.map((el) => [el.propertyValue, el.value]).flat()
    ];
  }
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    0,
    [
      "interpolate",
      ["linear"],
      ["get", property],
      ...style.map((el) => [el.propertyValue, el.value * 0.025]).flat()
    ],
    2,
    [
      "interpolate",
      ["linear"],
      ["get", property],
      ...style.map((el) => [el.propertyValue, el.value * 0.05]).flat()
    ],
    4,
    [
      "interpolate",
      ["linear"],
      ["get", property],
      ...style.map((el) => [el.propertyValue, el.value * 0.1]).flat()
    ],
    8,
    [
      "interpolate",
      ["linear"],
      ["get", property],
      ...style.map((el) => [el.propertyValue, el.value * 0.25]).flat()
    ],
    16,
    [
      "interpolate",
      ["linear"],
      ["get", property],
      ...style.map((el) => [el.propertyValue, el.value]).flat()
    ]
  ];
}
function opacityDrivenByProperty(colorramp, property) {
  if (colorramp.every((el) => el.color[3] === colorramp[0].color[3])) {
    return colorramp[0].color[3] ? colorramp[0].color[3] / 255 : 1;
  }
  return [
    "interpolate",
    ["linear"],
    ["get", property],
    ...colorramp.getRawColorStops().map((el) => {
      const value = el.value;
      const color = el.color;
      return [value, color.length === 4 ? color[3] / 255 : 1];
    }).flat()
  ];
}
function heatmapIntensityFromColorRamp(colorRamp, steps = 10) {
  return [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    ...Array.from({ length: steps + 1 }, (_, i) => {
      const unitStep = i / steps;
      return [unitStep, colorRamp.getColorHex(unitStep)];
    }).flat()
  ];
}

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function addPolyline(_0, _1) {
  return __async(this, arguments, function* (map, options, fetchOptions = {}) {
    var _a, _b, _c;
    if (!options.sourceId && !options.data) {
      throw new Error(
        "Creating a polyline layer requires an existing .sourceId or a valid .data property"
      );
    }
    let data = options.data;
    if (typeof data === "string") {
      if (isUUID(data)) {
        data = `https://api.maptiler.com/data/${options.data}/features.json?key=${config.apiKey}`;
      } else if (((_a = data.split(".").pop()) == null ? void 0 : _a.toLowerCase().trim()) === "gpx") {
        const res = yield fetch(data, fetchOptions);
        const gpxStr = yield res.text();
        data = gpx(gpxStr);
      } else if (((_b = data.split(".").pop()) == null ? void 0 : _b.toLowerCase().trim()) === "kml") {
        const res = yield fetch(data, fetchOptions);
        const kmlStr = yield res.text();
        data = kml(kmlStr);
      } else {
        const tmpData = (_c = jsonParseNoThrow(
          data
        )) != null ? _c : gpxOrKml(data);
        if (tmpData)
          data = tmpData;
      }
      if (!data) {
        throw new Error(
          "Polyline data was provided as string but is incompatible with valid formats."
        );
      }
    }
    return addGeoJSONPolyline(map, __spreadProps(__spreadValues({}, options), {
      data
    }));
  });
}
function addGeoJSONPolyline(map, options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
  if (options.layerId && map.getLayer(options.layerId)) {
    throw new Error(
      `A layer already exists with the layer id: ${options.layerId}`
    );
  }
  const sourceId = (_a = options.sourceId) != null ? _a : generateRandomSourceName();
  const layerId = (_b = options.layerId) != null ? _b : generateRandomLayerName();
  const returnedInfo = {
    polylineLayerId: layerId,
    polylineOutlineLayerId: "",
    polylineSourceId: sourceId
  };
  if (options.data && !map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: "geojson",
      data: options.data
    });
  }
  const lineWidth = (_c = options.lineWidth) != null ? _c : 3;
  const lineColor = (_d = options.lineColor) != null ? _d : getRandomColor();
  const lineOpacity = (_e = options.lineOpacity) != null ? _e : 1;
  const lineBlur = (_f = options.lineBlur) != null ? _f : 0;
  const lineGapWidth = (_g = options.lineGapWidth) != null ? _g : 0;
  let lineDashArray = (_h = options.lineDashArray) != null ? _h : null;
  const outlineWidth = (_i = options.outlineWidth) != null ? _i : 1;
  const outlineColor = (_j = options.outlineColor) != null ? _j : "#FFFFFF";
  const outlineOpacity = (_k = options.outlineOpacity) != null ? _k : 1;
  const outlineBlur = (_l = options.outlineBlur) != null ? _l : 0;
  if (typeof lineDashArray === "string") {
    lineDashArray = dashArrayMaker(lineDashArray);
  }
  if (options.outline === true) {
    const outlineLayerId = `${layerId}_outline`;
    returnedInfo.polylineOutlineLayerId = outlineLayerId;
    map.addLayer(
      {
        id: outlineLayerId,
        type: "line",
        source: sourceId,
        layout: {
          "line-join": (_m = options.lineJoin) != null ? _m : "round",
          "line-cap": (_n = options.lineCap) != null ? _n : "round"
        },
        minzoom: (_o = options.minzoom) != null ? _o : 0,
        maxzoom: (_p = options.maxzoom) != null ? _p : 23,
        paint: {
          "line-opacity": typeof outlineOpacity === "number" ? outlineOpacity : rampedOptionsToLayerPaintSpec(outlineOpacity),
          "line-color": typeof outlineColor === "string" ? outlineColor : paintColorOptionsToPaintSpec(outlineColor),
          "line-width": computeRampedOutlineWidth(lineWidth, outlineWidth),
          "line-blur": typeof outlineBlur === "number" ? outlineBlur : rampedOptionsToLayerPaintSpec(outlineBlur)
        }
      },
      options.beforeId
    );
  }
  map.addLayer(
    {
      id: layerId,
      type: "line",
      source: sourceId,
      layout: {
        "line-join": (_q = options.lineJoin) != null ? _q : "round",
        "line-cap": (_r = options.lineCap) != null ? _r : "round"
      },
      minzoom: (_s = options.minzoom) != null ? _s : 0,
      maxzoom: (_t = options.maxzoom) != null ? _t : 23,
      paint: __spreadValues({
        "line-opacity": typeof lineOpacity === "number" ? lineOpacity : rampedOptionsToLayerPaintSpec(lineOpacity),
        "line-color": typeof lineColor === "string" ? lineColor : paintColorOptionsToPaintSpec(lineColor),
        "line-width": typeof lineWidth === "number" ? lineWidth : rampedOptionsToLayerPaintSpec(lineWidth),
        "line-blur": typeof lineBlur === "number" ? lineBlur : rampedOptionsToLayerPaintSpec(lineBlur),
        "line-gap-width": typeof lineGapWidth === "number" ? lineGapWidth : rampedOptionsToLayerPaintSpec(lineGapWidth)
      }, lineDashArray && { "line-dasharray": lineDashArray })
    },
    options.beforeId
  );
  return returnedInfo;
}
function addPolygon(map, options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  if (options.layerId && map.getLayer(options.layerId)) {
    throw new Error(
      `A layer already exists with the layer id: ${options.layerId}`
    );
  }
  const sourceId = (_a = options.sourceId) != null ? _a : generateRandomSourceName();
  const layerId = (_b = options.layerId) != null ? _b : generateRandomLayerName();
  const returnedInfo = {
    polygonLayerId: layerId,
    polygonOutlineLayerId: options.outline ? `${layerId}_outline` : "",
    polygonSourceId: sourceId
  };
  if (options.data && !map.getSource(sourceId)) {
    let data = options.data;
    if (typeof data === "string" && isUUID(data)) {
      data = `https://api.maptiler.com/data/${data}/features.json?key=${config.apiKey}`;
    }
    map.addSource(sourceId, {
      type: "geojson",
      data
    });
  }
  let outlineDashArray = (_c = options.outlineDashArray) != null ? _c : null;
  const outlineWidth = (_d = options.outlineWidth) != null ? _d : 1;
  const outlineColor = (_e = options.outlineColor) != null ? _e : "#FFFFFF";
  const outlineOpacity = (_f = options.outlineOpacity) != null ? _f : 1;
  const outlineBlur = (_g = options.outlineBlur) != null ? _g : 0;
  const fillColor = (_h = options.fillColor) != null ? _h : getRandomColor();
  const fillOpacity = (_i = options.fillOpacity) != null ? _i : 1;
  const outlinePosition = (_j = options.outlinePosition) != null ? _j : "center";
  const pattern = (_k = options.pattern) != null ? _k : null;
  if (typeof outlineDashArray === "string") {
    outlineDashArray = dashArrayMaker(outlineDashArray);
  }
  const addLayers = (patternImageId = null) => {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    map.addLayer(
      {
        id: layerId,
        type: "fill",
        source: sourceId,
        minzoom: (_a2 = options.minzoom) != null ? _a2 : 0,
        maxzoom: (_b2 = options.maxzoom) != null ? _b2 : 23,
        paint: __spreadValues({
          "fill-color": typeof fillColor === "string" ? fillColor : paintColorOptionsToPaintSpec(fillColor),
          "fill-opacity": typeof fillOpacity === "number" ? fillOpacity : rampedOptionsToLayerPaintSpec(fillOpacity)
        }, patternImageId && { "fill-pattern": patternImageId })
      },
      options.beforeId
    );
    if (options.outline === true) {
      let computedOutlineOffset;
      if (outlinePosition === "inside") {
        if (typeof outlineWidth === "number") {
          computedOutlineOffset = 0.5 * outlineWidth;
        } else {
          computedOutlineOffset = rampedOptionsToLayerPaintSpec(
            outlineWidth.map(({ zoom, value }) => ({
              zoom,
              value: 0.5 * value
            }))
          );
        }
      } else if (outlinePosition === "outside") {
        if (typeof outlineWidth === "number") {
          computedOutlineOffset = -0.5 * outlineWidth;
        } else {
          computedOutlineOffset = rampedOptionsToLayerPaintSpec(
            outlineWidth.map((el) => ({
              zoom: el.zoom,
              value: -0.5 * el.value
            }))
          );
        }
      } else {
        computedOutlineOffset = 0;
      }
      map.addLayer(
        {
          id: returnedInfo.polygonOutlineLayerId,
          type: "line",
          source: sourceId,
          layout: {
            "line-join": (_c2 = options.outlineJoin) != null ? _c2 : "round",
            "line-cap": (_d2 = options.outlineCap) != null ? _d2 : "butt"
          },
          minzoom: (_e2 = options.minzoom) != null ? _e2 : 0,
          maxzoom: (_f2 = options.maxzoom) != null ? _f2 : 23,
          paint: __spreadValues({
            "line-opacity": typeof outlineOpacity === "number" ? outlineOpacity : rampedOptionsToLayerPaintSpec(outlineOpacity),
            "line-color": typeof outlineColor === "string" ? outlineColor : paintColorOptionsToPaintSpec(outlineColor),
            "line-width": typeof outlineWidth === "number" ? outlineWidth : rampedOptionsToLayerPaintSpec(outlineWidth),
            "line-blur": typeof outlineBlur === "number" ? outlineBlur : rampedOptionsToLayerPaintSpec(outlineBlur),
            "line-offset": computedOutlineOffset
          }, outlineDashArray && {
            "line-dasharray": outlineDashArray
          })
        },
        options.beforeId
      );
    }
  };
  if (pattern) {
    if (map.hasImage(pattern)) {
      addLayers(pattern);
    } else {
      map.loadImage(
        pattern,
        // (error?: Error | null, image?: HTMLImageElement | ImageBitmap | null, expiry?: ExpiryData | null)
        (error, image) => {
          if (error) {
            console.error("Could not load the pattern image.", error.message);
            return addLayers();
          }
          if (!image) {
            console.error(
              `An image cannot be created from the pattern URL ${pattern}.`
            );
            return addLayers();
          }
          map.addImage(pattern, image);
          addLayers(pattern);
        }
      );
    }
  } else {
    addLayers();
  }
  return returnedInfo;
}
function addPoint(map, options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  if (options.layerId && map.getLayer(options.layerId)) {
    throw new Error(
      `A layer already exists with the layer id: ${options.layerId}`
    );
  }
  const minPointRadius = (_a = options.minPointRadius) != null ? _a : 10;
  const maxPointRadius = (_b = options.maxPointRadius) != null ? _b : 50;
  const cluster = (_c = options.cluster) != null ? _c : false;
  const nbDefaultDataDrivenStyleSteps = 20;
  const colorramp = Array.isArray(options.pointColor) ? options.pointColor : ColorRampCollection.TURBO.scale(
    10,
    options.cluster ? 1e4 : 1e3
  ).resample("ease-out-square");
  const colorRampBounds = colorramp.getBounds();
  const sourceId = (_d = options.sourceId) != null ? _d : generateRandomSourceName();
  const layerId = (_e = options.layerId) != null ? _e : generateRandomLayerName();
  const showLabel = (_f = options.showLabel) != null ? _f : cluster;
  const alignOnViewport = (_g = options.alignOnViewport) != null ? _g : true;
  const outline = (_h = options.outline) != null ? _h : false;
  const outlineOpacity = (_i = options.outlineOpacity) != null ? _i : 1;
  const outlineWidth = (_j = options.outlineWidth) != null ? _j : 1;
  const outlineColor = (_k = options.outlineColor) != null ? _k : "#FFFFFF";
  let pointOpacity;
  const zoomCompensation = (_l = options.zoomCompensation) != null ? _l : true;
  const minzoom = (_m = options.minzoom) != null ? _m : 0;
  const maxzoom = (_n = options.maxzoom) != null ? _n : 23;
  if (typeof options.pointOpacity === "number") {
    pointOpacity = options.pointOpacity;
  } else if (Array.isArray(options.pointOpacity)) {
    pointOpacity = rampedOptionsToLayerPaintSpec(options.pointOpacity);
  } else if (options.cluster) {
    pointOpacity = opacityDrivenByProperty(colorramp, "point_count");
  } else if (options.property) {
    pointOpacity = opacityDrivenByProperty(colorramp, options.property);
  } else {
    pointOpacity = rampedOptionsToLayerPaintSpec([
      { zoom: minzoom, value: 0 },
      { zoom: minzoom + 0.25, value: 1 },
      { zoom: maxzoom - 0.25, value: 1 },
      { zoom: maxzoom, value: 0 }
    ]);
  }
  const returnedInfo = {
    pointLayerId: layerId,
    clusterLayerId: "",
    labelLayerId: "",
    pointSourceId: sourceId
  };
  if (options.data && !map.getSource(sourceId)) {
    let data = options.data;
    if (typeof data === "string" && isUUID(data)) {
      data = `https://api.maptiler.com/data/${data}/features.json?key=${config.apiKey}`;
    }
    map.addSource(sourceId, {
      type: "geojson",
      data,
      cluster
    });
  }
  if (cluster) {
    returnedInfo.clusterLayerId = `${layerId}_cluster`;
    const clusterStyle = Array.from(
      { length: nbDefaultDataDrivenStyleSteps },
      (_, i) => {
        const value = colorRampBounds.min + i * (colorRampBounds.max - colorRampBounds.min) / (nbDefaultDataDrivenStyleSteps - 1);
        return {
          value,
          pointRadius: minPointRadius + (maxPointRadius - minPointRadius) * Math.pow(i / (nbDefaultDataDrivenStyleSteps - 1), 0.5),
          color: colorramp.getColorHex(value)
        };
      }
    );
    map.addLayer(
      {
        id: returnedInfo.clusterLayerId,
        type: "circle",
        source: sourceId,
        filter: ["has", "point_count"],
        paint: __spreadValues({
          // 'circle-color': options.pointColor ?? colorDrivenByProperty(clusterStyle, "point_count"),
          "circle-color": typeof options.pointColor === "string" ? options.pointColor : colorDrivenByProperty(clusterStyle, "point_count"),
          "circle-radius": typeof options.pointRadius === "number" ? options.pointRadius : Array.isArray(options.pointRadius) ? rampedOptionsToLayerPaintSpec(options.pointRadius) : radiusDrivenByProperty(clusterStyle, "point_count", false),
          "circle-pitch-alignment": alignOnViewport ? "viewport" : "map",
          "circle-pitch-scale": "map",
          // scale with camera distance regardless of viewport/biewport alignement
          "circle-opacity": pointOpacity
        }, outline && {
          "circle-stroke-opacity": typeof outlineOpacity === "number" ? outlineOpacity : rampedOptionsToLayerPaintSpec(outlineOpacity),
          "circle-stroke-width": typeof outlineWidth === "number" ? outlineWidth : rampedOptionsToLayerPaintSpec(outlineWidth),
          "circle-stroke-color": typeof outlineColor === "string" ? outlineColor : paintColorOptionsToPaintSpec(outlineColor)
        }),
        minzoom,
        maxzoom
      },
      options.beforeId
    );
    map.addLayer(
      {
        id: returnedInfo.pointLayerId,
        type: "circle",
        source: sourceId,
        filter: ["!", ["has", "point_count"]],
        paint: __spreadValues({
          "circle-pitch-alignment": alignOnViewport ? "viewport" : "map",
          "circle-pitch-scale": "map",
          // scale with camera distance regardless of viewport/biewport alignement
          // 'circle-color':  options.pointColor ?? clusterStyle[0].color,
          "circle-color": typeof options.pointColor === "string" ? options.pointColor : colorramp.getColorHex(colorramp.getBounds().min),
          "circle-radius": typeof options.pointRadius === "number" ? options.pointRadius : Array.isArray(options.pointRadius) ? rampedOptionsToLayerPaintSpec(options.pointRadius) : clusterStyle[0].pointRadius * 0.75,
          "circle-opacity": pointOpacity
        }, outline && {
          "circle-stroke-opacity": typeof outlineOpacity === "number" ? outlineOpacity : rampedOptionsToLayerPaintSpec(outlineOpacity),
          "circle-stroke-width": typeof outlineWidth === "number" ? outlineWidth : rampedOptionsToLayerPaintSpec(outlineWidth),
          "circle-stroke-color": typeof outlineColor === "string" ? outlineColor : paintColorOptionsToPaintSpec(outlineColor)
        }),
        minzoom,
        maxzoom
      },
      options.beforeId
    );
  } else {
    let pointColor = typeof options.pointColor === "string" ? options.pointColor : Array.isArray(options.pointColor) ? options.pointColor.getColorHex(options.pointColor.getBounds().min) : getRandomColor();
    let pointRadius = typeof options.pointRadius === "number" ? zoomCompensation ? rampedOptionsToLayerPaintSpec([
      { zoom: 0, value: options.pointRadius * 0.025 },
      { zoom: 2, value: options.pointRadius * 0.05 },
      { zoom: 4, value: options.pointRadius * 0.1 },
      { zoom: 8, value: options.pointRadius * 0.25 },
      { zoom: 16, value: options.pointRadius * 1 }
    ]) : options.pointRadius : Array.isArray(options.pointRadius) ? rampedOptionsToLayerPaintSpec(options.pointRadius) : zoomCompensation ? rampedOptionsToLayerPaintSpec([
      { zoom: 0, value: minPointRadius * 0.05 },
      { zoom: 2, value: minPointRadius * 0.1 },
      { zoom: 4, value: minPointRadius * 0.2 },
      { zoom: 8, value: minPointRadius * 0.5 },
      { zoom: 16, value: minPointRadius * 1 }
    ]) : minPointRadius;
    if (options.property && Array.isArray(options.pointColor)) {
      const dataDrivenStyle = Array.from(
        { length: nbDefaultDataDrivenStyleSteps },
        (_, i) => {
          const value = colorRampBounds.min + i * (colorRampBounds.max - colorRampBounds.min) / (nbDefaultDataDrivenStyleSteps - 1);
          return {
            value,
            pointRadius: typeof options.pointRadius === "number" ? options.pointRadius : minPointRadius + (maxPointRadius - minPointRadius) * Math.pow(i / (nbDefaultDataDrivenStyleSteps - 1), 0.5),
            color: typeof options.pointColor === "string" ? options.pointColor : colorramp.getColorHex(value)
          };
        }
      );
      pointColor = colorDrivenByProperty(dataDrivenStyle, options.property);
      pointRadius = radiusDrivenByProperty(
        dataDrivenStyle,
        options.property,
        zoomCompensation
      );
    }
    map.addLayer(
      {
        id: returnedInfo.pointLayerId,
        type: "circle",
        source: sourceId,
        layout: {
          // Contrary to labels, we want to see the small one in front. Weirdly "circle-sort-key" works in the opposite direction as "symbol-sort-key".
          "circle-sort-key": options.property ? ["/", 1, ["get", options.property]] : 0
        },
        paint: __spreadValues({
          "circle-pitch-alignment": alignOnViewport ? "viewport" : "map",
          "circle-pitch-scale": "map",
          // scale with camera distance regardless of viewport/biewport alignement
          "circle-color": pointColor,
          "circle-opacity": pointOpacity,
          "circle-radius": pointRadius
        }, outline && {
          "circle-stroke-opacity": typeof outlineOpacity === "number" ? outlineOpacity : rampedOptionsToLayerPaintSpec(outlineOpacity),
          "circle-stroke-width": typeof outlineWidth === "number" ? outlineWidth : rampedOptionsToLayerPaintSpec(outlineWidth),
          "circle-stroke-color": typeof outlineColor === "string" ? outlineColor : paintColorOptionsToPaintSpec(outlineColor)
        }),
        minzoom,
        maxzoom
      },
      options.beforeId
    );
  }
  if (showLabel !== false && (options.cluster || options.property)) {
    returnedInfo.labelLayerId = `${layerId}_label`;
    const labelColor = (_o = options.labelColor) != null ? _o : "#fff";
    const labelSize = (_p = options.labelSize) != null ? _p : 12;
    map.addLayer(
      {
        id: returnedInfo.labelLayerId,
        type: "symbol",
        source: sourceId,
        filter: [
          "has",
          options.cluster ? "point_count" : options.property
        ],
        layout: {
          "text-field": options.cluster ? "{point_count_abbreviated}" : `{${options.property}}`,
          "text-font": ["Noto Sans Regular"],
          "text-size": labelSize,
          "text-pitch-alignment": alignOnViewport ? "viewport" : "map",
          "symbol-sort-key": [
            "/",
            1,
            [
              "get",
              options.cluster ? "point_count" : options.property
            ]
          ]
          // so that the largest value goes on top
        },
        paint: {
          "text-color": labelColor,
          "text-opacity": pointOpacity
        },
        minzoom,
        maxzoom
      },
      options.beforeId
    );
  }
  return returnedInfo;
}
function addHeatmap(map, options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  if (options.layerId && map.getLayer(options.layerId)) {
    throw new Error(
      `A layer already exists with the layer id: ${options.layerId}`
    );
  }
  const sourceId = (_a = options.sourceId) != null ? _a : generateRandomSourceName();
  const layerId = (_b = options.layerId) != null ? _b : generateRandomLayerName();
  const minzoom = (_c = options.minzoom) != null ? _c : 0;
  const maxzoom = (_d = options.maxzoom) != null ? _d : 23;
  const zoomCompensation = (_e = options.zoomCompensation) != null ? _e : true;
  const opacity = (_f = options.opacity) != null ? _f : [
    { zoom: minzoom, value: 0 },
    { zoom: minzoom + 0.25, value: 1 },
    { zoom: maxzoom - 0.25, value: 1 },
    { zoom: maxzoom, value: 0 }
  ];
  let colorRamp = Array.isArray(options.colorRamp) ? options.colorRamp : ColorRampCollection.TURBO.transparentStart();
  const crBounds = colorRamp.getBounds();
  if (crBounds.min !== 0 || crBounds.max !== 1) {
    colorRamp = colorRamp.scale(0, 1);
  }
  if (!colorRamp.hasTransparentStart()) {
    colorRamp = colorRamp.transparentStart();
  }
  const intensity = (_g = options.intensity) != null ? _g : [
    { zoom: 0, value: 0.01 },
    { zoom: 4, value: 0.2 },
    { zoom: 16, value: 1 }
  ];
  const property = (_h = options.property) != null ? _h : null;
  const propertyValueWeight = (_i = options.weight) != null ? _i : 1;
  let heatmapWeight = 1;
  if (property) {
    if (typeof propertyValueWeight === "number") {
      heatmapWeight = propertyValueWeight;
      if (typeof options.weight === "number") {
        console.warn(
          "The option `.property` is ignored when `.propertyValueWeights` is not of type `PropertyValueWeights`"
        );
      }
    } else if (Array.isArray(propertyValueWeight)) {
      heatmapWeight = rampedPropertyValueWeight(propertyValueWeight, property);
    } else {
      console.warn(
        "The option `.property` is ignored when `.propertyValueWeights` is not of type `PropertyValueWeights`"
      );
    }
  } else {
    if (typeof propertyValueWeight === "number") {
      heatmapWeight = propertyValueWeight;
    } else if (Array.isArray(propertyValueWeight)) {
      console.warn(
        "The options `.propertyValueWeights` can only be used when `.property` is provided."
      );
    }
  }
  const defaultRadiusZoomRamping = [
    { zoom: 0, value: 50 * 0.025 },
    { zoom: 2, value: 50 * 0.05 },
    { zoom: 4, value: 50 * 0.1 },
    { zoom: 8, value: 50 * 0.25 },
    { zoom: 16, value: 50 }
  ];
  const radius = (_j = options.radius) != null ? _j : zoomCompensation ? defaultRadiusZoomRamping : 10;
  let radiusHeatmap = 1;
  if (typeof radius === "number") {
    radiusHeatmap = radius;
  } else if (Array.isArray(radius) && "zoom" in radius[0]) {
    radiusHeatmap = rampedOptionsToLayerPaintSpec(radius);
  } else if (property && Array.isArray(radius) && "propertyValue" in radius[0]) {
    radiusHeatmap = radiusDrivenByPropertyHeatmap(
      radius,
      property,
      zoomCompensation
    );
  } else if (!property && Array.isArray(radius) && "propertyValue" in radius[0]) {
    radiusHeatmap = rampedOptionsToLayerPaintSpec(
      defaultRadiusZoomRamping
    );
    console.warn(
      "The option `.radius` can only be property-driven if the option `.property` is provided."
    );
  } else {
    radiusHeatmap = rampedOptionsToLayerPaintSpec(
      defaultRadiusZoomRamping
    );
  }
  const returnedInfo = {
    heatmapLayerId: layerId,
    heatmapSourceId: sourceId
  };
  if (options.data && !map.getSource(sourceId)) {
    let data = options.data;
    if (typeof data === "string" && isUUID(data)) {
      data = `https://api.maptiler.com/data/${data}/features.json?key=${config.apiKey}`;
    }
    map.addSource(sourceId, {
      type: "geojson",
      data
    });
  }
  map.addLayer({
    id: layerId,
    type: "heatmap",
    source: sourceId,
    minzoom,
    maxzoom,
    paint: {
      "heatmap-weight": heatmapWeight,
      "heatmap-intensity": typeof intensity === "number" ? intensity : rampedOptionsToLayerPaintSpec(
        intensity
      ),
      "heatmap-color": heatmapIntensityFromColorRamp(colorRamp),
      "heatmap-radius": radiusHeatmap,
      "heatmap-opacity": typeof opacity === "number" ? opacity : rampedOptionsToLayerPaintSpec(
        opacity
      )
    }
  });
  return returnedInfo;
}

const helpers = {
  addPolyline,
  addPolygon,
  addPoint,
  addHeatmap
};

const {
  // supported,
  setRTLTextPlugin,
  getRTLTextPluginStatus,
  LngLat,
  LngLatBounds,
  MercatorCoordinate,
  Evented,
  AJAXError,
  prewarm,
  clearPrewarmedResources,
  version,
  workerCount,
  maxParallelImageRequests,
  workerUrl,
  addProtocol,
  removeProtocol
} = maplibregl__default;
const MapMLGL = maplibregl__default.Map;
const MarkerMLGL = maplibregl__default.Marker;
const PopupMLGL = maplibregl__default.Popup;
const StyleMLGL = maplibregl__default.Style;
const CanvasSourceMLGL = maplibregl__default.CanvasSource;
const GeoJSONSourceMLGL = maplibregl__default.GeoJSONSource;
const ImageSourceMLGL = maplibregl__default.ImageSource;
const RasterTileSourceMLGL = maplibregl__default.RasterTileSource;
const RasterDEMTileSourceMLGL = maplibregl__default.RasterDEMTileSource;
const VectorTileSourceMLGL = maplibregl__default.VectorTileSource;
const VideoSourceMLGL = maplibregl__default.VideoSource;
maplibregl__default.NavigationControl;
maplibregl__default.GeolocateControl;
maplibregl__default.AttributionControl;
maplibregl__default.LogoControl;
maplibregl__default.ScaleControl;
maplibregl__default.FullscreenControl;
maplibregl__default.TerrainControl;

export { AJAXError, AttributionControl, CanvasSource, CanvasSourceMLGL, ColorRamp, ColorRampCollection, Evented, FullscreenControl, GeoJSONSource, GeoJSONSourceMLGL, GeolocateControl, GeolocationType, ImageSource, ImageSourceMLGL, Language, LngLat, LngLatBounds, LogoControl, Map, MapMLGL, MaptilerGeolocateControl, MaptilerLogoControl, MaptilerNavigationControl, MaptilerTerrainControl, Marker, MarkerMLGL, MercatorCoordinate, NavigationControl, Point, Popup, PopupMLGL, RasterDEMTileSource, RasterDEMTileSourceMLGL, RasterTileSource, RasterTileSourceMLGL, ScaleControl, SdkConfig, Style, StyleMLGL, TerrainControl, VectorTileSource, VectorTileSourceMLGL, VideoSource, VideoSourceMLGL, addProtocol, clearPrewarmedResources, config, getRTLTextPluginStatus, gpx, gpxOrKml, hasChildNodeWithName, helpers, kml, maxParallelImageRequests, prewarm, removeProtocol, setRTLTextPlugin, str2xml, version, workerCount, workerUrl, xml2str };
//# sourceMappingURL=maptiler-sdk.mjs.map
