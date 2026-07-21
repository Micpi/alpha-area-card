import { LitElement, html, css } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module"

const CARD_TYPE = "alpha-area-card"
const CARD_EDITOR_TYPE = "alpha-area-card-editor"
const UNAVAILABLE_STATES = new Set(["unknown", "unavailable"])
const SENSOR_DOMAINS = new Set(["sensor", "binary_sensor"])
const TOGGLE_DOMAINS = new Set([
  "light",
  "switch",
  "fan",
  "input_boolean",
  "humidifier",
  "group",
  "automation",
])

const ACTION_OPTIONS = [
  "none",
  "more-info",
  "navigate",
  "toggle",
  "url",
  "call-service",
  "fire-dom-event",
]

const DISPLAY_TYPES = ["compact", "icon", "picture", "camera"]
const FEATURE_POSITIONS = ["bottom", "inline"]
const ENTITY_POSITIONS = [
  "bottom-left",
  "bottom-center",
  "bottom-right",
  "top-left",
  "top-center",
  "top-right",
  "title-right",
]
const ENTITY_DISPLAY_MODES = ["button", "text", "icon"]
const DEFAULT_SENSOR_CLASSES = ["temperature", "humidity"]
const DEFAULT_ALERT_CLASSES = ["moisture", "motion"]
const SUM_SENSOR_CLASSES = new Set(["energy", "gas", "monetary", "power", "volume", "water"])
const AREA_CONTROL_FEATURE_TYPES = new Set(["area-controls", "area_controls"])
const INACTIVE_STATES = new Set([
  "off",
  "closed",
  "locked",
  "idle",
  "standby",
  "paused",
  "unavailable",
  "unknown",
])
const COLOR_TOKENS = {
  primary: "var(--primary-color, #03A9F4)",
  accent: "var(--accent-color, var(--primary-color, #03A9F4))",
  disabled: "var(--disabled-color, #BDBDBD)",
  red: "var(--red-color, #F44336)",
  pink: "var(--pink-color, #E91E63)",
  purple: "var(--purple-color, #9C27B0)",
  "deep-purple": "var(--deep-purple-color, #673AB7)",
  indigo: "var(--indigo-color, #3F51B5)",
  blue: "var(--blue-color, #2196F3)",
  "light-blue": "var(--light-blue-color, #03A9F4)",
  cyan: "var(--cyan-color, #00BCD4)",
  teal: "var(--teal-color, #009688)",
  green: "var(--green-color, #4CAF50)",
  "light-green": "var(--light-green-color, #8BC34A)",
  lime: "var(--lime-color, #CDDC39)",
  yellow: "var(--yellow-color, #FFEB3B)",
  amber: "var(--amber-color, #FFC107)",
  orange: "var(--orange-color, #FF9800)",
  "deep-orange": "var(--deep-orange-color, #FF5722)",
  brown: "var(--brown-color, #795548)",
  grey: "var(--grey-color, #9E9E9E)",
  "blue-grey": "var(--blue-grey-color, #607D8B)",
  black: "#000000",
  white: "#FFFFFF",
}

const SENSOR_DEVICE_CLASS_ICONS = {
  apparent_power: "mdi:flash",
  battery: "mdi:battery",
  carbon_dioxide: "mdi:molecule-co2",
  carbon_monoxide: "mdi:molecule-co",
  current: "mdi:current-ac",
  energy: "mdi:lightning-bolt",
  gas: "mdi:meter-gas",
  humidity: "mdi:water-percent",
  illuminance: "mdi:brightness-5",
  monetary: "mdi:cash",
  power: "mdi:flash",
  pressure: "mdi:gauge",
  signal_strength: "mdi:wifi",
  temperature: "mdi:thermometer",
  timestamp: "mdi:clock-outline",
  voltage: "mdi:sine-wave",
  volume: "mdi:water",
  water: "mdi:water",
}

const BINARY_SENSOR_DEVICE_CLASS_ICONS = {
  battery: ["mdi:battery-outline", "mdi:battery"],
  cold: ["mdi:thermometer", "mdi:snowflake"],
  connectivity: ["mdi:lan-disconnect", "mdi:lan-connect"],
  door: ["mdi:door-closed", "mdi:door-open"],
  garage_door: ["mdi:garage", "mdi:garage-open"],
  gas: ["mdi:check-circle-outline", "mdi:alert-circle"],
  heat: ["mdi:thermometer", "mdi:fire"],
  light: ["mdi:brightness-5", "mdi:brightness-7"],
  lock: ["mdi:lock", "mdi:lock-open-variant"],
  moisture: ["mdi:water-off", "mdi:water-alert"],
  motion: ["mdi:motion-sensor-off", "mdi:motion-sensor"],
  moving: ["mdi:pause-circle-outline", "mdi:motion"],
  occupancy: ["mdi:home-outline", "mdi:home"],
  opening: ["mdi:square-outline", "mdi:square-off-outline"],
  plug: ["mdi:power-plug-off", "mdi:power-plug"],
  power: ["mdi:power-plug-off", "mdi:power-plug"],
  presence: ["mdi:home-outline", "mdi:home-account"],
  problem: ["mdi:check-circle-outline", "mdi:alert-circle"],
  running: ["mdi:stop-circle-outline", "mdi:play-circle"],
  safety: ["mdi:shield-check", "mdi:shield-alert"],
  smoke: ["mdi:check-circle-outline", "mdi:smoke-detector-alert"],
  sound: ["mdi:volume-off", "mdi:volume-high"],
  tamper: ["mdi:shield-check", "mdi:shield-alert"],
  update: ["mdi:package-variant", "mdi:package-up"],
  vibration: ["mdi:vibrate-off", "mdi:vibrate"],
  window: ["mdi:window-closed", "mdi:window-open"],
}

const COVER_DEVICE_CLASS_ICONS = {
  awning: "mdi:awning",
  blind: "mdi:blinds",
  curtain: "mdi:curtains",
  damper: "mdi:circle-slice-8",
  door: "mdi:door",
  garage: "mdi:garage",
  gate: "mdi:gate",
  shade: "mdi:roller-shade",
  shutter: "mdi:window-shutter",
  window: "mdi:window-closed",
}

const DOMAIN_ICONS = {
  alarm_control_panel: "mdi:shield-home",
  automation: "mdi:robot",
  button: "mdi:gesture-tap-button",
  calendar: "mdi:calendar",
  camera: "mdi:cctv",
  climate: "mdi:thermostat",
  conversation: "mdi:chat",
  device_tracker: "mdi:map-marker",
  fan: "mdi:fan",
  group: "mdi:google-circles-communities",
  humidifier: "mdi:air-humidifier",
  image: "mdi:image",
  input_boolean: "mdi:toggle-switch-off",
  input_button: "mdi:gesture-tap-button",
  input_datetime: "mdi:calendar-clock",
  input_number: "mdi:numeric",
  input_select: "mdi:format-list-bulleted",
  input_text: "mdi:form-textbox",
  light: "mdi:lightbulb",
  lock: "mdi:lock",
  media_player: "mdi:speaker",
  number: "mdi:numeric",
  person: "mdi:account",
  remote: "mdi:remote",
  scene: "mdi:palette",
  script: "mdi:script-text",
  select: "mdi:format-list-bulleted",
  sensor: "mdi:gauge",
  siren: "mdi:bullhorn",
  switch: "mdi:toggle-switch-off",
  update: "mdi:package-up",
  vacuum: "mdi:robot-vacuum",
  water_heater: "mdi:water-boiler",
  weather: "mdi:weather-partly-cloudy",
}

const STYLE_DEFAULTS = {
  button_icon_color_on: "var(--primary-color, #00AEEF)",
  button_icon_color_off: "var(--secondary-text-color, #9CA3AF)",
  badge_text_color: "var(--text-primary-color, #FFFFFF)",
  button_light_color_on: "var(--state-light-active-color, var(--primary-color, #00AEEF))",
  badge_background: "var(--primary-color, #00AEEF)",
  title_color: "var(--primary-text-color, #f8fafc)",
  title_font_weight: "600",
  title_text_transform: "none",
  title_text_shadow: "0 1px 3px rgba(0, 0, 0, 0.55)",
  image_blur: "0px",
}

const ENTITY_DEFAULTS = {
  position: "",
  display_mode: "button",
  show_name: false,
  show_state: false,
  icon: "",
  icon_on: "",
  icon_off: "",
  text: "",
  icon_color_on: "",
  icon_color_off: "",
  text_color_on: "",
  text_color_off: "",
  background_color_on: "",
  background_color_off: "",
}

const DEFAULT_CONFIG = {
  title: "",
  area: "",
  display_type: "picture",
  camera_view: "auto",
  camera_entity: "",
  aspect_ratio: "16:9",
  height: "",
  color: "",
  auto_area_entities: true,
  hide_unavailable: false,
  entity_sort: "none",
  include_domains: [],
  exclude_domains: [],
  exclude_entities: [],
  sensor_classes: [...DEFAULT_SENSOR_CLASSES],
  alert_classes: [...DEFAULT_ALERT_CLASSES],
  features: [],
  features_position: "bottom",
  max_entities: 0,
  tap_action: {
    action: "none",
  },
  hold_action: {
    action: "none",
  },
  double_tap_action: {
    action: "none",
  },
  entity_hold_action: {
    action: "more-info",
  },
  entity_double_tap_action: {
    action: "none",
  },
  entities: [],
  entity_defaults: { ...ENTITY_DEFAULTS },
  styles: { ...STYLE_DEFAULTS },
  darken_image: true,
  shadow: false,
  force_dialog: false,
  state_color: false,
}

const safeText = (value) => (value === null || value === undefined ? "" : String(value))

const deepClone = (value) => JSON.parse(JSON.stringify(value))

const escapeHtml = (value) =>
  safeText(value).replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }
    return map[char]
  })

const escapeAttribute = escapeHtml

const parseEntityConfig = (rawEntity) => {
  if (typeof rawEntity === "string") {
    return { entity: rawEntity }
  }
  if (!rawEntity || typeof rawEntity !== "object" || !rawEntity.entity) {
    return null
  }
  return { ...rawEntity }
}

const parseEntitiesText = (text) =>
  safeText(text)
    .split(/\r?\n|,|;/)
    .map((item) => item.trim())
    .filter(Boolean)

const parseDomainsText = (text) =>
  safeText(text)
    .split(/\r?\n|,|;/)
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)

const parseStringList = (text) =>
  safeText(text)
    .split(/\r?\n|,|;/)
    .map((item) => item.trim())
    .filter(Boolean)

const normalizeStringList = (value, fallback = [], lowerCase = false) => {
  if (value === undefined || value === null || value === "") {
    return [...fallback]
  }

  const list = Array.isArray(value) ? value : parseStringList(value)
  const normalized = list.map((item) => {
    const text = safeText(item).trim()
    return lowerCase ? text.toLowerCase() : text
  })
  return normalized.filter(Boolean)
}

const normalizeOptionalStringList = (value, lowerCase = false) => {
  const list = Array.isArray(value) ? value : parseStringList(value)
  return list
    .map((item) => {
      const text = safeText(item).trim()
      return lowerCase ? text.toLowerCase() : text
    })
    .filter(Boolean)
}

const normalizeSelect = (value, allowed, fallback) =>
  allowed.includes(value) ? value : fallback

const normalizeEntityPosition = (value, fallback = "bottom-right") =>
  ENTITY_POSITIONS.includes(value) ? value : fallback

const normalizeEntityDisplayMode = (value, fallback = "button") =>
  ENTITY_DISPLAY_MODES.includes(value) ? value : fallback

const isEntityActive = (entityState) => {
  if (!entityState || INACTIVE_STATES.has(entityState.state)) {
    return false
  }
  return Boolean(entityState.state)
}

const resolveColorToken = (value, fallback = "") => {
  const color = safeText(value || fallback).trim()
  return COLOR_TOKENS[color] || color
}

