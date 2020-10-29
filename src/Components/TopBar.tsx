import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 8px 0px 15px'
  }
}))

interface TopBarProps {
  openMenuHandler(open: Boolean): void;
}

const TopBar: React.FC<TopBarProps> = ({ openMenuHandler }: TopBarProps) => {
  const classes = useStyles()
  return (
    <AppBar color="primary" position="static" elevation={0}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Typography variant="h5" color="inherit">
          <strong>Stay4Cused</strong>
        </Typography>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => openMenuHandler(true)}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
