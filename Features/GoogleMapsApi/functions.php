<?php

namespace Flynt\Features\GoogleMapsApi;

use Flynt\Utils\Feature;
use Flynt\Features\Acf\OptionPages;

add_action('acf/fields/google_map/api', 'Flynt\Features\GoogleMapsApi\init', 100);

function init($api)
{
    $globalOptions = OptionPages::get('globalOptions', 'feature', 'GoogleMapsApi');
    if (!isset($globalOptions['apiKey']) || strlen($globalOptions['apiKey']) === 0) {
        return $api;
    }

    $api['key'] = $globalOptions['apiKey'];

    return $api;
}
