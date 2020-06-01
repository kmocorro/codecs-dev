import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Container, Grid, Paper, CardContent, CardActions, TextField, Divider } from '@material-ui/core';
import Webcam from "react-webcam";
import moment from 'moment';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
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



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  leftPanelPaper: {
    marginTop: 20,
  },
  rightPanelPaper: {
    marginTop: 20,
  },
  leftPanelResultPaper: {
    marginTop: 20,
    height: 500
  },
  rightPanelResultPaper: {
    marginTop: 20,
    height: 500
  },
  profilePicContainer: {
    width: '80%',
    margin: 'auto'
  },
  profilePic: {
    width: '100%',
    height: 'auto',
  },
  blankLive: {
    height: 400,
  },
  profileCard: {
    marginTop: 10,
    height: 400
  },
  profileCardContent: {
    padding: 5
  }
}));

const videoConstraints = {
  width: 960,
  height: 1080,
  facingMode: "user"
};


export default function RecordAttendance(props) {
  const classes = useStyles();
  const employeeProfilePic = `http://dev-metaspf401.sunpowercorp.com:4000/codecs-img/${props.userData.id}.png` || '';
  
  function addDefaultImg(e){
    e.target.src = `https://robohash.org/${props.userData.id}`
  }

  return (
    <Container fixed>
      <Grid container spacing={2} direction="row" justify="center" alignItems="center">
        {
          <Grid item xs={12} sm={12} md={6} lg={6} >
            <Paper elevation={0} className={classes.leftPanelPaper} >
              <CardContent>
                <Typography align="left" variant="h6">Welcome to SunPower</Typography>
              </CardContent>
              <Container maxWidth="sm">
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Scan ID to Enter"
                  autoFocus
                  onChange={props.handleEmployeeNumberOnChange}
                  value={props.employee_number}
                />
                <Paper elevation={0} className={classes.profileCard}>
                  <CardContent className={classes.profileCardContent}>
                    {
                      props.userData.id && props.userData.name ?
                      <>
                        <div className={classes.profilePicContainer}>
                          <img src={employeeProfilePic} onError={addDefaultImg} className={classes.profilePic}/>
                        </div>
                        <Grid container>
                          <Grid item xs={12} sm={12} md={3} lg={3}>
                            <Typography align="left" variant="body2" color="textSecondary">Employee No.</Typography>
                            <Typography align="left" variant="h4" gutterBottom>{props.userData.id}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={9}>
                            <Typography align="left" variant="body2" color="textSecondary">Name</Typography>
                            <Typography align="left" variant="h4">{props.userData.name}</Typography>
                          </Grid>
                        </Grid>
                      </>
                      :
                      <></>
                    }
                  </CardContent>
                </Paper>
                {
                  /*
                <Webcam
                  audio={false}
                  mirrored={true}
                  height={'0'}
                  ref={props.webcamRef}
                  minScreenshotWidth={360}
                  minScreenshotHeight={360}
                  screenshotFormat="image/jpeg"
                  width={'0'}
                  videoConstraints={videoConstraints}
                />
                */}
              </Container>
            </Paper>
          </Grid>
        }
        <Grid item xs={12} sm={12} md={6} lg={6}>
          {
            props.userData.id && props.userData.name && props.employee_number ? 
            <Paper elevation={0} className={classes.rightPanelPaper} >
              <CardContent>
                <Paper elevation={2} className={classes.blankLive}>
                  <CardContent>

                  </CardContent>
                </Paper>
                <img src={props.imgSrc} className={classes.profilePic}/>
              </CardContent>
              <Container maxWidth="md">
                <Typography variant="h4" color="textSecondary" align="center" gutterBottom>{moment(new Date()).format('MMMM DD YYYY, h:mm:ss a')}</Typography>
              </Container>
            </Paper>
            :
            <Paper elevation={0} className={classes.rightPanelPaper} >
              <CardContent>
                <Typography align="right" variant="h5" color="textSecondary">Recent Logs</Typography>
              </CardContent>
              <Container maxWidth="md">
                {
                  props.recentLogs !== 'undefined' && props.recentLogs !== null && props.recentLogs.length > 0 ?
                    props.recentLogs.slice(0, 5).map((data) => (
                      <Fragment key={data.date_time}>
                        <div style={{padding: 10, flex: 1}}>
                          <Typography variant="h6" color="primary" align="right">{data.employeeNumber} has successfully logged in</Typography>
                          <Typography variant="body2" color="textSecondary" align="right">{moment(data.date_time).fromNow()}</Typography>
                        </div>
                      </Fragment>
                    ))
                  :
                  <></>
                }
                
              </Container>
            </Paper>
          }
        </Grid>
      </Grid>
    </Container>
  );
}