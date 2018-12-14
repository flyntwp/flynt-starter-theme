console.log('hello flynt acf gutenberg')

const wp = window.wp

const allowedBlocks = [
  'core/paragraph',
  'core/image',
  'core/html',
  'core/freeform'
]

wp.hooks.addFilter('blocks.registerBlockType', 'hideBlocks', (pSettings, pName) => {
  if (!allowedBlocks.includes(pName) && !pName.startsWith('acf/')) {
    return Object.assign({}, pSettings, {
      supports: Object.assign({}, pSettings.supports, {
        inserter: false
      })
    })
  }

  return pSettings
})
