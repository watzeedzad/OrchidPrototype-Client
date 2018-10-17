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
                'icon' : 'whatshot',
                'url'  : '/userManagement'
            },
            {
                'id'   : 'weatherControl',
                'title': 'ควบคุมสภาพอากาศ',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/weatherControl'
            }
        ]
    }
];
