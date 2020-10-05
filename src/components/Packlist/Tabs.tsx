import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
  appState: { appState: { appState: { authenticated: boolean, token: string | null } } },
  classes: any,
  PacklistState: PacklistState
}
type tabState = {
  value: number,
  classes: any
}

export interface PacklistState {
  data: packlistObject[]
}
type packlistKeys = {
  id: number,
  title: string
}
type packlistObject = {
  [title:string]: packlistKeys
}
class VerticalTabs extends Component<tabProps, tabState> {
  constructor(props: tabProps) {
    super(props)
    this.state = {
      value: 0,
      classes: styles
    }
    console.log(props);

  }
  componentDidUpdate() {
    console.log(this.props);

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
            console.log(packlist);
            return <Tab label={packlist?packlist.title:''} {...a11yProps(i)} />

          })}

        </Tabs>
        <TabPanel value={this.state.value} index={0}>
          Packlist Items for the first packlist
      </TabPanel>


      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(VerticalTabs)