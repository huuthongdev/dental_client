export const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
export const appVersion = '1.0.0';

// GENERAL
export const ROOT_EMAIL = 'admin@gmail.com';

// URL DEVELOPMENT
// export const URL_CLIENT = 'http://localhost:3000';
// export const URL_SERVER_API = 'http://localhost:4000';

// URL STAGG
// export const URL_CLIENT = isDev ? 'http://localhost:3000' : 'https://dentaldemo.herokuapp.com';
// export const URL_SERVER_API = isDev ? 'http://localhost:4000' : 'https://api-dental.herokuapp.com';

// URL NHA KHOA BAO AN CONFIG
export const URL_CLIENT = isDev ? 'http://localhost:3000' : 'https://app.nhakhoabaoan.vn';
export const URL_SERVER_API = isDev ? 'http://localhost:4000' : 'https://api-dental-baoan.herokuapp.com';

// LAYOUT RELATED
export const ITEMS_PER_PAGE = 8;