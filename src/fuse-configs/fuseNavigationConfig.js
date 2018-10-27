export const fuseNavigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'userManagement',
                'title': 'รายชื่อผู้ใช้งาน',
                'type' : 'item',
                'icon' : 'account_box',
                'url'  : '/userManagement'
            },
            {
                'id'   : 'controllerManagement',
                'title': 'จัดการคอนโทรลเลอร์',
                'type' : 'item',
                'icon' : 'cast',
                'url'  : '/controllerManagement'
            },
            {
                'id'   : 'weatherControl',
                'title': 'ควบคุมสภาพอากาศ',
                'type' : 'item',
                'icon' : 'wb_sunny',
                'url'  : '/weatherControl'
            },
            {
                'id'   : 'planterAnalyze',
                'title': 'วิเคราะห์สภาพเครื่องปลูก',
                'type' : 'item',
                'icon' : 'filter_vintage',
                'url'  : '/planterAnalyze'
            },
            {
                'id'   : 'waterControl',
                'title': 'ตั้งค่าการให้น้ำ',
                'type' : 'item',
                'icon' : 'waves',
                'url'  : '/waterControl'
            },
            {
                'id'   : 'fertilizerControl',
                'title': 'ตั้งค่าการให้ปุ๋ย',
                'type' : 'item',
                'icon' : 'local_florist',
                'url'  : '/fertilizerControl'
            },
        ]
    }
];
