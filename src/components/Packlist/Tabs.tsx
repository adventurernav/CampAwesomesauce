import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NewPacklist from './NewPacklist';
import DeletePacklist from './DeletePacklist';
import UpdatePacklist from './UpdatePacklist';
import PLitem from './PacklistItem/PLitem'
import { Grid } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className="max-width"
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'fit-content',
    width: 'max-width',
    align: 'center'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '20vw'
  },
  cell: {
    align: 'center'
  }
});
type tabProps = {
  appState: {authenticated: boolean, token: string | null}
  classes: any,
  PacklistState: PacklistState,
  
}
type tabState = {
  value: number,
  classes: any
}

export interface PacklistState {
  data: packlistObject[]
}
type packlistObject = {
  id: number,
  title: string
}

class VerticalTabs extends Component<tabProps, tabState> {
  constructor(props: tabProps) {
    super(props)
    this.state = {
      value: 0,
      classes: styles
    }
  }
  componentDidUpdate(){
}
  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ value: newValue });
  };
 
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root} >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={this.state.value}
          onChange={this.handleChange}
          aria-label="My Packlists"
          className={classes.tabs}
        >
          {this.props.PacklistState.data.map((packlist, i) => {
            return <Tab key={i} label={packlist ? packlist.title : 'Nothing Found'} {...a11yProps(i)} />

          })}
          <Tab label={<AddCircleOutlineOutlinedIcon/>} {...a11yProps(this.props.PacklistState.data.length)} />
        </Tabs>


        {this.props.PacklistState.data.map((packlist, i)=>{
          
          return (<TabPanel key={i}value={this.state.value} index={i} >
            <Grid container justify='center' alignItems='center'>

            <h1>{packlist.title}</h1>
            <UpdatePacklist appState={this.props.appState} plID={packlist.id} />
            <DeletePacklist appState={this.props.appState} plID={packlist.id} />
            </Grid>
            <PLitem appState={this.props.appState} plID={packlist.id} />
        </TabPanel>)
        })}

        <TabPanel value={this.state.value} index={this.props.PacklistState.data.length}>
          <NewPacklist appState={this.props.appState}/>
        </TabPanel>


      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(VerticalTabs)