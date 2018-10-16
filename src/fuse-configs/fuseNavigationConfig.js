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
                'id'   : 'weatherControl',
                'title': 'ควบคุมสภาพอากาศ',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/weatherControl'
            }
        ]
    }
];
