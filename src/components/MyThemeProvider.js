import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from 'src/theme';
import useSettings from 'src/hooks/useSettings';

function MyThemeProvider({ children }) {
  const { settings } = useSettings();
  console.log(settings);
  const theme = createTheme({ theme: settings.theme });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MyThemeProvider;
