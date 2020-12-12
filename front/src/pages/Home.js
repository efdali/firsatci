import React, { useEffect, useState } from 'react';
import Form from '../components/Form';
import Search from '../components/Search';
import Table from '../components/Table';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.json())
      .then((response) => {
        setData(response.data);
      });
  }, []);
  return (
    <div>
      <Form setData={(newData) => setData([newData, ...data])} />
      <Search />
      <Table data={data} />
    </div>
  );
}

export default Home;
