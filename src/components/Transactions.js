import React, { useState, useEffect } from 'react'
import { transform } from '../utils/transform'
import { Table, Tag, Popover, Descriptions, Spin } from 'antd'
import { blockExplorerURLs } from '../utils/blockExplorerURLs'
import axios from 'axios'


const Transactions = ({ chainName, selectedBlock }) => {
  const [txns, setTxns] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const blockExplorer = blockExplorerURLs.filter(item => item.chainId[1] === chainName)
  const blockexplorerURL = (blockExplorer?.length) ? blockExplorer[0].url : 'https://blockscan.com/'

  useEffect(() => {
    setIsLoading(true)
    const blockTxnsEndpoint = `https://api.covalenthq.com/v1/${chainName}/block/${selectedBlock}/transactions_v3/`
    const config = {
        auth: {
          username: process.env.REACT_APP_COVALENT_APIKEY 
        }
      }
    
    axios.get(blockTxnsEndpoint, config)
      .then(res => {
        const txns = res.data.data.items
        const transformedTxns = transform(txns.filter((txn) => txn.log_events?.length < 30))
        setTxns(transformedTxns)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
    }, [chainName, selectedBlock])

  if (isLoading) {
    return <Spin />
  }

  if (txns.length) {
    return (
      <>
       <Table dataSource={txns} className='table' columns={columns(blockexplorerURL)} rowKey="txnHash" />
      </>
    )
  }
}

export default Transactions

const columns = (blockexplorerURL) => ([
    {
      title: 'Txn Hash',
      dataIndex: 'tx_hash',
      key: 'tx_hash',
      width: '15%',
      render: (text) => (<><a href={blockexplorerURL + 'tx/' + text} target="_blank" rel="noreferrer">{text.slice(0,15)}</a>...</>)
    },
    {
      title: 'Events',
      dataIndex: 'events',
      key: 'event',
      width: '25%',
      render: (_, record) => {
        if (record.log_events.length > 0) {
          return (
            <>
              {record.log_events.map((log_events, index) => {
                if (log_events) {
                  let color = log_events.name.length > 5 ? 'geekblue' : 'green'
                  if (log_events.name === 'Transfer') {
                    color = 'volcano'
                  }
                  const content = (
                    <>
                      <Descriptions size={'small'} column={1} title={log_events.name + ' Event'} bordered>
                        {Object.entries(log_events).map((item) => {
                          return (
                            <Descriptions.Item key={item[0]} label={item[0]}>
                              {item[1]}
                            </Descriptions.Item>
                          )
                        })}
                      </Descriptions>
                    </>
                  )
                  return (
                    <Popover key={index} content={content} placement="rightBottom" trigger="click">
                      <Tag color={color} key={index} style={{ cursor: 'pointer' }}>
                        {log_events.name.toUpperCase()}
                      </Tag>
                    </Popover>
                  )
                }
                return null
              })}
            </>
          )
        }
      }
    },
    {
      title: 'Block',
      dataIndex: 'block_height',
      width: '5%',
      key: 'tx_hash'
    },
    {
      title: 'Date',
      dataIndex: 'block_signed_at',
      width: '15%',
      key: 'tx_hash',
      render: (text, record) => {
        const newDate = new Date(record.block_signed_at)
        const timeString12Hr = newDate.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour12: true,
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        })
        const day = newDate.toLocaleString('en-US', { day: 'numeric', month: 'short' })
        return (
          <>
            <div>
              {day}, {timeString12Hr}
            </div>
          </>
        )
      }
    },
    {
      title: 'From',
      dataIndex: 'from_address',
      width: '10%',
      key: 'from_address',
      render: (text) => (<>
      <a href={blockexplorerURL + 'address/' + text} target="_blank" rel="noreferrer">{truncateEthAddress(text)} </a>
      <img src="https://res.cloudinary.com/dl4murstw/image/upload/v1685502645/copy_prfttd.png" 
            alt="copy" 
            height="16px" 
            onClick={() => navigator.clipboard.writeText(text)} className='copyText'
            />
        </>
        ) 
    },
    {
      title: 'To',
      dataIndex: 'to_address',
      width: '10%',
      key: 'to_address',
      render: (text) => (<>
        <a href={blockexplorerURL + 'address/' + text} target="_blank" rel="noreferrer">{truncateEthAddress(text)} </a>
        <img src="https://res.cloudinary.com/dl4murstw/image/upload/v1685502645/copy_prfttd.png" 
              alt="copy" 
              height="16px" 
              onClick={() => navigator.clipboard.writeText(text)} className='copyText'
              />
          </>
          ) 
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: '15%',
      key: 'value',
      render: (text) => Number(text) !== 0 ? (Number(text)/10**18).toFixed(8) + ' ETH': 0 + ' ETH'
    },
    {
      title: 'Fees',
      dataIndex: 'fees_paid',
      width: '15%',
      key: 'fees_paid',
      render: (text) => Number(text) !== 0 ? (Number(text)/10**18).toFixed(8) + ' ETH': 0 + ' ETH'
    },
  ])

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

const truncateEthAddress = (address) => {
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
    };