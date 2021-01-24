import {useState} from 'react';
import {authCredentials} from '../../credentials';

import Header from '../Header/Header';
import SearchBars from '../SearchBars/SearchBars';

const App = () => {
  const [, setAuthUser] = useState(undefined);

  return (
    <div className="ultimate-homepage">
      <Header onSignIn={setAuthUser} credentials={authCredentials} />
      <SearchBars />
    </div>
  );
};

export default App;
