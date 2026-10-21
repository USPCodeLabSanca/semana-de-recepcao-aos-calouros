import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import API from '../lib/api';
import LogoIcmc from '../images/logo-icmc-branco.svg';
import markdownToHtml from '../lib/markdown-to-html';
import {
  CalendarMonthOutlined,
  CloudUploadOutlined,
  PeopleAltOutlined,
  PlaceOutlined,
  MapOutlined,
  MyLocationOutlined,
  SearchOutlined,
  AddOutlined,
  EditOutlined,
  DeleteOutline,
  ContentCopyOutlined,
  CheckCircleOutline,
  WarningAmberOutlined,
  PublishOutlined,
  RefreshOutlined,
  ExitToAppOutlined,
  OpenInNewOutlined,
  AutoAwesomeOutlined,
  ArrowForwardOutlined,
} from '@mui/icons-material';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { useLocationSearch, getLocationId } from '../lib/location';

// Leaflet default icon setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

/**
 * Helper to handle map clicks for coordinate selection
 * @param {object} props - Component props
 * @param {Function} props.onMapClick - Callback on map click
 * @return {null}
 */
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

/**
 * Main Admin Dashboard Component
 * @return {JSX.Element} Dashboard
 */
export default function AdminDashboard() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'import' | 'locations' | 'history' | 'allowlist'

  // Schedule state in editor
  const [events, setEvents] = useState([]);
  const [activeRevision, setActiveRevision] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);

  // Edit / Add Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [modalForm, setModalForm] = useState({
    Data: '',
    Inicio: '08:00',
    Fim: '09:00',
    Titulo: '',
    Descricao: '',
    Local: '',
    type: '1',
  });

  // Publish Dialog
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [publishNotes, setPublishNotes] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // XLSX Import state
  const [selectedFile, setSelectedFile] = useState(null);
  const [workbookInfo, setWorkbookInfo] = useState(null);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [customApiKey, setCustomApiKey] = useState('');
  const [isParsingXlsx, setIsParsingXlsx] = useState(false);
  const [parsingStep, setParsingStep] = useState('');
  const [parsedPreviewEvents, setParsedPreviewEvents] = useState(null);
  const [parseError, setParseError] = useState(null);

  // Allowlist
  const [allowlist, setAllowlist] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  // Campus Locations & Coordinates CMS State
  const [locationsList, setLocationsList] = useState([]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [locationForm, setLocationForm] = useState({
    id: '',
    name: '',
    lat: -22.007072,
    lon: -47.896838,
    keywords: '',
    description: '',
  });
  const [isSavingLocation, setIsSavingLocation] = useState(false);
  const [locationTestQuery, setLocationTestQuery] = useState('');
  const [activeMapFocus, setActiveMapFocus] = useState([-22.007072, -47.896838]);

  // Check auth
  useEffect(() => {
    API.auth.me().then((res) => {
      if (!res.authenticated || !res.isAllowed) {
        history.replace('/admin/login');
      } else {
        setCurrentUser(res.user);
      }
    }).catch(() => {
      history.replace('/admin/login');
    });
  }, [history]);

  // Load active schedule
  const loadSchedule = async () => {
    setLoadingSchedule(true);
    try {
      const res = await API.schedule.getActive();
      if (res && res.events) {
        setEvents(res.events);
        setActiveRevision(res.revision);

        // Select first available day
        const days = Array.from(new Set(res.events.map((e) => e.Data))).sort();
        if (days.length > 0) {
          setSelectedDay(days[0]);
        }
        setIsDirty(false);
      }
    } catch (err) {
      console.error('Failed to load active schedule:', err);
    } finally {
      setLoadingSchedule(false);
    }
  };

  // Load campus locations
  const loadLocations = async () => {
    setLoadingLocations(true);
    try {
      const res = await API.locations.getAll();
      if (res && res.locations) {
        setLocationsList(res.locations);
      }
    } catch (err) {
      console.error('Failed to load campus locations:', err);
    } finally {
      setLoadingLocations(false);
    }
  };

  useEffect(() => {
    loadSchedule();
    loadLocations();
  }, []);

  // Load tab-specific data when tab changes
  useEffect(() => {
    if (activeTab === 'allowlist') {
      API.admin.getAllowlist().then((res) => setAllowlist(res.allowlist || [])).catch(console.error);
    }
    if (activeTab === 'locations') {
      loadLocations();
    }
  }, [activeTab]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleLogout = async () => {
    await API.auth.logout();
    history.push('/admin/login');
  };

  // Group events by day
  const daysList = Array.from(new Set(events.map((e) => e.Data))).sort();

  const getDayName = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T12:00:00');
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[date.getDay()];
  };

  // Event modal handlers
  const openAddModal = () => {
    setEditingIndex(-1);
    setModalForm({
      Data: selectedDay || (daysList[0] || '2026-02-23'),
      Inicio: '08:00',
      Fim: '09:00',
      Titulo: '',
      Descricao: '',
      Local: locationsList.length > 0 ? locationsList[0].name : 'Salão de Eventos USP',
      type: '1',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (eventItem, globalIdx) => {
    setEditingIndex(globalIdx);
    setModalForm({ ...eventItem });
    setIsModalOpen(true);
  };

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    confirmLabel: 'Confirmar',
    isDanger: false,
    onConfirm: null,
  });

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!modalForm.Titulo || !modalForm.Data || !modalForm.Inicio || !modalForm.Fim) {
      showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }

    const updated = [...events];
    if (editingIndex >= 0) {
      updated[editingIndex] = { ...modalForm };
    } else {
      updated.push({ ...modalForm });
    }

    // Sort updated events
    updated.sort((a, b) => {
      if (a.Data !== b.Data) return a.Data.localeCompare(b.Data);
      return a.Inicio.localeCompare(b.Inicio);
    });

    setEvents(updated);
    setIsDirty(true);
    setIsModalOpen(false);
    setSelectedDay(modalForm.Data);
    showToast(editingIndex >= 0 ? 'Evento atualizado no rascunho.' : 'Novo evento adicionado ao rascunho.');
  };

  const handleDeleteEvent = (globalIdx) => {
    setConfirmDialog({
      open: true,
      title: 'Excluir Evento',
      message: 'Tem certeza de que deseja remover este evento do cronograma?',
      confirmLabel: 'Excluir',
      isDanger: true,
      onConfirm: () => {
        const updated = events.filter((_, idx) => idx !== globalIdx);
        setEvents(updated);
        setIsDirty(true);
        showToast('Evento removido.');
      },
    });
  };

  const handleDuplicateEvent = (eventItem) => {
    const updated = [...events, { ...eventItem, Titulo: `${eventItem.Titulo} (Cópia)` }];
    updated.sort((a, b) => {
      if (a.Data !== b.Data) return a.Data.localeCompare(b.Data);
      return a.Inicio.localeCompare(b.Inicio);
    });
    setEvents(updated);
    setIsDirty(true);
    showToast('Evento duplicado.');
  };

  // Publish handler
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await API.schedule.publish(events, publishNotes || 'Atualização via editor administrativo');
      if (res.success) {
        setIsPublishDialogOpen(false);
        setPublishNotes('');
        setIsDirty(false);
        showToast(`🎉 Cronograma publicado com sucesso! Versão #${res.revisionId} está ativa no portal.`, 'success');
        loadSchedule();
      }
    } catch (err) {
      console.error(err);
      showToast('Erro ao publicar: ' + (err.response?.data?.error || err.message), 'error');
    } finally {
      setIsPublishing(false);
    }
  };

  // XLSX handling
  const handleFileSelect = async (file) => {
    if (!file) return;
    setSelectedFile(file);
    setParseError(null);
    setParsedPreviewEvents(null);

    try {
      setParsingStep('Analisando abas da planilha...');
      const info = await API.admin.inspectXlsx(file);
      setWorkbookInfo(info);

      // Auto-select sheet with "Cronograma" or "Programação"
      const defaultSheet = info.sheets.find(
          (s) => s.name.toLowerCase().includes('cronograma') || s.name.toLowerCase().includes('programação'),
      )?.name || info.sheets[0]?.name;

      setSelectedSheet(defaultSheet);
      setParsingStep('');
    } catch (err) {
      console.error(err);
      setParseError('Falha ao inspecionar planilha: ' + (err.response?.data?.error || err.message));
      setParsingStep('');
    }
  };

  const handleParseWithGemini = async () => {
    if (!selectedFile) return;
    setIsParsingXlsx(true);
    setParseError(null);
    setParsingStep('1/3: Normalizando tabela e propagando células mescladas...');

    try {
      setTimeout(() => setParsingStep('2/3: Consultando Gemini 2.5 Flash com schema forçado e few-shot...'), 1200);

      const res = await API.admin.parseXlsx(selectedFile, selectedSheet, customApiKey);

      setParsingStep('3/3: Validando horários e integridade dos eventos...');
      if (res.success && res.events) {
        setParsedPreviewEvents(res.events);
        showToast(`Planilha processada com sucesso! ${res.events.length} eventos extraídos.`);
      }
    } catch (err) {
      console.error(err);
      setParseError(err.response?.data?.error || 'Erro ao processar planilha com IA.');
    } finally {
      setIsParsingXlsx(false);
      setParsingStep('');
    }
  };

  const handleApplyParsedEventsToEditor = () => {
    if (!parsedPreviewEvents || parsedPreviewEvents.length === 0) return;
    setConfirmDialog({
      open: true,
      title: 'Substituir Cronograma do Editor',
      message: `Deseja carregar estes ${parsedPreviewEvents.length} eventos extraídos da planilha no editor? Você poderá revisar todos antes de publicar.`,
      confirmLabel: 'Carregar no Editor',
      isDanger: false,
      onConfirm: () => {
        setEvents(parsedPreviewEvents);
        setIsDirty(true);
        const days = Array.from(new Set(parsedPreviewEvents.map((e) => e.Data))).sort();
        if (days.length > 0) setSelectedDay(days[0]);
        setActiveTab('editor');
        showToast('Eventos carregados no editor! Revise os detalhes e clique em Publicar quando desejar.');
      },
    });
  };


  // Allowlist handlers
  // Allowlist handlers (Zero roles, equal permissions for all authorized admins)
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!newAdminEmail || !newAdminEmail.includes('@')) return;
    setIsAddingAdmin(true);
    try {
      const res = await API.admin.addAllowlist(newAdminEmail);
      setNewAdminEmail('');
      if (res.allowlist) {
        setAllowlist(res.allowlist);
      } else {
        const refreshed = await API.admin.getAllowlist();
        setAllowlist(refreshed.allowlist || []);
      }
      showToast(res.message || 'Administrador adicionado à lista de permissões.');
    } catch (err) {
      showToast('Erro ao adicionar administrador: ' + (err.response?.data?.error || err.message), 'error');
    } finally {
      setIsAddingAdmin(false);
    }
  };

  const handleRemoveAdmin = (email) => {
    setConfirmDialog({
      open: true,
      title: 'Remover Administrador',
      message: `Tem certeza de que deseja remover "${email}" da lista de administradores autorizados? Esta pessoa perderá imediatamente o acesso de edição ao cronograma.`,
      confirmLabel: 'Remover Acesso',
      isDanger: true,
      onConfirm: async () => {
        try {
          const res = await API.admin.removeAllowlist(email);
          if (res.allowlist) {
            setAllowlist(res.allowlist);
          } else {
            const refreshed = await API.admin.getAllowlist();
            setAllowlist(refreshed.allowlist || []);
          }
          showToast(res.message || `Administrador "${email}" removido.`);
        } catch (err) {
          showToast('Erro ao remover: ' + (err.response?.data?.error || err.message), 'error');
        }
      },
    });
  };

  // Campus Locations & Coordinates CMS Handlers
  const openAddLocationModal = (initialLat, initialLon) => {
    setEditingLocation(null);
    setLocationForm({
      id: '',
      name: '',
      lat: initialLat !== undefined ? Number(initialLat.toFixed(6)) : -22.007072,
      lon: initialLon !== undefined ? Number(initialLon.toFixed(6)) : -47.896838,
      keywords: '',
      description: '',
    });
    setIsLocationModalOpen(true);
  };

  const openEditLocationModal = (loc) => {
    setEditingLocation(loc);
    setLocationForm({
      id: loc.id,
      name: loc.name,
      lat: loc.lat,
      lon: loc.lon,
      keywords: loc.keywords || '',
      description: loc.description || '',
    });
    setActiveMapFocus([loc.lat, loc.lon]);
    setIsLocationModalOpen(true);
  };

  const handleSaveLocation = async (e) => {
    e.preventDefault();
    if (!locationForm.name.trim() || !locationForm.id.trim()) {
      showToast('Preencha o nome e o identificador do local.', 'error');
      return;
    }
    const numLat = parseFloat(locationForm.lat);
    const numLon = parseFloat(locationForm.lon);
    if (isNaN(numLat) || isNaN(numLon)) {
      showToast('Latitude e Longitude devem ser valores numéricos válidos.', 'error');
      return;
    }

    setIsSavingLocation(true);
    try {
      const payload = {
        id: locationForm.id.trim().toLowerCase(),
        name: locationForm.name.trim(),
        lat: numLat,
        lon: numLon,
        keywords: (locationForm.keywords || locationForm.name).trim(),
        description: locationForm.description?.trim() || '',
      };
      const res = await API.locations.save(payload);
      if (res.locations) {
        setLocationsList(res.locations);
      } else {
        await loadLocations();
      }
      // Sync global zustand store immediately for public map modal
      useLocationSearch.getState().loadDynamicLocations();
      setIsLocationModalOpen(false);
      showToast(res.message || 'Local do campus salvo com sucesso!');
    } catch (err) {
      showToast('Erro ao salvar local: ' + (err.response?.data?.error || err.message), 'error');
    } finally {
      setIsSavingLocation(false);
    }
  };

  const handleDeleteLocation = (loc) => {
    setConfirmDialog({
      open: true,
      title: 'Excluir Local do Campus',
      message: `Tem certeza de que deseja remover o local "${loc.name}" (${loc.id})? Se algum evento estiver com este local no cronograma, o mapa passará a exibir o ponto geral do campus.`,
      confirmLabel: 'Excluir Local',
      isDanger: true,
      onConfirm: async () => {
        try {
          const res = await API.locations.delete(loc.id);
          if (res.locations) {
            setLocationsList(res.locations);
          } else {
            await loadLocations();
          }
          // Sync global zustand store immediately
          useLocationSearch.getState().loadDynamicLocations();
          showToast(res.message || `Local "${loc.name}" removido com sucesso.`);
        } catch (err) {
          showToast('Erro ao remover local: ' + (err.response?.data?.error || err.message), 'error');
        }
      },
    });
  };

  const handleMapClick = (lat, lon) => {
    if (isLocationModalOpen) {
      setLocationForm((prev) => ({
        ...prev,
        lat: Number(lat.toFixed(6)),
        lon: Number(lon.toFixed(6)),
      }));
      showToast(`Coordenadas atualizadas pelo clique no mapa: ${lat.toFixed(6)}, ${lon.toFixed(6)}`);
    } else {
      openAddLocationModal(lat, lon);
      showToast(`Coordenadas capturadas do mapa! Cadastre o novo local.`);
    }
  };

  return (
    <div className='min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans'>
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium text-white transition-all transform animate-bounce-short ${
          toastMessage.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
        }`}>
          {toastMessage.type === 'error' ? <WarningAmberOutlined /> : <CheckCircleOutline />}
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Top Header */}
      <header className='bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <Link to='/' className='flex items-center gap-2 font-bold tracking-tight text-white hover:text-amber-400 transition-colors'>
              <img src={LogoIcmc} alt='ICMC' className='h-7' />
              <span className='hidden sm:inline font-mono text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30'>
                CMS ADMIN
              </span>
            </Link>
            <span className='text-slate-600 hidden md:inline'>/</span>
            <span className='text-xs sm:text-sm font-medium text-slate-300 hidden md:inline truncate'>
              Semana de Recepção {activeRevision?.year || 2026}
            </span>
          </div>

          {/* Right Header Zone */}
          <div className='flex items-center gap-3'>
            <a
              href='/'
              target='_blank'
              rel='noreferrer'
              className='hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 transition-all'
            >
              <span>Ver Site</span>
              <OpenInNewOutlined fontSize='inherit' />
            </a>

            {currentUser && (
              <div className='flex items-center gap-2 pl-2 border-l border-slate-800'>
                <div className='w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs shadow'>
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className='hidden lg:block text-left'>
                  <p className='text-xs font-semibold text-white leading-tight'>{currentUser.name || 'Admin'}</p>
                  <p className='text-[10px] text-slate-400 font-mono leading-tight truncate max-w-[150px]'>{currentUser.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  title='Sair do painel'
                  className='p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors'
                >
                  <ExitToAppOutlined fontSize='small' />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>


      {/* Main Container */}
      <div className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col'>
        {/* Navigation Tabs (SaaS Segmented Controls) */}
        <div className='flex items-center justify-between flex-wrap gap-3 mb-6'>
          <div className='inline-flex p-1 bg-white border border-slate-200 rounded-xl shadow-sm'>
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'editor' ?
                  'bg-amber-500 text-slate-950 shadow-sm' :
                  'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <CalendarMonthOutlined fontSize='small' />
              <span>Editor Visual do Cronograma</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === 'editor' ? 'bg-slate-950 text-amber-400' : 'bg-slate-100 text-slate-600'}`}>
                {loadingSchedule ? '…' : events.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('import')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'import' ?
                  'bg-amber-500 text-slate-950 shadow-sm' :
                  'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <CloudUploadOutlined fontSize='small' />
              <span>Importar XLSX</span>
            </button>

            <button
              onClick={() => setActiveTab('locations')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'locations' ?
                  'bg-amber-500 text-slate-950 shadow-sm' :
                  'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <PlaceOutlined fontSize='small' />
              <span>Locais & Mapa</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === 'locations' ? 'bg-slate-950 text-amber-400' : 'bg-slate-100 text-slate-600'}`}>
                {loadingLocations ? '…' : locationsList.length}
              </span>
            </button>


            <button
              onClick={() => setActiveTab('allowlist')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'allowlist' ?
                  'bg-amber-500 text-slate-950 shadow-sm' :
                  'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <PeopleAltOutlined fontSize='small' />
              <span>Administradores</span>
            </button>
          </div>

          {/* Action Button: Publish to Production */}
          {activeTab === 'editor' && (
            <div className='flex items-center gap-2'>
              {isDirty && (
                <button
                  onClick={loadSchedule}
                  className='px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm'
                >
                  <RefreshOutlined fontSize='small' />
                  <span>Descartar Alterações</span>
                </button>
              )}
              <button
                onClick={() => setIsPublishDialogOpen(true)}
                className='px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2'
              >
                <PublishOutlined fontSize='small' />
                <span>Publicar Cronograma no Site</span>
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: VISUAL SCHEDULE EDITOR                                            */}
        {/* ========================================================================= */}
        {activeTab === 'editor' && (
          <div className='space-y-6'>
            {/* Days Stepper Bar (Mirroring public programacao.jsx) */}
            <div className='bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm'>
              <div className='flex items-center justify-between mb-4 flex-wrap gap-2'>
                <div>
                  <h2 className='text-base sm:text-lg font-bold text-slate-900'>Dias da Semana de Recepção</h2>
                  <p className='text-xs text-slate-500'>Selecione um dia para visualizar, editar ou adicionar eventos</p>
                </div>
                <button
                  onClick={openAddModal}
                  className='px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow'
                >
                  <AddOutlined fontSize='small' />
                  <span>Adicionar Evento</span>
                </button>
              </div>

              {/* Day Selector Buttons */}
              <div className='flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-thin'>
                {daysList.map((dayStr) => {
                  const dayEvents = events.filter((e) => e.Data === dayStr);
                  const isSelected = selectedDay === dayStr;
                  const dayNum = dayStr.split('-')[2];
                  const monthNum = dayStr.split('-')[1];

                  return (
                    <button
                      key={dayStr}
                      onClick={() => setSelectedDay(dayStr)}
                      className={`flex flex-col items-center justify-center p-3 sm:px-5 sm:py-3 rounded-2xl min-w-[76px] sm:min-w-[90px] border transition-all ${
                        isSelected ?
                          'bg-slate-900 text-white border-slate-900 shadow-md scale-105' :
                          'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`text-[11px] uppercase tracking-wider font-bold ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                        {getDayName(dayStr)}
                      </span>
                      <span className='text-lg sm:text-xl font-extrabold font-mono leading-none my-1'>
                        {dayNum}/{monthNum}
                      </span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>
                        {dayEvents.length} ativ.
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Events for Selected Day */}
            <div className='bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm'>
              <div className='flex items-center justify-between pb-4 border-b border-slate-100 mb-6'>
                <div>
                  <h3 className='text-lg font-bold text-slate-900 flex items-center gap-2'>
                    <span>Programação de {selectedDay ? `${selectedDay.split('-')[2]}/${selectedDay.split('-')[1]} (${getDayName(selectedDay)})` : 'Todos os dias'}</span>
                    <span className='text-xs font-normal text-slate-500 font-mono'>
                      ({events.filter((e) => !selectedDay || e.Data === selectedDay).length} eventos)
                    </span>
                  </h3>
                </div>
                <button
                  onClick={openAddModal}
                  className='text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1'
                >
                  <AddOutlined fontSize='small' />
                  <span>Novo evento neste dia</span>
                </button>
              </div>

              {/* Cards Grid */}
              <div className='space-y-3.5'>
                {events
                    .map((ev, globalIdx) => ({ ev, globalIdx }))
                    .filter(({ ev }) => !selectedDay || ev.Data === selectedDay)
                    .map(({ ev, globalIdx }) => {
                      const descHtml = ev.Descricao ? markdownToHtml(ev.Descricao) : '';

                      return (
                        <div
                          key={globalIdx}
                          className='group border border-slate-200 hover:border-slate-300 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-all p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs'
                        >
                          {/* Time Column (Black block style from design) */}
                          <div className='flex sm:flex-col items-center justify-center bg-slate-900 text-white rounded-lg px-3 py-2 shrink-0 min-w-[95px] text-center font-mono font-bold text-xs shadow-inner'>
                            <span>{ev.Inicio}</span>
                            <span className='mx-1 sm:hidden'>-</span>
                            <span className='text-slate-400 text-[11px]'>{ev.Fim}</span>
                          </div>

                          {/* Title & Details Column */}
                          <div className='flex-1 min-w-0'>
                            <h4 className='text-sm sm:text-base font-bold text-slate-900 leading-snug'>
                              {ev.Titulo}
                            </h4>

                            {ev.Local && (
                              <div className='flex items-center gap-1.5 mt-1 text-xs text-slate-600 font-medium'>
                                <span className='text-slate-400'>Local:</span>
                                <span className='underline decoration-slate-300 hover:decoration-amber-500 cursor-pointer'>
                                  {ev.Local}
                                </span>
                              </div>
                            )}

                            {descHtml && (
                              <div
                                className='mt-1.5 text-xs text-slate-500 line-clamp-2 prose prose-xs max-w-none'
                                dangerouslySetInnerHTML={{ __html: descHtml }}
                              />
                            )}
                          </div>

                          {/* Event Actions */}
                          <div className='flex items-center gap-1 shrink-0 self-end sm:self-center'>
                            <button
                              onClick={() => openEditModal(ev, globalIdx)}
                              className='p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors'
                              title='Editar Evento'
                            >
                              <EditOutlined fontSize='small' />
                            </button>
                            <button
                              onClick={() => handleDuplicateEvent(ev)}
                              className='p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors'
                              title='Duplicar Evento'
                            >
                              <ContentCopyOutlined fontSize='small' />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(globalIdx)}
                              className='p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors'
                              title='Excluir Evento'
                            >
                              <DeleteOutline fontSize='small' />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                {events.filter((e) => !selectedDay || e.Data === selectedDay).length === 0 && (
                  <div className='text-center py-12 border-2 border-dashed border-slate-200 rounded-xl'>
                    <CalendarMonthOutlined className='text-slate-300 mb-2' fontSize='large' />
                    <p className='text-sm font-semibold text-slate-700'>Nenhum evento cadastrado para este dia</p>
                    <p className='text-xs text-slate-400 mt-1'>Clique no botão abaixo para criar a primeira atividade</p>
                    <button
                      onClick={openAddModal}
                      className='mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow'
                    >
                      + Adicionar Evento
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: IMPORT SPREADSHEET WITH GEMINI 2.5 FLASH                          */}
        {/* ========================================================================= */}
        {activeTab === 'import' && (
          <div className='space-y-6'>
            {/* Guide Card */}
            <div className='bg-white border border-slate-200 rounded-2xl p-6 shadow-sm'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0'>
                  <AutoAwesomeOutlined fontSize='medium' />
                </div>
                <div>
                  <h2 className='text-base sm:text-lg font-bold text-slate-900'>
                    Importador Inteligente de Cronograma (XLSX via IA)
                  </h2>
                  <p className='text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed'>
                    A planilha da comissão organizadora varia a cada ano, frequentemente contendo células mescladas para horários e agrupamentos.
                    O pipeline desfaz e propaga automaticamente as mesclagens e utiliza o <b>Google Gemini 2.5 Flash</b> com JSON Schema forçado para estruturar todas as atividades no padrão do site.
                  </p>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className='mt-6'>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={async (e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      const file = e.dataTransfer.files[0];
                      await handleFileSelect(file);
                      await handleParseWithGemini();
                    }
                  }}
                  onClick={() => document.getElementById('xlsx-input')?.click()}
                >
                  <CloudUploadOutlined className='text-slate-400 mb-3' style={{ fontSize: 48 }} />
                  <p className='text-sm font-bold text-slate-800'>
                    {selectedFile ? selectedFile.name : 'Clique para selecionar ou arraste o arquivo .xlsx aqui'}
                  </p>
                  <p className='text-xs text-slate-500 mt-1'>
                    Suporta planilhas Excel (.xlsx e .xls) de até 20MB
                  </p>
                  <input
                    id='xlsx-input'
                    type='file'
                    accept='.xlsx,.xls'
                    className='hidden'
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        await handleFileSelect(file);
                        await handleParseWithGemini();
                      }
                    }}
                  />
                </div>
              </div>


              {/* Workbook Sheets Selector */}
              {workbookInfo && workbookInfo.sheets && (
                <div className='mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4'>
                  <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                    <div>
                      <label className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1'>
                        Selecione a Aba da Planilha
                      </label>
                      <p className='text-xs text-slate-500'>
                        O arquivo possui {workbookInfo.sheets.length} abas detectadas
                      </p>
                    </div>
                    <select
                      value={selectedSheet}
                      onChange={(e) => setSelectedSheet(e.target.value)}
                      className='px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-500 shadow-sm'
                    >
                      {workbookInfo.sheets.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name} ({s.rowCount} linhas, {s.mergeCount} mesclagens)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Optional Custom Gemini API Key */}
                  <div className='pt-3 border-t border-slate-200'>
                    <label className='block text-xs font-semibold text-slate-700 mb-1'>
                      Chave de API do Gemini (Opcional — já usa a chave padrão do servidor se omitida)
                    </label>
                    <input
                      type='password'
                      placeholder='AIzaSy...'
                      value={customApiKey}
                      onChange={(e) => setCustomApiKey(e.target.value)}
                      className='w-full sm:w-96 px-3.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500'
                    />
                    <p className='text-[11px] text-slate-400 mt-1'>
                      A chave é enviada com segurança apenas para o backend da sua aplicação e nunca é exposta no cliente.
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className='pt-2 flex items-center justify-end'>
                    <button
                      onClick={handleParseWithGemini}
                      disabled={isParsingXlsx}
                      className='px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2'
                    >
                      {isParsingXlsx ? (
                        <>
                          <span className='w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin'></span>
                          <span>Processando com IA...</span>
                        </>
                      ) : (
                        <>
                          <AutoAwesomeOutlined fontSize='small' />
                          <span>Converter Planilha com Gemini 2.5 Flash</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Progress status */}
                  {parsingStep && (
                    <div className='p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono animate-pulse'>
                      {parsingStep}
                    </div>
                  )}

                  {parseError && (
                    <div className='p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs'>
                      <b>Erro ao processar:</b> {parseError}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Parsed Preview Table */}
            {parsedPreviewEvents && parsedPreviewEvents.length > 0 && (
              <div className='bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4'>
                <div className='flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-100'>
                  <div>
                    <h3 className='text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2'>
                      <CheckCircleOutline className='text-emerald-500' />
                      <span>{parsedPreviewEvents.length} Eventos Extraídos com Sucesso</span>
                    </h3>
                    <p className='text-xs text-slate-500 mt-0.5'>
                      Inspecione a lista gerada abaixo. Você pode importá-la para o editor para ajustes manuais finos antes de publicar.
                    </p>
                  </div>
                  <button
                    onClick={handleApplyParsedEventsToEditor}
                    className='px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2'
                  >
                    <span>Importar para o Editor</span>
                    <ArrowForwardOutlined fontSize='small' />
                  </button>
                </div>

                <div className='max-h-[500px] overflow-y-auto border border-slate-200 rounded-xl'>
                  <table className='w-full text-left text-xs'>
                    <thead className='bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-mono tracking-wider sticky top-0'>
                      <tr>
                        <th className='p-3'>Data</th>
                        <th className='p-3'>Horário</th>
                        <th className='p-3'>Título</th>
                        <th className='p-3'>Local</th>
                        <th className='p-3'>Descrição</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-100'>
                      {parsedPreviewEvents.map((ev, idx) => (
                        <tr key={idx} className='hover:bg-slate-50/80 transition-colors'>
                          <td className='p-3 font-mono font-semibold text-slate-900 whitespace-nowrap'>{ev.Data}</td>
                          <td className='p-3 font-mono font-semibold text-slate-700 whitespace-nowrap'>{ev.Inicio} - {ev.Fim}</td>
                          <td className='p-3 font-bold text-slate-900'>{ev.Titulo}</td>
                          <td className='p-3 text-slate-600'>{ev.Local || '-'}</td>
                          <td className='p-3 text-slate-500 truncate max-w-xs'>{ev.Descricao || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}


        {/* ========================================================================= */}
        {/* TAB: LOCAIS DO CAMPUS & COORDENADAS NO MAPA                              */}
        {/* ========================================================================= */}
        {activeTab === 'locations' && (
          <div className='space-y-6'>
            {/* Header & Overview */}
            <div className='bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <div>
                <h3 className='text-lg font-bold text-slate-900 flex items-center gap-2'>
                  <PlaceOutlined className='text-amber-500' />
                  <span>Gerenciamento de Locais & Coordenadas no Mapa</span>
                </h3>
                <p className='text-xs text-slate-500 mt-1 max-w-2xl'>
                  Cadastre e altere dinamicamente os locais do campus (Auditórios, Blocos, Pátios, Salões). As coordenadas cadastradas definem onde o pin aparece no mapa interativo quando os calouros clicam no evento.
                </p>
              </div>

              <div className='flex items-center gap-2.5 shrink-0'>
                <button
                  type='button'
                  onClick={() => openAddLocationModal()}
                  className='px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2'
                >
                  <AddOutlined fontSize='small' />
                  <span>Novo Local do Campus</span>
                </button>
              </div>
            </div>

            {/* Live Matcher Tester & Tip Strip */}
            <div className='bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4'>
              <div className='flex flex-col md:flex-row md:items-center gap-4'>
                <div className='grow'>
                  <label className='block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5'>
                    <SearchOutlined fontSize='small' className='text-amber-500' />
                    <span>Testar Reconhecimento Automático de Local:</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Digite o nome ou texto de um evento (ex: Auditório Fernão, Vão da Biblioteca, Redondo, Bloco 6...)'
                    value={locationTestQuery}
                    onChange={(e) => setLocationTestQuery(e.target.value)}
                    className='w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500'
                  />
                </div>
                {locationTestQuery && (
                  <div className='shrink-0 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-mono'>
                    {(() => {
                      const matchedId = getLocationId(locationTestQuery);
                      const matchedObj = useLocationSearch.getState().getLocationObject(matchedId);
                      return (
                        <div>
                          <p className='font-bold text-slate-900 flex items-center gap-1'>
                            <span>📍 Identificado como:</span>
                            <span className='text-amber-700'>{matchedObj?.name || 'Campus 1 Geral'}</span>
                          </p>
                          <p className='text-[11px] text-slate-500 mt-0.5'>
                            ID: <span className='font-semibold'>{matchedId}</span> · Lat: {matchedObj?.lat?.toFixed(5)} · Lon: {matchedObj?.lon?.toFixed(5)}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
              <div className='p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center gap-2'>
                <span className='font-bold text-amber-600'>💡 Dica Interativa:</span>
                <span>Clique em qualquer ponto do mapa abaixo para capturar as coordenadas GPS exatas para cadastro de novo local ou edição!</span>
              </div>
            </div>

            {/* Interactive Campus Map */}
            <div className='bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2'>
              <div className='flex items-center justify-between px-2 pt-1'>
                <span className='text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5'>
                  <MapOutlined fontSize='small' className='text-amber-500' />
                  <span>Mapa Interativo do Campus ICMC / USP</span>
                </span>
                <span className='text-xs text-slate-400'>
                  {locationsList.length} locais marcados
                </span>
              </div>
              <div className='rounded-xl overflow-hidden border border-slate-200'>
                <MapContainer
                  center={activeMapFocus}
                  zoom={17}
                  scrollWheelZoom={true}
                  className='w-full h-80 sm:h-96 z-0'
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    maxZoom={22}
                    maxNativeZoom={19}
                  />
                  <MapClickHandler onMapClick={handleMapClick} />
                  {locationsList.map((loc) => (
                    <Marker key={loc.id} position={[loc.lat, loc.lon]}>
                      <Popup>
                        <div className='text-slate-800 text-xs space-y-1.5 p-1'>
                          <p className='font-bold text-sm text-slate-900'>{loc.name}</p>
                          <p className='text-[11px] text-slate-500 font-mono'>ID: {loc.id}</p>
                          <p className='text-[11px] text-slate-600'>{loc.description || 'Sem descrição cadastrada'}</p>
                          <div className='text-[10px] text-slate-400 font-mono'>
                            Lat: {loc.lat.toFixed(6)}, Lon: {loc.lon.toFixed(6)}
                          </div>
                          <div className='pt-2 flex items-center gap-2 border-t border-slate-100'>
                            <button
                              type='button'
                              onClick={() => openEditLocationModal(loc)}
                              className='px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-600'
                            >
                              Editar Local
                            </button>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Locations Table */}
            <div className='bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4'>
              <div className='flex items-center justify-between'>
                <h4 className='text-base font-bold text-slate-900'>Lista de Locais Cadastrados</h4>
                <span className='text-xs text-slate-500 font-mono'>{locationsList.length} cadastrados no banco de dados</span>
              </div>

              <div className='border border-slate-200 rounded-xl overflow-x-auto'>
                <table className='w-full text-left text-xs'>
                  <thead className='bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-mono tracking-wider'>
                    <tr>
                      <th className='p-3'>Nome do Local</th>
                      <th className='p-3'>ID / Slug</th>
                      <th className='p-3'>Coordenadas GPS (Lat / Lon)</th>
                      <th className='p-3'>Palavras-chave de Reconhecimento</th>
                      <th className='p-3 text-right'>Ações</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-100'>
                    {locationsList.map((loc) => (
                      <tr key={loc.id} className='hover:bg-slate-50 transition-colors'>
                        <td className='p-3'>
                          <div className='font-bold text-slate-900'>{loc.name}</div>
                          {loc.description && (
                            <div className='text-[11px] text-slate-500 mt-0.5 line-clamp-1'>{loc.description}</div>
                          )}
                        </td>
                        <td className='p-3 font-mono font-semibold text-amber-700 bg-amber-50/50 rounded'>
                          {loc.id}
                        </td>
                        <td className='p-3 font-mono text-slate-600'>
                          <button
                            type='button'
                            onClick={() => {
                              setActiveMapFocus([loc.lat, loc.lon]);
                              showToast(`Foco do mapa alterado para: ${loc.name}`);
                            }}
                            className='hover:underline hover:text-amber-600 flex items-center gap-1 text-left'
                            title='Centralizar no mapa'
                          >
                            <MyLocationOutlined fontSize='inherit' className='text-amber-500' />
                            <span>{loc.lat.toFixed(5)}, {loc.lon.toFixed(5)}</span>
                          </button>
                        </td>
                        <td className='p-3 text-slate-600 max-w-xs'>
                          <div className='flex flex-wrap gap-1'>
                            {(loc.keywords || '')
                                .split(',')
                                .map((k) => k.trim())
                                .filter(Boolean)
                                .slice(0, 4)
                                .map((k, i) => (
                                  <span key={i} className='px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]'>
                                    {k}
                                  </span>
                                ))}
                          </div>
                        </td>
                        <td className='p-3 text-right'>
                          <div className='flex items-center justify-end gap-1.5'>
                            <button
                              type='button'
                              onClick={() => openEditLocationModal(loc)}
                              className='px-2.5 py-1 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 font-medium transition-all shadow-xs flex items-center gap-1'
                            >
                              <EditOutlined fontSize='inherit' />
                              <span>Editar</span>
                            </button>
                            <button
                              type='button'
                              onClick={() => handleDeleteLocation(loc)}
                              className='px-2.5 py-1 rounded-lg text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 font-medium transition-all shadow-xs flex items-center gap-1'
                            >
                              <DeleteOutline fontSize='inherit' />
                              <span>Excluir</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: ADMIN ALLOWLIST                                                   */}
        {/* ========================================================================= */}
        {activeTab === 'allowlist' && (
          <div className='bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6'>
            <div>
              <h3 className='text-lg font-bold text-slate-900 flex items-center gap-2'>
                <PeopleAltOutlined className='text-amber-500' />
                <span>Gerenciamento de Administradores Autorizados</span>
              </h3>
              <p className='text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed'>
                Todos os e-mails na lista abaixo possuem acesso administrativo completo ao painel do CMS (edição do cronograma, importação de planilhas, histórico e locais do mapa). São aceitos e-mails institucionais (@usp.br e @icmc.usp.br). Não há distinção ou papéis separados: qualquer membro autorizado pode atualizar o cronograma.
              </p>
            </div>

            {/* Add Admin Form */}
            <form onSubmit={handleAddAdmin} className='flex flex-wrap items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200'>
              <input
                type='email'
                required
                placeholder='novo-admin@usp.br ou @icmc.usp.br'
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className='px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 grow'
              />
              <button
                type='submit'
                disabled={isAddingAdmin}
                className='px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold transition-all shadow flex items-center gap-1.5'
              >
                {isAddingAdmin ? 'Adicionando...' : '+ Conceder Acesso'}
              </button>
            </form>

            {/* List */}
            <div className='border border-slate-200 rounded-xl overflow-hidden'>
              <table className='w-full text-left text-xs'>
                <thead className='bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-mono tracking-wider'>
                  <tr>
                    <th className='p-3'>E-mail do Administrador</th>
                    <th className='p-3'>Data de Inclusão</th>
                    <th className='p-3 text-right'>Ações</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-100'>
                  {allowlist.map((item) => {
                    const isSelf = item.email.toLowerCase() === currentUser?.email?.toLowerCase();
                    return (
                      <tr key={item.email} className='hover:bg-slate-50 transition-colors'>
                        <td className='p-3 font-mono font-bold text-slate-900 flex items-center gap-2'>
                          <span>{item.email}</span>
                          {isSelf && (
                            <span className='text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300'>
                              Você (sessão atual)
                            </span>
                          )}
                        </td>
                        <td className='p-3 text-slate-500 font-mono'>
                          {item.added_at ? new Date(item.added_at).toLocaleDateString('pt-BR') : '-'}
                        </td>
                        <td className='p-3 text-right'>
                          <button
                            type='button'
                            onClick={() => handleRemoveAdmin(item.email)}
                            className='px-2.5 py-1 rounded-lg text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 font-medium transition-all shadow-xs inline-flex items-center gap-1'
                          >
                            <DeleteOutline fontSize='inherit' />
                            <span>Remover</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT EVENT                                                   */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in'>
          <div className='bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto'>
            <div className='flex items-center justify-between pb-3 border-b border-slate-100'>
              <h3 className='text-lg font-bold text-slate-900'>
                {editingIndex >= 0 ? 'Editar Evento do Cronograma' : 'Novo Evento no Cronograma'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className='text-slate-400 hover:text-slate-600 text-lg font-bold p-1'
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                <div>
                  <label className='block text-xs font-semibold text-slate-700 mb-1'>Data (YYYY-MM-DD)</label>
                  <input
                    type='date'
                    required
                    value={modalForm.Data}
                    onChange={(e) => setModalForm({ ...modalForm, Data: e.target.value })}
                    className='w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 font-mono outline-none focus:border-amber-500'
                  />
                </div>
                <div>
                  <label className='block text-xs font-semibold text-slate-700 mb-1'>Horário Início</label>
                  <input
                    type='time'
                    required
                    value={modalForm.Inicio}
                    onChange={(e) => setModalForm({ ...modalForm, Inicio: e.target.value })}
                    className='w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 font-mono outline-none focus:border-amber-500'
                  />
                </div>
                <div>
                  <label className='block text-xs font-semibold text-slate-700 mb-1'>Horário Fim</label>
                  <input
                    type='time'
                    required
                    value={modalForm.Fim}
                    onChange={(e) => setModalForm({ ...modalForm, Fim: e.target.value })}
                    className='w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 font-mono outline-none focus:border-amber-500'
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold text-slate-700 mb-1'>Título da Atividade</label>
                <input
                  type='text'
                  required
                  placeholder='Ex: Abertura da Semana de Recepção'
                  value={modalForm.Titulo}
                  onChange={(e) => setModalForm({ ...modalForm, Titulo: e.target.value })}
                  className='w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 outline-none focus:border-amber-500 font-medium'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between'>
                  <span>Local do Evento</span>
                  {modalForm.Local && (() => {
                    const matchedId = getLocationId(modalForm.Local);
                    const matchedObj = useLocationSearch.getState().getLocationObject(matchedId);
                    const isExactCampus = matchedId && matchedId !== 'usp';
                    return isExactCampus ? (
                      <span className='text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium flex items-center gap-1 border border-emerald-200'>
                        <PlaceOutlined fontSize='inherit' />
                        <span>Ponto GPS: {matchedObj.name}</span>
                      </span>
                    ) : (
                      <span className='text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium flex items-center gap-1 border border-amber-200'>
                        <span>GPS Geral (Campus 1)</span>
                      </span>
                    );
                  })()}
                </label>
                <input
                  type='text'
                  list='campus-locations-list'
                  placeholder='Ex: Auditório Fernão, Vão da Biblioteca, Redondo...'
                  value={modalForm.Local}
                  onChange={(e) => setModalForm({ ...modalForm, Local: e.target.value })}
                  className='w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 outline-none focus:border-amber-500'
                />
                <datalist id='campus-locations-list'>
                  {locationsList.map((loc) => (
                    <option key={loc.id} value={loc.name} />
                  ))}
                </datalist>

                {/* Quick Selection Chips from Dynamic Locations */}
                <div className='flex flex-wrap gap-1.5 mt-2'>
                  {locationsList.slice(0, 8).map((loc) => (
                    <button
                      key={loc.id}
                      type='button'
                      onClick={() => setModalForm({ ...modalForm, Local: loc.name })}
                      className={`text-[10px] px-2 py-0.5 rounded font-medium transition-colors ${
                        modalForm.Local === loc.name ?
                          'bg-amber-500 text-slate-950 font-bold' :
                          'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      + {loc.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold text-slate-700 mb-1'>Descrição (Markdown suportado)</label>
                <textarea
                  rows={4}
                  placeholder='Informações para os calouros, cursos participantes ou divisões de salas...'
                  value={modalForm.Descricao}
                  onChange={(e) => setModalForm({ ...modalForm, Descricao: e.target.value })}
                  className='w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 outline-none focus:border-amber-500 resize-y'
                />
              </div>

              <div className='flex items-center justify-end gap-2 pt-4 border-t border-slate-100'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow transition-all'
                >
                  Salvar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT CAMPUS LOCATION & COORDINATES                           */}
      {/* ========================================================================= */}
      {isLocationModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in'>
          <div className='bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto'>
            <div className='flex items-center justify-between pb-3 border-b border-slate-100'>
              <h3 className='text-lg font-bold text-slate-900 flex items-center gap-2'>
                <PlaceOutlined className='text-amber-500' />
                <span>{editingLocation ? 'Editar Local do Campus' : 'Novo Local do Campus'}</span>
              </h3>
              <button
                type='button'
                onClick={() => setIsLocationModalOpen(false)}
                className='text-slate-400 hover:text-slate-600 text-lg font-bold p-1'
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveLocation} className='space-y-4'>
              <div>
                <label className='block text-xs font-semibold text-slate-700 mb-1'>
                  Nome Legível do Local (para os calouros)
                </label>
                <input
                  type='text'
                  required
                  placeholder='Ex: Auditório Fernão Stella de Rodrigues Germano'
                  value={locationForm.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const autoId = !editingLocation && !locationForm.id ?
                      name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') :
                      locationForm.id;
                    setLocationForm({ ...locationForm, name, id: autoId });
                  }}
                  className='w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 outline-none focus:border-amber-500 font-medium'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-slate-700 mb-1'>
                  Identificador Único (ID / Slug em minúsculas)
                </label>
                <input
                  type='text'
                  required
                  placeholder='Ex: fernao, bloco-5, redondo'
                  value={locationForm.id}
                  disabled={!!editingLocation}
                  onChange={(e) => setLocationForm({ ...locationForm, id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') })}
                  className='w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-800 outline-none focus:border-amber-500 disabled:opacity-60 disabled:bg-slate-100'
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div>
                  <label className='block text-xs font-semibold text-slate-700 mb-1'>
                    Latitude GPS
                  </label>
                  <input
                    type='number'
                    step='any'
                    required
                    placeholder='-22.007129'
                    value={locationForm.lat}
                    onChange={(e) => setLocationForm({ ...locationForm, lat: e.target.value })}
                    className='w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-800 outline-none focus:border-amber-500'
                  />
                </div>
                <div>
                  <label className='block text-xs font-semibold text-slate-700 mb-1'>
                    Longitude GPS
                  </label>
                  <input
                    type='number'
                    step='any'
                    required
                    placeholder='-47.895034'
                    value={locationForm.lon}
                    onChange={(e) => setLocationForm({ ...locationForm, lon: e.target.value })}
                    className='w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-800 outline-none focus:border-amber-500'
                  />
                </div>
              </div>

              {/* Quick Coordinate Presets */}
              <div className='p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2'>
                <span className='font-semibold text-slate-700 block'>Pontos de Referência Rápidos:</span>
                <div className='flex flex-wrap gap-1.5'>
                  <button
                    type='button'
                    onClick={() => setLocationForm((p) => ({ ...p, lat: -22.007278, lon: -47.894515 }))}
                    className='px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-amber-500 text-[11px] font-medium text-slate-700 transition-colors'
                  >
                    ICMC Centro / Redondo
                  </button>
                  <button
                    type='button'
                    onClick={() => setLocationForm((p) => ({ ...p, lat: -22.004984, lon: -47.896350 }))}
                    className='px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-amber-500 text-[11px] font-medium text-slate-700 transition-colors'
                  >
                    Salão de Eventos USP
                  </button>
                  <button
                    type='button'
                    onClick={() => setLocationForm((p) => ({ ...p, lat: -22.006865, lon: -47.896796 }))}
                    className='px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-amber-500 text-[11px] font-medium text-slate-700 transition-colors'
                  >
                    CAASO / Palquinho
                  </button>
                  <button
                    type='button'
                    onClick={() => setLocationForm((p) => ({ ...p, lat: -22.007651, lon: -47.894855 }))}
                    className='px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-amber-500 text-[11px] font-medium text-slate-700 transition-colors'
                  >
                    Biblioteca ICMC
                  </button>
                </div>
                <p className='text-[10px] text-slate-400 mt-1'>
                  💡 Dica: Você também pode clicar diretamente em qualquer ponto do mapa para capturar as coordenadas exatas!
                </p>
              </div>

              <div>
                <label className='block text-xs font-semibold text-slate-700 mb-1'>
                  Palavras-chave de Reconhecimento Automático (separadas por vírgula)
                </label>
                <input
                  type='text'
                  placeholder='Ex: fernão, fernao, auditório fernão, germano'
                  value={locationForm.keywords}
                  onChange={(e) => setLocationForm({ ...locationForm, keywords: e.target.value })}
                  className='w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 outline-none focus:border-amber-500'
                />
                <p className='text-[10px] text-slate-400 mt-1'>
                  Quando o texto de um evento contiver qualquer um desses termos, o mapa abrirá automaticamente neste pin.
                </p>
              </div>

              <div>
                <label className='block text-xs font-semibold text-slate-700 mb-1'>
                  Descrição ou Observações do Local (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder='Ex: Prédio principal do ICMC com salas e laboratórios...'
                  value={locationForm.description}
                  onChange={(e) => setLocationForm({ ...locationForm, description: e.target.value })}
                  className='w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 outline-none focus:border-amber-500 resize-y'
                />
              </div>

              <div className='flex items-center justify-end gap-2 pt-4 border-t border-slate-100'>
                <button
                  type='button'
                  onClick={() => setIsLocationModalOpen(false)}
                  className='px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  disabled={isSavingLocation}
                  className='px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm shadow transition-all flex items-center gap-2'
                >
                  {isSavingLocation ? (
                    <>
                      <span className='w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin'></span>
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <span>Salvar Local no Mapa</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PUBLISH CONFIRMATION DIALOG                                        */}
      {/* ========================================================================= */}
      {isPublishDialogOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in'>
          <div className='bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4'>
            <div className='flex items-start gap-3'>
              <div className='w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0'>
                <PublishOutlined />
              </div>
              <div>
                <h3 className='text-lg font-bold text-slate-900'>Publicar Cronograma na Página Inicial</h3>
                <p className='text-xs text-slate-500 mt-0.5'>
                  Esta ação atualizará o cronograma imediatamente para todos os estudantes acessando o portal.
                </p>
              </div>
            </div>

            <div className='p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5'>
              <div className='flex justify-between text-slate-600'>
                <span>Total de eventos:</span>
                <span className='font-bold font-mono text-slate-900'>{events.length}</span>
              </div>
              <div className='flex justify-between text-slate-600'>
                <span>Dias com programação:</span>
                <span className='font-bold font-mono text-slate-900'>{daysList.length}</span>
              </div>
              <div className='flex justify-between text-slate-600'>
                <span>Autor da publicação:</span>
                <span className='font-mono text-slate-900'>{currentUser?.email}</span>
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold text-slate-700 mb-1'>
                Nota ou Comentário da Revisão (Opcional)
              </label>
              <input
                type='text'
                placeholder='Ex: Ajuste dos horários de terça e nova sala da gincana'
                value={publishNotes}
                onChange={(e) => setPublishNotes(e.target.value)}
                className='w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 outline-none focus:border-amber-500'
              />
            </div>

            <div className='flex items-center justify-end gap-2 pt-2'>
              <button
                type='button'
                onClick={() => setIsPublishDialogOpen(false)}
                className='px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors'
              >
                Voltar
              </button>
              <button
                type='button'
                disabled={isPublishing}
                onClick={handlePublish}
                className='px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2'
              >
                {isPublishing ? (
                  <>
                    <span className='w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin'></span>
                    <span>Publicando...</span>
                  </>
                ) : (
                  <span>Confirmar e Publicar</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* IN-APP CONFIRMATION MODAL (Zero window.confirm / iframe safe)            */}
      {/* ========================================================================= */}
      {confirmDialog.open && (
        <div className='fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in'>
          <div className='bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 space-y-4'>
            <div>
              <h3 className='text-base sm:text-lg font-bold text-slate-900'>{confirmDialog.title}</h3>
              <p className='text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed'>{confirmDialog.message}</p>
            </div>
            <div className='flex items-center justify-end gap-2 pt-2'>
              <button
                type='button'
                onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
                className='px-3.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors'
              >
                Cancelar
              </button>
              <button
                type='button'
                onClick={() => {
                  const action = confirmDialog.onConfirm;
                  setConfirmDialog({ ...confirmDialog, open: false });
                  if (action) action();
                }}
                className={`px-4 py-2 rounded-xl text-white font-bold text-xs shadow-md transition-all ${
                  confirmDialog.isDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                {confirmDialog.confirmLabel || 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
