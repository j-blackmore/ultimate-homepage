import {useState} from 'react';

const openInNewWindow = (url) => {
  window.open(url);
};

const SearchBar = ({queryUrl, placeholder, logoSrc, focus = false}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      openInNewWindow(queryUrl + input);
      setInput('');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-logo">{logoSrc && <img src={logoSrc} />}</div>
      <input
        type="text"
        autoFocus={Boolean(focus)}
        value={input}
        onChange={handleInputChange}
        placeholder={placeholder}
        onKeyPress={handleSubmit}
      />
    </div>
  );
};

export default SearchBar;
