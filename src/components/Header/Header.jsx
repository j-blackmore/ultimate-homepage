import {useState, useEffect} from 'react';
import GoogleSignIn from '../Gmail/GoogleSignIn';

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

const Header = ({onSignIn, credentials}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    var ticker = setInterval(() => setTime(new Date()), 250);
    return () => clearInterval(ticker);
  }, []);

  return (
    <div className="header">
      <h1 className="current-time">{formatDateLong(time)}</h1>
      <GoogleSignIn onLoginSuccess={onSignIn} credentials={credentials} />
    </div>
  );
};

export default Header;
