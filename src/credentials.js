const SCOPE = 'https://www.googleapis.com/auth/gmail.readonly';
const creds = {
  client_id: '',
  client_secret: '',
};

export const authCredentials = {
  client_id: creds.client_id,
  client_secret: creds.client_secret,
  scope: SCOPE,
};
