import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import theme from './theme/theme';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Projects from './pages/Projects';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <NavBar />
        <Box component="main" sx={{ pt: '64px' }}>
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/about"    element={<AboutMe />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Box>
      </HashRouter>
    </ThemeProvider>
  );
}
