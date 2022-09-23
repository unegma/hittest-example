import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import React, {Suspense, useState} from "react";
import {Environment, Html, OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
// import ReserveToken from "../3d/ReserveToken";
import {InputAdornment} from "@mui/material";
// import Warning from "../various/Warning";
// import {TransactionsChartDeploy} from "../various/TransactionsChartDeploy";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const RESERVE_EXAMPLE = process.env.REACT_APP_RESERVE_EXAMPLE;
const GITHUB_LINK = process.env.REACT_APP_GITHUB_URL;

type adminPanelProps = {
}

export default function DashboardScreen({} : adminPanelProps) {

  const [adminConfigPage, setAdminConfigPage] = useState(0);
  const [reserveClaimable, setReserveClaimable] = useState("100");
  const [reserveName, setReserveName] = React.useState("Test");
  const [reserveSymbol, setReserveSymbol] = React.useState("tTKN");
  const [buttonLock, setButtonLock] = useState(false);


  function resetToDefault() {
    setReserveClaimable("100");
    setReserveName("Test");
    setReserveSymbol("tTKN");
  }

  const handleChangeReserveName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReserveName(event.target.value);
  }
  const handleChangeReserveSymbol = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newReserveSymbol = event.target.value;
    // if (newReserveSymbol.length <= 0) { alert("Must be > 0."); return;}
    if (newReserveSymbol.length > 11) { alert("Symbol must be 11 characters or less."); return;}
    setReserveSymbol(newReserveSymbol);
  }
  const handleChangeReserveClaimable = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newClaimable = event.target.value;
    if (parseInt(newClaimable) <= 0) { alert("Must be > 0."); return;}
    if (parseInt(newClaimable) > 1000) { alert("Can't have more than 1000 in this example."); return;}
    // if (newClaimable == "") { alert("Must be > 0."); return;}
    setReserveClaimable(newClaimable);
  }

  const deployToken = () => {};

  return (
    <>
      {/*<div className="home-screen-cover">*/}
        {/*<div className="home-screen-button-container">*/}
        {/*  <Button size='large' className="home-screen-button" variant='contained' onClick={(event:any) => {toggleLeftSideDrawer(event)}}>Enter</Button>*/}
        {/*</div>*/}
      {/*</div>*/}
      {/*<div className="home-screen-image" style={{backgroundImage: `url(${process.env.REACT_APP_ASSETS_URL}/ark.jpeg)`}}/>*/}

      <p className={'github github--firstview'}><a href={`${GITHUB_LINK}`} target="_blank">(Github Link)</a></p>

      <Box
        className="admin-form"
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >

        <Typography variant="h4" component="h2" color="black" align="center">
          Configure Faucet Deployment
        </Typography>

        { adminConfigPage === 0 && (
          <>
            <Typography color="black" align="center">
              <a className="bullet" href="https://youtu.be/4aIbUDuW9CM" target="_blank">Rain Protocol Examples Intro Video</a><br/>
              <a className='bullet'  href="https://docs.rainprotocol.xyz">Docs at: docs.rainprotocol.xyz</a><br/>
              {/*todo change to rUSD?*/}
              <a className='bullet'  href={`${window.location.origin}/${RESERVE_EXAMPLE}`} target="_blank">Example Faucet: Rain USD (rUSD)</a>
            </Typography>
          </>
        )}

        {/*<Canvas hidden={!(adminConfigPage !== 1)} className="the-canvas-deploypanel" camera={{ position: [0, 0, 20], fov: 20 }} performance={{ min: 0.1 }}>*/}
        {/*  <ambientLight intensity={0.1} />*/}
        {/*  <directionalLight intensity={0.01} position={[5, 25, 20]} />*/}
        {/*  <Suspense fallback={<Html className="black">loading..</Html>}>*/}
        {/*    /!*<ReserveToken rotation={[1,1,1]} reserveSymbol={reserveSymbol} />*!/*/}
        {/*    <Environment preset="studio" />*/}
        {/*  </Suspense>*/}
        {/*  <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} enablePan={false} enableRotate={false} />*/}
        {/*</Canvas>*/}

        { adminConfigPage === 0 && (
          <>
            <Typography variant="h5" component="h3" color="black">
              (Page 1/2)
            </Typography>

            <FormControl variant="standard">
              <InputLabel className="input-box-label" htmlFor="component-helper">Reserve Token Name</InputLabel>
              <Input
                id="component-helper"
                value={reserveName}
                onChange={handleChangeReserveName}
              />
            </FormControl>

            <FormControl variant="standard">
              <InputLabel className="input-box-label" htmlFor="component-helper">Reserve Token Symbol</InputLabel>
              <Input
                id="component-helper"
                value={reserveSymbol}
                onChange={handleChangeReserveSymbol}
              />
            </FormControl>

            <FormControl variant="standard">
              <InputLabel className="input-box-label" htmlFor="component-helper">Amount a Faucet User will Receive Each Claim</InputLabel>
              <Input
                id="component-helper"
                value={reserveClaimable}
                onChange={handleChangeReserveClaimable}
                endAdornment={<InputAdornment position="end">{reserveSymbol}</InputAdornment>}
              />
            </FormControl>

            <div className="buttons-box">
              <Button className="fifty-percent-button" variant="outlined" onClick={() => {resetToDefault()}}>Reset</Button>
              <Button className="fifty-percent-button" variant="contained" onClick={() => {setAdminConfigPage(adminConfigPage+1)}}>Next</Button>
            </div>
          </>
        )}

        { adminConfigPage === 1 && (
          <>
            {/*<TransactionsChartDeploy />*/}

            <Typography variant="h5" component="h3" color="black">
              (Page 2/2)
            </Typography>

            {/*<Warning />*/}

            <div className="buttons-box">
              <Button className="fifty-percent-button" variant="outlined" onClick={() => {setAdminConfigPage(adminConfigPage-1)}}>Previous</Button>
              <Button className="fifty-percent-button" disabled={buttonLock} variant="contained" onClick={() => {deployToken()}}>Deploy</Button>
            </div>
          </>
        )}
      </Box>

    </>
  )
}
