# flynt-starter-theme

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Build Status](https://travis-ci.org/flyntwp/flynt-starter-theme.svg?branch=master)](https://travis-ci.org/flyntwp/flynt-starter-theme)
[![Code Quality](https://img.shields.io/scrutinizer/g/flyntwp/flynt-starter-theme.svg)](https://scrutinizer-ci.com/g/flyntwp/flynt-starter-theme/?branch=master)

## Short Description
[Flynt](https://flyntwp.com/) is a ready-to-go WordPress theme for component-based development based on [Timber](#page-templates) and [Advanced Custom Fields](#advanced-custom-fields).

## Table of Contents
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

## Install
1. Install [Node](https://nodejs.org/en/).
2. Install [Yarn](https://yarnpkg.com/lang/en/docs/install/).
3. Install [Composer](https://getcomposer.org/download/).
4. Create a new project folder and setup a new [WordPress](https://wordpress.org/download/) installation.
5. Install and activate [Advanced Custom Fields Pro](https://www.advancedcustomfields.com/pro/).
6. Clone this repo to `<your-project>/wp-content/themes`.
7. Change the host variable in `flynt-starter-theme/build-config.js` to match your host URL. //TODO: theres one more thing to adjust here
```js
const host = 'your-project.test'
```
8. In your terminal, navigate to `<your-project>/wp-content/themes/flynt-starter-theme`. Run `composer install`, `yarn` and then `yarn build`.
9. Go to the administrator back-end of your WordPress site and activate the `flynt-starter-theme` theme.

## Usage
In your terminal, navigate to `<your-project>/wp-content/themes/flynt-starter-theme` and run `yarn start`. This will start a local server at `localhost:3000`.

All files in `assets`,  `Components` and `Features` will now be watched for changes and compiled to the `dist` folder. Happy coding!

### Assets

The assets folder is for all SCSS, images, and font files that your theme needs. The `main.scss` is watched for changes and compiles to `dist/main.css`.
* auth, admin, main - //TODO: are we keeping this?

### The `lib` Folder

All PHP files from `./lib` are automatically required.

The `./lib` folder includes helper functions and basic setup logic. *You will most likely not need to modify any files inside `./lib`.*

### The `inc` Folder

All PHP files from `./inc` are automatically required.

The entry point to every WordPress theme is its `functions.php`. The `inc` folder is a more organised version of this file and contains all custom theme logic.

For organisation, `./inc` has three subfolders. It is recommended (but not enforced) to use these three folders to keep the theme well-structured:

- `customPostTypes`<br> Use this folder to register  custom post types.
- `customTaxonomies`<br> Use this folder to register custom taxonomies.
- `fieldGroups`<br> Use this folder to register custom field groups. See [Field Groups](#field-groups).

After the files from './lib' and './inc' are loaded, all [features](#features) from the `./Features` folder and all [components](#components) from the `./Components` folder are loaded.

### Page Templates
All template files can be found in the `./templates` directory. Flynt uses [Timber](https://www.upstatement.com/timber/) to structure its page templates and [Twig](https://twig.symfony.com/) for rendering them. [Timber's documentation](https://timber.github.io/docs/) is extensive and up to date, so be sure to get familiar with it.

There are two Twig functions added in Flynt to render components into templates:
* `renderComponent(componentName, data)` renders a single component. [For example, in the `index.twig` template](https://github.com/flyntwp/flynt-starter-theme/tree/master/templates/twig/index.twig).
* `renderFlexibleContent(flexibleContentField)` renders all components passed from an Advanced Custom Fields *Flexible Content* field. [For example, in the `single.twig` template.](https://github.com/flyntwp/flynt-starter-theme/tree/master/templates/twig/single.twig)

Besides the main document structure (in `./templates/twig/_document.twig`), everything else is a component.

### Features
With WordPress, it is easy to create one large `functions.php` file, crammed full of all the custom logic your theme may need. This can get messy. Instead, we split each piece of functionality into smaller *feature* bundles.

In most cases, features add hooks and filters that affect the project on a global level. To learn more, look through the [Features](https://github.com/flyntwp/flynt-starter-theme/tree/master/Features) directory.

### Components
A component is a self-contained building-block. Each component contains its own layout, its ACF fields, PHP logic, scripts, and styles.

```
  ExampleComponent/
  ├── functions.php
  ├── index.twig
  ├── README.md
  ├── screenshot.jpg
  ├── script.js
  ├── style.scss
```

The `functions.php` file for every component in the `./Components` folder is executed during the WordPress action `after_setup_theme`. [This is run from the `./functions.php` file of the theme.](https://github.com/flyntwp/flynt-starter-theme/tree/master//functions.php)

To render components into a template, see [Page Templates](#page-templates).

### Advanced Custom Fields
To define Advanced Custom Fields (ACF) for a component, use `Flynt\registerFields`. This has 3 arguments:

```
Flynt\registerFields($scope = 'ComponentName', $fields = [], $fieldId = null);
```

`$scope` is the name of the component, `$fields` are the ACF fields you want to register, and `$fieldsId` is an optional (rarely needed) parameter for registering multiple fields for a single scope.

For example:

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
                'required' => 1,
            ]
        ]
    ]
]);
```

In the example above, the `layout` array is required in order to load this component into an Advanced Custom Fields *Flexible Content* field.

//TODO: any examples of $fieldsId or where its used or why?

### Field Groups
Field groups are needed to show registered fields in the WordPress back-end. All  field groups are created in the `./inc/fieldGroups` folder. Two field groups exist by default: [`pageComponents.php`](#TODO:) and [`postComponents.php`](#TODO:).

To include fields that have been registered with `Flynt\registerFields`, use `ACFComposer::registerFieldGroup($config)` inside the Inside the `Flynt/afterRegisterComponents` action.

Use `Flynt\loadFields($scope, $fieldPath = null)` to load groups of fields into a field group. For example:
```php
use ACFComposer\ACFComposer;

add_action('Flynt/afterRegisterComponents', function () {
    ACFComposer::registerFieldGroup([
        'name' => 'pageComponents',
        'title' => 'Page Components',
        'style' => 'seamless',
        'fields' => [
            [
                'name' => 'pageComponents',
                'label' => 'Page Components',
                'type' => 'flexible_content',
                'button_label' => 'Add Component',
                'layouts' => [
                    Flynt\loadFields('BlockWysiwyg', 'layout'),
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

The `registerFieldGroup` function takes the same argument as Advanced Custom Fields's `acf_add_local_field_group` with two exceptions:

1. The fields do not require field keys but are automatically generated.
2. For conditional logic, instead for specifying a field key as reference, you can specify a field path with a UNIX-like directory syntax. For example:

TODO: improve example
```
[fieldPath => 'otherFieldNameOnSameLevel',]
[fieldPath => '../otherFieldNameOneLevelHigher']
```

More information can be found in the [ACF Field Group Composer repository](https://github.com/flyntwp/acf-field-group-composer).

Registered fields can also be used statically (not inside a flexible content field). To do this, we strongly suggest putting the fields for a component in an ACF group field, so that you are able to easily retrieve all the associated fields.

For Example:

```php
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

Here we make use of the second parameter in `loadFields` where you can specify //TODO: half this sentence is missing

### ACF Option Pages
Flynt includes several utility functions for creating Advanced Custom Fields options pages. Briefly, these are:

* `Flynt\Utils\Options::addTranslatable`<br> Adds fields into a new group inside the Translatable Options options page. When used with the WPML plugin, these fields will be returned in the current language.
* `Flynt\Utils\Options::addGlobal`<br> Adds fields into a new group inside the Global Options options page. When used with WPML, these fields will always be returned from the primary language. In this way, they are 'global', and cannot be translated.
* `Flynt\Utils\Options::get` <br> Used to retrieve options from either the Translatable or Global options pages.

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
