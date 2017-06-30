<?php

namespace Flynt\Components\AccordionVertical;

use Flynt\Features\Components\Component;

add_action('wp_enqueue_scripts', function () {
    Component::enqueueAssets('AccordionVertical');
});
