/**
 * Where the API lives.
 *
 * This used to be hardcoded to http://localhost:5001 in each component, which
 * meant that on anyone else's laptop or phone the site called *their* machine
 * and every request failed. It now comes from the build environment:
 *
 *   local dev  -> .env.development sets VITE_API_URL=http://localhost:5001
 *   production -> set VITE_API_URL to the deployed API in the host's dashboard
 *
 * Vite inlines VITE_* variables at build time, so changing this on the host
 * requires a rebuild/redeploy, not just a restart.
 */
const RAW = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Tolerate a trailing slash in the configured value.
export const API_URL = RAW.replace(/\/+$/, '');
export const AUTH_URL = `${API_URL}/api/auth`;
export const USER_URL = `${API_URL}/api/user`;

const TOKEN_KEY = 'zakatToken';
const USER_KEY = 'zakatUser';

export const getToken = () => {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
};

export const saveSession = (token, user) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch { /* private mode - the session just will not persist */ }
};

export const clearSession = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch { /* ignore */ }
};

/** fetch() with the bearer token attached and JSON parsed. */
export async function apiFetch(url, options = {}) {
  const token = getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  let data = {};
  try { data = await res.json(); } catch { /* empty or non-JSON body */ }

  // An expired or invalid session should not leave a half-logged-in UI.
  if (res.status === 401) clearSession();

  return { ok: res.ok, status: res.status, data };
}
