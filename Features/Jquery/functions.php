<?php

namespace Flynt\Features\Jquery;

use Flynt\Utils\Asset;
use Flynt\Utils\Feature;

add_action('wp_enqueue_scripts', function () {
    Asset::register([
        'type' => 'script',
        'name' => 'jquery-flynt',
        'path' => 'Features/Jquery/script.js'
    ]);
}, 0); // NOTE: prio needs to be < 1
