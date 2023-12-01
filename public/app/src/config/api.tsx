const isProduction = process.env.NODE_ENV === 'production';

const devApiConfig = {
  baseUrl: 'http://localhost:5550/api/v1'
};

const prodApiConfig = {
  baseUrl: ''
};

const apiConfig = isProduction ? prodApiConfig : devApiConfig;

export { apiConfig };
