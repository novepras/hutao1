import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import PageButton from './components/PageButton';
import ConnectButton from './components/ConnectButton';

function App() {
  const [provider, setProvider] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [signerAddress, setSignerAddress] = useState(undefined)

  useEffect(() => {
    const onLoad = async () => {
      const provider = await ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)
    }
    onLoad()
  }, [])

  const getSigner = async provider => {
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer)
  }
  const isConnceted = () => signer !== undefined
  const getWalletAddress = () => {
    signer.getAddress()
    .then(address => {
      setSignerAddress(address)

      // todo: connect weth and uni contracts
    })
  }

  if (signer !== undefined) {
    getWalletAddress()
  }
  
  return (
    <div className="App">
      <div className="appNav">
        <div className="my-2 buttonContainer buttonCountainerTop">
          <PageButton name={"Swap"} isBold={true} />
          <PageButton name={"Pool"} />
          <PageButton name={"Stake"} />
          <PageButton name={"HOMA"} />
        </div>
            
            <div className="rightNav">
              <div className="connectButtonContainer">
                <ConnectButton
                  provider={provider}
                  isConnceted={isConnceted}
                  signerAddress={signerAddress}
                  getSigner={getSigner}
                />
              </div>
              <div className="my-2 buttonContainer">
              <PageButton name={"..."}isBold={true} />
              </div>
            </div>
      </div>
    </div>
  );
}

export default App;


