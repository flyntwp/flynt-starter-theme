<?php

namespace Flynt\Features\GoogleAnalytics;

define(__NAMESPACE__ . '\NS', __NAMESPACE__ . '\\');

require_once __DIR__ . '/GoogleAnalytics.php';

use Flynt\Features\GoogleAnalytics\GoogleAnalytics;
use Flynt\Utils\Feature;
use Flynt\Utils\Asset;
use Flynt\Features\Acf\OptionPages;

add_action('init', 'Flynt\Features\GoogleAnalytics\init', 100);

function init()
{
    $googleAnalyticsOptions = OptionPages::get('globalOptions', 'feature', 'GoogleAnalytics');
    $googleAnalyticsOptionsTranslatable = OptionPages::get('translatableOptions', 'feature', 'GoogleAnalytics');
    if ($googleAnalyticsOptions) {
        new GoogleAnalytics($googleAnalyticsOptions);
    }

    Asset::enqueue([
        'type' => 'script',
        'name' => 'Flynt/Features/GoogleAnalytics',
        'path' => 'Features/GoogleAnalytics/script.js',
        'dependencies' => ['jquery']
    ]);

    $data = [
        'gaId' => $googleAnalyticsOptions['gaId'],
        'confirm' => $googleAnalyticsOptionsTranslatable['optoutConfirm'],
        'success' => $googleAnalyticsOptionsTranslatable['optoutSuccess']
    ];
    wp_localize_script('Flynt/Features/GoogleAnalytics', 'wpData', $data);
}
