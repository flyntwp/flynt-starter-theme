<?php

namespace Flynt\Features\AcfGutenberg;

use Flynt;
use Flynt\Utils\Asset;
use ACFComposer\ACFComposer;
use Timber\Timber;

function registerGutenbergComponents($components, $postTypes = null)
{
    foreach ($components as $component) {
        $config = apply_filters($component, null);
        acf_register_block([
            'name' => $config['name'],
            'title' => $config['label'],
            'render_callback' => renderBlockCallback($config['name']),
            'category' => 'flynt',
            'mode' => 'edit',
            'post_types' => $postTypes,
            'align' => 'full',
            // 'supports' => [
            //     'align' => 'wide',
            // ],
            // 'icon' => 'admin-comments',
            // 'keywords' => array( 'testimonial', 'quote' ),
        ]);
        $fieldGroup = [
            'name' => $config['name'],
            'title' => $config['label'],
            'fields' => [
                $component . '/SubFields',
            ],
            'location' => [
                [
                    [
                        'param' => 'block',
                        'operator' => '==',
                        'value' => 'acf/' . strtolower($config['name']),
                    ],
                ],
            ],
        ];

        add_action('enqueue_block_editor_assets', function () use ($config) {
            $name = ucfirst($config['name']);
            Asset::enqueue([
                'type' => 'style',
                'name' => "Flynt/Components/{$name}",
                'path' => "Components/{$name}/style.css",
                'dependencies' => ['wp-edit-blocks'],
            ]);
        });

        ACFComposer::registerFieldGroup($fieldGroup);
    }
};

function renderBlockCallback($componentName)
{
    return function ($block, $content, $isPreview, $postId) use ($componentName) {
        $html = Timber::compile_string('{{ renderComponent(name, data)}}', [
            'name' => ucfirst($componentName),
            'data' => get_fields(),
        ]);
        echo $html;
    };
};

add_filter('block_categories', function ($categories, $post) {
    return array_merge(
        [
            [
                'slug' => 'flynt',
                'title' => __('Flynt Components', 'flynt'),
                // 'icon'  => 'welcome-view-site',
            ],
        ],
        $categories
    );
}, 10, 2);

add_theme_support('align-wide');
add_theme_support('align-full');

add_action('enqueue_block_editor_assets', function () {
    Asset::enqueue([
        'name' => 'Flynt/assets',
        'path' => 'assets/style.css',
        'type' => 'style',
        'dependencies' => ['wp-edit-blocks'],
    ]);
    Asset::enqueue([
        'type' => 'script',
        'name' => 'Flynt/Features/AcfGutenberg',
        'path' => 'Features/AcfGutenberg/admin.js',
        'dependencies' => ['wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api'],
        // 'dependencies' => ['wp-blocks', 'wp-element'],
    ]);
    Asset::enqueue([
        'name' => 'lazysizes',
        'type' => 'script',
        'path' => 'vendor/lazysizes.js'
    ]);
});
