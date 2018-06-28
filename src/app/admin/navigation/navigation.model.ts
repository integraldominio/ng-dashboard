export class NavigationModel {

  public model: any[];

  constructor() {
    this.model = [
      {
        'id': 'home',
        'title': 'Home',
        'type': 'item',
        'icon': 'home',
        'url': '/home'
      },
      {
        'id': 'forms',
        'title': 'Forms',
        'type': 'collapse',
        'icon': 'format_color_text',
        'children': [
          {
            'id': 'elements',
            'title': 'Elementos',
            'type': 'item',
            'url': '/forms/elements'
          }, {
            'id': 'validation',
            'title': 'Validações',
            'type': 'item',
            'url': '/forms/validation'
          }, {
            'id': 'editor',
            'title': 'Editor',
            'type': 'item',
            'url': '/forms/editor'
          }
        ]
      }
    ];
  }

}
