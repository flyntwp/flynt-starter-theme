<?php

namespace Flynt\Components\LayoutSingleProduct;

use Timber\Timber;
use Flynt\Features\Components\Component;

add_action('wp_enqueue_scripts', function () {
    Component::enqueueAssets('LayoutSingleProduct');
});

add_filter('Flynt/addComponentData?name=LayoutSingleProduct', function ($data) {
    $query = !empty($data['query']) ? $data['query'] : false;
    $post = Timber::get_post($query);
    if (!empty($post)) {
        $fields = get_fields($post->id);
        $post->fields = $fields === false ? [] : $fields;
    }
    $context = [
        'post' => $post
    ];
    return array_merge($context, $data);
});
