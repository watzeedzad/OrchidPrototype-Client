export const fuseNavigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'example-component',
                'title': 'Example',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/example'
            },
            {
                'id'   : 'userManagement',
                'title': 'รายชื่อผู้ใช้งาน',
                'type' : 'item',
                'icon' : 'account_box',
                'url'  : '/userManagement'
            },
            {
                'id'   : 'weatherControl',
                'title': 'ควบคุมสภาพอากาศ',
                'type' : 'item',
                'icon' : 'wb_sunny',
                'url'  : '/weatherControl'
            },
            {
                'id'   : 'controllerManagement',
                'title': 'จัดการคอนโทรลเลอร์',
                'type' : 'item',
                'icon' : 'wb_sunny',
                'url'  : '/controllerManagement'
            }
        ]
    }
];
