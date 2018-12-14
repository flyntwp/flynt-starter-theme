<?php

use ACFComposer\ACFComposer;

add_action('acf/init', function () {
    $postComponents = [
        'Flynt/Components/BlockImage/Fields/Layout',
        'Flynt/Components/BlockWysiwyg/Fields/Layout',
    ];
    if (apply_filters('use_block_editor_for_post_type', true, 'post')) {

    } else {
        ACFComposer::registerFieldGroup([
            'name' => 'postComponents',
            'title' => 'Post Components',
            'style' => 'seamless',
            'fields' => [
                [
                    'name' => 'postComponents',
                    'label' => 'Post Components',
                    'type' => 'flexible_content',
                    'button_label' => 'Add Component',
                    'layouts' => $postComponents,
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'post',
                    ],
                ],
            ],
        ]);
    }
});
