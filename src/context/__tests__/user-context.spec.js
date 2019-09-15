import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Factory } from 'rosie'
import { UserProvider, useUser } from '../user-context'
import { FullPageSpinner } from '../../components/UI/FullPageSpinner'

describe('UserProvider', () => {
  it('renders <FullPageSpinner/> when loading', () => {
    const wrapper = mount(<UserProvider isLoading={true} />)
    expect(wrapper.find(FullPageSpinner)).to.have.lengthOf(1)
  })

  it("doesn't render <FullPageSpinner/> if not loading", () => {
    const wrapper = mount(<UserProvider />)
    expect(wrapper.find(FullPageSpinner)).to.have.lengthOf(0)
  })
})

describe('useUser', () => {
  it('allows access to user', () => {
    const Consumer = () => {
      const { user } = useUser()
      return <div user={user} />
    }

    const user = Factory.build('user')
    const wrapper = mount(
      <UserProvider user={user}>
        <Consumer />
      </UserProvider>
    )

    expect(wrapper.find('div').props().user).to.be.eql(user)
  })
})
