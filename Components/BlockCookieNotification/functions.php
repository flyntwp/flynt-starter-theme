<?php

namespace Flynt\Components\BlockCookieNotification;

use Flynt\Features\Components\Component;

add_action('wp_enqueue_scripts', function () {
    Component::enqueueAssets('BlockCookieNotification', []);
});

add_filter('Flynt/addComponentData?name=BlockCookieNotification', function ($data) {

    return $data;
});
