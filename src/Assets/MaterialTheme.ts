import { createMuiTheme } from '@material-ui/core/styles'
import { deepOrange } from '@material-ui/core/colors'

export const CustomTheme = createMuiTheme({
  palette: {
    primary: {
      main: deepOrange[700]
    }
  }
})
