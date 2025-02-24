import React, { forwardRef } from "react"
import Flex from "@netdata/netdata-ui/lib/components/templates/flex"
import { useMetadata } from "@/components/provider"
import GroupBoxes from "./groupBoxes"
import useGroupBoxLayout from "./useGroupBoxLayout"

const Container = forwardRef(({ renderBoxPopover, renderGroupPopover, ...rest }, ref) => {
  const { labels, data } = useGroupBoxLayout()
  const { context } = useMetadata()

  return (
    <Flex column width="100%" height="100%" gap={4} padding={[4, 2]} ref={ref} {...rest}>
      <GroupBoxes
        data={data}
        labels={labels}
        renderBoxPopover={renderBoxPopover}
        renderGroupPopover={renderGroupPopover}
        context={context}
      />
    </Flex>
  )
})

export default Container
