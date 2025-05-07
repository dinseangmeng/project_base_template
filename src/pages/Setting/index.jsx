import React from 'react';
import { Typography ,Button} from 'antd';
import useBearStore from '../../store/count';
import './index.css';

const { Title } = Typography;

const Setting = () => {
  const count = useBearStore((state) => state.count);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return (
    <div>
      <p>Welcome to the setting page!</p>
      <p>Count: {count}</p>
      <Button onClick={increasePopulation}>Increase Count</Button>
    </div>
  );
};

export default Setting; 