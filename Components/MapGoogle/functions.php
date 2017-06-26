<?php

namespace Flynt\Components\MapGoogle;

use Flynt\Features\Components\Component;
use Flynt\Features\Acf\OptionPages;

add_action('wp_enqueue_scripts', function () {
    $GoogleMapsApiGlobalOptions = OptionPages::get('globalOptions', 'feature', 'GoogleMapsApi');
    $enqueuedAssets = [
        [
            'type' => 'script',
            'name' => 'jquery-throttle-debounce',
            'path' => 'vendor/jquery-throttle-debounce.js',
            'dependencies' => ['jquery']
        ]
    ];

    if (isset($GoogleMapsApiGlobalOptions['apiKey'])) {
        array_push($enqueuedAssets, [
            'type' => 'script',
            'name' => 'GoogleMapsApi',
            'path' => 'https://maps.googleapis.com/maps/api/js?key=' . $GoogleMapsApiGlobalOptions['apiKey']
        ]);
    }

    Component::enqueueAssets('MapGoogle', $enqueuedAssets);
});

add_filter('Flynt/addComponentData?name=MapGoogle', function ($data) {
    $data['infoContent'] = htmlspecialchars(json_encode($data['infoContent']));
    return $data;
});
