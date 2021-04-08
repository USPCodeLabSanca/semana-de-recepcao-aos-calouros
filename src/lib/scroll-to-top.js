import {useEffect} from 'react';

import {
  useLocation,
  withRouter,
} from 'react-router-dom';

/**
 * Scroll To Top
 *
 * @param {object} props
 *
 * @return {object}
 */
function ScrollToTop({history, children}) {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return children;
}

export default withRouter(ScrollToTop);
