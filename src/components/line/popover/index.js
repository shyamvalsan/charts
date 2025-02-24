import React, { useEffect, useState, useRef, forwardRef, Fragment } from "react"
import Flex from "@netdata/netdata-ui/lib/components/templates/flex"
import makeExecuteLatest from "@/helpers/makeExecuteLatest"
import { unregister } from "@/helpers/makeListeners"
import { useChart } from "@/components/provider"
import ReactDOM from "react-dom"
import DropContainer from "@netdata/netdata-ui/lib/components/drops/drop/container"
import useMakeUpdatePosition from "@netdata/netdata-ui/lib/components/drops/drop/useMakeUpdatePosition"
import useDropElement from "@netdata/netdata-ui/lib/hooks/use-drop-element"
import Dimensions from "./dimensions"

const Popover = forwardRef((props, ref) => (
  <Flex data-testid="chartPopover" ref={ref}>
    <Dimensions />
  </Flex>
))

const leftTopAlign = { right: "left", bottom: "top" }
const leftBottomAlign = { right: "left", top: "bottom" }
const rightTopAlign = { left: "right", bottom: "top" }
const rightBottomAlign = { left: "right", top: "bottom" }
const stretch = "width"

const getAlign = (left, top) => {
  if (left && top) return leftTopAlign
  if (left) return leftBottomAlign
  if (top) return rightTopAlign
  return rightBottomAlign
}

const Container = () => {
  const chart = useChart()
  const dropRef = useRef()
  const [target, setTarget] = useState()
  const targetRef = useRef()

  const updatePositionRef = useRef()
  const [open, setOpen] = useState(false)
  const [align, setAlign] = useState(leftTopAlign)

  targetRef.current = target
  updatePositionRef.current = useMakeUpdatePosition(target, dropRef, align, stretch)

  useEffect(() => {
    const executeLatest = makeExecuteLatest()
    return unregister(
      chart.getUI().on(
        "mousemove",
        executeLatest.add(event => {
          if (chart.getAttribute("panning") || chart.getAttribute("highlighting")) return

          const offsetX = event.offsetX || event.layerX
          const offsetY = event.offsetY || event.layerY

          setOpen(true)

          if (!targetRef.current) return

          targetRef.current.style.left = `${offsetX}px`
          targetRef.current.style.top = `${offsetY}px`

          updatePositionRef.current()

          const chartWidth = chart.getUI().getChartWidth()
          const chartHeight = chart.getUI().getChartHeight()

          const left = offsetX > chartWidth / 2
          const top = offsetY > chartHeight / 2

          setAlign(getAlign(left, top))
        })
      ),
      chart.on("blurChart", () => setOpen(false)),
      chart.onAttributeChange("panning", panning => {
        if (panning) setOpen(false)
      }),
      chart.onAttributeChange("highlighting", panning => {
        if (panning) setOpen(false)
      }),
      () => executeLatest && executeLatest.clear()
    )
  }, [chart])

  const el = useDropElement()

  if (!open) return null

  return (
    <Fragment>
      <Flex ref={r => setTarget(r)} position="absolute" />
      {ReactDOM.createPortal(
        <DropContainer
          data-toolbox
          margin={[align.top ? 4 : -4, align.right ? -5 : 5]}
          ref={dropRef}
          width={{ max: "100%" }}
          column
          data-testid="drop"
        >
          <Popover />
        </DropContainer>,
        el
      )}
    </Fragment>
  )
}

export default Container
