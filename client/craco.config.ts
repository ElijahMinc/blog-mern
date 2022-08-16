/// <reference types="react-scripts" />

const path = require(`path`);

const craco = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@Common': path.resolve(__dirname, 'src/components/Common'),
      '@Logic': path.resolve(__dirname, 'src/components/Logic'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@typesModule': path.resolve(__dirname, 'src/types'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@HOC': path.resolve(__dirname, 'src/HOC'),
      '@static': path.resolve(__dirname, 'src/static'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@service': path.resolve(__dirname, 'src/service'),
    }
  },
};

export default craco