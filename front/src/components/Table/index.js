import React from 'react';
import { Link } from 'react-router-dom';
import './table.scss';

function Table() {
  return (
    <div className="data-container">
      <div className="data">
        <div>Xiaomi Redmi Note 10</div>
        <div>n11.com</div>
        <div>
          satıcı: <b>xyzStore</b>
        </div>
        <div>
          Güncel Fiyat: <b>4000 TL</b>
        </div>
        <div>
          <Link href="/5">İncele</Link>
        </div>
      </div>
      <div className="data">
        <div>Xiaomi Redmi Note 10</div>
        <div>n11.com</div>
        <div>
          satıcı: <b>xyzStore</b>
        </div>
        <div>
          Güncel Fiyat: <b>4000 TL</b>
        </div>
        <div>
          <Link href="/5">İncele</Link>
        </div>
      </div>
    </div>
  );
}

export default Table;
