import React from 'react'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {UserProvider} from '../../context/user-context'
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'
import {reducers} from '../../test-utils/store-mock'
import {App} from '../App'
import {Factory} from 'rosie'
import {UnauthenticatedAppFromStore} from '../UnauthenticatedApp'
import {AuthenticatedAppFromStore} from '../AuthenticatedApp'

const mockStore = configureMockStore([])

describe('<App/>', () => {

  it('renders authenticated app', () => {
    const wrapper = mount(
      <Provider store={mockStore(reducers)}>
        <UserProvider user={Factory.build('user')}>
          <App/>
        </UserProvider>
      </Provider>
    )

    expect(wrapper.find(UnauthenticatedAppFromStore)).to.have.lengthOf(0)
    expect(wrapper.find(AuthenticatedAppFromStore)).to.have.lengthOf(1)
  })

  it('renders unauthenticated app', () => {
    const wrapper = mount(
      <Provider store={mockStore(reducers)}>
        <UserProvider>
          <App/>
        </UserProvider>
      </Provider>
    )

    expect(wrapper.find(UnauthenticatedAppFromStore)).to.have.lengthOf(1)
    expect(wrapper.find(AuthenticatedAppFromStore)).to.have.lengthOf(0)
  })
})
