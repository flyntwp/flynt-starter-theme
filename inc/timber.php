<?php

use Timber\Timber;
use Timber\Post;
use Timber\PostQuery;

function getTimberDefaultContext($singlePost = false)
{
    $context = Timber::get_context();
    if ($singlePost) {
        if (is_numeric($singlePost)) {
            $context['post'] = new Post($singlePost);
        } else {
            $context['post'] = new Post();
        }
    } else {
        $context['posts'] = new PostQuery();
    }
    $context['feedTitle'] = $context['site']->name . ' ' . __('Feed', 'flynt-starter-theme');
    $context['dir'] = is_rtl() ? 'rtl' : 'ltr';

    return $context;
}
