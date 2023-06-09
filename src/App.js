import './App.css';
import { useState, useEffect } from 'react';
import { Select, Empty, Spin } from 'antd';
import axios from 'axios'
import Transactions from './components/Transactions';
import { blockExplorerURLs } from './utils/blockExplorerURLs';
import { allChains } from './utils/allChains';

function App() {

  const [selectedChainName, setSelectedChainName] = useState('eth-mainnet')
  const [loadingBlocks, setLoadingBlocks] = useState(false)
  const [blocks, setBlocks] = useState([...Array(5).keys()])
  const [selectedBlock, setSelectedBlock] = useState(null)

  useEffect(() => {
    setLoadingBlocks(true)
    let latestBlock
    const blocksEndpoint = (blockNumber) => `https://api.covalenthq.com/v1/${selectedChainName}/block_v2/${blockNumber}/`
    const config = {
      auth: {
        username: process.env.REACT_APP_COVALENT_APIKEY 
      }
    }
  
    axios.get(blocksEndpoint('latest'), config)
      .then(res => latestBlock = res.data.data.items[0])
      .then(() => {
        const block2 = axios.get(blocksEndpoint(Number(latestBlock.height) - 1), config)
        const block3 = axios.get(blocksEndpoint(Number(latestBlock.height) - 2), config)
        const block4 = axios.get(blocksEndpoint(Number(latestBlock.height) - 3), config)
        const block5 = axios.get(blocksEndpoint(Number(latestBlock.height) - 4), config)
        axios.all([block2, block3, block4, block5])
          .then(axios.spread((...res) => {
            setBlocks([latestBlock, 
              res[0].data.data.items[0],
              res[1].data.data.items[0],
              res[2].data.data.items[0],
              res[3].data.data.items[0],
            ])
            setLoadingBlocks(false)
          }))
      })
      .catch(err => console.log(err))
  }, [selectedChainName])
  
  const handleChange = (value) => {
    setSelectedChainName(value)
    setSelectedBlock(null)
    setLoadingBlocks(true)
  };

  const chainOptions = blockExplorerURLs.map(item => ({
    value: item.chainId[1],
    label: item.chainId[1]
  }))

  return (
    <>
      <div className='outerContainer'>
        <div><img src="https://res.cloudinary.com/dl4murstw/image/upload/v1686183530/Covalent_Icon_Colored_xidjiq.png" className='covalentLogo' alt="covalent-logo" height="40" width="40"/></div>
        <div className='topTitle'><img src={allChains.filter(item => item.name === selectedChainName)[0].logo_url} alt='chainLogo' className='chainLogo'/> {selectedChainName}</div>
        <div className='topContainer'>
          <div className='dropdown '>
            <Select
              defaultValue="eth-mainnet"
              style={{ width: 156 }}
              onChange={handleChange}
              options={chainOptions}
            />
          </div>
          <div className='blocks'>
            {blocks.map(block => (
              <div className='block' key={block} onClick={() => setSelectedBlock(block.height)}>
                <div><img src='https://res.cloudinary.com/dl4murstw/image/upload/v1686185288/virtual_awy3m3.png' alt='block' height='126' width='126'/></div>
                <div className='blockNumber'>{loadingBlocks ? <Spin />: '#' + block.height }</div>
                <div className='time'>{loadingBlocks ? <Spin /> : ((Date.now() - new Date(block.signed_at))/1000).toFixed(0) + ' secs ago' }</div>
              </div>
            ))}
          </div>
          <div className='next '>
            <img src='https://res.cloudinary.com/dl4murstw/image/upload/v1668500894/next_e7qvca.png' alt='arrow' height='64' width='64'/>
          </div>
        </div>
        <div className='title'>{!selectedBlock ? null : 'block #' + selectedBlock}</div>
        <div className='transactionsComponent'>
          {selectedBlock ? <Transactions chainName={selectedChainName} selectedBlock={selectedBlock}/> : <Empty description="No blocks selected"/>}
          {/* <Transactions chainName={'eth-mainnet'} block={selectedBlock}/> */}
        </div>
      </div>
    </>
  );
}

export default App;
