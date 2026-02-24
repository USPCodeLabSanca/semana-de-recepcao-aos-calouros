import { create } from 'zustand';

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
    name: 'USP São Carlos',
    lat: -22.00707221830916,
    lon: -47.89683843242551,
  },
};

const LocationsSearch = [
  { search: 'biblioteca', id: 'biblioteca' },
  { search: 'fernão', id: 'fernao' },
  { search: '3-', id: 'bloco-3' },
  { search: 'bloco 3', id: 'bloco-3' },
  { search: '4-', id: 'bloco-4' },
  { search: 'eventos', id: 'eventos' },
  { search: 'redondo', id: 'redondo' },
  { search: 'fávaro', id: 'favaro' },
  { search: 'caaso', id: 'caaso' },
  { search: '6-', id: 'bloco-6' },
];

/**
 * getLocationId
 *
 * @param {string} local
 *
 * @return {string} id
 */
export function getLocationId(local) {
  // Normalize string for search
  local = local.trim().toLowerCase();

  // Search id
  for (const loc of LocationsSearch) {
    if (local.includes(loc.search)) {
      return loc.id;
    }
  }

  // Fallback (podemos mudar isso)
  return 'usp';
}

/*
Store para armazenar o estado da busca, fora do
ciclo de vida do react e evitando prop drilling.
Pode ser usando dentro e fora de components (só
ver o uso correto do hook).
 */
export const useLocationSearch = create((set) => ({
  // Store state
  location: null,
  open: false,

  setLocation: (location) =>
    set(() => ({
      location,
    })),

  setOpen: (open) =>
    set(() => ({
      open,
    })),

  reset: () =>
    set(() => ({
      location: null,
      open: false,
    })),
}));
