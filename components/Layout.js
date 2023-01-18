import useStyles from '@/utils/styles'
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'
import Head from 'next/head'
import React from 'react'

export default function Layout({ children }) {
  const classes = useStyles()
  return (
    <div>
      <Head>Jesco</Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography variant="h6">Jesco</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All right reserved. @Jesco</Typography>
      </footer>
    </div>
  )
}
