<?php
namespace Flynt\Components\MapContact;

use Flynt\Features\Components\Component;
use Flynt\Utils\Log;

add_action('wp_enqueue_scripts', function () {
  Component::enqueueAssets('MapContact');
});

add_filter('Flynt/addComponentData?name=MapContact', function ($data) {
  Log::pp($data);
  return $data;
});
