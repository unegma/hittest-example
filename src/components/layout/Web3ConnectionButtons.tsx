import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { injected, walletconnect } from "../../helpers/connectors";
import { useEagerConnect, useInactiveListener } from "../../helpers/hooks";
import getErrorMessage from "../../helpers/getErrorMessage";
import { Spinner } from "../various/Spinner";
import { Button, Modal, Box} from "@mui/material";
import {Typography} from "@mui/material";
import {HighlightOff as HighlightOffIcon} from "@mui/icons-material";
// import BuyButton from "./BuyButton";

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  maxWidth: '90vw',
  minWidth: '85vw',
  maxHeight: '90vh',
  minHeight: '85vh',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


enum ConnectorNames {
  Metamask = 'Metamask',
  WalletConnect = 'WalletConnect'
}

const connectorsByName: { [connectorName in ConnectorNames]: any} = {
  [ConnectorNames.Metamask]: injected,
  [ConnectorNames.WalletConnect]: walletconnect
}

export default function Web3ConnectionButtons({setAddress, setSettingsOpen}: any) {
  const context = useWeb3React<Web3Provider>(); // todo check because this web3provider is from ethers
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  const handleDisconnect = () => {
    if (connector === connectorsByName[ConnectorNames.WalletConnect]) {
      console.log('Deactivating WalletConnect session');
      (connector as any).close(); // todo unfinsihed
      deactivate();
    } else {
      deactivate();
    }
  }

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const showModal = () => {
    setModalOpen(true);
  }

  const hideModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={hideModal}
        // className="connection-modal"
      >
        <Box component="div" sx={modalStyle} className={`modalBoxContainer`} >
          <HighlightOffIcon className="closeModalButton" onClick={() => { hideModal()}}/>

          {(!active && !error) && (
            <h2 className="modalTitle">Choose Connection Type<br/><br/></h2>
          )}

          {(active || error) && (
            <h2 className="modalTitle">Info<br/><br/></h2>
          )}

          {!!error && <h4>{getErrorMessage(error)}</h4>}

          <div>
            <div className="connectButtonContainer">

              {Object.keys(connectorsByName).map((name: any) => {

                // don't display metamask button on mobile

                // @ts-ignore
                if (!window.ethereum && name === ConnectorNames.Metamask) {
                  return;
                }

                const currentConnector = connectorsByName[name as keyof typeof ConnectorNames];
                const activating = currentConnector === activatingConnector;
                const connected = currentConnector === connector;
                const disabled = !triedEager || !!activatingConnector || connected || !!error;

                let nameLabel;
                // bit of a hacky override
                if (name === 'Metamask') {
                  nameLabel = 'Metamask/Browser'
                } else {
                  nameLabel = name;
                }

                return (
                  (!active && !error) && (

                    <Button
                      variant="outlined"
                      color="primary"
                      className="connectTypeButton"
                      disabled={disabled}
                      key={name}
                      onClick={() => {
                        setActivatingConnector(currentConnector);
                        activate(connectorsByName[name as keyof typeof ConnectorNames]);
                      }}
                    >
                      <div>
                        {activating && <Spinner color={'black'} style={{ height: '25%', marginLeft: '-1rem' }} />}
                        {connected && (
                          <span role="img" aria-label="check">
                          ✅
                        </span>
                        )}
                      </div>
                      {nameLabel}
                    </Button>
                  )
                )
              })}
            </div>

          </div>
          <div className="mywallet-button-container">
            {(active) && (
              // <Button variant="contained" color="primary" onClick={hideModal} component={Link} to="/wallet">
              //   Go To My Wallet
              // </Button>
              <Typography className="black">Connected to: <span className="minitext">{account}</span></Typography>
            )}
            <br/>

            {!active &&
              <Typography className="black"><b>(You may need to refresh the page when changing chains or
                wallets.)</b></Typography>
            }
            {/*<br/>*/}
            {/*<Button variant="contained" color="primary" onClick={()=>{window.location.reload();}}>Refresh Page</Button>*/}
            {/*<br/>*/}
            { !active &&
              <div className="youtube-link-container">
                <br/>
                <a target="_blank" href="https://www.youtube.com/watch?v=6h_liI6atEk">Learn how to set up a MetaMask wallet.</a>
              </div>
            }
          </div>
          <Button className="closeModalButton--large" variant="contained" color="primary" onClick={hideModal}>
            Close
          </Button>
        </Box>
      </Modal>

      {(!active && !error) && (
        <>
          {/*<div className="donateButton-container">*/}
          {/*  <BuyButton />*/}
          {/*</div>*/}
          <Button variant="outlined" color="secondary" className={`connectButton web3connectButton`} onClick={showModal}>
            Connect
          </Button>
        </>
      )}

      {(active || error) && (
        <>
          {/*<div className="donateButton-container">*/}
          {/*  <BuyButton />*/}
          {/*</div>*/}
          <Button variant="outlined" color="secondary" className={`disconnectButton web3connectButton`} onClick={() => {handleDisconnect()}}>
            Disconnect
          </Button>
        </>
      )}

      {/*{!!(library && account) && (*/}
      {/*  <button*/}
      {/*    style={{*/}
      {/*      height: '3rem',*/}
      {/*      borderRadius: '1rem',*/}
      {/*      cursor: 'pointer'*/}
      {/*    }}*/}
      {/*    onClick={() => {*/}
      {/*      library*/}
      {/*        .getSigner(account)*/}
      {/*        .signMessage('👋')*/}
      {/*        .then((signature: any) => {*/}
      {/*          window.alert(`Success!\n\n${signature}`)*/}
      {/*        })*/}
      {/*        .catch((error: any) => {*/}
      {/*          window.alert('Failure!' + (error && error.message ? `\n\n${error.message}` : ''))*/}
      {/*        })*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Sign Message*/}
      {/*  </button>*/}
      {/*)}*/}

    </>
  )
}
