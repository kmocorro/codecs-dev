import React, { Fragment, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { Container, Grid, Paper, CardContent, CardActions, TextField, Divider } from '@material-ui/core';
import Webcam from "react-webcam";
import moment from 'moment';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import PanToolIcon from '@material-ui/icons/PanTool';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import CancelIcon from '@material-ui/icons/Cancel';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

import { Alert, AlertTitle } from '@material-ui/lab';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  leftPanelPaper: {
    marginTop: 30,
  },
  rightPanelPaper: {
    marginTop: 30,
  },
  leftPanelResultPaper: {
    marginTop: 30,
    height: 500
  },
  rightPanelResultPaper: {
    marginTop: 50,
    height: 500
  },
  profilePicContainer: {
    width: '80%',
    margin: 'auto'
  },
  profilePic: {
    width: '100%',
    height: 'auto',
    borderRadius: '50%'
  },
  blankLive: {
    height: 500,
  },
  profileCard: {
    marginTop: 10,
    height: 500
  },
  profileCardContent: {
    padding: 5
  },
  triage: {
    fontFamily: 'Helvetica'
  },
  instruction: {
    fontFamily: 'Helvetica'
  }
}));

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function RecordAgreementAttendance(props) {
  const classes = useStyles();
  const employeeProfilePic = `http://dev-metaspf401.sunpowercorp.com:4000/codecs-img/${props.userData.id}.png` || '';
  
  function addDefaultImg(e){
    e.target.src = `https://robohash.org/${props.userData.id}`
  }

  return (
    <Container fixed>
      <Grid container spacing={2} >
        {
          <Grid item xs={12} sm={12} md={6} lg={6} >
            <Paper elevation={0} className={classes.leftPanelPaper} >
              <CardContent>
                {
                  props.employee_number === '' ? (
                    <Typography align="left" variant="h3" style={{color: "green"}} className={classes.instruction}>Scan Barcode ID</Typography>
                  ):(
                    props.userData.id ? (
                      <Typography align="left" variant="h3" className={classes.instruction}>Sign Triage Form</Typography>
                    ):(
                      <Typography align="left" variant="h3" className={classes.instruction}>Please wait...</Typography>
                    )
                  )
                  
                }
              </CardContent>
              <Container maxWidth="sm">
                {
                  !props.userData.id ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Scan ID to Enter"
                      autoFocus
                      onChange={props.handleEmployeeNumberOnChange}
                      value={props.employee_number}
                      disabled={props.pauseAfterScan}
                      onKeyDown={props.handleKeyDown}
                    />
                  ):(
                    <></>
                  )
                }
                <Paper elevation={0} className={classes.profileCard}>
                  <CardContent className={classes.profileCardContent}>
                    {
                      props.userData.id && props.userData.name ?
                      <>
                        <div className={classes.profilePicContainer}>
                          <img src={employeeProfilePic} onError={addDefaultImg} className={classes.profilePic}/>
                        </div>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography align="left" variant="body2" color="textSecondary">Name</Typography>
                            <Typography align="left" variant="h2">{props.userData.name}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography align="left" variant="body2" color="textSecondary">Employee No.</Typography>
                            <Typography align="left" variant="h5" gutterBottom>{props.userData.id}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography align="left" variant="body2" color="textSecondary">Log Date</Typography>
                            <Typography align="left" variant="h5" gutterBottom>{moment(new Date()).format('lll')}</Typography>
                          </Grid>
                        </Grid>
                      </>
                      :
                      <></>
                    }
                  </CardContent>
                </Paper>
              </Container>
            </Paper>
          </Grid>
        }
        { // Employee Agreement Form
          props.userData ? (
          <Grid item xs={12} sm={12} md={6} lg={6} style={{paddingTop: 100}}>
            {
              <>
              <Typography variant="h5">Please move the switch under your response.</Typography>
              <Typography variant="body2" gutterBottom>Please answer the form by moving the switch. Default answer is No.</Typography>
              </>
            }
            <Grid container spacing={2}>
              <List dense>
                <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        1A
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography style={{paddingRight: 100}}>
                        Are you experiencing <strong>FEVER (Lagnat)</strong>?
                      </Typography>}
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={<IOSSwitch checked={props.switcher.answer_1A} onChange={props.handleSwitcherChange} name="answer_1A" />}
                        label={props.switcher.answer_1A ? 'Yes' : 'No'}
                      />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        1B
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography style={{paddingRight: 100}}>Are you experiencing <strong>COUGH and/or COLDS (Ubo/Sipon)</strong>?</Typography>}
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={<IOSSwitch checked={props.switcher.answer_1B} onChange={props.handleSwitcherChange} name="answer_1B" />}
                        label={props.switcher.answer_1B ? 'Yes' : 'No'}
                      />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        1C
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography style={{paddingRight: 100}}>Are you experiencing <strong>BODY PAINS(Pananakit ng katawan)</strong>?</Typography>}
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={<IOSSwitch checked={props.switcher.answer_1C} onChange={props.handleSwitcherChange} name="answer_1C" />}
                        label={props.switcher.answer_1C ? 'Yes' : 'No'}
                      />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        1C
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography style={{paddingRight: 100}}>Are you experiencing <strong>SORE THROAT(Pananakit ng lalamunan/masakit lumunok)</strong>?</Typography>}
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={<IOSSwitch checked={props.switcher.answer_1D} onChange={props.handleSwitcherChange} name="answer_1D" />}
                        label={props.switcher.answer_1D ? 'Yes' : 'No'}
                      />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        2
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography style={{paddingRight: 100}}>Have you had face-to-face contact with a probable or confirmed COVID-19 case with 1 meter and for more than 15 minutes for the past 14 days?</Typography>}
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={<IOSSwitch checked={props.switcher.answer_2} onChange={props.handleSwitcherChange} name="answer_2"/>}
                        label={props.switcher.answer_2 ? 'Yes' : 'No'}
                      />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        3
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography style={{paddingRight: 100}}>Have you provided direct care for a patient with probable or confirmed COVID-19 case without using proper personal protective equipment for the past 14 days?</Typography>}
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={<IOSSwitch checked={props.switcher.answer_3} onChange={props.handleSwitcherChange} name="answer_3"/>}
                        label={props.switcher.answer_3 ? 'Yes' : 'No'}
                      />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        4
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography style={{paddingRight: 100}}>Have you travelled outside the Philippines in the last 14 days?</Typography>}
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={<IOSSwitch checked={props.switcher.answer_4} onChange={props.handleSwitcherChange} name="answer_4"/>}
                        label={props.switcher.answer_4 ? 'Yes' : 'No'}
                      />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        5
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography style={{paddingRight: 100}}>Have you travelled outside in the current city/municipality where you reside?</Typography>}
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={<IOSSwitch checked={props.switcher.answer_5} onChange={props.handleSwitcherChange} name="answer_5"/>}
                        label={props.switcher.answer_5 ? 'Yes' : 'No'}
                      />
                    </ListItemSecondaryAction>
                </ListItem>
              </List>
              {
                props.switcher.answer_1A || props.switcher.answer_1B || props.switcher.answer_1C || props.switcher.answer_1D || props.switcher.answer_2 || props.switcher.answer_3 || props.switcher.answer_4 || props.switcher.answer_5 ? (
                  <Typography variant="h6" gutterBottom>Click here and Scan Barcode ID to sign your triage form</Typography>
                ):(
                  <Typography variant="h6" gutterBottom>Scan Barcode ID again to sign your triage form</Typography>
                )
              }
              <TextField
                  fullWidth
                  variant="outlined"
                  label="Scan ID to Sign form"
                  autoFocus
                  onChange={props.handleEmployeeNumberSignatureOnChange}
                  value={props.employee_number_signature}
                  disabled={props.pauseAfterScan}
                  onKeyDown={props.handleKeyDownSignature}
                />
            </Grid>
          </Grid>
          )
          :(
            props.employee_number === '' ? (
              props.serverResponseMessage.status === 'success' ? (
                props.switcher.answer_1A || props.switcher.answer_1B || props.switcher.answer_1C || props.switcher.answer_1D || props.switcher.answer_2 || props.switcher.answer_3 || props.switcher.answer_4 ? (
                  <Grid item xs={12} sm={12} md={6} lg={6} style={{paddingTop: 120, margin: 'auto'}}>
                    <Typography  align="center" gutterBottom>
                      <PanToolIcon style={{ fontSize: 100, color: 'maroon' }} />
                    </Typography>
                    <Typography variant="h4" style={{color: 'red'}} align="center">
                      Please wait. You're NOT allowed to Enter. Please notify our Clinic Nurse immediately.
                    </Typography>
                  </Grid>
                ):(
                  <Grid item xs={12} sm={12} md={6} lg={6} style={{paddingTop: 120,  margin: 'auto'}}>
                    <Typography  align="center" gutterBottom>
                      <VerifiedUserIcon style={{ fontSize: 100, color: 'green' }} />
                    </Typography>
                    <Typography variant="h4" style={{color: 'green'}} align="center">
                      Log successfully recoded. You may now enter.
                    </Typography>
                  </Grid>
                )
              ):(
                props.serverResponseMessage.status === 'not_same' ? (
                  <Grid item xs={12} sm={12} md={6} lg={6} style={{paddingTop: 120,  margin: 'auto'}}>
                    <Typography  align="center" gutterBottom>
                      <CancelIcon style={{ fontSize: 100, color: 'maroon' }} />
                    </Typography>
                    <Typography variant="h4" style={{color: 'red'}} align="center">
                      Please use the same Barcode ID and try again.
                    </Typography>
                  </Grid>
                ):(
                  <></>
                )
              )
            ):(
              <></>
            )
          )
          
        }
      </Grid>
    </Container>
  );
}