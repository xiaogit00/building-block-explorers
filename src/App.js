import './App.css';
import { useState, useEffect } from 'react';
import { Dropdown, Empty } from 'antd';
import { DownOutlined } from '@ant-design/icons';

function App() {

  const [blocks, setBlocks] = useState([...Array(5).keys()])
  const [selectedBlock, setSelectedBlock] = useState(null)
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      )
    }
  ];
  return (
    <>
      <div className='outerContainer'>
        <div><img src="https://res.cloudinary.com/dl4murstw/image/upload/v1686183530/Covalent_Icon_Colored_xidjiq.png" className='covalentLogo' alt="covalent-logo" height="40" width="40"/></div>
        <div className='topContainer'>
          <div className='dropdown '>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                  Ethereum
                  <DownOutlined />
              </a>
            </Dropdown>
          </div>
          <div className='blocks'>
            {blocks.map(block => (
              <div className='block' key={block}>
                <div><img src='https://res.cloudinary.com/dl4murstw/image/upload/v1686185288/virtual_awy3m3.png' alt='block' height='126' width='126'/></div>
                <div className='blockNumber'>#1999308</div>
                <div className='time'>1 sec ago</div>
              </div>
            ))}
          </div>
          <div className='next '>
            <img src='https://res.cloudinary.com/dl4murstw/image/upload/v1668500894/next_e7qvca.png' alt='arrow' height='64' width='64'/>
          </div>
        </div>
        <div className='title'>block #1990322</div>
        <div className='transactionsComponent'>
          <Empty />
        </div>
      </div>
    </>
  );
}

export default App;
