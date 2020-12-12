import React from 'react';
import { Link } from 'react-router-dom';
import './table.scss';

function Table({ data }) {
  return (
    <div className="data-container">
      {data.length > 0 &&
        data.map((product) => (
          <div className="data" key={product._id}>
            <div>{product.name}</div>
            <div>n11.com</div>
            <div>
              satıcı: <b>xyzStore</b>
            </div>
            <div>
              Güncel Fiyat: <b>{product.price}</b>
            </div>
            <div>
              <Link to={`/${product._id}`}>İncele</Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Table;
