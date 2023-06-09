import React from 'react'
import { Tag, Popover, Descriptions } from 'antd'

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

const truncateEthAddress = (address) => {
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
    };

const columns = (blockexplorerURL) => [
  {
    title: 'Txn Hash',
    dataIndex: 'tx_hash',
    key: 'tx_hash',
    width: '12%',
    render: (txnHash) => {
      return (
        <a
          style={{ fontSize: '1.3em' }}
          href={blockexplorerURL + 'tx/' + txnHash}
          target="_blank"
          rel="noopener noreferrer">
          {txnHash}
        </a>
      )
    }
  },
  {
    title: 'Events',
    dataIndex: 'event',
    key: 'event',
    width: '8%',
    render: (_, record) => {
      if (record.logEvents.length > 0) {
        return (
          <>
            {record.logEvents.map((logEvent, index) => {
              if (logEvent) {
                let color = logEvent.name.length > 5 ? 'geekblue' : 'green'
                if (logEvent.name === 'Transfer') {
                  color = 'volcano'
                }
                const content = (
                  <>
                    <Descriptions size={'small'} column={1} title={logEvent.name} bordered>
                      {Object.entries(logEvent).map((item) => {
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
                      {logEvent.name.toUpperCase()}
                    </Tag>
                  </Popover>
                )
              }
            })}
          </>
        )
      }
    }
  },
  {
    title: '',
    dataIndex: 'block_height',
    key: 'tx_hash'
  },
  {
    title: '',
    dataIndex: 'from_address',
    key: 'from_address',
  },
  {
    title: '',
    dataIndex: 'to_address',
    key: 'to_address',
  },
  {
    title: '',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: '',
    dataIndex: 'fees_paid',
    key: 'fees_paid',
  },
]

export { columns }