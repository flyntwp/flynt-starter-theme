<?php

Flynt\registerFields('ListComponents', [
    'layout' => [
        'name' => 'listComponents',
        'label' => 'List: Components',
        'sub_fields' => [
            [
                'label' => 'Component Blocks',
                'name' => 'componentBlocks',
                'type' => 'repeater',
                'collapsed' => 0,
                'min' => 1,
                'layout' => 'block',
                'button_label' => 'Add Component Block',
                'sub_fields' => [
                    [
                        'label' => 'Component',
                        'name' => 'component',
                        'type' => 'select',
                        'ui' => 1,
                        'ajax' => 0,
                        'choices' => []
                    ],
                    [
                        'label' => 'Calls To Action',
                        'name' => 'ctas',
                        'type' => 'repeater',
                        'collapsed' => 0,
                        'layout' => 'table',
                        'button_label' => 'Add Call To Action',
                        'sub_fields' => [
                            [
                                'label' => 'Link',
                                'name' => 'link',
                                'type' => 'link',
                                'return_format' => 'array',
                                'required' => 1,
                                'wrapper' => [
                                    'width' => 70
                                ]
                            ],
                            [
                                'label' => 'Button Type',
                                'name' => 'buttonType',
                                'type' => 'button_group',
                                'choices' => [
                                    'primary' => 'Primary',
                                    'secondary' => 'Secondary'
                                ],
                                'wrapper' => [
                                    'width' => 30
                                ],
                                'ui' => 1
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]
]);