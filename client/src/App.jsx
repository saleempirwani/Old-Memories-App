import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { getPosts } from './actions/posts'

import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import memories from './images/memories.png'
import useStyle from './styles'

function App() {
  const [currentId, setCurrentId] = useState(null)
  const classes = useStyle()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h3" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container className={classes.mobContainer} justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
