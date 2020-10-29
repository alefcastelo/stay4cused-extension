import React, { useState } from 'react'
import { GlobalStyle, Container, Content } from './Assets/Styled'
import { CustomTheme } from './Assets/MaterialTheme'
import { Drawer, makeStyles, ThemeProvider } from '@material-ui/core'
import TopBar from './Components/TopBar'
import Menu from './Components/Menu'

const useStyles = makeStyles((theme) => ({
  paper: {
    '.MuiList-root.MuiList-padding': {
      padding: '0px'
    }
  }
}))

const Layout: React.FC = ({ children }: React.PropsWithChildren<any>) => {
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false)
  const classes = useStyles()
  const handlerToggle = (open) => setToggleDrawer(open)

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={CustomTheme}>
        <Container>
          <TopBar openMenuHandler={handlerToggle} />
          <Content>{children}</Content>
          <Drawer
            className={classes.paper}
            anchor="right"
            open={toggleDrawer}
            onClose={() => handlerToggle(false)}
          >
            <Menu openMenuHandler={handlerToggle} />
          </Drawer>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Layout
