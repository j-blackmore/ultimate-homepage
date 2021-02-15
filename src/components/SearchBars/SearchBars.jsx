import SearchBar from './SearchBar';
// TODO - absolute imports from /src instead of '../../...' etc
import GoogleLogo from '../../assets/images/google-logo.png';
import YoutubeLogo from '../../assets/images/youtube-logo.png';

const searchConfig = [
  {
    id: 'google-search',
    placeholder: 'Search Google',
    queryUrl: 'http://google.com/search?q=',
    logoSrc: GoogleLogo,
    focus: true,
  },
  {
    id: 'youtube-search',
    placeholder: 'Search Youtube',
    queryUrl: 'http://youtube.com/search?q=',
    logoSrc: YoutubeLogo,
  },
];

const SearchBars = () => {
  return (
    <div className="search-bars">
      {searchConfig.map((x) => (
        <SearchBar key={x.id} {...x} />
      ))}
    </div>
  );
};

export default SearchBars;
