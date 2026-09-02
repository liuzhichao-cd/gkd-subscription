import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.ctq.qmchat',
  name: '量子密信',
  groups: [
    {
      key: 1,
      name: '权限提示',
      matchTime: 10000,
      activityIds: 'com.ctq.modulemain.ui.MainActivity',
      rules: [
        {
          key: 0,
          name: '关闭消息权限提示',
          fastQuery: true,
          matches: 'TextView[text="取消"]',
          snapshotUrls: [
            'https://i.gkd.li/i/31737540',
          ],
        },
        {
          key: 1,
          name: '关闭消息权限指引',
          fastQuery: true,
          matches: 'TextView[text="我知道了"]',
          snapshotUrls: [
            'https://i.gkd.li/i/31737509',
          ],
        },
      ],
    },
  ],
});
