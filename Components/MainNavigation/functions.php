<?php

namespace Flynt\Components\MainNavigation;

use Flynt\Features\Acf\OptionPages;
use Timber\Menu;

add_filter('Flynt/addComponentData?name=MainNavigation', function ($data) {
  $data['brandLogo'] = OptionPages::getOption('options', 'component', 'MainNavigation', 'brandLogo');
  $data['homeUrl'] = home_url();
  $data['menuSlug'] = !empty($data['menuSlug']) ? $data['menuSlug'] : '';
  $data['menu'] = new Menu($data['menuSlug']);
  return $data;
});
