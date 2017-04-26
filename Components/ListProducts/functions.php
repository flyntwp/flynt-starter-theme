<?php
namespace Flynt\Components\ListProducts;

use Flynt\Features\Components\Component;
use Flynt\Utils\Feature;
use Flynt\Features\Acf\OptionPages;
use Timber\Timber;
use Timber\Post;
use Flynt\Utils\Log;

add_filter('Flynt/addComponentData?name=ListProducts', function ($data) {
    $defaultCount = OptionPages::getOptions('globalOptions', 'customPostType', 'product');
    $data['overviewPage'] = OptionPages::getOption('translatableOptions', 'customPostType', 'Product', 'overviewPage');
    $args = [
        'post_type' => 'product',
        'posts_per_page' => ($defaultCount) ? $defaultCount : 10,
        'order' => 'ASC',
        'orderby' => 'menu_order'
    ];
    $data['products'] = Timber::get_posts($args);
    return $data;
});

add_action('wp_enqueue_scripts', function () {
    Component::enqueueAssets('ListProducts');
});
