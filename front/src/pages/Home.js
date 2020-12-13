import React, { useCallback, useEffect, useState } from 'react';
import Form from '../components/Form';
import Search from '../components/Search';
import Table from '../components/Table';

function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.json())
      .then((response) => {
        setData(response.data);
      });
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const filterData = useCallback(
    (value) => {
      if (!value && data.length > 0) {
        setFilteredData(data);
        return;
      }
      setFilteredData(data.filter((product) => product.name?.includes(value) || product.url.includes(value)));
    },
    [data],
  );
  return (
    <div>
      <Form setData={(newData) => setData([newData, ...data])} />
      <Search onSearchChange={filterData} />
      <Table data={filteredData} />
    </div>
  );
}

export default Home;
