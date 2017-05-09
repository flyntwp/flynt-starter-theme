<?php

namespace Flynt\Features\TinyMce;

use Flynt\Utils\Asset;

// Clean Up TinyMCE Buttons

// First Bar
add_filter('mce_buttons', function ($buttons) {
    return [
    'formatselect',
    'styleselect',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'bullist',
    'numlist',
    '|',
    // 'outdent',
    // 'indent',
    // 'blockquote',
    // 'hr',
    // '|',
    // 'alignleft',
    // 'aligncenter',
    // 'alignright',
    // 'alignjustify',
    // '|',
    'link',
    'unlink',
    '|',
    // 'forecolor',
    'wp_more',
    // 'charmap',
    // 'spellchecker',
    'pastetext',
    'removeformat',
    '|',
    'undo',
    'redo',
    // 'wp_help',
    'fullscreen',
    // 'wp_adv', // toggle visibility of 2 menu level
    ];
});

// Second Bar
add_filter('mce_buttons_2', function ($buttons) {
    return [];
});

add_filter('tiny_mce_before_init', function ($init) {
    // Add block format elements you want to show in dropdown
    $init['block_formats'] = 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6';
    return $init;
});

add_filter('tiny_mce_before_init', function ($init_array) {
    $style_formats = array(
        [
            'title' => 'Turquoise Colour ',
            'inline' => 'span',
            'classes' => 'color-highlight'
        ]
    );
    $init_array['style_formats'] = json_encode($style_formats);
    return $init_array;
});

$customEditorStylePath = Asset::requirePath('Features/TinyMce/customEditorStyle.css');
$templateDirectory = get_template_directory();
$customEditorStylePath = str_replace($templateDirectory . '/', '', $customEditorStylePath);
add_editor_style($customEditorStylePath);
