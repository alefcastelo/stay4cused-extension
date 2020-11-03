import React from 'react'
import {
  Link
} from "react-router-dom";
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faWindowClose,
  faThList,
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
        <Link to="/" onClick={() => openMenuHandler(false)}>
          <ListItem button divider className={classes.item}>
            <ListItemIcon className={classes.icon}>
              <FontAwesomeIcon icon={faClock} />
            </ListItemIcon>
            <ListItemText primary="Pomodoro" />
          </ListItem>
        </Link>
        <Link to="/blocklist" onClick={() => openMenuHandler(false)}>
          <ListItem button divider className={classes.item}>
            <ListItemIcon className={classes.icon}>
              <FontAwesomeIcon icon={faThList} />
            </ListItemIcon>
            <ListItemText primary="Blocklist" />
          </ListItem>
        </Link>
        <Link to="/tab-limit" onClick={() => openMenuHandler(false)}>
          <ListItem button divider className={classes.item}>
            <ListItemIcon className={classes.icon}>
              <FontAwesomeIcon icon={faWindowClose} />
            </ListItemIcon>
            <ListItemText primary="Tab Limit" />
          </ListItem>
        </Link>
      </List>
    </>
  )
}

export default Menu
