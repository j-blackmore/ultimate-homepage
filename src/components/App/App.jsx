import {useState} from 'react';
import {authCredentials} from '../../credentials';
import Gmail from '../Gmail/Gmail';

import Header from '../Header/Header';
import SearchBars from '../SearchBars/SearchBars';

const App = () => {
  const [authUser, setAuthUser] = useState(undefined);

  return (
    <div className="ultimate-homepage">
      <Header onSignIn={setAuthUser} credentials={authCredentials} />
      <SearchBars />
      <Gmail authUser={authUser} />
    </div>
  );
};

export default App;
