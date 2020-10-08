import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NewPacklist from './NewPacklist';
import DeletePacklist from './DeletePacklist';
import UpdatePacklist from './UpdatePacklist';


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
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
});
type tabProps = {
  appState: {authenticated: boolean, token: string | null}
  classes: any,
  PacklistState: PacklistState,
  refresh: (newState:boolean) => void,
  refreshState: boolean
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
          {this.props.PacklistState.data.reverse().map((packlist, i) => {
            return <Tab key={i} label={packlist ? packlist.title : 'Nothing Found'} {...a11yProps(i)} />

          })}
          <Tab label="+ New" {...a11yProps(this.props.PacklistState.data.length)} />
        </Tabs>


        {this.props.PacklistState.data.reverse().map((packlist, i)=>{
          
          return (<TabPanel key={i}value={this.state.value} index={i}>
            <UpdatePacklist appState={this.props.appState} plID={packlist.id} refresh={this.props.refresh} refreshState={this.props.refreshState}/>
            <DeletePacklist appState={this.props.appState} plID={packlist.id} refresh={this.props.refresh} refreshState={this.props.refreshState}/>
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