# flynt-starter-theme

[standard-readme compliant](https://github.com/RichardLitt/standard-readme)
[Build Status](https://travis-ci.org/flyntwp/flynt-starter-theme)
[Code Quality](https://scrutinizer-ci.com/g/flyntwp/flynt-starter-theme/?branch=master)

The starter theme for building [Flynt](https://flyntwp.com/) projects.

## Table of Contents
* [Short Description](#short-description)
* [Install](#install)
* [Usage](#usage)
  * [Assets](#assets)
  * [Lib & Inc](#lib-inc)
  * [Page Templates](#page-templates)
  * [Twig](#twig)
  * [Components](#components)
  * [Features](#features)
  * [Advanced Custom Fields](#advanced-custom-fields)
  * [Field Groups](#field-groups)
* [API](#api)
* [Maintainers](#maintainers)
* [Contributing](#contributing)
* [License](#license)

## Short Description
Flynt is a ready-to-go WordPress theme for component-based development based on [Timber](#page-templates) and [Advanced Custom Fields](#advanced-custom-fields).

## Install
1. Install [Node](https://nodejs.org/en/).
2. Install [Yarn](https://yarnpkg.com/lang/en/docs/install/).
3. Install [Composer](https://getcomposer.org/download/).
4. Create a new project folder and setup a new [WordPress](https://wordpress.org/download/) installation.
5. Install and activate the [Advanced Custom Fields Pro](https://www.advancedcustomfields.com/pro/) plugins.
6. Clone the flynt-starter-theme repo to `<your-project>/wp-content/themes`.
7. Change the host variable in `flynt-starter-theme/build-config.js` to match your host URL. //TODO: theres one more thing to adjust here
```js
const host = 'your-host-url.test'
```
8. In your terminal, navigate to `<your-project>/wp-content/themes/flynt-starter-theme`. Run `composer install`, `yarn` and then `yarn build`.
9. Go to the administrator back-end of your WordPress site and activate the `flynt-starter-theme` theme.

## Usage
In your terminal, navigate to `<your-project>/wp-content/themes/flynt-starter-theme` and run `yarn start`. This will start a local server at  `localhost:3000`.

All files in `assets`,  `Components` and `Features` will now be watched for changes and compiled to the `dist` folder.

### Assets

* All global assets go in here (SCSS/Images/Fonts)
* auth, admin, main - brief explanation of each //TODO: are we keeping this?

### Lib & Inc

* //TODO: lib you probably don’t need to change
* //TODO: inc is pretty much functions.php, contains all your theme logic, its autoloader.

The entry point to every WordPress theme is its `functions.php`. In Flynt all PHP files from the subfolders `./lib` and `./inc` are automatically required. The `./lib` folder usually does not need to be modified because it includes some basic functionality for the theme. The `./inc` folder is where you can put your custom PHP logic, preferably in seperate files. By convention `./inc` as three additional subfolders: `customPostTypes`, `customTaxonomies` and `fieldGroups`, in which one file per respective entity should go.

After the files from these two top level folders are required, all features from the `./Features` folder and all components from the `./Components` folder are loaded. More on that later.

### Page Templates
All template files can be found under the theme root, in the `templates` directory.

Flynt uses [Timber](#) to structure its page templates and [Twig](#) for rendering. Timber's documentation is extensive and up to date, so be sure to get familiar with its concepts.

The standard way to modify basic content in a wp hierarchy specific template is to use

```twig
{% set content %}
  <!-- Your Markup -->
{% endset %}
```

Instead of the normally used `{% block %}` `{% endblock %}` pattern. This is because using `set` will result in the content markup to be evaluated first, giving us the opportuinity to for example register script before the `wp_head` function will be called.

There are two additional Twig functions included in the theme:
* `renderComponent(componentName, data)` renders a single component into the template *//  TODO link to example (index.twig)*
* `renderFlexibleContent(flexibleContentField)` renders all components contained in the data of an ACF flexible content field into the template.*// TODO link to example (single.twig)*

Besides the document's structure and the content of `<head/>`, mostly everything in Flynt is a component. That's why these to Twig functions come in really handy.

### Twig
There are two custom [Twig](https://twig.symfony.com/) functions that are defined in the theme.

```twig
{{ renderComponent(componentName, data) }}
```

* `renderComponent(componentName, data)` renders a single component into the template
* `renderFlexibleContent(flexibleContentField)` renders all components contained in the data of an ACF flexible content field into the template.

### Features
With WordPress, it is easy to create one large `functions.php` file, crammed full of all the custom logic your theme may need. This can get messy. Instead, we split each piece of functionality into smaller *feature* bundles.

In most cases, features add global hooks and filters that affect the project on a global level. Flynt comes with a core set of ready to go features, each with its own readme. To learn more, look through the [Features](https://github.com/flyntwp/flynt-starter-theme/tree/master/Features) directory.

### Components
A component is a self-contained building-block. Each component contains its own layout, its ACF fields, PHP logic, scripts, and styles.

```
  ExampleComponent/
  ├── functions.php
  ├── index.twig
  ├── README.md
  ├── script.js
  ├── style.scss
```

Flynt will load every component placed in the `./Components` folder and execute the `functions.php` during the WordPress action `after_setup_theme`. [You can see this here.](#TODO:link-to-functions.php)

//TODO: also explain `loadComponents`

### Advanced Custom Fields
To define ACF fields for a component, you use the `Flynt\registerFields($scope, $fields, $fieldsId = null)` function. The `$scope` usually denotes the component name, `$fields` are the fields you want to register, and the optional `$fieldsId` provides the functionality to register multiple fields for a single scope.

By convention, we usually register fields for a component in a ACF layout wrapper, to be able to easily use them in a flexible content field. More on that later.

//TODO: link to file instead of hard-coded example?
//TODO: do we have any conditional logic examples in base components?

Example:
```php
Flynt\registerFields('BlockWysiwyg', [
    'layout' => [
        'name' => 'blockWysiwyg',
        'label' => 'Block: Wysiwyg',
        'sub_fields' => [
            [
                'name' => 'contentHtml',
                'label' => 'Content',
                'type' => 'wysiwyg',
                'delay' => 1,
                'media_upload' => 0,
                'toolbar' => 'full',
                'required' => 1,
                'wrapper' => [
                    'class' => 'autosize',
                ],
            ]
        ]
    ]
]);
```

Just for reference, this would be the same as `Flynt\registerFields('BlockWysiwyg', ['name' => 'blockWysiwyg', ...], 'layout')`.

If you are familiar with ACF and the `acf_add_local_field` function, you will notice, that the field keys are missing. More on that later.

### Field Groups
Only registering fields for a component would not result in these fields showing up anywhere. In order to use them in a field group, or flexibile content field, you have to add them to a specific field group. For this, there is the `./inc/fieldGroups` folder, with two default field groups already present: `pageComponents` and `postComponents`.

The structure of the files in this folder should always look similar. The intention is to register an ACF field group after all components were registered.

Wrapped in a `Flynt/afterRegisterComponents` action, you call `ACFComposer::registerFieldGroup($config)`, and use `Flynt\loadFields($scope, $fieldPath = null)` whereever you want to include the field definitions you specified with `Flynt\registerFields`.

*[ example link to pageComponents.php ]*

The `registerFieldGroup` function basically takes the same argument as ACF's `acf_add_local_field_group` with two exceptions:

1. The fields do not require field keys but are automatically generated.
2. For conditional logic, instead for specifying a field key as reference, you can specify a field path with a unix like directory syntax (e.g. `fieldPath => 'otherFieldNameOnSameLevel'` or `fieldPath => '../otherFieldNameOneLevelHigher'`)

For more information, check the [ACF Field Group Composer repo](https://github.com/flyntwp/acf-field-group-composer).

You can also use registered field statically in a field group, i.e. not in a flexible content field. To do this, we strongly suggest putting the fields for a component in an ACF group field, so that you are able to easily retrieve all the associated fields.

Example:
```php
<?php

use ACFComposer\ACFComposer;

add_action('Flynt/afterRegisterComponents', function () {
    ACFComposer::registerFieldGroup([
        'name' => 'pageComponents',
        'title' => 'Page Components',
        'style' => 'seamless',
        'fields' => [
            [
                'name' => 'mainContent',
                'label' => 'Main Content',
                'type' => 'group',
                'sub_fields' => [
                    Flynt\loadFields('BlockWysiwyg', 'layout.sub_fields'),
                ],
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'page',
                ],
            ],
        ],
    ]);
});
```

Here we make use of the second parameter in `loadFields` where you can specify

## API

* `renderComponent`
* `addComponentData`
* `renderFlexibleContent`

* `Flynt\registerFields`
* `Flynt\loadFields`
* `ACFComposer\ACFComposer::registerFieldGroup`

### Option Pages
* `Flynt\Utils\Options::addTranslatable`
* `Flynt\Utils\Options::addGlobal`
* `Flynt\Utils\Options::get`

* ACF Field Group Composer

## Maintainers
This project is maintained by [bleech](https://github.com/bleech).

The main people in charge of this repo are:
* [Dominik Tränklein](https://github.com/domtra)
* [Doğa Gürdal](https://github.com/Qakulukiam)

## Contributing
To contribute, please use GitHub [issues](https://github.com/flyntwp/flynt-starter-theme/issues). Pull requests are accepted. Please also take a moment to read the [Contributing Guidelines](https://github.com/flyntwp/guidelines/blob/master/CONTRIBUTING.md) and [Code of Conduct](https://github.com/flyntwp/guidelines/blob/master/CODE_OF_CONDUCT.md).

If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License
MIT © [bleech](https://www.bleech.de)
