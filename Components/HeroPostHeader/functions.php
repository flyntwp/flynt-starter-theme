<?php

namespace Flynt\Components\HeroPostHeader;

use Timber\Timber;
use Flynt\Features\Components\Component;
use Flynt\Utils\Asset;

add_action('wp_enqueue_scripts', function () {
    Component::enqueueAssets('HeroPostHeader', []);
});

add_filter('Flynt/addComponentData?name=HeroPostHeader', function ($data) {
    $data['post'] = Timber::get_post();
    $data['providers'] = getShareProviders(
        $data['post']->post_title,
        $data['post']->link,
        $data['post']->post_excerpt
    );
    return $data;
});

function getShareProviders($postTitle, $postUrl, $postExcerpt)
{
    $providers = json_decode(file_get_contents(Asset::requirePath('Components/HeroPostHeader/Partials/Share/providers.json')), true);
    $providers = array_map(function($provider) use ($postTitle, $postUrl, $postExcerpt) {
        $shareUrl = str_replace('$url', $postUrl, $provider['url']);
        $shareUrl = str_replace('$title', $postTitle, $shareUrl);
        $shareUrl = str_replace('$summary', $postExcerpt, $shareUrl);
        $provider['shareUrl'] = $shareUrl;
        return $provider;
    }, $providers);
    return $providers;
}
