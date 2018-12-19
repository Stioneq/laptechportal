import {environment} from '../../environments/environment';

export const getApiUrl = url => `${environment.url}/api/${url}`;

export const getAuthUrl = url => `${environment.url}/auth/${url}`;

export const getServerUrl = (...urlParts) => `${environment.url}/${urlParts.join('/')}`;
