// ** MUI Imports
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import CardLayout from 'src/@core/layouts/CardLayout'
import LogsView from 'src/views/tables/LogsView'

const LogsTable = () => {
  return (
    <CardLayout header={{
      title: 'Logs',
      titleTypographyProps: { variant: 'h6' }
    }}>
      <LogsView />
    </CardLayout>
  )
}

export default LogsTable
