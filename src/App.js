import { useState, useEffect } from 'react';
import { Row, Typography, notification, Button } from 'antd';
import { QuestionCircleOutlined, EyeOutlined } from '@ant-design/icons';
import Box from './Box';
import {
  MasterData,
  Data1,
  Data2,
  Data3,
  Data4,
  Data5,
  Data6,
  Data7,
  Data8,
  Data9,
  Data10,
  Questions
} from './data';
import { isEmpty } from 'lodash';
const { Title } = Typography

function App() {
  const [tiles, setTiles] = useState(MasterData)
  const [activeBox, setActiveBox] = useState([])
  const [activeKey, setActiveKey] = useState(0)
  const [selectedBox, setSelectedBox] = useState(0)
  const [currentCollection, setCurrentCollection] = useState(undefined)
  const _getKey = (idx, isActive) => {
    const selected = []
    if (isActive) {
      if (Data1.includes(idx)) selected.push(1)
      if (Data2.includes(idx)) selected.push(2)
      if (Data3.includes(idx)) selected.push(3)
      if (Data4.includes(idx)) selected.push(4)
      if (Data5.includes(idx)) selected.push(5)
      if (Data6.includes(idx)) selected.push(6)
      if (Data7.includes(idx)) selected.push(7)
      if (Data8.includes(idx)) selected.push(8)
      if (Data9.includes(idx)) selected.push(9)
      if (Data10.includes(idx)) selected.push(10)
    }
    setActiveBox(selected)
  }

  const _checkTilesActive = async () => {
    const currentKey = activeBox[activeKey]
    let currentTiles = [...tiles]
    setCurrentCollection(undefined)
    currentTiles = await currentTiles.map((item) => ({ ...item, isActive: false }))

    let arrCollection = []
    switch (currentKey) {
      case 1:
        arrCollection = Data1
        break;
      case 2:
        arrCollection = Data2
        break;
      case 3:
        arrCollection = Data3
        break;
      case 4:
        arrCollection = Data4
        break;
      case 5:
        arrCollection = Data5
        break;
      case 6:
        arrCollection = Data6
        break;
      case 7:
        arrCollection = Data7
        break;
      case 8:
        arrCollection = Data8
        break;
      case 9:
        arrCollection = Data9
        break;
      case 10:
        arrCollection = Data10
        break;
      default:
        arrCollection = []
        break;
    }

    if (!isEmpty(arrCollection)) {
      await arrCollection.forEach((item) => {
        currentTiles[item] = { ...currentTiles[item], isActive: true }
      })
    }

    setSelectedBox(currentKey)
    setTiles(currentTiles)
    setCurrentCollection(arrCollection)
  }

  const _showAnswer = async () => {
    const currentTiles = [...tiles]
    await currentCollection.forEach((item) => {
      currentTiles[item] = { ...currentTiles[item], show: true }
    })

    setTiles(currentTiles)
    setActiveBox([])
  }

  useEffect(() => {
    if (activeBox.length > 1) {
      setActiveKey(e => e === 0 ? 1 : 0)
    } else {
      setActiveKey(0)
    }
    _checkTilesActive()
  }, [activeBox])

  useEffect(() => {
    notification.destroy()
    if (selectedBox) {
      notification.info({
        message: Questions[selectedBox - 1],
        icon: <QuestionCircleOutlined style={{ color: '#108ee9' }} />,
      });
    }
  }, [selectedBox])

  return (
    <div className="App">
      <header className="App-header">
        <Title strong style={{ color: 'white' }}>NyabarJum</Title>
        <div
          style={{
            margin: '1rem auto',
            position: 'relative',
            maxWidth: '1024px'
          }}
        >
          <Row gutter={[0, 0]}>
            {[...Array(24 * 2)].map(() => <Box key={'a' + Math.random()} />)}
            {tiles.map((item, idx) => {
              const { show, value, boxNumber, bordered, isActive } = item || {}
              return (
                <Box
                  key={idx}
                  show={show}
                  value={value}
                  borderless={bordered}
                  boxNumber={boxNumber}
                  isActive={isActive}
                  handleClick={() => _getKey(idx, bordered)}
                />
              )
            })}
            {[...Array(24 * 2)].map(() => <Box key={'b' + Math.random()} />)}
          </Row>
          {selectedBox ? (
            <div style={{ position: 'absolute', top: 20, left: 20 }}>
              <Button
                type="primary"
                shape="round"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => _showAnswer()}
              >
                Show
              </Button>
            </div>
          ) : null}
        </div>
      </header>
    </div>
  );
}

export default App;
