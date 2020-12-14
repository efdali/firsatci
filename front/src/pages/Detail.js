import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailChart from '../components/DetailChart';
import Button from '../components/Button';
import '../styles/detail.scss';
import Loading from '../components/Loading';

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/' + id)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res.product);
        setPrices(res.prices);
      })
      .finally((res) => setLoading(false));
  }, []);
  return (
    <div>
      {loading ? (
        <div className="loading-wrapper">
          <Loading />
        </div>
      ) : (
        <>
          <div className="detail-header">
            <Button className="product-btn" href={product.url}>
              {product.name || 'Ürün Sayfasına Git'}
            </Button>
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
        </>
      )}
    </div>
  );
}

export default Detail;
