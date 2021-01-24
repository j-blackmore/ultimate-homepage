import {useState, useEffect} from 'react';

const fetchEmail = async (authUser, email) => {
  const {userId, accessToken} = authUser;

  return await fetch(`https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/${email.id}`, {
    headers: {Authorization: `Bearer ${accessToken}`},
  }).then((res) => res.json());
};

const fetchLatestEmails = async (authUser) => {
  const {userId, accessToken} = authUser;
  // get some emails
  const searchQuery = 'is:unread label:inbox';
  const firstEmails = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages?q=${searchQuery}`,
    {
      headers: {Authorization: `Bearer ${accessToken}`},
    }
  )
    .then((res) => res.json())
    .then((res) => res.messages);

  return firstEmails;
};

const transformEmailResponse = (emailRes) => {
  const {headers} = emailRes.payload;

  const stripEmails = (from) => {
    let emailAdrRegex = /<([^>]+)>/;
    let stripEmailRegex = /<[^>]*>|"/g;

    let emailMatches = from.match(emailAdrRegex);
    let emailAdr = emailMatches?.lenth >= 1 ? emailMatches[1] : '';
    let name = from.replace(stripEmailRegex, '');

    return {
      name: name,
      email: emailAdr,
    };
  };

  // TODO - Decode the message body
  return {
    id: emailRes.id,
    labels: emailRes.labelIds,
    to: headers.find((x) => x.name === 'To').value,
    from: stripEmails(headers.find((x) => x.name === 'From').value),
    subject: headers.find((x) => x.name === 'Subject').value,
    date: headers.find((x) => x.name === 'Date').value,
    snippet: emailRes.snippet,
  };
};

const Gmail = ({authUser}) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    console.log('gmail update');

    if (!authUser) return;

    const fetchEmails = async () => {
      const latestEmails = await fetchLatestEmails(authUser);

      console.log('emails:', latestEmails);

      let newEmails = [];
      for (let i = 0; i < latestEmails.length; i++) {
        let nextEmail = await fetchEmail(authUser, latestEmails[i]);
        newEmails.push(transformEmailResponse(nextEmail));
      }
      setEmails(newEmails);
    };
    fetchEmails();
  }, [authUser]);

  const emailsToDisplay = 5;

  return (
    <div className="gmail">
      {authUser ? (
        <>
          <h2>Unread Emails ({emails.length})</h2>
          {emails.slice(0, emailsToDisplay).map((e, i) => (
            <Email key={i} email={e} />
          ))}
        </>
      ) : (
        <h2>Log in to view emails</h2>
      )}
    </div>
  );
};

const Email = ({email}) => {
  return (
    <div className="email">
      <div className="email-from">
        <span className="name">{email.from.name}</span>
        <span className="email-address">{email.from.email}</span>
      </div>
      <div className="email-preview">{email.snippet}</div>
    </div>
  );
};

export default Gmail;
