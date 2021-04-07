import {useEffect} from 'react';

import {animateScroll as scroll} from 'react-scroll';
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
      return scroll.scrollToTop({smooth: false, duration: 0, delay: 0});
    });
    return () => {
      unlisten();
    };
  }, []);

  return children;
}

export default withRouter(ScrollToTop);
