import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailChart from '../components/DetailChart';
import Button from '../components/Button';
import '../styles/detail.scss';

function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/' + id)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res.product);
        setPrices(res.prices);
      });
  }, []);
  return (
    <div>
      <div className="detail-header">
        <Button href={product.url}>{product.name || 'Ürün Sayfasına Git'}</Button>
        <Button>Takip Et</Button>
        <div className="info-area">
          <span>
            Güncel Fiyat: <b>{prices.length > 0 && prices[prices.length - 1].price}</b>
          </span>
          <span>
            <b>n11.com</b> üzerinden <b>xyzStore.com</b> satıyor.
          </span>
        </div>
      </div>
      <br />
      <DetailChart productData={prices.length > 0 ? prices : []} />
    </div>
  );
}

export default Detail;
