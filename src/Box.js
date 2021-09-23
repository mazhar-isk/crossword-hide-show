import { Card, Col } from "antd";

export default function Box({
  value,
  show = false,
  isActive = false,
  borderless = false,
  boxNumber = 0,
  handleClick,
}) {
  return (
    <Col span="1" style={{ position: 'relative' }} onClick={handleClick}>
      <Card
        size="small"
        hoverable={borderless}
        style={{
          height: '50px',
          background: borderless ? 'white' : '#E92124',
          borderColor: isActive ? 'black' : '#E92124',
          color: '#E92124',
          fontSize: '18px',
          opacity: (show || isActive) ? 1 : 0.5,
        }}
      >
        <span>{show ? value : ''}</span>
      </Card>
      {boxNumber ? <div className="box-number">{boxNumber}</div> : null}
    </Col>
  )
}
