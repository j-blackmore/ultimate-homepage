import {useState, useEffect} from 'react';

const formatDateLong = (date) =>
  date.toLocaleString('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    var ticker = setInterval(() => setTime(new Date()), 250);
    return () => clearInterval(ticker);
  }, []);

  return (
    <div className="header">
      <h1 className="current-time">{formatDateLong(time)}</h1>
    </div>
  );
};

export default Header;
