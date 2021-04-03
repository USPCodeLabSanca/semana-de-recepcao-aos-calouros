import {useEffect} from 'react';
import {withRouter} from 'react-router-dom';

/**
 * Scroll To Top
 *
 * @param {object} props
 *
 * @return {object}
 */
function ScrollToTop({history, children}) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return children;
}

export default withRouter(ScrollToTop);
