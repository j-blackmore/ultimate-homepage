import {useEffect, useState, useCallback} from 'react';
import GoogleLogo from '../../assets/images/google-logo.png';

const getAuthUser = (res) => {
  const authRes = res.getAuthResponse(true);
  const profile = res.getBasicProfile();

  return {
    userId: profile.getId(),
    name: profile.getName(),
    email: profile.getEmail(),
    accessToken: authRes.access_token,
  };
};

const signIn = async () => {
  // Returns authUser object
  const GoogleAuth = window.gapi.auth2.getAuthInstance();
  if (GoogleAuth.isSignedIn.get()) {
    return getAuthUser(GoogleAuth.currentUser.get());
  } else {
    return await GoogleAuth.signIn().then((res) => getAuthUser(res));
  }
};

const initGoogleAuthApi = async (authCredentials) => {
  // we should check if the auth2 has been init with .auth2.getAuthInstance()
  return await window.gapi.auth2
    .init(authCredentials)
    .then(() => true)
    .catch(() => false);
};

const GoogleSignIn = ({onLoginSuccess, credentials}) => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const [authUser, setAuthUser] = useState(false);

  const handleLogin = useCallback(async () => {
    const loadSuccesful = await initGoogleAuthApi(credentials);
    if (!loadSuccesful) {
      return;
    }
    const authUser = await signIn();
    onLoginSuccess(authUser);
    setAuthUser(authUser);
  }, [credentials, onLoginSuccess]);

  useEffect(() => {
    if (window.gapi === undefined) {
      setAuthLoaded(false);
      return;
    }

    window.gapi.load('auth2', () => {
      setAuthLoaded(true);
      handleLogin();
    });
  }, [handleLogin]);

  return authUser ? (
    <span className="google-signedin">
      <p>
        Signed In as: <b>{authUser.name}</b>
      </p>
    </span>
  ) : (
    <button className="google-signin" disabled={!authLoaded} onClick={handleLogin}>
      <img className="small-logo" src={GoogleLogo} />
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
