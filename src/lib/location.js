import { create } from 'zustand';
import axios from 'axios';

/**
 * Lowercases and strips accents so 'Fávaro' and 'favaro' match the same keyword
 *
 * @param {string} text
 * @return {string}
 */
export function normalizeLocationText(text) {
  return (text || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

/**
 * Zustand Store for dynamic locations and search state
 */
export const useLocationSearch = create((set, get) => ({
  location: null,
  open: false,
  locations: [],
  locationsMap: {},
  searchKeywords: [],
  isLoaded: false,

  setLocation: (location) => set(() => ({ location })),
  setOpen: (open) => set(() => ({ open })),
  reset: () => set(() => ({ location: null, open: false })),

  /**
   * Loads dynamic locations from the CMS backend
   */
  loadDynamicLocations: async () => {
    try {
      const response = await axios.get('/api/locations');
      if (response.data && response.data.locationsMap) {
        set({
          locations: response.data.locations || [],
          locationsMap: response.data.locationsMap,
          searchKeywords: response.data.searchKeywords || [],
          isLoaded: true,
        });
      }
    } catch (err) {
      console.warn('Não foi possível carregar os locais do campus:', err.message);
    }
  },

  getLocationObject: (id) => {
    const { locationsMap } = get();
    return locationsMap[id] || locationsMap['usp'];
  },
}));

/**
 * Resolves the location ID from event text: an exact name/ID/keyword match wins; otherwise the longest
 * keyword found in the text, so results no longer depend on the order locations were registered.
 * @param {string} local - Name or text of location
 * @return {string} Matching location ID or 'usp'
 */
export function getLocationId(local) {
  const cleanLocal = normalizeLocationText(local);
  if (!cleanLocal) return 'usp';

  const rules = useLocationSearch.getState().searchKeywords;

  // Text identical to a name/ID/keyword (e.g. picked from the editor list) is unambiguous
  const exact = rules.find((rule) => normalizeLocationText(rule.search) === cleanLocal);
  if (exact) return exact.id;

  let bestId = 'usp';
  let bestLength = 0;
  for (const rule of rules) {
    const keyword = normalizeLocationText(rule.search);
    if (keyword.length > bestLength && cleanLocal.includes(keyword)) {
      bestId = rule.id;
      bestLength = keyword.length;
    }
  }

  return bestId;
}

// Auto-trigger load on module import in browser
if (typeof window !== 'undefined') {
  useLocationSearch.getState().loadDynamicLocations();
}
