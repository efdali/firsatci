import React, { useCallback, useState } from 'react';
import Button from '../Button';
import './form.scss';

function Form({ setData }) {
  const [isShown, setIsShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [selector, setSelector] = useState('');

  const newProductHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (!url && !name && !selector) {
        return;
      }
      setLoading(true);
      fetch('http://localhost:5000/new', {
        method: 'POST',
        body: JSON.stringify({ url, name, selector }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            setData(response.data.newData);
            setUrl('');
            setName('');
            setSelector('');
            setIsShown(false);
          }
        })
        .finally(() => setLoading(false));
    },
    [url, name, selector],
  );

  return (
    <div className={`form-container ${!isShown ? 'f-left' : ''}`}>
      <Button onClick={() => setIsShown(true)}>Ürün Ekle</Button>
      <form className={`new-product-form ${isShown ? 'active' : ''}`} onSubmit={newProductHandler}>
        <a href="#" className="close-form" onClick={() => setIsShown(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
          </svg>
        </a>
        <div className="url-input">
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            type="url"
            placeholder="Product Url"
            required
          />
          <a href="#" className="paste-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.508 11.504l.93-2.494 2.998 6.268-6.31 2.779.894-2.478s-8.271-4.205-7.924-11.58c2.716 5.939 9.412 7.505 9.412 7.505zm7.492-9.504v-2h-21v21h2v-19h19zm-14.633 2c.441.757.958 1.422 1.521 2h14.112v16h-16v-8.548c-.713-.752-1.4-1.615-2-2.576v13.124h20v-20h-17.633z" />
            </svg>
          </a>
        </div>
        <div className="input-group">
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
            type="text"
            placeholder="Product Name"
            required
          />
          <input
            value={selector}
            onChange={({ target }) => setSelector(target.value)}
            type="text"
            placeholder="Product Selector"
            disabled
          />
          <button disabled={loading}>Start Following</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
