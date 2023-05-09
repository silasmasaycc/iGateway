// ** React Imports
import { ReactNode/*, useEffect*/, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import { cnpj, cpf } from 'magic-masks';
import { validateBr } from 'js-brasil';

import { login } from 'src/back/iGateway'
import { useSettings } from 'src/@core/hooks/useSettings'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage = () => {

  // ** Hook
  const router = useRouter()

  const [cnpjCpf,setCnpjCpf] = useState("")
  const [acessKey,setAcessKey] = useState("")

  const [openErroLogin, setOpenErroLogin] = useState(false);
  const [openErroIPT, setOpenErroIPT] = useState(false);
  const [openErroLoginGenerico, setOpenErroLoginGenerico] = useState(false);

  const { infoIgateway, igatewayPort, reloadInfoIgateway } = useSettings()

//  const { statusIgateway} = infoIgateway

//  useEffect(()=>{
//    if (['RUN','STOP'].includes(statusIgateway as string)) router.push('/dashboard')
//    if (statusIgateway=='ERRO') router.push('/errorIgateway')
//  },[statusIgateway])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErroLogin(false);
    setOpenErroIPT(false);
    setOpenErroLoginGenerico(false);
  };

  async function acessar() {
    const retLogin = await login(acessKey,cnpjCpf.replace(/[/.-]/g, ''),igatewayPort as string)
    switch (retLogin) {
      case 'ERROLOGIN' :
        setOpenErroLogin(true)
        break
      case 'ERROIPT' :
        setOpenErroIPT(true)
        break
      case 'ERROIGATEWAY' :
        router.push('/errorIgateway')
        break
      default :
        if (retLogin.substr(0,3)=='db_') {
          await reloadInfoIgateway()
          router.push('/dashboard')
        } else {
          setOpenErroLoginGenerico(true)
        }
    }
  }

  return (
    infoIgateway ?
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  fontSize: '1.5rem !important'
                }}
              >
                iGateway DashBoard
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Bem vindo! 👋🏻
              </Typography>
              <Typography variant='body2'>Por favor, informe a chave de acesso e o CNPJ/CPF.</Typography>
            </Box>
            <TextField
              autoFocus
              fullWidth
              id='acessKey'
              label='Chave de Acesso'
              sx={{ marginBottom: 4 }}
              onChange={e => {
                setAcessKey(e.target.value)
              }}
            />
            <TextField
              fullWidth
              id='cnpjCpf'
              label='CNPJ/CPF'
              sx={{ marginBottom: 4 }}
              onChange={e => {
                if (e.target.value.length==14 &&
                  validateBr.cpf(cpf(e.target.value.replaceAll('.','').replaceAll('/','')))) {
                    e.target.value = cpf(e.target.value)
                } else {
                    e.target.value = cnpj(e.target.value)
                }
                setCnpjCpf(e.target.value)
              }}
              onKeyUp={e => {
                if (e.key=='Enter') acessar()
              }}
            />
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ mb: 4, mt: 2 }}
              onClick={acessar}
              disabled={acessKey.length<5 || (!validateBr.cpf(cnpjCpf) && !validateBr.cnpj(cnpjCpf))}
            >
              Acessar
            </Button>
          </CardContent>
        </Card>
        <FooterIllustrationsV1 />
          <Snackbar open={openErroLogin} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
              Chave de acesso ou CNPJ/CPF inválidos!
            </Alert>
          </Snackbar>
          <Snackbar open={openErroLoginGenerico} autoHideDuration={10000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Erro no processo de Login!
            </Alert>
          </Snackbar>
          <Snackbar open={openErroIPT} autoHideDuration={10000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Erro ao acessar servidor do iPonto!
            </Alert>
          </Snackbar>
      </Box>
    :
      <></>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
