Component({
  externalClasses: ['icon-class'],
  properties: {
    baseList: {
      type: Array,
      value: [
        {
          title: '基础',
          subhead: '包含颜色、文本、图标',
          id: '1',
          imgUrl: '/assets/ComUI/base/jichu.png',
          visibleImg: true,
          pageUrl: '/subpackages/module/pages/base/base',
          iconUrl: '/assets/ComUI/base/right-circle.png',
        },
        {
          title: '视图',
          subhead: '包含通告栏、标签、徽章等',
          id: '2',
          imgUrl: '../../assets/ComUI/base/shitu.png',
          visibleImg: true,
          pageUrl: '/subpackages/module/pages/base/base',
          iconUrl: '/assets/ComUI/base/right-circle.png',
        },
      ],
    },
  },
  methods: {
    onTapRedirect(e: any) {
      const { pageurl } = e.currentTarget.dataset
      wx.navigateTo({
        url: pageurl,
      })
    },
  },
})
