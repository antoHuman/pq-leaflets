import {useEffect, useState} from "react";

const useMedia = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);
  useEffect(()=> {
    const media = window.matchMedia(query);
    const handleMediaChange = () => {
      setMatches(media.matches);
    }
    handleMediaChange();
    media.addEventListener('change', handleMediaChange);
    return ()=> {
      media.removeEventListener('change', handleMediaChange);
    }
  })
  return matches
}

export default useMedia;
