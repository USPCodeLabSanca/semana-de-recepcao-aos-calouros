import { create } from 'zustand';
import axios from 'axios';

export const Locations = {
  'biblioteca': {
    name: 'Biblioteca Achille Bassi',
    lat: -22.007651392315037,
    lon: -47.89485555630038,
  },
  'fernao': {
    name: 'Auditório Prof. Fernão Stella de Rodrigues Germano',
    lat: -22.0071297170172,
    lon: -47.89503460681919,
  },
  'redondo': {
    name: 'Redondo (ICMC - Bloco 4)',
    lat: -22.007278766924777,
    lon: -47.89451516652856,
  },
  'caaso': {
    name: 'CAASO',
    lat: -22.00686526493565,
    lon: -47.89679693933321,
  },
  'eventos': {
    name: 'Salão de Eventos USP',
    lat: -22.00498466537535,
    lon: -47.896350653644944,
  },
  'bloco-3': {
    name: 'ICMC - Bloco 3',
    lat: -22.007632580401413,
    lon: -47.89434738232872,
  },
  'bloco-4': {
    name: 'ICMC - Bloco 4',
    lat: -22.007278766924777,
    lon: -47.89451516652856,
  },
  'bloco-6': {
    name: 'ICMC - Bloco 6',
    lat: -22.0070097170172,
    lon: -47.89499460681919,
  },
  'favaro': {
    name: 'Auditório Fávaro',
    lat: -22.007256580401413,
    lon: -47.89441738232872,
  },
  'usp': {
    name: 'USP São Carlos (Campus 1)',
    lat: -22.00707221830916,
    lon: -47.89683843242551,
  },
};

export const LocationsSearch = [
  { search: 'biblioteca', id: 'biblioteca' },
  { search: 'fernão', id: 'fernao' },
  { search: 'fernao', id: 'fernao' },
  { search: '3-', id: 'bloco-3' },
  { search: 'bloco 3', id: 'bloco-3' },
  { search: '4-', id: 'bloco-4' },
  { search: 'bloco 4', id: 'bloco-4' },
  { search: 'eventos', id: 'eventos' },
  { search: 'redondo', id: 'redondo' },
  { search: 'fávaro', id: 'favaro' },
  { search: 'favaro', id: 'favaro' },
  { search: 'caaso', id: 'caaso' },
  { search: '6-', id: 'bloco-6' },
  { search: 'bloco 6', id: 'bloco-6' },
];

/**
 * Zustand Store for dynamic locations and search state
 */
export const useLocationSearch = create((set, get) => ({
  location: null,
  open: false,
  locations: [],
  locationsMap: { ...Locations },
  searchKeywords: [...LocationsSearch],
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
          locationsMap: { ...Locations, ...response.data.locationsMap },
          searchKeywords: response.data.searchKeywords?.length > 0 ? response.data.searchKeywords : LocationsSearch,
          isLoaded: true,
        });
      }
    } catch (err) {
      console.warn('Usando locais locais do campus como fallback:', err.message);
    }
  },

  getLocationObject: (id) => {
    const { locationsMap } = get();
    return locationsMap[id] || Locations[id] || Locations['usp'];
  },
}));

/**
 * Dynamically resolves location ID from event text using active keyword rules
 * @param {string} local - Name or text of location
 * @return {string} Matching location ID or 'usp'
 */
export function getLocationId(local) {
  if (!local) return 'usp';
  const cleanLocal = local.trim().toLowerCase();

  const state = useLocationSearch.getState();
  const searchRules = state.searchKeywords && state.searchKeywords.length > 0 ? state.searchKeywords : LocationsSearch;

  for (const loc of searchRules) {
    if (cleanLocal.includes(loc.search)) {
      return loc.id;
    }
  }

  return 'usp';
}

// Auto-trigger load on module import in browser
if (typeof window !== 'undefined') {
  useLocationSearch.getState().loadDynamicLocations();
}
