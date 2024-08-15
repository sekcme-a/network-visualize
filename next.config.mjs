module.exports = {
  // 사용자의 GitHub 사용자 이름과 리포지토리 이름에 맞게 경로를 설정하세요
  basePath: '/network-vis',
  assetPrefix: '/network-vis/',
  
  // 정적 사이트 생성을 위한 설정
  exportTrailingSlash: true,
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/result': { page: '/result' },
      // 필요에 따라 더 많은 경로를 추가하세요
    };
  },
};
