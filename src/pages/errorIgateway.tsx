// ** React Imports
import { ReactNode } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'

import { useRouter } from 'next/router'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(13)
  }
}))

const TreeIllustration = styled('img')(({ theme }) => ({
  left: 0,
  bottom: '5rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    bottom: 0
  }
}))

const ErrorIgateway = () => {
  const router = useRouter()
  const { reloadDashboard } = useSettings()

  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h1'>404</Typography>
          <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
            Erro ao acessar iGateway ⚠️
          </Typography>
        </BoxWrapper>
        <Img height='350' alt='error-illustration' src='/images/pages/404.png' />
        {/*<Link passHref href='/'>*/}
          <Button
              component='a'
              variant='contained'
              sx={{ px: 5.5 }}
              onClick={()=>{
                reloadDashboard()
                router.push('/')
              }}
          >
            Página inicial
          </Button>
        {/*</Link>*/}
      </Box>
      <FooterIllustrations image={<TreeIllustration alt='tree' src='/images/pages/tree.png' />} />
    </Box>
  )
}

ErrorIgateway.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ErrorIgateway
