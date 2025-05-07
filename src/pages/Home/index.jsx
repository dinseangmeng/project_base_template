import React from 'react';
import { Typography ,Button} from 'antd';
import useBearStore from '../../store/count';
import './index.css';

const { Title } = Typography;

const Home = () => {
  const count = useBearStore((state) => state.count);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return (
    <div>
      <Title level={2}>Home Page</Title>
      <p>Welcome to the home page!</p>
      <p>Count: {count}</p>
      <Button onClick={increasePopulation}>Increase Count</Button>
    </div>
  );
};

export default Home; 