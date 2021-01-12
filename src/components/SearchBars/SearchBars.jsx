import SearchBar from './SearchBar';
// TODO - absolute imports from /src instead of '../../...' etc
import GoogleLogo from '../../assets/images/google-logo.png';
import YoutubeLogo from '../../assets/images/youtube-logo.png';

const searchConfig = [
  {
    placeholder: 'Search Google',
    queryUrl: 'http://google.com/search?=',
    logoSrc: GoogleLogo,
  },
  {
    placeholder: 'Search Youtube',
    queryUrl: 'http://youtube.com/search?=',
    logoSrc: YoutubeLogo,
  },
];

const SearchBars = () => {
  return (
    <div className="search-bars">
      {searchConfig.map((x, i) => (
        <SearchBar key={i} placeholder={x.placeholder} queryUrl={x.queryUrl} logoSrc={x.logoSrc} />
      ))}
    </div>
  );
};

export default SearchBars;
