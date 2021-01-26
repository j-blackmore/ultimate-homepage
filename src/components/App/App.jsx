import {useState} from 'react';
import {authCredentials} from '../../credentials';

import Header from '../Header/Header';
import Column from '../Layout/Column';
import SearchBars from '../SearchBars/SearchBars';
import Gmail from '../Gmail/Gmail';

const App = () => {
  const [authUser, setAuthUser] = useState(undefined);

  return (
    <div className="ultimate-homepage">
      <Header onSignIn={setAuthUser} credentials={authCredentials} />
      <Column>
        <SearchBars />
      </Column>
      <Column>
        <Gmail authUser={authUser} />
      </Column>
    </div>
  );
};

export default App;
