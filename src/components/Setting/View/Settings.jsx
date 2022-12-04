import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'


export default function Settings() {
 
  return (
    <Dropdown trigger={<Icon name='cog' size='large' />} pointing='top left' icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item text='Ayar1' />
        <Dropdown.Item text='Ayar2' />
        <Dropdown.Item text='Ayar3' />
        <Dropdown.Item text='Ayar4' />
      </Dropdown.Menu>
    </Dropdown>
  )

}
