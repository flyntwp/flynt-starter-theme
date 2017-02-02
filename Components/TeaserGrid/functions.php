<?php
namespace Flynt\Components\TeaserGrid;

use Timber\Post;

add_filter('Flynt/addComponentData?name=TeaserGrid', function ($data) {
  if ($data['teaserItems']) {
    $data['teaserItems'] = array_map(function ($item) {
      if ($item['linkType'] == 'internalLink') {
        $item['post'] = new Post($item['post']);
      }
      return $item;
    }, $data['teaserItems']);
  }
  return $data;
});
