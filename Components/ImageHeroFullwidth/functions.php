<?php
namespace Flynt\Components\ImageHeroFullwidth;

use Flynt\Helpers\Component;

add_action('wp_enqueue_scripts', function () {
  Component::enqueueAssets('ImageHeroFullwidth', [
    [
      'name' => 'objectfit-polyfill',
      'path' => 'vendor/objectfit-polyfill.js',
      'type' => 'script'
    ]
  ]);
});
