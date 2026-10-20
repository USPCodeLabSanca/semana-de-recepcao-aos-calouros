import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import API from '../lib/api';
import LogoIcmc from '../images/logo-icmc-branco.svg';
import LogoUsp from '../images/logo-usp-branco.png';
import {
  ShieldOutlined,
  ErrorOutline,
  SettingsOutlined,
} from '@mui/icons-material';

/**
 * Admin Login Page
 * Supports institutional Google OAuth (@usp.br and @icmc.usp.br)
 * @return {JSX.Element} Login component
 */
export default function AdminLogin() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [googleClientId, setGoogleClientId] = useState(() => {
    return import.meta.env.VITE_GOOGLE_CLIENT_ID || (typeof window !== 'undefined' ? localStorage.getItem('calouros_google_client_id') || '' : '');
  });
  const [devEmail, setDevEmail] = useState('');
  const tokenClientRef = useRef(null);

  useEffect(() => {
    // Check if user is already logged in
    API.auth.me().then((res) => {
      if (res.authenticated && res.isAllowed) {
        history.replace('/admin');
      }
    }).catch(() => {});
  }, [history]);

  // Initialize Google Identity Services if client ID is available
  useEffect(() => {
    if (!googleClientId || typeof window === 'undefined') return;

    const initGis = () => {
      if (!window.google?.accounts) return;

      try {
        // Init ID Token flow (no hosted_domain restriction to allow both @usp.br and @icmc.usp.br)
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response) => {
            if (response.credential) {
              setIsLoading(true);
              setErrorMessage('');
              try {
                const res = await API.auth.googleLogin({ credential: response.credential });
                if (res.success) {
                  history.push('/admin');
                }
              } catch (err) {
                setErrorMessage(err.response?.data?.error || 'Erro ao autenticar com Google. Verifique se seu e-mail está na lista de permissões.');
              } finally {
                setIsLoading(false);
              }
            }
          },
        });

        // Note: Do NOT call window.google.accounts.id.renderButton to avoid displaying duplicate buttons.
        // The site uses exclusively its own single login button.

        // Also init OAuth 2.0 token client for custom button click (supports both @usp.br and @icmc.usp.br)
        tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'email profile openid',
          callback: async (tokenResponse) => {
            if (tokenResponse?.access_token) {
              setIsLoading(true);
              setErrorMessage('');
              try {
                const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const userInfo = await userInfoRes.json();
                const res = await API.auth.googleLogin({
                  email: userInfo.email,
                  name: userInfo.name,
                  picture: userInfo.picture,
                });
                if (res.success) {
                  history.push('/admin');
                }
              } catch (err) {
                setErrorMessage(err.response?.data?.error || 'Acesso negado: sua conta institucional não está na lista de administradores autorizados.');
              } finally {
                setIsLoading(false);
              }
            }
          },
        });
      } catch (err) {
        console.warn('GIS init error:', err);
      }
    };

    if (window.google?.accounts) {
      initGis();
    } else {
      const timer = setInterval(() => {
        if (window.google?.accounts) {
          clearInterval(timer);
          initGis();
        }
      }, 300);
      return () => clearInterval(timer);
    }
  }, [googleClientId, history]);

  const handleGoogleClick = () => {
    setErrorMessage('');
    if (tokenClientRef.current) {
      tokenClientRef.current.requestAccessToken({ prompt: 'select_account' });
      return;
    }

    if (window.google?.accounts?.id && googleClientId) {
      window.google.accounts.id.prompt();
      return;
    }

    // If client ID is not configured yet in this environment, open modal
    setShowConfigModal(true);
  };

  const handleDevLoginSubmit = async (e) => {
    e.preventDefault();
    if (!devEmail || !devEmail.includes('@')) {
      setErrorMessage('Informe um e-mail institucional válido.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await API.auth.devLogin(devEmail, devEmail.split('@')[0]);
      if (res.success) {
        history.push('/admin');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Acesso negado: o e-mail informado não está na lista de administradores autorizados.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClientId = (newId) => {
    setGoogleClientId(newId.trim());
    try {
      localStorage.setItem('calouros_google_client_id', newId.trim());
    } catch {}
    setShowConfigModal(false);
  };

  return (
    <div className='min-h-screen bg-slate-900 text-white flex flex-col justify-between pt-12 pb-6 px-4 selection:bg-amber-500 selection:text-white'>
      <div className='max-w-md w-full mx-auto my-auto'>
        {/* Header Branding */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-2xl mb-4 shadow-xl'>
            <img src={LogoIcmc} alt='ICMC USP' className='h-9' />
            <span className='text-slate-500'>|</span>
            <img src={LogoUsp} alt='USP' className='h-9' />
          </div>
          <h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2'>
            Painel da Semana de Recepção
          </h1>
          <p className='text-sm text-slate-400'>
            Acesso restrito para membros da comissão organizadora e Codelab
          </p>
        </div>

        {/* Card Form */}
        <div className='bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm space-y-6'>
          {errorMessage && (
            <div className='p-4 rounded-xl bg-red-950/60 border border-red-800/60 text-red-200 text-xs sm:text-sm flex items-start gap-3 animate-fade-in'>
              <ErrorOutline className='text-red-400 shrink-0 mt-0.5' fontSize='small' />
              <div>
                <p className='font-semibold'>Não foi possível autenticar</p>
                <p className='text-xs mt-1 text-red-300 leading-relaxed'>{errorMessage}</p>
              </div>
            </div>
          )}

          <div className='text-center space-y-2'>
            <div className='w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shadow-inner'>
              <ShieldOutlined fontSize='medium' />
            </div>
            <h2 className='text-lg font-bold text-white'>Autenticação Institucional</h2>
            <p className='text-xs text-slate-400 leading-relaxed max-w-sm mx-auto'>
              Faça login com sua conta Google institucional (<span className='font-mono text-slate-300 font-semibold'>@usp.br</span> ou <span className='font-mono text-slate-300 font-semibold'>@icmc.usp.br</span>) cadastrada na lista de administradores autorizados.
            </p>
          </div>

          {/* Google OAuth Action Button (Single site button, no duplicate GIS iframe button) */}
          <button
            type='button'
            disabled={isLoading}
            onClick={handleGoogleClick}
            className='w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl disabled:opacity-60 flex items-center justify-center gap-3 border border-slate-200 group cursor-pointer'
          >
            {isLoading ? (
              <>
                <span className='inline-block w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin'></span>
                <span>Verificando autorização...</span>
              </>
            ) : (
              <>
                {/* Official Google G Icon */}
                <svg className='w-5 h-5 shrink-0 group-hover:scale-110 transition-transform' viewBox='0 0 24 24'>
                  <path
                    fill='#4285F4'
                    d='M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z'
                  />
                  <path
                    fill='#34A853'
                    d='M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.27 21.36 7.35 24 12 24z'
                  />
                  <path
                    fill='#FBBC05'
                    d='M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.58H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.42l4.02-3.13z'
                  />
                  <path
                    fill='#EA4335'
                    d='M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.64 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z'
                  />
                </svg>
                <span>Entrar com Google (@usp.br / @icmc.usp.br)</span>
              </>
            )}
          </button>

          {!googleClientId && (
            <div className='pt-2 text-center'>
              <button
                type='button'
                onClick={() => setShowConfigModal(true)}
                className='text-[11px] text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1 font-medium'
              >
                <SettingsOutlined fontSize='inherit' />
                <span>Opções de Conexão Google / Ambiente</span>
              </button>
            </div>
          )}
        </div>

        {/* Back to public site */}
        <div className='text-center mt-6'>
          <Link to='/' className='text-xs text-slate-400 hover:text-amber-400 transition-colors'>
            ← Voltar para o portal público da Semana de Recepção
          </Link>
        </div>
      </div>

      {/* Modal: Google OAuth / Dev verification */}
      {showConfigModal && (
        <div className='fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in text-slate-800'>
          <div className='bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4'>
            <div className='flex items-center justify-between pb-3 border-b border-slate-100'>
              <h3 className='text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2'>
                <ShieldOutlined className='text-amber-500' />
                <span>Autenticação Google (@usp.br / @icmc.usp.br)</span>
              </h3>
              <button
                type='button'
                onClick={() => setShowConfigModal(false)}
                className='text-slate-400 hover:text-slate-600 text-lg font-bold p-1'
              >
                ✕
              </button>
            </div>

            <div className='text-xs text-slate-600 space-y-2'>
              <p>
                Para login via popup oficial do Google em produção na sua VM, defina <code className='font-mono bg-slate-100 text-slate-800 px-1 py-0.5 rounded'>VITE_GOOGLE_CLIENT_ID</code> no arquivo <code className='font-mono bg-slate-100 text-slate-800 px-1 py-0.5 rounded'>.env</code>.
              </p>
              <p>
                Você pode colar seu Google Client ID abaixo ou, se estiver testando neste preview, informar seu e-mail institucional para validar o acesso contra a allowlist do banco de dados:
              </p>
            </div>

            {/* Dev verification form */}
            <form onSubmit={handleDevLoginSubmit} className='p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3'>
              <label className='block text-xs font-semibold text-slate-700'>
                E-mail Institucional (@usp.br ou @icmc.usp.br)
              </label>
              <input
                type='email'
                required
                placeholder='seu-email@usp.br ou @icmc.usp.br'
                value={devEmail}
                onChange={(e) => setDevEmail(e.target.value)}
                className='w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500'
              />
              <button
                type='submit'
                disabled={isLoading}
                className='w-full py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5'
              >
                {isLoading ? 'Verificando allowlist...' : 'Validar Acesso'}
              </button>
            </form>

            {/* Custom Google Client ID input */}
            <div className='pt-2 border-t border-slate-100 space-y-2'>
              <label className='block text-[11px] font-semibold text-slate-500'>
                Configurar Google Client ID (Opcional):
              </label>
              <div className='flex gap-2'>
                <input
                  type='text'
                  placeholder='123456789-abc.apps.googleusercontent.com'
                  value={googleClientId}
                  onChange={(e) => setGoogleClientId(e.target.value)}
                  className='w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-[11px] font-mono text-slate-700 focus:outline-none focus:border-amber-500'
                />
                <button
                  type='button'
                  onClick={() => handleSaveClientId(googleClientId)}
                  className='px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shrink-0'
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className='text-center text-xs text-slate-600 mt-6'>
        ICMC USP São Carlos · Desenvolvido pelo USPCodeLab
      </footer>
    </div>
  );
}
