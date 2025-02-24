export default {
  context: "net.operstate",
  family: "all",
  title: "Interface Operational State (net.operstate)",
  priority: 7009,
  plugin: "proc.plugin",
  module: "/proc/net/dev",
  units: "state",
  chartType: "line",
  updateEvery: 1,
  firstEntry: 1633960727,
  lastEntry: 1634289048,
  dimensions: { state: { name: "state" } },
  chartLabels: {},
}
