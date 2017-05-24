<?php
namespace Flynt\Components\ListProducts;

use Flynt\Features\Components\Component;
use Flynt\Utils\Feature;
use Flynt\Features\Acf\OptionPages;
use Timber\Timber;
use Timber\Post;
use Flynt\Utils\Log;

add_filter('Flynt/addComponentData?name=ListProducts', function ($data) {
    $defaultCount = OptionPages::get('globalOptions', 'customPostType', 'product', 'defaultProductsNumber');
    $data['productTypesLabel'] = OptionPages::get('translatableOptions', 'customPostType', 'product', 'productTypesLabel');
    $data['overviewPage'] = OptionPages::get('translatableOptions', 'customPostType', 'product', 'overviewPage');
    if (isset($data['defaultImage']) && !empty($data['defaultImage'])) {
        $data['image'] = $data['defaultImage'];
    }
    if (isset($data['defaultTitleText']) && !empty($data['defaultTitleText'])) {
        $data['titleText'] = $data['defaultTitleText'];
    }
    $data['someFeatureNumber'] = OptionPages::get('globalOptions', 'feature', 'someProductFeature', 'someFeatureNumber');
    $data['someContent'] = OptionPages::get('translatableOptions', 'feature', 'someProductFeature', 'someContent');
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