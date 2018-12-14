<?php

namespace Flynt\Features\RemoveEditor;

add_action('init', function () {
    if (!apply_filters('use_block_editor_for_post_type', true, 'post')) {
        remove_post_type_support('post', 'editor');
    }
    if (!apply_filters('use_block_editor_for_post_type', true, 'page')) {
        remove_post_type_support('page', 'editor');
    }
});
