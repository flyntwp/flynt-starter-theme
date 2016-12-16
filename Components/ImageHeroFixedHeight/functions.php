<?php
namespace Flynt\Components\ImageHeroFixedHeight;

use Flynt\Helpers\Component;

add_action('wp_enqueue_scripts', function () {
  Component::enqueueAssets('ImageHeroFixedHeight', [
    [
      'name' => 'objectfit-polyfill',
      'path' => 'vendor/objectfit-polyfill.js',
      'type' => 'script'
    ]
  ]);
});
