import React, { forwardRef } from "react"
import styled from "styled-components"
import { getColor, getRgbColor } from "@netdata/netdata-ui/lib/theme/utils"
import Flex from "@netdata/netdata-ui/lib/components/templates/flex"
import panTool from "@netdata/netdata-ui/lib/components/icon/assets/pan_tool.svg"
import selectedArea from "@netdata/netdata-ui/lib/components/icon/assets/selected_area.svg"
import zoomInIcon from "@netdata/netdata-ui/lib/components/icon/assets/zoom_in.svg"
import zoomOutIcon from "@netdata/netdata-ui/lib/components/icon/assets/zoom_out.svg"
import zoomResetIcon from "@netdata/netdata-ui/lib/components/icon/assets/zoom_reset.svg"
import Icon, { Button } from "@/components/icon"
import { useAttribute, useAttributeValue, useChart } from "@/components/provider"
import Select from "./select"

const Container = styled(Flex).attrs({
  padding: [0.5],
  gap: 1,
  round: true,
  border: { side: "all", color: "borderSecondary" },
  opacity: "weak",
})`
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0.7;
  background: ${getRgbColor("elementBackground", 0.5)};

  &:hover {
    background: ${getColor("elementBackground")};
    opacity: 1;
  }
`

const ZoomReset = () => {
  const chart = useChart()

  const after = useAttributeValue("after")

  return (
    <Button
      icon={<Icon svg={zoomResetIcon} size="16px" />}
      title="Reset zoom"
      onClick={chart.resetNavigation}
      data-testid="chartToolbox-zoomReset"
      data-track={chart.track("zoomReset")}
      disabled={after === -900}
      padding="2px"
      small
    />
  )
}

const Toolbox = forwardRef((props, ref) => {
  const chart = useChart()
  const [navigation, setNavigation] = useAttribute("navigation")

  const highlighting = useAttributeValue("highlighting")
  const panning = useAttributeValue("panning")
  if (highlighting || panning) return null

  return (
    <Container
      data-testid="chartToolbox"
      data-toolbox="true"
      {...props}
      ref={ref}
      data-track={chart.track("toolbox")}
    >
      <Button
        icon={<Icon svg={panTool} size="16px" />}
        title="Pan"
        onClick={() => setNavigation("pan")}
        active={navigation === "pan"}
        data-testid="chartToolbox-pan"
        stroked
        data-track={chart.track("pan")}
        padding="2px"
        small
      />
      <Button
        icon={<Icon svg={selectedArea} size="16px" />}
        title="Highlight"
        onClick={() => setNavigation("highlight")}
        active={navigation === "highlight"}
        data-testid="chartToolbox-highlight"
        data-track={chart.track("highlight")}
        padding="2px"
        small
      />
      <Select />
      <Button
        icon={<Icon svg={zoomInIcon} size="16px" />}
        title="Zoom in"
        onClick={chart.zoomIn}
        data-testid="chartToolbox-zoomIn"
        data-track={chart.track("zoomIn")}
        padding="2px"
        small
      />
      <Button
        icon={<Icon svg={zoomOutIcon} size="16px" />}
        title="Zoom out"
        onClick={chart.zoomOut}
        data-testid="chartToolbox-zoomOut"
        data-track={chart.track("zoomOut")}
        padding="2px"
        small
      />
      <ZoomReset />
    </Container>
  )
})

export default Toolbox
