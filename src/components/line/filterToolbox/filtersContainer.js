import styled from "styled-components"
import Flex from "@netdata/netdata-ui/lib/components/templates/flex"

const FiltersContainer = styled(Flex).attrs({
  justifyContent: "between",
  alignItems: "center",
  border: { side: "bottom", color: "borderSecondary" },
  overflow: "auto",
})`
  &::-webkit-scrollbar {
    height: 0;
  }
`

export default FiltersContainer
