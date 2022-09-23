import React, {useEffect, useState} from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import {sign} from "node:crypto";
import {Box, Button, FormControl, InputAdornment, InputLabel, Modal, OutlinedInput, Typography} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const DONATION_ADDRESS = `${process.env.REACT_APP_DONATION_ADDRESS}`;

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

type ConsoleState = 'error' | 'success';

export default function BuyButton() {
  const { account, library } = useWeb3React();
  const [modalOpen, setModalOpen] = useState(false);
  const [ethDonation, setEthDonation] = useState<number>(0.00001);
  const [consoleMessage, setConsoleMessage] = useState("");
  const [consoleState, setConsoleState] = useState<ConsoleState>('success');

  const showModal = () => {
    setModalOpen(true);
  }

  const hideModal = () => {
    setModalOpen(false);
  };

  const handleChange = (value: any) => {
    console.log(value)
    setEthDonation(value);
  };

  const sendTransaction = () => {
    library
      .getSigner(account)
      .sendTransaction({
        to: DONATION_ADDRESS,
        value: ethers.utils.parseEther(ethDonation.toString())
      })
      // .signMessage(`This will be the value ${ethDonation}ETH`)
      .then((signature: any) => {
        console.log(signature);
        setConsoleState('success');
        setConsoleMessage(`Thanks!`);
        // todo get receipt
      })
      .catch((error: any) => {
        console.log(error);
        setConsoleState('error');
        setConsoleMessage('There was an error, do you have enough funds?');
      })
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={hideModal}
      >
        <Box component="div" sx={modalStyle}>
          <HighlightOffIcon className="closeModalButton" onClick={() => { setModalOpen(false)}}/>

          <h2 className="modalTitle">Buy (Eth)</h2>

          <Typography className='red'>
            Please be aware that this feature is in Beta mode. Gas fees are also non-refundable.
          </Typography>

          <br/>

          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              type="number"
              id="outlined-adornment-amount"
              value={ethDonation}
              onChange={(e) => handleChange(e.target.value)}
              startAdornment={<InputAdornment position="start">&#8801;</InputAdornment>}
              // labelWidth={60}
            />
          </FormControl>
          <br/>
          <p className={consoleState === 'error' ? 'red' : 'green' }>{consoleMessage}</p>
          <Button className="buyButton" variant="contained" color="error" onClick={sendTransaction}>
            Buy
          </Button>
          <Button className="closeModalButton--large" variant="contained" color="primary" onClick={hideModal}>
            Close
          </Button>
        </Box>
      </Modal>

      {account ? (
        <Button className="buyButton" variant="contained" color="error" onClick={showModal}>
          Buy
        </Button>
      ) : (
        <Button className="buyButton" variant="contained" color="error" disabled={true}>
          Buy &rarr;
        </Button>
      )}
    </>
  )
}
