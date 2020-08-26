import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import Layout from '../components/Layout';
import AppBar from '../components/AppBar';
import RecordAgreementAttendance from '../components/RecordAgreementAttendance';
import { withAuthSync, logout } from '../utils/auth';
import nextCookie from 'next-cookies';
import { set } from 'js-cookie';


function Index(props) {

  // state for login profile
  const [ loginProfile, setLoginProfile ] = useState('');
  //console.log(loginProfile.username);

  const [switcher, setSwitcher] = useState({
    answer_1A: false,
    answer_1B: false,
    answer_1C: false,
    answer_1D: false,
    answer_2: false,
    answer_3: false,
    answer_4: false,
    answer_5: false,
  });

  const handleSwitcherChange = (event) => {
    setSwitcher({ ...switcher, [event.target.name]: event.target.checked });
  };

  // state for Employee Number
  const [ employee_number, setEmployee_number ] = useState('');
  const handleEmployeeNumberOnChange = (e) => {
    setEmployee_number(e.target.value);
    //setScan(true)
  }

  // state for EMPLOYEE SIGNATURE TRIAGE
  const [ employee_number_signature, setEmployee_number_signature ] = useState('');
  const handleEmployeeNumberSignatureOnChange = (e) => {
    setEmployee_number_signature(e.target.value);
    setScan(true)
  }

  // state for pause after scan
  const [ pauseAfterScan, setPauseAfterScan ] = useState(false);
  const [ pauseAfterScanTriage, setPauseAfterScanTriage ] = useState(false);

  // state for RECORD ATTENDACE response message
  const [ serverResponseMessage, setServerResponseMessage ] = useState('');
  console.log(serverResponseMessage);

  // state for User Data
  const [ userData, setUserData ] = useState('');
  console.log(userData);

  // state for recent logs
  const [ recentLogs, setRecentLogs ] = useState('');
  //console.log(recentLogs);
  
  // state for image capturing
  const [imgSrc, setImgSrc] = useState(null);
  //console.log(imgSrc);
  const webcamRef = useRef(null);

  // state for new scan remove image
  const [ scan, setScan ] = useState(true);

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      
      setServerResponseMessage({status: ''})
      setPauseAfterScan(true);
      setPauseAfterScanTriage(false);
      console.log('Go Search!');
  
      fetchLoginInfo().then(() => {
          fetchAccountInfo().then(() => {
            SubmitToServer()
          })
      })

      async function fetchLoginInfo(){
        let routePOST = 'http://dev-metaspf401.sunpowercorp.com:4000/getuserprofile'
        
        let responsePOST = await fetch(`${routePOST}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: props.token
          })
        })
  
        if(responsePOST.status === 200){
          setLoginProfile(await responsePOST.json());
        }
  
      }

      async function fetchAccountInfo(){
        let route = 'http://dev-metaspf401.sunpowercorp.com:4848/getaccountinfo'
        
        let response = await fetch(`${route}/${employee_number}`)
    
        if(response.status === 200){
          //const imageSrc = webcamRef.current.getScreenshot();
          //setImgSrc(imageSrc);
          setUserData(await response.json());
          setSwitcher({
            answer_1A: false,
            answer_1B: false,
            answer_1C: false,
            answer_1D: false,
            answer_2: false,
            answer_3: false,
            answer_4: false,
            answer_5: false,
          })
          setScan(false);
          
        }
      }

      async function SubmitToServer(){
        let routePOST = 'http://dev-metaspf401.sunpowercorp.com:4000/recordattendance'

          let responsePOST = await fetch(`${routePOST}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: props.token,
              employeeNumber: employee_number,
              mode: 'IN',
              device: 'ENTRANCE1',
              base64String: imgSrc,
              triageRes: 'PASS'
            })
          })

          if(responsePOST.status === 200){
            setServerResponseMessage(await responsePOST.json());
          }
      }
    }
  }

  const handleKeyDownSignature = (e) => {
    if(e.key === 'Enter'){
      
      setEmployee_number('');
      setEmployee_number_signature('');
      setUserData('');
      console.log('Go Submit!');
      setPauseAfterScan(false);
      setPauseAfterScanTriage(true);
      
  
      fetchLoginInfo().then(() => {
        if(employee_number === employee_number_signature){
          SubmitToServer().then(() => {
          })
        } else {
          setServerResponseMessage({status: 'not_same'})
        }
      })

      
      async function SubmitToServer(){
        let routePOST = 'http://dev-metaspf401.sunpowercorp.com:4001/recordemployeeagreement'
        //console.log(imgSrc).then(() => {
        let responsePOST = await fetch(`${routePOST}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: props.token,
            employeeNumber: employee_number_signature,
            mode: 'IN',
            answer_1A: switcher.answer_1A ? 'YES' : 'NO',
            answer_1B: switcher.answer_1B ? 'YES' : 'NO',
            answer_1C: switcher.answer_1C ? 'YES' : 'NO',
            answer_1D: switcher.answer_1D ? 'YES' : 'NO',
            answer_2: switcher.answer_2 ? 'YES' : 'NO',
            answer_3: switcher.answer_3 ? 'YES' : 'NO',
            answer_4: switcher.answer_4 ? 'YES' : 'NO',
            answer_5: switcher.answer_5 ? 'YES' : 'NO',
          })
        })

        if(responsePOST.status === 200){
          //console.log(await responsePOST.json());
          setServerResponseMessage(await responsePOST.json());
        }
      }

      async function fetchLoginInfo(){
        let routePOST = 'http://dev-metaspf401.sunpowercorp.com:4000/getuserprofile'
        
        let responsePOST = await fetch(`${routePOST}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: props.token
          })
        })
  
        if(responsePOST.status === 200){
          setLoginProfile(await responsePOST.json());
        }
  
      }
  
    }
  }
  /*
  useEffect(() => {

    async function fetchLoginInfo(){
      let routePOST = 'http://dev-metaspf401.sunpowercorp.com:4000/getuserprofile'
      
      let responsePOST = await fetch(`${routePOST}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token
        })
      })

      if(responsePOST.status === 200){
        setLoginProfile(await responsePOST.json());
      }

    }

    fetchLoginInfo();
  }, [employee_number]);

  // get user data info
  useEffect(() => {
    async function fetchAccountInfo(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4848/getaccountinfo'
      
      let response = await fetch(`${route}/${employee_number}`)
  
      if(response.status === 200){
        //const imageSrc = webcamRef.current.getScreenshot();
        //setImgSrc(imageSrc);
        setUserData(await response.json());
        
        setScan(false);
        
      }
    }

    fetchAccountInfo().then(() => {
      
      if(!scan){
        async function SubmitToServer(){
          let routePOST = 'http://dev-metaspf401.sunpowercorp.com:4000/recordattendance'

          //console.log(imgSrc).then(() => {
          let responsePOST = await fetch(`${routePOST}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: props.token,
              employeeNumber: userData.id,
              mode: 'IN',
              device: 'ENTRANCE1',
              base64String: imgSrc,
              triageRes: 'PASS'
            })
          })

          if(responsePOST.status === 200){
            //console.log(await responsePOST.json());
      
            setServerResponseMessage(await responsePOST.json());
          }
        }

        SubmitToServer().then(() => {
          if(!scan){
            async function fetchAttendance(){
              let route = 'http://dev-metaspf401.sunpowercorp.com:4000/getattendancelogs'
              
              let response = await fetch(`${route}/IN/${loginProfile.username}`)
          
              if(response.status === 200){
                setRecentLogs(await response.json())
              }
            }

            fetchAttendance();
          }
        });
      }
    })

    
  }, [employee_number]);
  */

  /* AUG 24, 2020 ----
  useEffect(() => {
    async function fetchAttendance(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4000/getattendancelogs'
      
      let response = await fetch(`${route}/IN/${loginProfile.username}`)
  
      if(response.status === 200){
        setRecentLogs(await response.json())
      }
    }

    fetchAttendance();
  }, [userData]);
  */
  
  // -- RESTART SWITCH AFTER SEARCHING...
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setEmployee_number('')
      setPauseAfterScan(false);
    }, 60000);
    return () => clearTimeout(timer);
  }, [serverResponseMessage])
  

  return (
    <Fragment>
      {/*<AppBar />*/}
      <Layout>
        <RecordAgreementAttendance
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          webcamRef={webcamRef}
          userDataLength={userData.length}
          userData={userData}
          employee_number={employee_number}
          recentLogs={recentLogs}
          handleEmployeeNumberOnChange={handleEmployeeNumberOnChange}
          serverResponseMessage={serverResponseMessage}
          pauseAfterScan={pauseAfterScan}
          pauseAfterScanTriage={pauseAfterScanTriage}
          handleKeyDown={handleKeyDown}
          switcher={switcher}
          handleSwitcherChange={handleSwitcherChange}
          employee_number_signature={employee_number_signature}
          handleEmployeeNumberSignatureOnChange={handleEmployeeNumberSignatureOnChange}
          handleKeyDownSignature={handleKeyDownSignature}
        />
      </Layout>
    </Fragment>
  );
}

export default withAuthSync(Index);

Index.getInitialProps = async (context) => {
  const {token} = nextCookie(context);
  return {token};
}