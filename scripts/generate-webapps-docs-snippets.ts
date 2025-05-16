import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { JSDOM } from 'jsdom'

const DOCS_URL = 'https://core.telegram.org/bots/webapps'
const OUTPUT_PATH = './docs/generated'

interface DocsSection {
  name: string
  description: string
  fields: SectionField[]
}
interface SectionField {
  name: string
  type: string
  description: string
}

function parseSection(element: HTMLElement | null, options?: {
  descriptionSize: number
}): DocsSection {
  if (!element)
    throw new Error('Invalid HTML element')

  options = {
    descriptionSize: 1,
    ...options,
  }

  const name = element.childNodes.item(1).textContent
  // TODO: use descriptionSize to parse full description
  const description = element.nextElementSibling?.innerHTML

  if (!name || !description)
    throw new Error('Invalid name or description')

  let table = element.nextElementSibling?.nextElementSibling
  if (options.descriptionSize > 1) {
    for (let index = 0; index < (options.descriptionSize - 1); index++) {
      table = table?.nextElementSibling
    }
  }
  const tableBody = table?.querySelector('tbody')?.childNodes.values()

  if (!tableBody)
    throw new Error(`[${name}] Table not found`)

  const fields: SectionField[] = []
  for (const entry of tableBody) {
    if (entry.nodeType !== entry.ELEMENT_NODE)
      continue

    const name = entry.childNodes.item(1)?.innerHTML
    const type = entry.childNodes.item(3)?.innerHTML
    const description = entry.childNodes.item(5)?.innerHTML

    if (name === undefined || type === undefined || description === undefined) {
      throw new Error(`[${name}] Parsing error`)
    }

    fields.push({
      name,
      type,
      description,
    })
  }

  return {
    name,
    description,
    fields,
  }
}

function normalizeFieldName(name: string) {
  const untilNonText = /^([a-z]+)\W?/i
  const normalizeName = name.match(untilNonText)?.[1]

  if (!normalizeName)
    throw new Error(`"${name}" normalization error`)

  return normalizeName
}

function preprocessDescription(description: string) {
  const anchorLink = /href="(#.+?)"/
  const botsDocLink = /href="(\/bots\/api#.+?)"/
  const mark = /<mark>(.+?)<\/mark>/

  while (anchorLink.test(description)) {
    description = description.replace(anchorLink, 'href="https://core.telegram.org/bots/webapps$1"')
  }
  while (botsDocLink.test(description)) {
    description = description.replace(botsDocLink, 'href="https://core.telegram.org$1"')
  }
  while (mark.test(description)) {
    description = description.replace(mark, '<Badge type="tip" text="$1" />')
  }

  return description
}

async function main() {
  if (!existsSync(OUTPUT_PATH))
    mkdirSync(OUTPUT_PATH)

  const dom = await JSDOM.fromURL(DOCS_URL)
  // const dom = await JSDOM.fromFile('./output.html')

  const mainSection = parseSection(dom.window.document.querySelector('#dev_page_content > h3:nth-child(140)'), {
    descriptionSize: 3,
  })
  for (const field of mainSection.fields) {
    writeFileSync(`${OUTPUT_PATH}/WebApp-${normalizeFieldName(field.name)}.md`, preprocessDescription(field.description))
  }

  const backButtonSection = parseSection(dom.window.document.querySelector('#dev_page_content > h4:nth-child(179)'))
  for (const field of backButtonSection.fields) {
    writeFileSync(`${OUTPUT_PATH}/BackButton-${normalizeFieldName(field.name)}.md`, preprocessDescription(field.description))
  }

  const mainButtonSection = parseSection(dom.window.document.querySelector('#dev_page_content > h4:nth-child(183)'))
  for (const field of mainButtonSection.fields) {
    writeFileSync(`${OUTPUT_PATH}/MainButton-${normalizeFieldName(field.name)}.md`, preprocessDescription(field.description))
  }

  const settingsButtonSection = parseSection(dom.window.document.querySelector('#dev_page_content > h4:nth-child(187)'))
  for (const field of settingsButtonSection.fields) {
    writeFileSync(`${OUTPUT_PATH}/SettingsButton-${normalizeFieldName(field.name)}.md`, preprocessDescription(field.description))
  }

  const hapticFeedbackSection = parseSection(dom.window.document.querySelector('#dev_page_content > h4:nth-child(191)'))
  for (const field of hapticFeedbackSection.fields) {
    writeFileSync(`${OUTPUT_PATH}/HapticFeedback-${normalizeFieldName(field.name)}.md`, preprocessDescription(field.description))
  }

  const cloudStorageSection = parseSection(dom.window.document.querySelector('#dev_page_content > h4:nth-child(195)'))
  for (const field of cloudStorageSection.fields) {
    writeFileSync(`${OUTPUT_PATH}/CloudStorage-${normalizeFieldName(field.name)}.md`, preprocessDescription(field.description))
  }

  const biometricManagerSection = parseSection(dom.window.document.querySelector('#dev_page_content > h4:nth-child(199)'))
  for (const field of biometricManagerSection.fields) {
    writeFileSync(`${OUTPUT_PATH}/BiometricManager-${normalizeFieldName(field.name)}.md`, preprocessDescription(field.description))
  }

  const accelerometerSection = parseSection(dom.window.document.querySelector('#dev_page_content > h4:nth-child(209)'))
  for (const field of accelerometerSection.fields) {
    writeFileSync(`${OUTPUT_PATH}/Accelerometer-${normalizeFieldName(field.name)}.md`, preprocessDescription(field.description))
  }

  const deviceOrientationSection = parseSection(dom.window.document.querySelector('#dev_page_content > h4:nth-child(217)'))
  for (const field of deviceOrientationSection.fields) {
    writeFileSync(`${OUTPUT_PATH}/DeviceOrientation-${normalizeFieldName(field.name)}.md`, preprocessDescription(field.description))
  }

  const gyroscopeSection = parseSection(dom.window.document.querySelector('#dev_page_content > h4:nth-child(225)'))
  for (const field of gyroscopeSection.fields) {
    writeFileSync(`${OUTPUT_PATH}/Gyroscope-${normalizeFieldName(field.name)}.md`, preprocessDescription(field.description))
  }

  const locationManager = parseSection(dom.window.document.querySelector('#dev_page_content > h4:nth-child(233)'))
  for (const field of locationManager.fields) {
    writeFileSync(`${OUTPUT_PATH}/LocationManager-${normalizeFieldName(field.name)}.md`, preprocessDescription(field.description))
  }

  const deviceStorage = parseSection(dom.window.document.querySelector('#dev_page_content > h4:nth-child(240)'))
  for (const field of deviceStorage.fields) {
    writeFileSync(`${OUTPUT_PATH}/DeviceStorage-${normalizeFieldName(field.name)}.md`, preprocessDescription(field.description))
  }

  const secureStorage = parseSection(dom.window.document.querySelector('#dev_page_content > h4:nth-child(244)'), {
    descriptionSize: 2,
  })
  for (const field of secureStorage.fields) {
    writeFileSync(`${OUTPUT_PATH}/SecureStorage-${normalizeFieldName(field.name)}.md`, preprocessDescription(field.description))
  }
}

main()
