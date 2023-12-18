const isProduction = process.env.NODE_ENV === 'production';

const devApiConfig = {
  baseUrl: 'http://127.0.0.1:5550/api/v1'
};

const prodApiConfig = {
  baseUrl: ''
};

const apiConfig = isProduction ? prodApiConfig : devApiConfig;

export { apiConfig };
