import { useState, useEffect, useReducer } from 'react';
import { Row, Col, Typography, notification, Button, Card, Input, message } from 'antd';
import { QuestionCircleOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import { MasterData, AnswerKeys, Questions } from './data';
import Box from './Box';
const { Title } = Typography

const initialState = {
  authorized: false,
  message: ''
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      if (action.payload.user === 'nemo' && action.payload.pass === '5uL1t') {
        return {
          ...state,
          authorized: true
        }
      } else {
        return {
          ...state,
          message: 'Akun tidak ditemukan'
        }
      }
    default:
      return {
        ...state,
        message: ''
      }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [tiles, setTiles] = useState(MasterData)
  const [activeBox, setActiveBox] = useState([])
  const [activeKey, setActiveKey] = useState(0)
  const [selectedBox, setSelectedBox] = useState(0)
  const [form, setForm] = useState({ user: '', pass: '' })
  const _getKey = (idx, isActive) => {
    const selected = []
    if (isActive) {
      AnswerKeys.forEach((item, index) => {
        if (item.includes(idx)) selected.push(index + 1)
      })
    }
    setActiveBox(selected)
  }

  const _handleLogin = () => {
    console.log(form === { user: 'nemo', pass: '5uL1t' }, form)
    dispatch({ type: 'LOGIN', payload: form })
  }

  const _checkTilesActive = async () => {
    const currentKey = activeBox[activeKey]
    let currentTiles = [...tiles]
    currentTiles = await currentTiles.map((item) => ({ ...item, isActive: false }))

    if (currentKey) {
      await AnswerKeys[currentKey - 1].forEach((item) => {
        currentTiles[item] = { ...currentTiles[item], isActive: true }
      })
    }

    setSelectedBox(currentKey)
    setTiles(currentTiles)
  }

  const _showAnswer = async () => {
    const currentTiles = [...tiles]
    if (selectedBox) {
      await AnswerKeys[selectedBox - 1].forEach((item) => {
        currentTiles[item] = { ...currentTiles[item], show: true }
      })
    }

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

  useEffect(() => {
    if (state.message) {
      message.error(
        state.message,
        10
      );
    }
  }, [state])

  if (state.authorized) {
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
  return (
    <Row style={{ height: '100vh', width: '100vw' }}>
      <div style={{ margin: 'auto' }}>
        <Card
          style={{ width: '576px' }}
          actions={[
            <Button
              type="primary"
              shape="round"
              onClick={() => _handleLogin()}
            >
              Masuk
            </Button>
          ]}
        >
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Input
                size="large"
                placeholder="Username"
                name="user"
                suffix={<UserOutlined />}
                onChange={e => setForm({
                  ...form,
                  user: e.target.value
                })}
              />
            </Col>
            <Col span={24}>
              <Input.Password
                size="large"
                placeholder="Password"
                name="pass"
                suffix={<UserOutlined />}
                onChange={e => setForm({
                  ...form,
                  pass: e.target.value
                })}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </Row>
  );

}

export default App;
