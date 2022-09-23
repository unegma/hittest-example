import React, {useState} from 'react';
import {
  Route, Routes
} from "react-router-dom";
import './App.css';
import NavBar from "./components/layout/NavBar";
import {CameraAltOutlined, ChevronLeft, ChevronRight, InfoOutlined, Menu} from "@mui/icons-material";
import PhotoViewer from "./components/layout/PhotoViewer";
import InfoModal from "./components/layout/InfoModal";
import LeftSideDrawer from "./components/layout/LeftSideDrawer";
import HomeScreen from "./components/pages/HomeScreen";
import DashboardScreen from "./components/pages/DashboardScreen";
import RelicOne from "./components/pages/RelicOne";
import RightSideDrawer from "./components/layout/RightSideDrawer";
import Lion from "./components/3d/Lion";
import Pitcher from "./components/3d/Pitcher";
import Car from "./components/3d/Car";
import Statue from "./components/3d/Statue";
// import BookingModal from "./components/BookingModal";

function App() {
  const [showImages, setShowImages] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerRightOpen, setDrawerRightOpen] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);

  // TODO these aren't goint to get updated when route changes if the url is loaded directly
  const [infoTitle, setInfoTitle] = React.useState('The Title');
  const [infoText, setInfoText] = React.useState('The Description');

  const toggleLeftSideDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === 'keydown' && (
        (event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift'))
      {
        return;
      }
      setDrawerOpen(!drawerOpen);
  };
  const toggleRightSideDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === 'keydown' && (
        (event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift'))
      {
        return;
      }
    setDrawerRightOpen(!drawerRightOpen);
  };

  return (
    <div className="App">
      {/*<CssBaseline /> todo add this? */}

      <NavBar toggleLeftSideDrawer={toggleLeftSideDrawer} showBookingModal={showBookingModal} setShowBookingModal={setShowBookingModal} />

      <InfoModal showInfoModal={showInfoModal} setShowInfoModal={setShowInfoModal} />
      {/*<BookingModal showBookingModal={showBookingModal} setShowBookingModal={setShowBookingModal} />*/}
      <PhotoViewer showImages={showImages} />

      <LeftSideDrawer
        drawerOpen={drawerOpen}
        toggleLeftSideDrawer={toggleLeftSideDrawer}
        setShowImages={setShowImages}
        setShowInfoModal={setShowInfoModal}
        setInfoTitle={setInfoTitle}
        setInfoText={setInfoText}
      />

      <RightSideDrawer
        infoOpen={infoOpen}
        toggleRightSideDrawer={toggleRightSideDrawer}
        // setShowImages={setShowImages}
        // setShowInfoModal={setShowInfoModal}
        // showInfoModal={showInfoModal}
        infoTitle={infoTitle}
        infoText={infoText}
        drawerRightOpen={drawerRightOpen}
        setDrawerRightOpen={setDrawerRightOpen}
      />

      <Routes>
        <Route
          key={'home'}
          path="/"
          element={
            <HomeScreen toggleLeftSideDrawer={toggleLeftSideDrawer}/>
          }
        />

        <Route
          key={'dashboard'}
          path="/dashboard"
          element={
            <DashboardScreen />
          }
        />

        <Route
          key={'lion'}
          path="/lion"
          element={
            <RelicOne rotationLock={false} cameraPosition={[-5,5,-5]} minDistance={4} maxDistance={10} relic={<Lion />}/>
          }
        />

        <Route
          key={'pitcher'}
          path="/pitcher"
          element={
            <RelicOne rotationLock={true} cameraPosition={[-1.5,1.5,-1.5]} minDistance={1.5} maxDistance={10} relic={<Pitcher />}/>
          }
        />

        <Route
          key={'car'}
          path="/car"
          element={
            <RelicOne rotationLock={true} cameraPosition={[1.5,1.5,1.5]} minDistance={1.5} maxDistance={10} relic={<Car />}/>
          }
        />
        <Route
          key={'statue'}
          path="/statue"
          element={
            <RelicOne rotationLock={true} cameraPosition={[1.5,1.5,1.5]} minDistance={1.5} maxDistance={10} relic={<Statue />}/>
          }
        />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>

      <div className={`buttons-container buttons-container--left`}>
        <Menu className="pointer" style={{ color: "black", margin: "0 4px" }} onClick={(event) => {toggleLeftSideDrawer(event)}}/>
      </div>

      <div className="buttons-container">
        {/*<InfoOutlined className="pointer" style={{ color: "black", margin: "0 4px" }} onClick={() => {setShowInfoModal(!showInfoModal)}}/>*/}

        <div className="pointer" onClick={(event) => {toggleRightSideDrawer(event)}}>
          <InfoOutlined className="pointer" style={{ color: "black", margin: "0 4px" }} />
          { drawerRightOpen && (
            <ChevronRight style={{ color: "black", margin: "0 4px" }} />
          )}
          { !drawerRightOpen && (
            <ChevronLeft style={{ color: "black", margin: "0 4px" }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
