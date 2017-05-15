<?php

use Flynt\Features\Acf\OptionPages;
use Flynt\Features\AdminNotices\AdminNoticeManager;

add_action('init', function () {
    $someFeatureNumber = OptionPages::get('globalOptions', 'feature', 'someProductFeature', 'someFeatureNumber');
    if (!$someFeatureNumber) {
        $manager = AdminNoticeManager::getInstance();
        $messages = ['Please fill Some Feature Number'];
        $options = [
          'type' => 'error',
          'title' => 'Some Product Feature',
          'dismissible' => true,
          'filenames' => 'functions.php'
        ];
        $manager->addNotice($messages, $options);
    }
});
