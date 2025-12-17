import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Calculator } from './pages/Calculator';
import { Admin } from './pages/Admin';
import { ScheduleSearch } from './pages/ScheduleSearch';
import { Header } from './components/layout/Header';
import { COLORS } from './config/constants';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY_ORANGE,
    },
    secondary: {
      main: COLORS.DARK_BLUE_GRAY,
    },
    background: {
      default: '#f7f7f7',
    },
  },
  typography: {
    fontFamily: '"Amazon Ember", Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/schedule" element={<ScheduleSearch />} />
          <Route path="*" element={<Calculator />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;