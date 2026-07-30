import '@cloudscape-design/global-styles/index.css'
import AppLayout from '@cloudscape-design/components/app-layout'
import ContentLayout from '@cloudscape-design/components/content-layout'
import Header from '@cloudscape-design/components/header'
import Container from '@cloudscape-design/components/container'
import SpaceBetween from '@cloudscape-design/components/space-between'
import Box from '@cloudscape-design/components/box'

function App() {
  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout header={<Header variant="h1">Hello, Cloudscape!</Header>}>
          <SpaceBetween size="l">
            <Container header={<Header variant="h2">Hello World</Header>}>
              <Box variant="p">
                Este é um site de exemplo construído com o{' '}
                <Box variant="strong">Cloudscape Design System</Box>.
              </Box>
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  )
}

export default App
