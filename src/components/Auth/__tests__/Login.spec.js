import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Login } from '../Login'
import { GoogleLogin } from 'react-google-login'

describe('<Login/>', () => {
  it('renders', () => {
    const wrapper = shallow(<Login />)

    const { isSignedIn, buttonText, clientId } = wrapper
      .find(GoogleLogin)
      .props()

    // Check login button is correctly rendered
    expect(isSignedIn).to.be.true
    expect(buttonText).to.be.equal('Login with Google')
    expect(clientId).to.be.equal(
      '101832430197-1cls63aqj1kceqa71b6s4ei6avc4ce8t.apps.googleusercontent.com'
    )
  })
})
