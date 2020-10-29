import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faBell,
  faWindowClose,
  faThList,
  faChartPie,
  faCaretLeft
} from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core'
import config from '../Assets/Config'

const useStyles = makeStyles((theme) => ({
  item: {
    width: `${config.containerWidth}px`
  },
  icon: {
    padding: '5px',
    width: '30px !important',
    height: '30px !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

interface MenuProps {
  openMenuHandler(open: Boolean): void;
}

const Menu: React.FC<MenuProps> = ({ openMenuHandler }: MenuProps) => {
  const classes = useStyles()

  return (
    <>
      <List component="nav">
        <ListItem button divider className={classes.item} onClick={() => openMenuHandler(false)}>
          <ListItemIcon className={classes.icon}>
            <FontAwesomeIcon icon={faCaretLeft} />
          </ListItemIcon>
          <ListItemText primary="Back" />
        </ListItem>
        <ListItem button divider className={classes.item}>
          <ListItemIcon className={classes.icon}>
            <FontAwesomeIcon icon={faClock} />
          </ListItemIcon>
          <ListItemText primary="Pomodoro" />
        </ListItem>
        <ListItem button divider className={classes.item}>
          <ListItemIcon className={classes.icon}>
            <FontAwesomeIcon icon={faBell} />
          </ListItemIcon>
          <ListItemText primary="Sessions" />
        </ListItem>
        <ListItem button divider className={classes.item}>
          <ListItemIcon className={classes.icon}>
            <FontAwesomeIcon icon={faChartPie} />
          </ListItemIcon>
          <ListItemText primary="Tracker" />
        </ListItem>
        <ListItem button divider className={classes.item}>
          <ListItemIcon className={classes.icon}>
            <FontAwesomeIcon icon={faThList} />
          </ListItemIcon>
          <ListItemText primary="Blocklist" />
        </ListItem>
        <ListItem button divider className={classes.item}>
          <ListItemIcon className={classes.icon}>
            <FontAwesomeIcon icon={faWindowClose} />
          </ListItemIcon>
          <ListItemText primary="Tab Limit" />
        </ListItem>
      </List>
    </>
  )
}

export default Menu