const normalizeCssSize = (value, fallback = "") => {
  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0 ? `${value}px` : fallback
  }

  const text = safeText(value).trim()
  if (!text) {
    return fallback
  }

  if (/^\d+(?:\.\d+)?$/.test(text)) {
    return `${text}px`
  }

  if (/^\d+(?:\.\d+)?(?:px|rem|em|vh|vw|vmin|vmax|%)$/i.test(text)) {
    return text
  }

  if (/^(?:calc|min|max|clamp)\([^;{}<>]+\)$/i.test(text) || /^var\([^;{}<>]+\)$/i.test(text)) {
    return text
  }

  return fallback
}

const getPixelHeightFromCssSize = (value) => {
  const match = safeText(value).trim().match(/^(\d+(?:\.\d+)?)px$/i)
  return match ? Number(match[1]) : 0
}

const normalizeActionConfig = (actionConfig, fallbackAction = "more-info") => {
  if (!actionConfig || typeof actionConfig !== "object") {
    return { action: fallbackAction }
  }

  const action = safeText(actionConfig.action) || fallbackAction
  if (!ACTION_OPTIONS.includes(action)) {
    return { action: fallbackAction }
  }

  return {
    ...actionConfig,
    action,
  }
}

const formatNumber = (hass, value, precision) => {
  const numeric = Number(value)
  if (Number.isNaN(numeric)) {
    return safeText(value)
  }

  const locale = hass?.locale?.language || undefined
  const digits = Number.isFinite(precision) ? precision : 2
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(numeric)
}

const getEntityName = (hass, entityState, fallbackEntityId, entityConfig = {}) => {
  if (entityConfig.name) {
    return safeText(entityConfig.name)
  }

  if (hass?.formatEntityName && entityState) {
    try {
      return hass.formatEntityName(entityState)
    } catch (_error) {
      // Older HA builds or custom frontend bundles may expose a partial formatter.
    }
  }

  return entityState?.attributes?.friendly_name || fallbackEntityId
}

const getEntityIcon = (hass, entityState, entityConfig = {}) => {
  const entityId = entityConfig.entity || entityState?.entity_id || ""
  const domain = entityId.split(".")[0]
  const registryIcon = hass?.entities?.[entityId]?.icon
  const explicitIcon = entityConfig.icon || entityState?.attributes?.icon || registryIcon

  if (explicitIcon) {
    return explicitIcon
  }

  const state = entityState?.state
  const deviceClass = safeText(entityState?.attributes?.device_class).toLowerCase()

  if (domain === "binary_sensor") {
    const pair = BINARY_SENSOR_DEVICE_CLASS_ICONS[deviceClass]
    if (pair) {
      return state === "on" ? pair[1] : pair[0]
    }
    return state === "on" ? "mdi:checkbox-marked-circle" : "mdi:checkbox-blank-circle-outline"
  }

  if (domain === "sensor") {
    return SENSOR_DEVICE_CLASS_ICONS[deviceClass] || DOMAIN_ICONS.sensor
  }

  if (domain === "cover") {
    return COVER_DEVICE_CLASS_ICONS[deviceClass] || "mdi:window-shutter"
  }

  if (domain === "light") {
    return state === "on" ? "mdi:lightbulb-on" : "mdi:lightbulb"
  }

  if (domain === "switch" || domain === "input_boolean") {
    return state === "on" ? "mdi:toggle-switch" : "mdi:toggle-switch-off"
  }

  if (domain === "lock") {
    return state === "unlocked" ? "mdi:lock-open-variant" : "mdi:lock"
  }

  return DOMAIN_ICONS[domain] || "mdi:checkbox-blank-circle-outline"
}

const applyNavigation = (path, replace = false) => {
  if (!path) {
    return
  }
  if (replace) {
    history.replaceState(null, "", path)
  } else {
    history.pushState(null, "", path)
  }
  window.dispatchEvent(new Event("location-changed"))
}

const fireCustomEvent = (node, type, detail = {}) => {
  node.dispatchEvent(
    new CustomEvent(type, {
      detail,
      bubbles: true,
      composed: true,
    })
  )
}

const performAction = (node, hass, entityConfig, actionConfig) => {
  const action = actionConfig?.action || "more-info"

  if (action === "none") {
    return
  }

  if (action === "more-info") {
    if (!entityConfig?.entity) {
      return
    }
    fireCustomEvent(node, "hass-more-info", { entityId: entityConfig.entity })
    return
  }

  if (action === "navigate") {
    applyNavigation(actionConfig.navigation_path, Boolean(actionConfig.navigation_replace))
    return
  }

  if (action === "url") {
    if (actionConfig.url_path) {
      window.open(actionConfig.url_path, "_blank", "noopener,noreferrer")
    }
    return
  }

  if (action === "toggle") {
    if (!entityConfig?.entity) {
      return
    }
    hass.callService("homeassistant", "toggle", {
      entity_id: entityConfig.entity,
    })
    return
  }

  if (action === "call-service") {
    const service = safeText(actionConfig.service)
    if (!service.includes(".")) {
      return
    }
    const [domain, serviceName] = service.split(".")
    hass.callService(domain, serviceName, actionConfig.service_data || {}, actionConfig.target)
    return
  }

  if (action === "fire-dom-event") {
    fireCustomEvent(node, "ll-custom", actionConfig)
  }
}

const resolveAreaEntities = (hass, areaId) => {
  if (!hass?.areas || !hass?.entities) {
    return []
  }

  const area = hass.areas[areaId]
  if (!area) {
    return []
  }

  const result = []
  for (const [entityId, metadata] of Object.entries(hass.entities)) {
    if (metadata.hidden || metadata.disabled_by) {
      continue
    }

    if (metadata.entity_category === "diagnostic" || metadata.entity_category === "config") {
      continue
    }

    const deviceArea = metadata.device_id ? hass.devices?.[metadata.device_id]?.area_id : null
    if (metadata.area_id === area.area_id || deviceArea === area.area_id) {
      result.push(entityId)
    }
  }

  return result
}

const shouldUseStateColor = (entityConfig, cardConfig) => {
  if (typeof entityConfig.state_color === "boolean") {
    return entityConfig.state_color
  }
  return Boolean(cardConfig.state_color)
}

const getDisplayState = (hass, entityState, entityRegistryItem, entityConfig) => {
  if (entityConfig.display_state !== undefined) {
    return safeText(entityConfig.display_state)
  }

  if (!entityState) {
    return ""
  }

  if (entityConfig.attribute) {
    const raw = entityState.attributes?.[entityConfig.attribute]
    let formatted = raw
    if (hass?.formatEntityAttributeValue) {
      try {
        formatted = hass.formatEntityAttributeValue(entityState, entityConfig.attribute, raw)
      } catch (_error) {
        formatted = raw
      }
    }
    return `${safeText(entityConfig.prefix)}${safeText(formatted)}${safeText(entityConfig.suffix)}`.trim()
  }

  if (UNAVAILABLE_STATES.has(entityState.state)) {
    return entityState.state
  }

  if (hass?.formatEntityState) {
    try {
      return hass.formatEntityState(entityState)
    } catch (_error) {
      // Fall back to local formatting below.
    }
  }

  const unit = safeText(entityState.attributes?.unit_of_measurement)
  const domain = entityState.entity_id.split(".")[0]

  if (SENSOR_DOMAINS.has(domain) || unit) {
    const precision = Number.isFinite(entityRegistryItem?.display_precision)
      ? entityRegistryItem.display_precision
      : undefined
    const formatted = formatNumber(hass, entityState.state, precision)
    return `${formatted}${unit ? ` ${unit}` : ""}`.trim()
  }

  return safeText(entityState.state)
}

class AlphaAreaCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(CARD_EDITOR_TYPE)
  }

  static getStubConfig() {
    return {}
  }

  static getGridOptions() {
    return {
      columns: 12,
      min_columns: 12,
      max_columns: 12,
      rows: 3,
      min_rows: 1,
    }
  }

  static get observedAttributes() {
    return []
  }

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this._hass = null
    this.config = deepClone(DEFAULT_CONFIG)
    this._renderModel = {
      area: null,
      areaEntityIds: [],
      entitiesDialog: [],
      entitiesToggle: [],
      entitiesSensors: [],
      entitiesAlerts: [],
      sensorSummaries: [],
      cameraEntity: "",
    }
    this._lastStateSnapshot = ""
    this._cardClickTimer = null
    this._entityClickTimers = new Map()
    this._boundOnCardClick = this._onCardClick.bind(this)
    this._boundOnCardDoubleClick = this._onCardDoubleClick.bind(this)
    this._boundOnCardContextMenu = this._onCardContextMenu.bind(this)
    this._boundOnEntityClick = this._onEntityClick.bind(this)
    this._boundOnEntityDoubleClick = this._onEntityDoubleClick.bind(this)
    this._boundOnEntityContextMenu = this._onEntityContextMenu.bind(this)
  }

  setConfig(config) {
    const merged = {
      ...deepClone(DEFAULT_CONFIG),
      ...(config || {}),
      styles: {
        ...deepClone(DEFAULT_CONFIG.styles),
        ...(config?.styles || {}),
      },
      tap_action: {
        ...deepClone(DEFAULT_CONFIG.tap_action),
        ...(config?.tap_action || {}),
      },
      hold_action: {
        ...deepClone(DEFAULT_CONFIG.hold_action),
        ...(config?.hold_action || {}),
      },
      double_tap_action: {
        ...deepClone(DEFAULT_CONFIG.double_tap_action),
        ...(config?.double_tap_action || {}),
      },
      entity_hold_action: {
        ...deepClone(DEFAULT_CONFIG.entity_hold_action),
        ...(config?.entity_hold_action || {}),
      },
      entity_double_tap_action: {
        ...deepClone(DEFAULT_CONFIG.entity_double_tap_action),
        ...(config?.entity_double_tap_action || {}),
      },
      entity_defaults: {
        ...deepClone(DEFAULT_CONFIG.entity_defaults),
        ...(config?.entity_defaults || {}),
      },
    }

    if (merged.entities && !Array.isArray(merged.entities)) {
      throw new Error("Le parametre entities doit etre un tableau.")
    }

    merged.include_domains = Array.isArray(merged.include_domains)
      ? merged.include_domains.map((domain) => safeText(domain).toLowerCase()).filter(Boolean)
      : parseDomainsText(merged.include_domains)

    merged.exclude_domains = Array.isArray(merged.exclude_domains)
      ? merged.exclude_domains.map((domain) => safeText(domain).toLowerCase()).filter(Boolean)
      : parseDomainsText(merged.exclude_domains)

    merged.exclude_entities = normalizeOptionalStringList(merged.exclude_entities)
    merged.sensor_classes = normalizeStringList(
      merged.sensor_classes,
      DEFAULT_SENSOR_CLASSES,
      true
    )
    merged.alert_classes = normalizeStringList(merged.alert_classes, DEFAULT_ALERT_CLASSES, true)
    merged.display_type = normalizeSelect(merged.display_type, DISPLAY_TYPES, "picture")
    merged.features_position = normalizeSelect(
      merged.features_position,
      FEATURE_POSITIONS,
      "bottom"
    )
    merged.features = Array.isArray(merged.features) ? merged.features.filter(Boolean) : []
    merged.camera_entity = safeText(merged.camera_entity || merged.camera_image)
    merged.height = normalizeCssSize(merged.height)
    merged.entity_defaults.position = normalizeEntityPosition(merged.entity_defaults.position, "")
    merged.entity_defaults.display_mode = normalizeEntityDisplayMode(
      merged.entity_defaults.display_mode,
      "button"
    )

    this.config = merged
    this._computeRenderModel()
    this._render()
  }

  set hass(hass) {
    const previous = this._hass
    this._hass = hass

    if (!hass) {
      return
    }

    if (!previous) {
      this._computeRenderModel()
      this._render()
      return
    }

    if (this._shouldRefresh(previous, hass)) {
      this._computeRenderModel()
      this._render()
    }
  }

  get hass() {
    return this._hass
  }

  getCardSize() {
    return this._getGridRows()
  }

  getGridOptions() {
    return {
      columns: 12,
      min_columns: 12,
      max_columns: 12,
      rows: this._getGridRows(),
      min_rows: 1,
    }
  }

  _getGridRows() {
    const configuredHeight = normalizeCssSize(this.config?.height)
    const pixelHeight = getPixelHeightFromCssSize(configuredHeight)
    if (pixelHeight) {
      return Math.max(1, Math.ceil(pixelHeight / 56))
    }
    return this.config?.display_type === "compact" ? 2 : 3
  }

  _shouldRefresh(previousHass, nextHass) {
    if (!nextHass || !previousHass) {
      return true
    }

    if (previousHass.locale !== nextHass.locale || previousHass.themes !== nextHass.themes) {
      return true
    }

    const tracked = [
      ...this._renderModel.entitiesDialog,
      ...this._renderModel.entitiesToggle,
      ...this._renderModel.entitiesSensors,
      ...this._renderModel.entitiesAlerts,
      ...this._renderModel.sensorSummaries,
    ]

    if (this._renderModel.cameraEntity) {
      tracked.push({ entity: this._renderModel.cameraEntity })
    }

    const trackedEntityIds = new Set()
    for (const entityConfig of tracked) {
      if (Array.isArray(entityConfig.source_entities)) {
        entityConfig.source_entities.forEach((entityId) => trackedEntityIds.add(entityId))
      } else if (entityConfig.entity) {
        trackedEntityIds.add(entityConfig.entity)
      }
    }

    for (const entityId of trackedEntityIds) {
      if (previousHass.states[entityId] !== nextHass.states[entityId]) {
        return true
      }
    }

    const areaId = this.config.area
    if (areaId && previousHass.areas?.[areaId] !== nextHass.areas?.[areaId]) {
      return true
    }

    const needsRegistryRefresh =
      this.config.auto_area_entities ||
      this._hasAreaControlsFeature() ||
      this.config.display_type === "camera" ||
      !Array.isArray(this.config.entities) ||
      this.config.entities.length === 0

    if (
      needsRegistryRefresh &&
      (previousHass.entities !== nextHass.entities ||
        previousHass.devices !== nextHass.devices ||
        previousHass.areas !== nextHass.areas)
    ) {
      return true
    }

    return false
  }

  _computeRenderModel() {
    const hass = this._hass
    if (!hass) {
      return
    }

    const areaId = this.config.area
    const area = areaId ? hass.areas?.[areaId] || null : null
    const areaEntityIds = areaId ? resolveAreaEntities(hass, areaId) : []
    const hasExplicitEntities = Array.isArray(this.config.entities) && this.config.entities.length

    const shouldUseAreaEntities = this.config.auto_area_entities || this._hasAreaControlsFeature()
    const configured =
      hasExplicitEntities
        ? this.config.entities
        : shouldUseAreaEntities
          ? areaEntityIds
          : []

    const includeDomains = new Set(
      (this.config.include_domains || []).map((domain) => safeText(domain))
    )
    const excludeDomains = new Set(
      (this.config.exclude_domains || []).map((domain) => safeText(domain))
    )
    const excludedEntities = new Set(this.config.exclude_entities || [])
    const sensorClasses = new Set(this.config.sensor_classes || [])
    const alertClasses = new Set(this.config.alert_classes || [])
    const autoAreaSource = !hasExplicitEntities && Boolean(shouldUseAreaEntities)
    const hasAreaControlsFeature = this._hasAreaControlsFeature()
    const areaControls = this._getAreaControls()

    let parsedEntities = configured
      .map(parseEntityConfig)
      .filter(Boolean)
      .filter((item) => item.entity)
      .filter((item) => !excludedEntities.has(item.entity))

    if (includeDomains.size) {
      parsedEntities = parsedEntities.filter((item) => {
        const domain = safeText(item.entity).split(".")[0]
        return includeDomains.has(domain)
      })
    }

    if (excludeDomains.size) {
      parsedEntities = parsedEntities.filter((item) => {
        const domain = safeText(item.entity).split(".")[0]
        return !excludeDomains.has(domain)
      })
    }

    if (this.config.entity_sort === "name") {
      parsedEntities.sort((left, right) => {
        const leftName = getEntityName(
          hass,
          hass.states?.[left.entity],
          left.entity,
          left
        ).toLowerCase()
        const rightName = getEntityName(
          hass,
          hass.states?.[right.entity],
          right.entity,
          right
        ).toLowerCase()
        return leftName.localeCompare(rightName)
      })
    }

    if (this.config.entity_sort === "domain") {
      parsedEntities.sort((left, right) => {
        const leftDomain = left.entity.split(".")[0]
        const rightDomain = right.entity.split(".")[0]
        if (leftDomain === rightDomain) {
          return left.entity.localeCompare(right.entity)
        }
        return leftDomain.localeCompare(rightDomain)
      })
    }

    const maxEntities = Number(this.config.max_entities) || 0
    if (maxEntities > 0) {
      parsedEntities = parsedEntities.slice(0, maxEntities)
    }

    const entitiesDialog = []
    const entitiesToggle = []
    const entitiesSensors = []
    const entitiesAlerts = []
    const sensorCandidates = []

    for (const entityConfig of parsedEntities) {
      const domain = entityConfig.entity.split(".")[0]
      const entityState = hass.states?.[entityConfig.entity]
      const deviceClass = safeText(entityState?.attributes?.device_class).toLowerCase()

      if (autoAreaSource && domain === "camera" && this.config.display_type === "camera") {
        continue
      }

      if (autoAreaSource && domain === "binary_sensor" && alertClasses.has(deviceClass)) {
        if (entityState?.state === "on") {
          entitiesAlerts.push(entityConfig)
        }
        continue
      }

      if (autoAreaSource && domain === "sensor" && sensorClasses.has(deviceClass)) {
        sensorCandidates.push(entityConfig)
        continue
      }

      if (SENSOR_DOMAINS.has(domain) || entityConfig.attribute) {
        entitiesSensors.push(entityConfig)
        continue
      }

      const areaControlConfig = hasAreaControlsFeature
        ? this._getAreaControlConfig(entityConfig, domain, areaControls)
        : null

      if (
        !this.config.force_dialog &&
        ((!hasAreaControlsFeature && TOGGLE_DOMAINS.has(domain)) || areaControlConfig)
      ) {
        entitiesToggle.push(
          areaControlConfig && typeof areaControlConfig === "object"
            ? {
                ...entityConfig,
                ...areaControlConfig,
                entity: areaControlConfig.entity_id || entityConfig.entity,
              }
            : entityConfig
        )
        continue
      }

      entitiesDialog.push(entityConfig)
    }

    this._renderModel = {
      area,
      areaEntityIds,
      entitiesDialog,
      entitiesToggle,
      entitiesSensors,
      entitiesAlerts,
      sensorSummaries: this._buildSensorSummaries(sensorCandidates),
      cameraEntity: this._resolveCameraEntity(areaEntityIds, parsedEntities),
    }
  }

  _hasAreaControlsFeature() {
    return (this.config.features || []).some((feature) => {
      const type = typeof feature === "string" ? feature : feature?.type
      return AREA_CONTROL_FEATURE_TYPES.has(safeText(type))
    })
  }

  _getAreaControls() {
    const feature = (this.config.features || []).find((item) => {
      const type = typeof item === "string" ? item : item?.type
      return AREA_CONTROL_FEATURE_TYPES.has(safeText(type))
    })
    return Array.isArray(feature?.controls) ? feature.controls : []
  }

  _getAreaControlConfig(entityConfig, domain, controls) {
    if (!controls.length) {
      return TOGGLE_DOMAINS.has(domain)
    }

    for (const control of controls) {
      if (typeof control === "string" && control === domain) {
        return true
      }

      if (control?.entity_id === entityConfig.entity) {
        return {
          ...control,
          entity: control.entity_id,
        }
      }
    }

    return false
  }

  _resolveCameraEntity(areaEntityIds, parsedEntities) {
    const configured = safeText(this.config.camera_entity || this.config.camera_image)
    if (configured.startsWith("camera.")) {
      return configured
    }

    const explicitCamera = parsedEntities.find((entityConfig) =>
      safeText(entityConfig.entity).startsWith("camera.")
    )
    if (explicitCamera) {
      return explicitCamera.entity
    }

    return areaEntityIds.find((entityId) => entityId.startsWith("camera.")) || ""
  }

  _buildSensorSummaries(sensorCandidates) {
    const groups = new Map()

    for (const entityConfig of sensorCandidates) {
      const entityState = this._hass?.states?.[entityConfig.entity]
      if (!entityState) {
        continue
      }

      if (UNAVAILABLE_STATES.has(entityState.state)) {
        continue
      }

      const numeric = Number(entityState.state)
      if (!Number.isFinite(numeric)) {
        continue
      }

      const deviceClass = safeText(entityState.attributes?.device_class).toLowerCase()
      const unit = safeText(entityState.attributes?.unit_of_measurement)
      const key = `${deviceClass}|${unit}`
      const group = groups.get(key) || {
        deviceClass,
        unit,
        values: [],
        entities: [],
      }

      group.values.push(numeric)
      group.entities.push(entityConfig)
      groups.set(key, group)
    }

    return [...groups.values()].map((group) => {
      const values = [...group.values].sort((left, right) => left - right)
      const isSum = SUM_SENSOR_CLASSES.has(group.deviceClass)
      const raw = isSum
        ? values.reduce((sum, value) => sum + value, 0)
        : values[Math.floor(values.length / 2)]
      const firstEntity = group.entities[0]
      const registryItem = this._hass?.entities?.[firstEntity.entity]
      const precision = Number.isFinite(registryItem?.display_precision)
        ? registryItem.display_precision
        : Number.isInteger(raw)
          ? 0
          : 1

      return {
        entity: firstEntity.entity,
        icon: this._getSensorClassIcon(group.deviceClass),
        name: this._formatDeviceClassLabel(group.deviceClass),
        source_entities: group.entities.map((entityConfig) => entityConfig.entity),
        display_state: `${formatNumber(this._hass, raw, precision)}${group.unit ? ` ${group.unit}` : ""}`,
      }
    })
  }

  _getSensorClassIcon(deviceClass) {
    return SENSOR_DEVICE_CLASS_ICONS[deviceClass] || "mdi:gauge"
  }

  _formatDeviceClassLabel(deviceClass) {
    const labels = {
      apparent_power: "Puissance apparente",
      battery: "Batterie",
      carbon_dioxide: "CO2",
      carbon_monoxide: "CO",
      current: "Intensite",
      energy: "Energie",
      gas: "Gaz",
      humidity: "Humidite",
      illuminance: "Luminosite",
      monetary: "Cout",
      power: "Puissance",
      pressure: "Pression",
      temperature: "Temperature",
      voltage: "Tension",
      water: "Eau",
    }
    return labels[deviceClass] || safeText(deviceClass).replace(/_/g, " ")
  }

  _getBackgroundImage() {
    const hass = this._hass
    if (!hass) {
      return ""
    }

    if (this.config.display_type === "camera") {
      return this._getCameraImageUrl(this._renderModel.cameraEntity)
    }

    if (this.config.display_type !== "picture") {
      return ""
    }

    const explicitImage = this.config.image
    const areaPicture = this._renderModel.area?.picture
    const selected = explicitImage || areaPicture

    if (!selected) {
      return ""
    }

    try {
      return new URL(selected, hass.auth?.data?.hassUrl || window.location.origin).toString()
    } catch (_error) {
      return selected
    }
  }

  _getCameraImageUrl(entityId) {
    if (!entityId) {
      return ""
    }

    const baseUrl = this._hass?.auth?.data?.hassUrl || window.location.origin
    const cameraState = this._hass?.states?.[entityId]
    const cacheKey = encodeURIComponent(cameraState?.last_updated || cameraState?.last_changed || "")

    try {
      return new URL(`/api/camera_proxy/${entityId}?t=${cacheKey}`, baseUrl).toString()
    } catch (_error) {
      return `/api/camera_proxy/${entityId}?t=${cacheKey}`
    }
  }

  _getAreaIcon() {
    return this.config.icon || this._renderModel.area?.icon || "mdi:home-map-marker"
  }

  _getAspectRatioCss() {
    const value = safeText(this.config.aspect_ratio || "16:9").trim()
    if (!value) {
      return "16 / 9"
    }

    if (/^\d+(\.\d+)?%$/.test(value)) {
      const numeric = Number(value.replace("%", ""))
      return Number.isFinite(numeric) && numeric > 0 ? `100 / ${numeric}` : "16 / 9"
    }

    const ratioMatch = value.match(/^(\d+(?:\.\d+)?)(?:\s*[:x]\s*(\d+(?:\.\d+)?))?$/i)
    if (!ratioMatch) {
      return "16 / 9"
    }

    const width = Number(ratioMatch[1])
    const height = Number(ratioMatch[2] || 1)
    return width > 0 && height > 0 ? `${width} / ${height}` : "16 / 9"
  }

  _getDarkenFilter() {
    const value = this.config.darken_image
    if (typeof value === "number") {
      const brightness = Math.max(0.2, Math.min(1, 1 - value))
      return `brightness(${brightness})`
    }
    return value ? "brightness(0.62)" : "brightness(0.96)"
  }

  _onCardClick() {
    if (this._cardClickTimer) {
      clearTimeout(this._cardClickTimer)
    }

    this._cardClickTimer = window.setTimeout(() => {
      this._runCardAction("tap_action")
      this._cardClickTimer = null
    }, 220)
  }

  _onCardDoubleClick(event) {
    event.preventDefault()
    if (this._cardClickTimer) {
      clearTimeout(this._cardClickTimer)
      this._cardClickTimer = null
    }
    this._runCardAction("double_tap_action")
  }

  _onCardContextMenu(event) {
    event.preventDefault()
    if (this._cardClickTimer) {
      clearTimeout(this._cardClickTimer)
      this._cardClickTimer = null
    }
    this._runCardAction("hold_action")
  }

  _runCardAction(actionKey) {
    if (!this._hass || !this.config) {
      return
    }

    const fallbackAction = actionKey === "tap_action" ? "more-info" : "none"
    const actionConfig = normalizeActionConfig(this.config[actionKey], fallbackAction)
    performAction(this, this._hass, this.config, actionConfig)
  }

  _onEntityClick(event) {
    event.stopPropagation()

    if (!this._hass) {
      return
    }

    const entityId = event.currentTarget?.dataset?.entityId
    if (!entityId) {
      return
    }

    const config = this._findEntityConfig(entityId)
    if (!config) {
      return
    }

    const timer = this._entityClickTimers.get(entityId)
    if (timer) {
      clearTimeout(timer)
    }

    const nextTimer = window.setTimeout(() => {
      this._runEntityAction(config, "tap_action")
      this._entityClickTimers.delete(entityId)
    }, 220)

    this._entityClickTimers.set(entityId, nextTimer)
  }

  _onEntityDoubleClick(event) {
    event.stopPropagation()
    event.preventDefault()

    const entityId = event.currentTarget?.dataset?.entityId
    if (!entityId) {
      return
    }

    const timer = this._entityClickTimers.get(entityId)
    if (timer) {
      clearTimeout(timer)
      this._entityClickTimers.delete(entityId)
    }

    const config = this._findEntityConfig(entityId)
    if (!config) {
      return
    }

    this._runEntityAction(config, "double_tap_action")
  }

  _onEntityContextMenu(event) {
    event.stopPropagation()
    event.preventDefault()

    const entityId = event.currentTarget?.dataset?.entityId
    if (!entityId) {
      return
    }

    const timer = this._entityClickTimers.get(entityId)
    if (timer) {
      clearTimeout(timer)
      this._entityClickTimers.delete(entityId)
    }

    const config = this._findEntityConfig(entityId)
    if (!config) {
      return
    }

    this._runEntityAction(config, "hold_action")
  }

  _findEntityConfig(entityId) {
    const list = [
      ...this._renderModel.entitiesDialog,
      ...this._renderModel.entitiesToggle,
      ...this._renderModel.entitiesSensors,
      ...this._renderModel.entitiesAlerts,
      ...this._renderModel.sensorSummaries,
    ]
    return list.find((item) => item.entity === entityId)
  }

  _defaultEntityAction(entityConfig, actionKey) {
    const entityId = entityConfig?.entity || ""
    const domain = entityId.split(".")[0]

    if (actionKey === "tap_action") {
      return this._renderModel.entitiesToggle.includes(entityConfig) && TOGGLE_DOMAINS.has(domain)
        ? { action: "toggle" }
        : { action: "more-info" }
    }

    if (actionKey === "hold_action") {
      return this.config.entity_hold_action || { action: "more-info" }
    }

    if (actionKey === "double_tap_action") {
      return this.config.entity_double_tap_action || { action: "none" }
    }

    return { action: "none" }
  }

  _runEntityAction(entityConfig, actionKey) {
    if (!this._hass || !entityConfig) {
      return
    }

    const defaultAction = this._defaultEntityAction(entityConfig, actionKey)
    const selectedAction = entityConfig[actionKey] || defaultAction
    const fallbackAction = actionKey === "tap_action" ? "more-info" : "none"
    const normalized = normalizeActionConfig(selectedAction, fallbackAction)

    performAction(this, this._hass, entityConfig, normalized)
  }

  _getEntityPresentation(entityConfig, asSensorLine = false) {
    const defaults = this.config.entity_defaults || DEFAULT_CONFIG.entity_defaults
    const styles = this.config.styles || STYLE_DEFAULTS
    const displayMode = normalizeEntityDisplayMode(
      entityConfig.display_mode || entityConfig.display || defaults.display_mode,
      asSensorLine ? "button" : "button"
    )

    const showName =
      typeof entityConfig.show_name === "boolean"
        ? entityConfig.show_name
        : typeof defaults.show_name === "boolean"
          ? defaults.show_name
          : asSensorLine

    const showState =
      typeof entityConfig.show_state === "boolean"
        ? entityConfig.show_state
        : typeof defaults.show_state === "boolean"
          ? defaults.show_state
          : asSensorLine

    return {
      displayMode,
      showName: asSensorLine || showName,
      showState: asSensorLine || showState,
      text: entityConfig.text || defaults.text || "",
      icon: entityConfig.icon || defaults.icon || "",
      iconOn: entityConfig.icon_on || defaults.icon_on || "",
      iconOff: entityConfig.icon_off || defaults.icon_off || "",
      iconColorOn:
        entityConfig.icon_color_on || defaults.icon_color_on || styles.button_icon_color_on,
      iconColorOff:
        entityConfig.icon_color_off || defaults.icon_color_off || styles.button_icon_color_off,
      textColorOn:
        entityConfig.text_color_on ||
        defaults.text_color_on ||
        entityConfig.icon_color_on ||
        defaults.icon_color_on ||
        styles.button_icon_color_on,
      textColorOff:
        entityConfig.text_color_off ||
        defaults.text_color_off ||
        entityConfig.icon_color_off ||
        defaults.icon_color_off ||
        styles.button_icon_color_off,
      backgroundColorOn:
        entityConfig.background_color_on ||
        entityConfig.button_color_on ||
        defaults.background_color_on,
      backgroundColorOff:
        entityConfig.background_color_off ||
        entityConfig.button_color_off ||
        defaults.background_color_off,
    }
  }

  _getEntityButtonStyle(presentation) {
    const vars = {
      "--mac-entity-icon-color-on": resolveColorToken(presentation.iconColorOn),
      "--mac-entity-icon-color-off": resolveColorToken(presentation.iconColorOff),
      "--mac-entity-text-color-on": resolveColorToken(presentation.textColorOn),
      "--mac-entity-text-color-off": resolveColorToken(presentation.textColorOff),
      "--mac-entity-background-on": resolveColorToken(presentation.backgroundColorOn),
      "--mac-entity-background-off": resolveColorToken(presentation.backgroundColorOff),
    }

    return Object.entries(vars)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([name, value]) => `${name}: ${value};`)
      .join(" ")
  }

  _getEntityPosition(entityConfig, fallbackPosition) {
    const defaultPosition = this.config.entity_defaults?.position
    return normalizeEntityPosition(entityConfig.position || defaultPosition, fallbackPosition)
  }

  _makePositionBuckets() {
    return ENTITY_POSITIONS.reduce((buckets, position) => {
      buckets[position] = []
      return buckets
    }, {})
  }

  _renderPositionZone(buckets, position) {
    return `<div class=\"entity-zone zone-${position}\">${buckets[position].join("")}</div>`
  }

  _renderEntityButton(entityConfig, asSensorLine = false) {
    const hass = this._hass
    const entityState = hass?.states?.[entityConfig.entity]

    if (!entityState && this.config.hide_unavailable) {
      return ""
    }

    if (entityState && UNAVAILABLE_STATES.has(entityState.state) && this.config.hide_unavailable) {
      return ""
    }

    const presentation = this._getEntityPresentation(entityConfig, asSensorLine)
    const isOn = isEntityActive(entityState)
    const iconConfig = {
      ...entityConfig,
      icon:
        (isOn ? presentation.iconOn : presentation.iconOff) ||
        presentation.icon ||
        entityConfig.icon,
    }
    const icon = getEntityIcon(hass, entityState, iconConfig)
    const name = getEntityName(hass, entityState, entityConfig.entity, entityConfig)
    const displayState = getDisplayState(
      hass,
      entityState,
      hass?.entities?.[entityConfig.entity],
      entityConfig
    )
    const title = displayState ? `${name}: ${displayState}` : name
    const labelText = presentation.text || (presentation.showName || displayMode === "text" ? name : "")
    const displayMode = presentation.displayMode
    const buttonStyle = this._getEntityButtonStyle(presentation)

    const stateColorAttr = shouldUseStateColor(entityConfig, this.config)
      ? ' data-state-color="1"'
      : ""
    const sensorHtml = presentation.showState && displayState
      ? `<span class=\"sensor-value\">${escapeHtml(displayState)}</span>`
      : ""

    const badgeHtml = entityConfig.entity.startsWith("light.")
      ? this._renderLightBadge(entityConfig.entity)
      : ""

    return `
      <button class=\"entity entity--${displayMode} ${asSensorLine ? "sensor" : "action"} ${entityConfig.alert ? "alert" : ""} ${isOn ? "is-on" : ""}\" data-entity-id=\"${escapeAttribute(entityConfig.entity)}\" title=\"${escapeAttribute(title)}\" style=\"${escapeAttribute(buttonStyle)}\"${stateColorAttr}>
        <ha-icon icon=\"${escapeAttribute(icon)}\" class=\"entity-icon\"></ha-icon>
        ${labelText ? `<span class=\"entity-label\">${escapeHtml(labelText)}</span>` : ""}
        ${sensorHtml}
        ${badgeHtml}
      </button>
    `
  }

  _renderLightBadge(entityId) {
    const state = this._hass?.states?.[entityId]
    const members = state?.attributes?.entity_id
    if (!Array.isArray(members) || members.length === 0) {
      return ""
    }

    const activeCount = members.reduce((count, memberId) => {
      return this._hass?.states?.[memberId]?.state === "on" ? count + 1 : count
    }, 0)

    if (!activeCount) {
      return ""
    }

    return `<span class=\"entity-badge\">${escapeHtml(activeCount)}</span>`
  }

  _computeCardCssVariables() {
    const styles = this.config.styles || {}
    const vars = {
      "--mac-accent-color": resolveColorToken(this.config.color, styles.button_icon_color_on),
      "--mac-button-icon-color-on": styles.button_icon_color_on,
      "--mac-button-icon-color-off": styles.button_icon_color_off,
      "--mac-badge-text-color": styles.badge_text_color,
      "--mac-button-light-color-on": styles.button_light_color_on,
      "--mac-badge-background": styles.badge_background,
      "--mac-title-color": styles.title_color,
      "--mac-title-font-weight": styles.title_font_weight,
      "--mac-title-text-transform": styles.title_text_transform,
      "--mac-title-text-shadow": styles.title_text_shadow,
      "--mac-image-blur": styles.image_blur,
    }

    return Object.entries(vars)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([name, value]) => `${name}: ${value};`)
      .join(" ")
  }

  _render() {
    if (!this.shadowRoot || !this._hass || !this.config) {
      return
    }

    const displayType = this.config.display_type || "picture"
    const compact = displayType === "compact"
    const areaName = this._renderModel.area?.name || this.config.area || ""
    const title = this.config.title || areaName || "Selectionner une zone"
    const backgroundImage = this._getBackgroundImage()
    const areaIcon = this._getAreaIcon()
    const aspectRatio = this._getAspectRatioCss()
    const configuredHeight = normalizeCssSize(this.config.height)
    const cardHeight = configuredHeight || (compact ? "112px" : "180px")
    const fixedHeight = Boolean(configuredHeight)
    const darkenFilter = this._getDarkenFilter()
    const styles = this.config.styles || {}
    const entityBuckets = this._makePositionBuckets()
    const addEntity = (entity, asSensorLine, fallbackPosition) => {
      const position = this._getEntityPosition(entity, fallbackPosition)
      const rendered = this._renderEntityButton(entity, asSensorLine)
      if (rendered) {
        entityBuckets[position].push(rendered)
      }
    }

    this._renderModel.sensorSummaries.forEach((entity) => addEntity(entity, true, "top-left"))
    this._renderModel.entitiesSensors.forEach((entity) => addEntity(entity, true, "top-left"))
    this._renderModel.entitiesAlerts.forEach((entity) =>
      addEntity({ ...entity, alert: true }, false, "title-right")
    )

    this._renderModel.entitiesDialog
      .filter((entity) => entity.entity.startsWith("media_player."))
      .forEach((entity) => addEntity(entity, false, "bottom-left"))

    this._renderModel.entitiesDialog
      .filter((entity) => !entity.entity.startsWith("media_player."))
      .forEach((entity) => addEntity(entity, false, "bottom-right"))

    this._renderModel.entitiesToggle.forEach((entity, index) => {
      const fallbackPosition =
        this.config.features_position === "inline" && index === 0 ? "title-right" : "bottom-right"
      addEntity(entity, false, fallbackPosition)
    })

    const topZones = ["top-left", "top-center", "top-right"]
    const bottomZones = ["bottom-left", "bottom-center", "bottom-right"]
    const hasTopZones = topZones.some((position) => entityBuckets[position].length)
    const hasBottomZones = bottomZones.some((position) => entityBuckets[position].length)
    const hasTitleRight = entityBuckets["title-right"].length > 0
    const entitySnapshot = ENTITY_POSITIONS.map(
      (position) => `${position}:${entityBuckets[position].join("")}`
    ).join("|")

    const stateSnapshot = JSON.stringify({
      title,
      displayType,
      backgroundImage,
      areaIcon,
      aspectRatio,
      cardHeight,
      fixedHeight,
      darkenFilter,
      entitySnapshot,
      vars: this._computeCardCssVariables(),
      stateColor: Boolean(this.config.state_color),
      shadow: Boolean(this.config.shadow),
      hasTopZones,
      hasBottomZones,
      hasTitleRight,
      styles,
    })

    if (stateSnapshot === this._lastStateSnapshot) {
      return
    }
    this._lastStateSnapshot = stateSnapshot

    const cardStyle = this._computeCardCssVariables()
    const titleStyle = `
      ${styles.title_font_weight ? `font-weight:${styles.title_font_weight};` : ""}
      ${styles.title_text_transform ? `text-transform:${styles.title_text_transform};` : ""}
      ${styles.title_text_shadow ? `text-shadow:${styles.title_text_shadow};` : ""}
    `

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --mac-accent-color: ${STYLE_DEFAULTS.button_icon_color_on};
          --mac-button-icon-color-on: ${STYLE_DEFAULTS.button_icon_color_on};
          --mac-button-icon-color-off: ${STYLE_DEFAULTS.button_icon_color_off};
          --mac-badge-text-color: ${STYLE_DEFAULTS.badge_text_color};
          --mac-button-light-color-on: ${STYLE_DEFAULTS.button_light_color_on};
          --mac-badge-background: ${STYLE_DEFAULTS.badge_background};
          --mac-title-color: ${STYLE_DEFAULTS.title_color};
          --mac-title-font-weight: ${STYLE_DEFAULTS.title_font_weight};
          --mac-title-text-transform: ${STYLE_DEFAULTS.title_text_transform};
          --mac-title-text-shadow: ${STYLE_DEFAULTS.title_text_shadow};
          --mac-image-blur: ${STYLE_DEFAULTS.image_blur};
          --mac-card-height: ${cardHeight};
          --mac-aspect-ratio: ${aspectRatio};
          width: 100%;
          min-width: 0;
        }

        ha-card {
          position: relative;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
          border-radius: var(--ha-card-border-radius, 16px);
          background: var(--card-background-color, #1f2937);
          color: var(--primary-text-color, #f8fafc);
          min-height: var(--mac-card-height);
          max-height: ${fixedHeight ? "var(--mac-card-height)" : "none"};
          aspect-ratio: ${compact || fixedHeight ? "auto" : "var(--mac-aspect-ratio)"};
          height: ${fixedHeight ? "var(--mac-card-height)" : "auto"};
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease;
          border: 1px solid color-mix(in srgb, var(--divider-color, rgba(148, 163, 184, 0.28)) 70%, transparent);
          ${cardStyle}
        }

        ha-card.is-compact:not(.has-fixed-height) {
          min-height: 104px;
        }

        ha-card:focus-within {
          outline: 2px solid color-mix(in srgb, var(--mac-accent-color) 72%, transparent);
          outline-offset: 2px;
        }

        ha-card:active {
          transform: scale(0.996);
        }

        .bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: blur(var(--mac-image-blur)) ${darkenFilter};
          transform: scale(1.04);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.08) 0%, rgba(15, 23, 42, 0.58) 82%);
        }

        .content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-rows: auto auto minmax(0, 1fr) auto;
          gap: 6px;
          padding: 12px 14px;
          height: 100%;
          min-height: 0;
          overflow: hidden;
          box-sizing: border-box;
        }

        .topline {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: start;
          gap: 10px;
        }

        .title {
          font-size: 1.3rem;
          letter-spacing: 0;
          font-weight: var(--mac-title-font-weight);
          color: var(--mac-title-color);
          text-transform: var(--mac-title-text-transform);
          text-shadow: var(--mac-title-text-shadow);
          margin: 0;
          min-width: 0;
          overflow-wrap: anywhere;
          ${titleStyle}
        }

        .inline-meta {
          display: ${hasTitleRight ? "flex" : "none"};
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
          flex-wrap: wrap;
        }

        .entity-zones {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          gap: 8px;
          min-width: 0;
          min-height: 0;
          align-items: start;
        }

        .entity-zones.is-empty {
          display: none;
        }

        .bottom-zones {
          align-items: end;
        }

        .content-spacer {
          min-height: 0;
        }

        .entity-zone {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          min-width: 0;
          min-height: 0;
        }

        .zone-top-left,
        .zone-bottom-left {
          justify-content: flex-start;
        }

        .zone-top-center,
        .zone-bottom-center {
          justify-content: center;
        }

        .zone-top-right,
        .zone-bottom-right,
        .zone-title-right {
          justify-content: flex-end;
        }

        .area-icon {
          position: absolute;
          right: 12px;
          bottom: 8px;
          z-index: 0;
          color: var(--mac-accent-color);
          opacity: ${backgroundImage ? "0.16" : "0.24"};
          --mdc-icon-size: ${compact ? "56px" : "86px"};
          pointer-events: none;
        }

        ha-card.has-background .area-icon {
          color: var(--primary-text-color, #f8fafc);
        }

        .entity {
          position: relative;
          border: 0;
          border-radius: 999px;
          background: var(--mac-entity-background-off, rgba(17, 24, 39, 0.32));
          color: var(--mac-entity-text-color-off, var(--mac-button-icon-color-off));
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
          max-width: 100%;
          cursor: pointer;
          padding: 6px 8px;
          transition: background 150ms ease, transform 150ms ease, color 150ms ease;
        }

        .entity:hover {
          background: var(--mac-entity-background-hover, rgba(17, 24, 39, 0.48));
        }

        .entity:focus-visible {
          outline: 2px solid var(--mac-accent-color);
          outline-offset: 2px;
        }

        .entity:active {
          transform: scale(0.97);
        }

        .entity.is-on {
          color: var(--mac-entity-text-color-on, var(--mac-button-icon-color-on));
          background: var(--mac-entity-background-on, rgba(17, 24, 39, 0.38));
        }

        .entity.is-on[data-state-color="1"] {
          color: var(--state-light-color, var(--mac-button-icon-color-on));
        }

        .entity.is-on[data-state-color="1"] .entity-icon {
          color: var(--state-light-color, var(--mac-button-icon-color-on));
        }

        .entity.sensor {
          border-radius: 12px;
          background: var(--mac-entity-background-off, rgba(2, 6, 23, 0.2));
          padding: 3px 8px;
        }

        .entity.alert {
          color: var(--warning-color, #f59e0b);
          background: rgba(245, 158, 11, 0.18);
        }

        .entity-label {
          font-size: 0.74rem;
          opacity: 0.86;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .sensor-value {
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .entity-icon {
          width: 22px;
          height: 22px;
          --mdc-icon-size: 22px;
          color: var(--mac-entity-icon-color-off, currentColor);
          ${this.config.shadow ? "filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4));" : ""}
        }

        .entity.is-on .entity-icon {
          color: var(--mac-entity-icon-color-on, currentColor);
        }

        .entity--text {
          border-radius: 6px;
          background: transparent;
          padding: 2px 0;
        }

        .entity--text:hover,
        .entity--text.is-on {
          background: transparent;
        }

        .entity--text .entity-icon {
          display: none;
        }

        .entity--icon {
          width: 34px;
          height: 34px;
          justify-content: center;
          padding: 6px;
        }

        .entity--icon .entity-label,
        .entity--icon .sensor-value {
          display: none;
        }

        .entity-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          min-width: 16px;
          height: 16px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          padding: 0 4px;
          background: var(--mac-badge-background);
          color: var(--mac-badge-text-color);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.36);
        }

        @media (max-width: 600px) {
          .title {
            font-size: 1.08rem;
          }

          .entity {
            padding: 5px 7px;
          }

          .entity-icon {
            width: 20px;
            height: 20px;
            --mdc-icon-size: 20px;
          }

          .sensor-value {
            font-size: 0.75rem;
          }
        }
      </style>

      <ha-card class=\"display-${displayType} ${compact ? "is-compact" : ""} ${fixedHeight ? "has-fixed-height" : ""} ${backgroundImage ? "has-background" : "no-background"}\">
        ${backgroundImage ? `<div class=\"bg\"><img src=\"${escapeAttribute(backgroundImage)}\" alt=\"${escapeAttribute(title)}\"></div><div class=\"overlay\"></div>` : ""}
        <ha-icon class=\"area-icon\" icon=\"${escapeAttribute(areaIcon)}\"></ha-icon>
        <div class=\"content\">
          <div class=\"topline\">
            <h3 class=\"title\">${escapeHtml(title)}</h3>
            <div class=\"inline-meta\">${this._renderPositionZone(entityBuckets, "title-right")}</div>
          </div>
          <div class=\"entity-zones top-zones ${hasTopZones ? "" : "is-empty"}\">
            ${this._renderPositionZone(entityBuckets, "top-left")}
            ${this._renderPositionZone(entityBuckets, "top-center")}
            ${this._renderPositionZone(entityBuckets, "top-right")}
          </div>
          <div class=\"content-spacer\"></div>
          <div class=\"entity-zones bottom-zones ${hasBottomZones ? "" : "is-empty"}\">
            ${this._renderPositionZone(entityBuckets, "bottom-left")}
            ${this._renderPositionZone(entityBuckets, "bottom-center")}
            ${this._renderPositionZone(entityBuckets, "bottom-right")}
          </div>
        </div>
      </ha-card>
    `

    const cardNode = this.shadowRoot.querySelector("ha-card")
    if (cardNode) {
      cardNode.removeEventListener("click", this._boundOnCardClick)
      cardNode.removeEventListener("dblclick", this._boundOnCardDoubleClick)
      cardNode.removeEventListener("contextmenu", this._boundOnCardContextMenu)
      cardNode.addEventListener("click", this._boundOnCardClick)
      cardNode.addEventListener("dblclick", this._boundOnCardDoubleClick)
      cardNode.addEventListener("contextmenu", this._boundOnCardContextMenu)
    }

    this.shadowRoot.querySelectorAll("button.entity").forEach((button) => {
      button.removeEventListener("click", this._boundOnEntityClick)
      button.removeEventListener("dblclick", this._boundOnEntityDoubleClick)
      button.removeEventListener("contextmenu", this._boundOnEntityContextMenu)
      button.addEventListener("click", this._boundOnEntityClick)
      button.addEventListener("dblclick", this._boundOnEntityDoubleClick)
      button.addEventListener("contextmenu", this._boundOnEntityContextMenu)
    })
  }
}

class AlphaAreaCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _jsonErrors: { type: Object },
      _activeEntityTab: { type: String },
      _activeEntityIndex: { type: Number },
    }
  }

  setConfig(config) {
    const incoming = config || {}
    this.config = {
      ...deepClone(DEFAULT_CONFIG),
      ...incoming,
      styles: {
        ...DEFAULT_CONFIG.styles,
        ...(incoming.styles || {}),
      },
      tap_action: {
        ...DEFAULT_CONFIG.tap_action,
        ...(incoming.tap_action || {}),
      },
      hold_action: {
        ...DEFAULT_CONFIG.hold_action,
        ...(incoming.hold_action || {}),
      },
      double_tap_action: {
        ...DEFAULT_CONFIG.double_tap_action,
        ...(incoming.double_tap_action || {}),
      },
      entity_hold_action: {
        ...DEFAULT_CONFIG.entity_hold_action,
        ...(incoming.entity_hold_action || {}),
      },
      entity_double_tap_action: {
        ...DEFAULT_CONFIG.entity_double_tap_action,
        ...(incoming.entity_double_tap_action || {}),
      },
      entity_defaults: {
        ...DEFAULT_CONFIG.entity_defaults,
        ...(incoming.entity_defaults || {}),
      },
    }
    this.config.display_type = normalizeSelect(this.config.display_type, DISPLAY_TYPES, "picture")
    this.config.features_position = normalizeSelect(
      this.config.features_position,
      FEATURE_POSITIONS,
      "bottom"
    )
    this.config.height = normalizeCssSize(this.config.height)
    this.config.entity_defaults.position = normalizeEntityPosition(
      this.config.entity_defaults.position,
      ""
    )
    this.config.entity_defaults.display_mode = normalizeEntityDisplayMode(
      this.config.entity_defaults.display_mode,
      "button"
    )
    this._activeEntityTab = this._activeEntityTab || "list"
    this._activeEntityIndex = Number.isInteger(this._activeEntityIndex)
      ? this._activeEntityIndex
      : 0
    this._jsonErrors = {}
  }

  _emit(config) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._pruneConfig(config) },
        bubbles: true,
        composed: true,
      })
    )
  }

  _pruneConfig(config) {
    const cleaned = {}

    for (const [key, value] of Object.entries(config || {})) {
      if (key === "styles") {
        const styles = this._pruneObject(value, DEFAULT_CONFIG.styles)
        if (Object.keys(styles).length) {
          cleaned.styles = styles
        }
        continue
      }

      if (key === "entity_defaults") {
        const entityDefaults = this._pruneObject(value, DEFAULT_CONFIG.entity_defaults)
        if (Object.keys(entityDefaults).length) {
          cleaned.entity_defaults = entityDefaults
        }
        continue
      }

      if (this._isDefaultValue(value, DEFAULT_CONFIG[key])) {
        continue
      }

      if (value === "" || value === undefined || value === null) {
        continue
      }

      cleaned[key] = value
    }

    return cleaned
  }

  _pruneObject(value, defaults = {}) {
    const cleaned = {}
    for (const [key, item] of Object.entries(value || {})) {
      if (!this._isDefaultValue(item, defaults[key]) && item !== "" && item !== undefined) {
        cleaned[key] = item
      }
    }
    return cleaned
  }

  _isDefaultValue(value, defaultValue) {
    return JSON.stringify(value) === JSON.stringify(defaultValue)
  }

  _setValue(path, value) {
    const updated = structuredClone(this.config)
    const parts = path.split(".")
    let node = updated

    for (let index = 0; index < parts.length - 1; index += 1) {
      const key = parts[index]
      if (!node[key] || typeof node[key] !== "object") node[key] = {}
      node = node[key]
    }

    node[parts[parts.length - 1]] = value
    this.config = updated
    this._emit(updated)
  }

  _removeValue(path) {
    const updated = structuredClone(this.config)
    const parts = path.split(".")
    let node = updated

    for (let index = 0; index < parts.length - 1; index += 1) {
      node = node[parts[index]]
      if (!node) return
    }

    delete node[parts[parts.length - 1]]
    this.config = updated
    this._emit(updated)
  }

  _onInput(path, event) {
    const value = event.target.value
    if (value === "") {
      this._removeValue(path)
      return
    }
    this._setValue(path, value)
  }

  _onBoolean(path, event) {
    this._setValue(path, event.target.checked)
  }

  _onNumber(path, event, min = null) {
    const text = safeText(event.target.value).trim()
    if (!text) {
      this._removeValue(path)
      return
    }

    const raw = Number(text)
    if (Number.isNaN(raw)) {
      this._removeValue(path)
      return
    }

    const value = typeof min === "number" ? Math.max(min, raw) : raw
    this._setValue(path, value)
  }

  _onCssSize(path, event) {
    const raw = safeText(event.target.value).trim()
    if (!raw) {
      this._removeValue(path)
      return
    }

    const normalized = normalizeCssSize(raw)
    if (normalized) {
      this._setValue(path, normalized)
    }
  }

  _onDomains(path, event) {
    const value = safeText(event.target.value).trim()
    if (!value) {
      this._removeValue(path)
      return
    }
    this._setValue(path, parseDomainsText(value))
  }

  _onStringList(path, event, lowerCase = false) {
    const value = safeText(event.target.value).trim()
    if (!value) {
      this._removeValue(path)
      return
    }

    const list = parseStringList(value).map((item) => (lowerCase ? item.toLowerCase() : item))
    this._setValue(path, list)
  }

  _domainsToText(value) {
    return Array.isArray(value) ? value.join(", ") : ""
  }

  _hasAreaControlsFeature() {
    return (this.config.features || []).some((feature) => {
      const type = typeof feature === "string" ? feature : feature?.type
      return AREA_CONTROL_FEATURE_TYPES.has(safeText(type))
    })
  }

  _toggleAreaControlsFeature(enabled) {
    const existing = Array.isArray(this.config.features) ? this.config.features : []
    const features = existing.filter((feature) => {
      const type = typeof feature === "string" ? feature : feature?.type
      return !AREA_CONTROL_FEATURE_TYPES.has(safeText(type))
    })

    if (enabled) {
      features.unshift({ type: "area-controls" })
    }

    if (features.length) {
      this._setValue("features", features)
      return
    }

    this._removeValue("features")
  }

  _readPath(path) {
    const parts = path.split(".")
    let node = this.config
    for (const part of parts) {
      node = node?.[part]
    }
    return node
  }

  _updateActionType(path, action) {
    const current = this._readPath(path) || {}
    this._setValue(path, {
      ...current,
      action,
    })
  }

  _updateActionJson(path, key, event) {
    const raw = safeText(event.target.value).trim()
    if (!raw) {
      const current = { ...(this._readPath(path) || {}) }
      delete current[key]
      this._setValue(path, current)
      this._jsonErrors = { ...this._jsonErrors, [`${path}.${key}`]: "" }
      return
    }

    try {
      const parsed = JSON.parse(raw)
      const current = { ...(this._readPath(path) || {}) }
      current[key] = parsed
      this._setValue(path, current)
      this._jsonErrors = { ...this._jsonErrors, [`${path}.${key}`]: "" }
    } catch (_error) {
      this._jsonErrors = {
        ...this._jsonErrors,
        [`${path}.${key}`]: "JSON invalide. Utiliser un objet JSON valide.",
      }
    }
  }

  _renderActionEditor(path, label) {
    const actionConfig = normalizeActionConfig(
      this._readPath(path),
      path === "tap_action" ? "more-info" : "none"
    )
    const actionType = actionConfig.action || "none"
    const dataError = this._jsonErrors?.[`${path}.service_data`] || ""
    const targetError = this._jsonErrors?.[`${path}.target`] || ""

    return html`
      <div class="action-block">
        <label>${label}</label>
        <select
          .value="${actionType}"
          @change="${(event) => this._updateActionType(path, event.target.value)}"
        >
          ${ACTION_OPTIONS.map((option) => html`<option value="${option}">${option}</option>`)}
        </select>

        ${actionType === "navigate"
          ? html`
              <label>Chemin de navigation</label>
              <input
                .value="${actionConfig.navigation_path || ""}"
                placeholder="/lovelace/cuisine"
                @input="${(event) => this._onInput(`${path}.navigation_path`, event)}"
              />
            `
          : ""}
        ${actionType === "url"
          ? html`
              <label>URL</label>
              <input
                .value="${actionConfig.url_path || ""}"
                placeholder="https://example.com"
                @input="${(event) => this._onInput(`${path}.url_path`, event)}"
              />
            `
          : ""}
        ${actionType === "call-service"
          ? html`
              <label>Service</label>
              <input
                .value="${actionConfig.service || ""}"
                placeholder="light.turn_on"
                @input="${(event) => this._onInput(`${path}.service`, event)}"
              />

              <label>Service data (JSON objet)</label>
              <textarea
                .value="${actionConfig.service_data
                  ? JSON.stringify(actionConfig.service_data, null, 2)
                  : ""}"
                placeholder='{"brightness_pct": 80}'
                @change="${(event) => this._updateActionJson(path, "service_data", event)}"
              ></textarea>
              ${dataError ? html`<div class="error-text">${dataError}</div>` : ""}

              <label>Target (JSON objet)</label>
              <textarea
                .value="${actionConfig.target ? JSON.stringify(actionConfig.target, null, 2) : ""}"
                placeholder='{"entity_id": "light.cuisine"}'
                @change="${(event) => this._updateActionJson(path, "target", event)}"
              ></textarea>
              ${targetError ? html`<div class="error-text">${targetError}</div>` : ""}
            `
          : ""}
      </div>
    `
  }

  _toHexColor(value, fallback = "#c7a975") {
    if (!value || typeof value !== "string") return fallback
    const normalized = value.trim()
    if (/^#([0-9a-fA-F]{6})$/.test(normalized)) return normalized
    if (/^#([0-9a-fA-F]{3})$/.test(normalized)) {
      const [r, g, b] = normalized.slice(1).split("")
      return `#${r}${r}${g}${g}${b}${b}`
    }
    return fallback
  }

  _renderColorField(label, path, fallback) {
    const parts = path.split(".")
    let node = this.config
    for (const part of parts.slice(0, -1)) {
      node = node?.[part]
    }
    const value = node?.[parts[parts.length - 1]] || ""
    const hexValue = this._toHexColor(value, fallback)

    return html`
      <div class="color-field">
        <label>${label}</label>
        <div class="color-row">
          <input
            class="color-input"
            type="color"
            .value="${hexValue}"
            @input="${(event) => this._setValue(path, event.target.value)}"
          />
          <input
            .value="${value}"
            @input="${(event) => this._onInput(path, event)}"
            placeholder="${fallback}"
          />
        </div>
      </div>
    `
  }

  _addEntity() {
    const entities = this.config.entities || []
    this._activeEntityIndex = entities.length
    this._activeEntityTab = "entity"
    this._setValue("entities", [...entities, ""])
  }

  _removeEntity(index) {
    const entities = this.config.entities || []
    const updated = entities.filter((_, i) => i !== index)
    this._activeEntityIndex = Math.max(0, Math.min(this._activeEntityIndex || 0, updated.length - 1))
    this._setValue("entities", updated)
  }

  _setEntity(index, value) {
    const entities = this.config.entities || []
    const updated = [...entities]
    const current = updated[index]

    if (current && typeof current === "object") {
      updated[index] = {
        ...current,
        entity: value,
      }
    } else {
      updated[index] = value
    }
    this._setValue("entities", updated)
  }

  _moveEntity(index, direction) {
    const entities = [...(this.config.entities || [])]
    const target = direction === "up" ? index - 1 : index + 1
    if (target < 0 || target >= entities.length) {
      return
    }

    const current = entities[index]
    entities[index] = entities[target]
    entities[target] = current
    this._setValue("entities", entities)
  }

  _selectEntity(index) {
    this._activeEntityIndex = index
    this._activeEntityTab = "entity"
    this.requestUpdate()
  }

  _setEntityTab(tab) {
    this._activeEntityTab = tab
    this.requestUpdate()
  }

  _cleanEntityItem(item) {
    if (!item || typeof item !== "object") {
      return item
    }

    const cleaned = { ...item }
    for (const [key, value] of Object.entries(cleaned)) {
      if (key === "entity") {
        continue
      }
      if (value === "" || value === undefined || value === null) {
        delete cleaned[key]
      }
    }

    return Object.keys(cleaned).length === 1 && cleaned.entity ? cleaned.entity : cleaned
  }

  _updateEntityItem(index, updater) {
    const entities = [...(this.config.entities || [])]
    const current = entities[index]
    if (current === undefined) {
      return
    }

    const entityConfig =
      current && typeof current === "object" ? { ...current } : { entity: safeText(current) }

    updater(entityConfig)
    entities[index] = this._cleanEntityItem(entityConfig)
    this._setValue("entities", entities)
  }

  _setEntityOption(index, key, value) {
    this._updateEntityItem(index, (entityConfig) => {
      if (value === "" || value === undefined || value === null) {
        delete entityConfig[key]
      } else {
        entityConfig[key] = value
      }
    })
  }

  _onEntityInput(index, key, event) {
    this._setEntityOption(index, key, safeText(event.target.value).trim())
  }

  _onEntityBoolean(index, key, event) {
    this._setEntityOption(index, key, event.target.checked)
  }

  _renderPositionSelect(value, onChange, includeAuto = true) {
    const labels = {
      "bottom-left": "Bas gauche",
      "bottom-center": "Bas centre",
      "bottom-right": "Bas droite",
      "top-left": "Haut gauche",
      "top-center": "Haut centre",
      "top-right": "Haut droite",
      "title-right": "Titre droite",
    }

    return html`
      <select .value="${value || ""}" @change="${onChange}">
        ${includeAuto ? html`<option value="">Automatique</option>` : ""}
        ${ENTITY_POSITIONS.map(
          (position) => html`<option value="${position}">${labels[position]}</option>`
        )}
      </select>
    `
  }

  _renderDisplayModeSelect(value, onChange, includeDefault = true) {
    const labels = {
      button: "Bouton",
      text: "Texte",
      icon: "Icône seule",
    }

    return html`
      <select .value="${value || ""}" @change="${onChange}">
        ${includeDefault ? html`<option value="">Défaut</option>` : ""}
        ${ENTITY_DISPLAY_MODES.map(
          (mode) => html`<option value="${mode}">${labels[mode]}</option>`
        )}
      </select>
    `
  }

  _renderEntityColorField(label, index, key, fallback) {
    const entities = this.config.entities || []
    const parsed = parseEntityConfig(entities[index]) || {}
    const value = parsed[key] || ""
    const hexValue = this._toHexColor(value, fallback)

    return html`
      <div class="color-field">
        <label>${label}</label>
        <div class="color-row">
          <input
            class="color-input"
            type="color"
            .value="${hexValue}"
            @input="${(event) => this._setEntityOption(index, key, event.target.value)}"
          />
          <input
            .value="${value}"
            @input="${(event) => this._onEntityInput(index, key, event)}"
            placeholder="${fallback}"
          />
        </div>
      </div>
    `
  }

  _renderEntitiesField() {
    const entities = this.config.entities || []

    return html`
      <div class="entities-field">
        <div class="entities-header">
          <label>Entités</label>
          <button class="add-button" @click="${() => this._addEntity()}" title="Ajouter une entité">
            + Ajouter
          </button>
        </div>

        ${entities.length === 0
          ? html`<div class="empty-state">Aucune entité sélectionnée</div>`
          : html`<div class="entities-list">
              ${entities.map((entity, index) => {
                const parsed = parseEntityConfig(entity)
                const entityId = parsed?.entity || ""
                const isAdvanced = Boolean(
                  parsed &&
                  typeof entity === "object" &&
                  Object.keys(entity).some((key) => key !== "entity")
                )
                return html`
                  <div class="entity-row">
                    <ha-entity-picker
                      .hass="${this.hass}"
                      .value="${entityId}"
                      allow-custom-entity
                      @value-changed="${(event) => this._setEntity(index, event.detail.value)}"
                    ></ha-entity-picker>
                    <div class="entity-actions">
                      <button
                        class="move-button"
                        @click="${() => this._selectEntity(index)}"
                        title="Configurer"
                      >
                        ⚙
                      </button>
                      <button
                        class="move-button"
                        @click="${() => this._moveEntity(index, "up")}"
                        ?disabled="${index === 0}"
                        title="Monter"
                      >
                        ↑
                      </button>
                      <button
                        class="move-button"
                        @click="${() => this._moveEntity(index, "down")}"
                        ?disabled="${index === entities.length - 1}"
                        title="Descendre"
                      >
                        ↓
                      </button>
                    </div>
                    <button
                      class="remove-button"
                      @click="${() => this._removeEntity(index)}"
                      title="Retirer cette entité"
                    >
                      ✕
                    </button>
                    ${isAdvanced
                      ? html`<div class="entity-hint">
                          Mode avancé actif (name/icon/attribute/actions personnalisés)
                        </div>`
                      : ""}
                  </div>
                `
              })}
            </div>`}
      </div>
    `
  }

  _renderEntityDefaultsTab() {
    const defaults = this.config.entity_defaults || DEFAULT_CONFIG.entity_defaults

    return html`
      <div class="entity-settings-grid">
        <label>Position par défaut</label>
        ${this._renderPositionSelect(
          defaults.position || "",
          (event) => this._setValue("entity_defaults.position", event.target.value),
          true
        )}

        <label>Affichage par défaut</label>
        ${this._renderDisplayModeSelect(
          defaults.display_mode || "button",
          (event) => this._setValue("entity_defaults.display_mode", event.target.value || "button"),
          false
        )}

        <label>
          <input
            type="checkbox"
            .checked="${!!defaults.show_name}"
            @change="${(event) => this._onBoolean("entity_defaults.show_name", event)}"
          />
          Afficher le nom par défaut
        </label>

        <label>
          <input
            type="checkbox"
            .checked="${!!defaults.show_state}"
            @change="${(event) => this._onBoolean("entity_defaults.show_state", event)}"
          />
          Afficher l'état par défaut
        </label>

        ${this._renderColorField("Icône active par défaut", "entity_defaults.icon_color_on", "#03A9F4")}
        ${this._renderColorField("Icône inactive par défaut", "entity_defaults.icon_color_off", "#9CA3AF")}
        ${this._renderColorField("Texte actif par défaut", "entity_defaults.text_color_on", "#03A9F4")}
        ${this._renderColorField("Texte inactif par défaut", "entity_defaults.text_color_off", "#9CA3AF")}
        ${this._renderColorField("Fond bouton actif par défaut", "entity_defaults.background_color_on", "#1f2937")}
        ${this._renderColorField("Fond bouton inactif par défaut", "entity_defaults.background_color_off", "#111827")}
      </div>
    `
  }

  _renderEntityDetailsTab() {
    const entities = this.config.entities || []
    const index = Math.max(0, Math.min(this._activeEntityIndex || 0, entities.length - 1))
    const parsed = parseEntityConfig(entities[index])

    if (!parsed) {
      return html`<div class="empty-state">Ajoutez une entité pour ouvrir ses réglages.</div>`
    }

    return html`
      <div class="entity-detail">
        <label>Entité à configurer</label>
        <select
          .value="${String(index)}"
          @change="${(event) => this._selectEntity(Number(event.target.value))}"
        >
          ${entities.map((entity, optionIndex) => {
            const item = parseEntityConfig(entity)
            return html`
              <option value="${String(optionIndex)}" ?selected="${optionIndex === index}">
                ${item?.entity || `Entité ${optionIndex + 1}`}
              </option>
            `
          })}
        </select>

        <label>Entité</label>
        <ha-entity-picker
          .hass="${this.hass}"
          .value="${parsed.entity || ""}"
          allow-custom-entity
          @value-changed="${(event) => this._setEntity(index, event.detail.value)}"
        ></ha-entity-picker>

        <label>Position</label>
        ${this._renderPositionSelect(parsed.position || "", (event) =>
          this._setEntityOption(index, "position", event.target.value)
        )}

        <label>Affichage</label>
        ${this._renderDisplayModeSelect(parsed.display_mode || parsed.display || "", (event) =>
          this._setEntityOption(index, "display_mode", event.target.value)
        )}

        <label>Texte du bouton</label>
        <input
          .value="${parsed.text || ""}"
          placeholder="Lumière, TV, Ventilateur..."
          @input="${(event) => this._onEntityInput(index, "text", event)}"
        />

        <label>Nom affiché</label>
        <input
          .value="${parsed.name || ""}"
          placeholder="Nom personnalisé"
          @input="${(event) => this._onEntityInput(index, "name", event)}"
        />

        <label>
          <input
            type="checkbox"
            .checked="${!!parsed.show_name}"
            @change="${(event) => this._onEntityBoolean(index, "show_name", event)}"
          />
          Afficher le nom
        </label>

        <label>
          <input
            type="checkbox"
            .checked="${!!parsed.show_state}"
            @change="${(event) => this._onEntityBoolean(index, "show_state", event)}"
          />
          Afficher l'état
        </label>

        <label>Icône</label>
        <input
          .value="${parsed.icon || ""}"
          placeholder="mdi:lightbulb"
          @input="${(event) => this._onEntityInput(index, "icon", event)}"
        />

        <label>Icône active</label>
        <input
          .value="${parsed.icon_on || ""}"
          placeholder="mdi:lightbulb-on"
          @input="${(event) => this._onEntityInput(index, "icon_on", event)}"
        />

        <label>Icône inactive</label>
        <input
          .value="${parsed.icon_off || ""}"
          placeholder="mdi:lightbulb-outline"
          @input="${(event) => this._onEntityInput(index, "icon_off", event)}"
        />

        <div class="entity-detail-columns">
          ${this._renderEntityColorField("Couleur icône active", index, "icon_color_on", "#03A9F4")}
          ${this._renderEntityColorField("Couleur icône inactive", index, "icon_color_off", "#9CA3AF")}
          ${this._renderEntityColorField("Couleur texte active", index, "text_color_on", "#FFFFFF")}
          ${this._renderEntityColorField("Couleur texte inactive", index, "text_color_off", "#CBD5E1")}
          ${this._renderEntityColorField("Fond bouton actif", index, "background_color_on", "#164E63")}
          ${this._renderEntityColorField("Fond bouton inactif", index, "background_color_off", "#111827")}
        </div>
      </div>
    `
  }

  _renderEntitiesPanel() {
    const activeTab = this._activeEntityTab || "list"
    const tabs = [
      ["list", "Liste"],
      ["defaults", "Défauts"],
      ["entity", "Réglages"],
    ]

    return html`
      <div class="subtabs">
        ${tabs.map(
          ([id, label]) => html`
            <button
              class="${activeTab === id ? "active" : ""}"
              @click="${() => this._setEntityTab(id)}"
              type="button"
            >
              ${label}
            </button>
          `
        )}
      </div>
      ${activeTab === "defaults"
        ? this._renderEntityDefaultsTab()
        : activeTab === "entity"
          ? this._renderEntityDetailsTab()
          : this._renderEntitiesField()}
    `
  }

  render() {
    if (!this.config) return html``

    const areas = this.hass?.areas ? Object.values(this.hass.areas) : []

    return html`
      <div class="form">
        <details open>
          <summary>General</summary>
          <div class="section-content">
            <label>Titre</label>
            <input
              .value="${this.config.title || ""}"
              @input="${(event) => this._onInput("title", event)}"
            />

            ${this._renderColorField("Couleur du titre", "styles.title_color", "#f8fafc")}

            <label>Zone</label>
            <select
              .value="${this.config.area || ""}"
              @change="${(event) => this._setValue("area", event.target.value)}"
            >
              <option value="">Aucune zone</option>
              ${areas.map(
                (area) => html`
                  <option value="${area.area_id}" ?selected="${this.config.area === area.area_id}">
                    ${area.name}
                  </option>
                `
              )}
            </select>

            <label>Mode d'affichage</label>
            <select
              .value="${this.config.display_type || "picture"}"
              @change="${(event) => this._setValue("display_type", event.target.value)}"
            >
              <option value="picture">picture</option>
              <option value="camera">camera</option>
              <option value="icon">icon</option>
              <option value="compact">compact</option>
            </select>

            <label>Hauteur fixe de la carte</label>
            <input
              .value="${this.config.height || ""}"
              placeholder="180px, 22rem, 40vh"
              @change="${(event) => this._onCssSize("height", event)}"
            />

            ${this.config.display_type === "camera"
              ? html`
                  <label>Caméra</label>
                  <ha-entity-picker
                    .hass="${this.hass}"
                    .value="${this.config.camera_entity || ""}"
                    allow-custom-entity
                    @value-changed="${(event) =>
                      this._setValue("camera_entity", event.detail.value || "")}"
                  ></ha-entity-picker>
                `
              : ""}

            <label>Ratio image</label>
            <input
              .value="${this.config.aspect_ratio || ""}"
              placeholder="16:9"
              @input="${(event) => this._onInput("aspect_ratio", event)}"
            />

            <label>Couleur HA (token ou hex)</label>
            <input
              .value="${this.config.color || ""}"
              placeholder="primary, blue, #00AEEF"
              @input="${(event) => this._onInput("color", event)}"
            />

            <label>
              <input
                type="checkbox"
                .checked="${this.config.auto_area_entities !== false}"
                @change="${(event) => this._onBoolean("auto_area_entities", event)}"
              />
              Auto-remplir les entités depuis la zone si la liste est vide
            </label>

            ${this.config.display_type !== "camera"
              ? html`
                  <label>Image de fond (URL ou /local/...)</label>
                  <input
                    .value="${this.config.image || ""}"
                    placeholder="/local/images/zone.jpg"
                    @input="${(event) => this._onInput("image", event)}"
                  />
                `
              : ""}

            <label>
              <input
                type="checkbox"
                .checked="${!!this.config.hide_unavailable}"
                @change="${(event) => this._onBoolean("hide_unavailable", event)}"
              />
              Masquer les entités indisponibles
            </label>

            <label>
              <input
                type="checkbox"
                .checked="${!!this.config.darken_image}"
                @change="${(event) => this._onBoolean("darken_image", event)}"
              />
              Assombrir l'image de fond
            </label>
          </div>
        </details>

        <details open>
          <summary>Entités</summary>
          <div class="section-content">
            ${this._renderEntitiesPanel()}
          </div>
        </details>

        <details>
          <summary>Actions</summary>
          <div class="section-content">
            ${this._renderActionEditor("tap_action", "Action carte (tap)")}
            ${this._renderActionEditor("hold_action", "Action carte (hold / clic droit)")}
            ${this._renderActionEditor("double_tap_action", "Action carte (double tap)")}
            ${this._renderActionEditor(
              "entity_hold_action",
              "Action par défaut des entités (hold / clic droit)"
            )}
            ${this._renderActionEditor(
              "entity_double_tap_action",
              "Action par défaut des entités (double tap)"
            )}
          </div>
        </details>

        <details>
          <summary>Apparence</summary>
          <div class="section-content">
            ${this._renderColorField("Couleur texte badge", "styles.badge_text_color", "#0667c1")}
            ${this._renderColorField("Fond badge", "styles.badge_background", "#e8f359")}

            <label>Poids du titre (font-weight)</label>
            <input
              .value="${this.config.styles?.title_font_weight || ""}"
              placeholder="300"
              @input="${(event) => this._onInput("styles.title_font_weight", event)}"
            />

            <label>Transformation du titre (text-transform)</label>
            <select
              .value="${this.config.styles?.title_text_transform || "capitalize"}"
              @change="${(event) =>
                this._setValue("styles.title_text_transform", event.target.value)}"
            >
              <option value="capitalize">capitalize</option>
              <option value="uppercase">uppercase</option>
              <option value="lowercase">lowercase</option>
              <option value="none">none</option>
            </select>

            <label>Ombre du titre (text-shadow)</label>
            <input
              .value="${this.config.styles?.title_text_shadow || ""}"
              placeholder="2px 2px 1px black"
              @input="${(event) => this._onInput("styles.title_text_shadow", event)}"
            />

            <label>Flou image (blur)</label>
            <input
              .value="${this.config.styles?.image_blur || ""}"
              placeholder="2px"
              @input="${(event) => this._onInput("styles.image_blur", event)}"
            />
          </div>
        </details>

        <details>
          <summary>Defaults</summary>
          <div class="section-content">
            <label>Tri des entités</label>
            <select
              .value="${this.config.entity_sort || "none"}"
              @change="${(event) => this._setValue("entity_sort", event.target.value)}"
            >
              <option value="none">Aucun</option>
              <option value="name">Nom</option>
              <option value="domain">Domaine</option>
            </select>

            <label>Nombre maximum d'entités (0 = illimité)</label>
            <input
              type="number"
              min="0"
              .value="${String(this.config.max_entities || 0)}"
              @input="${(event) => this._onNumber("max_entities", event, 0)}"
            />

            <label>Domaines inclus (séparés par virgule)</label>
            <input
              .value="${this._domainsToText(this.config.include_domains)}"
              placeholder="light, switch, media_player"
              @change="${(event) => this._onDomains("include_domains", event)}"
            />

            <label>Domaines exclus (séparés par virgule)</label>
            <input
              .value="${this._domainsToText(this.config.exclude_domains)}"
              placeholder="sensor, binary_sensor"
              @change="${(event) => this._onDomains("exclude_domains", event)}"
            />

            <label>Entités exclues</label>
            <textarea
              .value="${this._domainsToText(this.config.exclude_entities)}"
              placeholder="sensor.exemple, binary_sensor.exemple"
              @change="${(event) => this._onStringList("exclude_entities", event)}"
            ></textarea>

            <label>Classes de capteurs</label>
            <input
              .value="${this._domainsToText(this.config.sensor_classes)}"
              placeholder="temperature, humidity, power"
              @change="${(event) => this._onStringList("sensor_classes", event, true)}"
            />

            <label>Classes d'alertes</label>
            <input
              .value="${this._domainsToText(this.config.alert_classes)}"
              placeholder="motion, moisture, opening"
              @change="${(event) => this._onStringList("alert_classes", event, true)}"
            />

            <label>
              <input
                type="checkbox"
                .checked="${this._hasAreaControlsFeature()}"
                @change="${(event) => this._toggleAreaControlsFeature(event.target.checked)}"
              />
              Feature HA area-controls
            </label>

            <label>Position des features</label>
            <select
              .value="${this.config.features_position || "bottom"}"
              @change="${(event) => this._setValue("features_position", event.target.value)}"
            >
              <option value="bottom">bottom</option>
              <option value="inline">inline</option>
            </select>

            <label>
              <input
                type="checkbox"
                .checked="${!!this.config.force_dialog}"
                @change="${(event) => this._onBoolean("force_dialog", event)}"
              />
              Forcer plus d'infos pour les domaines toggle
            </label>

            <label>
              <input
                type="checkbox"
                .checked="${!!this.config.state_color}"
                @change="${(event) => this._onBoolean("state_color", event)}"
              />
              Couleur d'état HA (state_color)
            </label>

            <label>
              <input
                type="checkbox"
                .checked="${!!this.config.shadow}"
                @change="${(event) => this._onBoolean("shadow", event)}"
              />
              Ombre sur les icônes
            </label>
          </div>
        </details>
      </div>
    `
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .form {
        display: grid;
        gap: 10px;
        padding: 8px 0;
      }

      details {
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.02);
        overflow: hidden;
      }

      details[open] {
        border-color: rgba(56, 189, 248, 0.4);
      }

      summary {
        list-style: none;
        cursor: pointer;
        padding: 10px 12px;
        font-size: 0.86rem;
        font-weight: 700;
        color: var(--primary-text-color, #f9fafb);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      summary::-webkit-details-marker {
        display: none;
      }

      .section-content {
        display: grid;
        gap: 10px;
        padding: 12px;
      }

      .color-field {
        display: grid;
        gap: 6px;
      }

      .action-block {
        display: grid;
        gap: 8px;
        padding: 10px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.02);
      }

      .color-row {
        display: grid;
        grid-template-columns: 54px 1fr;
        gap: 8px;
        align-items: center;
      }

      .color-input {
        width: 100%;
        height: 38px;
        border-radius: 8px;
        padding: 0;
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: transparent;
      }

      label {
        font-size: 0.82rem;
        color: var(--secondary-text-color, #9ca3af);
      }

      select,
      input,
      textarea {
        width: 100%;
        box-sizing: border-box;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.04);
        color: var(--primary-text-color, #f9fafb);
        padding: 8px 10px;
      }

      textarea {
        font-family: monospace;
        resize: vertical;
        min-height: 80px;
      }

      .entities-field {
        display: grid;
        gap: 8px;
      }

      .subtabs {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 4px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.04);
      }

      .subtabs button {
        border: 0;
        border-radius: 6px;
        background: transparent;
        color: var(--secondary-text-color, #9ca3af);
        padding: 7px 10px;
        font-size: 0.8rem;
        font-weight: 700;
        cursor: pointer;
      }

      .subtabs button.active {
        background: rgba(56, 189, 248, 0.18);
        color: var(--primary-text-color, #f9fafb);
      }

      .entity-settings-grid,
      .entity-detail {
        display: grid;
        gap: 10px;
      }

      .entity-detail-columns {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .entities-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
      }

      .entities-header label {
        margin: 0;
      }

      .add-button,
      .remove-button {
        background: rgba(56, 189, 248, 0.15);
        border: 1px solid rgba(56, 189, 248, 0.3);
        border-radius: 6px;
        color: var(--primary-text-color, #f9fafb);
        padding: 6px 12px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: 600;
      }

      .add-button:hover,
      .remove-button:hover {
        background: rgba(56, 189, 248, 0.25);
        border-color: rgba(56, 189, 248, 0.5);
      }

      .remove-button {
        padding: 6px 8px;
        min-width: 30px;
        flex-shrink: 0;
      }

      .entities-list {
        display: grid;
        gap: 8px;
      }

      .entity-row {
        display: grid;
        grid-template-columns: 1fr auto 40px;
        gap: 8px;
        align-items: center;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        padding: 8px;
      }

      .entity-actions {
        display: inline-flex;
        gap: 6px;
      }

      .move-button {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 6px;
        color: var(--primary-text-color, #f9fafb);
        padding: 6px 8px;
        cursor: pointer;
        line-height: 1;
      }

      .move-button[disabled] {
        opacity: 0.35;
        cursor: not-allowed;
      }

      .entity-hint {
        grid-column: 1 / -1;
        font-size: 0.75rem;
        color: var(--secondary-text-color, #9ca3af);
      }

      .error-text {
        color: #ef4444;
        font-size: 0.76rem;
      }

      .empty-state {
        text-align: center;
        padding: 16px;
        color: var(--secondary-text-color, #9ca3af);
        font-size: 0.82rem;
        font-style: italic;
        background: rgba(255, 255, 255, 0.02);
        border: 1px dashed rgba(255, 255, 255, 0.12);
        border-radius: 8px;
      }

      ::slotted(ha-entity-picker) {
        width: 100%;
      }

      ha-entity-picker {
        width: 100%;
      }

      @media (max-width: 720px) {
        .form {
          gap: 8px;
        }

        .entity-row {
          grid-template-columns: 1fr auto 32px;
        }

        .entity-detail-columns {
          grid-template-columns: 1fr;
        }

        .remove-button {
          padding: 4px 6px;
          min-width: 28px;
          font-size: 0.75rem;
        }
      }
    `
  }
}

if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, AlphaAreaCard)
}
if (!customElements.get(CARD_EDITOR_TYPE)) {
  customElements.define(CARD_EDITOR_TYPE, AlphaAreaCardEditor)
}

window.customCards = window.customCards || []
if (!window.customCards.find((card) => card.type === CARD_TYPE)) {
  window.customCards.push({
    type: CARD_TYPE,
    name: "Alpha Area",
    description: "Carte area rapide avec editeur visuel, actions et styles personnalises.",
    preview: true,
  })
}
