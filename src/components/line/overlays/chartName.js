import React from "react"
import styled from "styled-components"
import { TextSmall } from "@netdata/netdata-ui/lib/components/typography"
import { useChart, useAttributeValue, useMetadata } from "@/components/provider"
import Shortener from "@/components/helpers/shortener"
import Tooltip from "@/components/tooltip"

const StyledShortener = styled(Shortener)`
  text-shadow: 0 18px 28px rgba(9, 30, 66, 0.15), 0 0 1px rgba(9, 30, 66, 0.31);
  pointer-events: none;
`

const ChartName = ({ field, normalize, ...rest }) => {
  let value = useAttributeValue(field)
  const metadata = useMetadata()
  const chart = useChart()

  if (!value) {
    value = metadata[field]
  }

  if (normalize) {
    value = normalize(value, chart.getAttributes())
  }

  if (!value) return null

  return (
    <Tooltip content={value}>
      <StyledShortener color="key" text={value} Component={TextSmall} {...rest} />
    </Tooltip>
  )
}

export default ChartName
