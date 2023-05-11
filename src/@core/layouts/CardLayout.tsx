// ** MUI Imports
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import MuiCardHeader, { CardHeaderProps } from '@mui/material/CardHeader'

// ** Types
import { CardLayoutProps } from './types'

// Styled component for Blank Layout component
const CardHeader = styled(MuiCardHeader)<CardHeaderProps>(({ theme }) => ({
  padding: `${theme.spacing(3)} !important`,
  backgroundColor: theme.palette.primary.main,

  '& > div': {
    marginLeft: theme.spacing(4),

    'span': {
      lineHeight: '1 !important',
      fontSize: '0.875rem !important',
      color: theme.palette.common.white,
    }
  }
}))

const CardLayout = ({ children, header }: CardLayoutProps) => {
  return (
    <Card>
      <CardHeader {...header} />
      {children}
    </Card>
  )
}

export default CardLayout
