import {Button, createStyles, makeStyles, Modal, Theme, Typography, Box, scopedCssBaselineClasses} from "@mui/material";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {Link} from "react-router-dom";
import './BookingModal.scss'



export default function BookingModal ({ showBookingModal, setShowBookingModal }: any) {

  const handleClose = () => {
    setShowBookingModal(false);
  };

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    maxWidth: '90vw',
    minWidth: '85vw',
    maxHeight: '90vh',
    // minHeight: '85vh',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      className="info-modal"
      open={showBookingModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box component="div" sx={modalStyle}>
        <HighlightOffIcon className="closeModalButton" onClick={() => { setShowBookingModal(false)}}/>

        <Typography variant="h3" className="secondaryColor">Space Booking</Typography>

        <br/>

        <Link to={'space'} onClick={() => setShowBookingModal(false)}>See The Space in 3D and VR</Link>

        <br/>
        <br/>

        <Typography className="secondaryColor">
          <a target="_blank" href="#">Booking Form</a><br/>
        </Typography>
      </Box>
    </Modal>
  )
}
