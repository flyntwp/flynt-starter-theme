<?php

namespace Flynt\Components\ListPosts;

use Flynt\Features\Components\Component;
use Timber\Timber;

add_action('wp_enqueue_scripts', function () {
    Component::enqueueAssets('ListPosts');
});

add_filter('Flynt/addComponentData?name=ListPosts', function ($data, $parentData) {
    $data['isArchive'] = is_home() || is_archive();
    $data['pagination'] = (isset($parentData['pagination'])) ? $parentData['pagination'] : null;
    $args = [
        'post_status' => 'publish',
        'post_type' => 'post'
    ];
    $data['posts'] = Timber::get_posts($args);
    return $data;
}, 10, 2);
