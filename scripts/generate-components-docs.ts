import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { createComponentMetaChecker } from 'vue-component-meta'
import { markdownTable } from 'markdown-table'

const componentsDirPath = resolve(__dirname, '..', 'src', 'components')

const checker = createComponentMetaChecker(
  resolve(__dirname, '..', 'tsconfig.json'),
  {
    forceUseTs: true,
  },
)

function getComponentPathByFileName(name: string) {
  return resolve(__dirname, '..', 'src', 'components', name)
}

function parseComponent(filePath: string) {
  return checker.getComponentMeta(filePath)
}

async function main() {
  const componentFileNames = readdirSync(componentsDirPath)
    .filter(filepath => filepath.endsWith('.vue'))

  for (const componentFileName of componentFileNames) {
    const parsed = parseComponent(getComponentPathByFileName(componentFileName))
    const props = parsed.props.filter(prop => prop.global === false)
    const events = parsed.events

    const propsTable = markdownTable([
      ['Name', 'Type', 'Required', 'Description'],
      ...props.map(prop => [prop.name, prop.type, String(prop.required), prop.description]),
    ])

    const getTypeForEvent = (name: string) => {
      const eventName = `on${name.charAt(0).toUpperCase()}${name.slice(1)}`
      const [exposedDefinition] = parsed.exposed.filter(expose => expose.name === eventName)

      return exposedDefinition.type
    }

    const eventsTable = markdownTable([
      ['Name', 'Type', 'Description'],
      ...events.map(event => [event.name, getTypeForEvent(event.name), '']),
    ])

    console.log(`### ${componentFileName.replace('.vue', '')}`)
    if (props.length) {
      console.log()
      console.log('#### Props')
      console.log(propsTable)
    }
    if (events.length) {
      console.log()
      console.log('#### Events')
      console.log(eventsTable)
    }
    console.log()
    console.log()
  }
}

main().catch(console.error)
