<?php
namespace Flynt\Components\ImageHeroFullwidthFixedHeight;

use Flynt\Helpers\Component;

add_action('wp_enqueue_scripts', function () {
  Component::enqueueAssets('ImageHeroFullwidthFixedHeight', [
    [
      'name' => 'objectfit-polyfill',
      'path' => 'vendor/objectfit-polyfill.js',
      'type' => 'script'
    ]
  ]);
});
