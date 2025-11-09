import * as React from 'react'
import '@QorAI/qora/tokens/css/variables.css'
import QoraButton from '@QorAI/qora/react/button'
import Tabs from '@QorAI/qora/react/tabs'
import TabItem from '@QorAI/qora/react/tabItem'
import Tooltip from '@QorAI/qora/react/tooltip'
import Input from '@QorAI/qora/react/input'
import Dropdown from '@QorAI/qora/react/dropdown'
import ButtonMenu from '@QorAI/qora/react/buttonMenu'
import Toggle from '@QorAI/qora/react/toggle'
import Icon from '@QorAI/qora/react/icon'

import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource-variable/inter/index.css'

function App() {
  // Verify that we can change props and children (slots)
  const [buttonText, setButtonText] = React.useState('I am a LEO Button')
  const [spinning, setSpinning] = React.useState(false)
  const [isThing, setIsThing] = React.useState(false)

  const handleAction = () => console.log('action')

  return (
    <>
      <header>
        <h1>A React App</h1>
      </header>
      <section>
        <Input value={buttonText} onInput={(e: any) => setButtonText(e.value)}>
          Edit the button text:
          {buttonText.length % 2 === 0 && (
            <Icon name="loading-spinner" slot="left-icon" />
          )}
        </Input>
        {buttonText && (
          <QoraButton
            className={spinning ? 'spin' : ''}
            kind="filled"
            size="large"
            onClick={() => {
              location.hash = ''
              setSpinning((s) => !s)
              alert('clicked!')
            }}
          >
            {buttonText}
          </QoraButton>
        )}
        <div data-theme="dark">
          <Dropdown value="foo">
            <qora-option value="foo">Foo</qora-option>
            <qora-option value="bar">Bar</qora-option>
          </Dropdown>
        </div>
        <ButtonMenu>
          <QoraButton fab kind="plain-faint" slot="anchor-content">
            <Icon name="more-horizontal" />
          </QoraButton>
          <qora-menu-item onClick={handleAction}>Llama2-13b</qora-menu-item>
          <qora-menu-item onClick={handleAction}>Llama2-7b</qora-menu-item>
          <div
            style={{
              padding: '10px 0',
              fontSize: 12,
              borderTop: '1px solid blue'
            }}
          >
            Coding
          </div>
          <qora-menu-item onClick={handleAction}>Llama2-13b</qora-menu-item>
          <qora-menu-item onClick={handleAction}>Llama2-7b</qora-menu-item>
          <div onClick={() => setIsThing(!isThing)}>
            <span>Suggested questions</span>
            <Toggle checked={isThing} />
          </div>
          <qora-menu-item
            onClick={() => setIsThing(!isThing)}
            data-is-interactive={true}
          >
            <span>Suggested questions</span>
            <Toggle checked={isThing} />
          </qora-menu-item>
        </ButtonMenu>
        <Tabs value="1">
          <TabItem value="1">Tab 1</TabItem>
          <TabItem value="2">Tab 2</TabItem>
          <TabItem value="3">Tab 3</TabItem>
        </Tabs>
        <Tooltip text="Hello World">
          <QoraButton href="#foo">Link button!</QoraButton>
        </Tooltip>
      </section>
    </>
  )
}

export default App
