import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import SendIcon from '@mui/icons-material/Send'
import RefreshIcon from '@mui/icons-material/Refresh'
import FileUpload from './components/FileUpload/FileUpload'
import Preview from './components/Preview/Preview'
import HashtagBuilder from './components/HashtagBuilder/HashtagBuilder'
import PlatformSelector from './components/PlatformSelector/PlatformSelector'
import useStore from './store'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  const {
    uploadedFiles,
    selectedHashtags,
    selectedPlatforms,
    isProcessing,
    error,
    successMessage,
    submit,
    reset
  } = useStore()

  const handleSubmit = async () => {
    await submit()
  }

  const handleReset = () => {
    reset()
  }

  const canSubmit = uploadedFiles.length > 0 && selectedPlatforms.length > 0

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Multi-Platform Social Media Publisher
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom align="center" color="text.secondary">
            Upload files, build content, and publish across multiple platforms
          </Typography>

          <Box sx={{ mt: 4 }}>
            <FileUpload />
          </Box>

          <Box sx={{ mt: 4 }}>
            <Preview files={uploadedFiles} />
          </Box>

          <Box sx={{ mt: 4 }}>
            <HashtagBuilder />
          </Box>

          <Box sx={{ mt: 4 }}>
            <PlatformSelector />
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 4 }}>
              {error}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mt: 4 }}>
              {successMessage}
            </Alert>
          )}

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={!canSubmit || isProcessing}
              startIcon={isProcessing ? <CircularProgress size={20} /> : <SendIcon />}
              sx={{ minWidth: 200 }}
            >
              {isProcessing ? 'Sending to n8n...' : 'Publish Content'}
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={handleReset}
              disabled={isProcessing}
              startIcon={<RefreshIcon />}
            >
              Reset
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Files: {uploadedFiles.length} • Hashtags: {selectedHashtags.length} • Platforms: {selectedPlatforms.length}
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
