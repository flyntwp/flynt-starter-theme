<?php

namespace Flynt\Features\ProductTinyMce;

add_action('init', function () {
    add_filter('acf/fields/wysiwyg/toolbars', function ($toolbars) {
        $toolbars['product'] = [];
        $toolbars['product'][1] = [
          'bold',
          'italic',
          'underline',
          '|',
          'link',
          'unlink',
          '|',
          'undo',
          'redo',
        ];
        return $toolbars;
    });
});
