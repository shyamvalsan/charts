export default {
  chartLibrary: "",
  theme: "default",
  host: "",
  description: "",
  before: 0,
  after: 0,
  title: "",
  min: 0,
  max: 0,
  loaded: false,
  loading: false,
  updatedAt: 0,
  fetchStatedAt: 0,
  focused: false,
  active: false,
  selectedDimensions: null,
  enabledHover: true,
  syncHover: true,
  hoverX: null,
  navigation: "",
  syncPanning: true,
  panning: false,
  hovering: false,
  syncHighlight: true,
  highlighting: false,
  desiredUnits: "auto",
  syncUnits: true,
  unitsConversionMethod: "",
  unitsConversionDivider: -1,
  unitsConversionFractionDigits: 0,
  unit: "",
  valueRange: [null, null],
  temperature: "celsius",
  secondsAsTime: true,
  timezone: "default",
  dimensionsSort: "default",
  autofetch: false,
  autofetchOnWindowBlur: false,
  pixelsPerPoint: 1,
  legend: true,
  groupingMethod: "average",
  groupingTime: 0,
  chartUrlOptions: null,
  urlOptions: [],
  eliminateZeroDimensions: true,
  fullscreen: false,
  overlays: {},
  themeGridColor: ["#F7F8F8", "#282827"],
  themeCrosshair: ["#536775", "#536775"],
  detailed: false,

  composite: false,
  aggregationMethod: "",
  dimensions: [],
  dimensionsAggregationMethod: "",
  groupBy: "",

  postAggregationMethod: "",
  postGroupBy: "",
  selectedChart: "",

  pristineComposite: {},

  themeTrackColor: ["#f0f0f0", "#373b40"],
  themeScaleColor: ["#dfe0e0", "#373b40"],

  themeGaugePointer: ["#C0C0C0", "#474b50"],
  themeGaugeStroke: ["#F0F0F0", "#373b40"],
}
