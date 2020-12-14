import React, { useCallback, useEffect, useState } from 'react';
import Form from '../components/Form';
import Loading from '../components/Loading';
import Search from '../components/Search';
import Table from '../components/Table';

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)
      .then((res) => res.json())
      .then((response) => {
        setData(response.data);
      })
      .finally(() => setLoading(false));
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
      {loading ? (
        <div className="loading-wrapper">
          <Loading />
        </div>
      ) : (
        <>
          <Form setData={(newData) => setData([newData, ...data])} />
          <Search onSearchChange={filterData} />
          <Table data={filteredData} />
        </>
      )}
    </div>
  );
}

export default Home;
