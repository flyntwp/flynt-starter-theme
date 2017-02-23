# Snippets

To make this component work, you need to define the name of your menu in the page configuration file.

**config/templates/default.json**

```json
{
  "name": "MainNavigation",
  "customData": {
    "menuSlug": "main_navigation"
  }
}
```

We call the `MainNavigation` component, and we specify under the `customData` the `menuSlug` we want to use.

Then in the **functions.php**, we are calling that `menuSlug` with Timber.

```php
$data['menuSlug'] = !empty($data['menuSlug']) ? $data['menuSlug'] : '';
$data['menu'] = new Menu($data['menuSlug']);
```
