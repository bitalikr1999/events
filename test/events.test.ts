import { Events } from '../src'

describe('Events', () => {
  it('should subscribe to an event and emit it', () => {
    const eventHandler = jest.fn()
    const events = new Events()

    events.on('exampleEvent', eventHandler)
    events.emit('exampleEvent', { message: 'Hello, World!' })

    expect(eventHandler).toHaveBeenCalledWith({ message: 'Hello, World!' })
  })

  it('should unsubscribe from an event', () => {
    const eventHandler = jest.fn()
    const events = new Events()

    events.on('exampleEvent', eventHandler)
    events.off('exampleEvent', eventHandler)
    events.emit('exampleEvent', { message: 'This should not be called' })

    expect(eventHandler).not.toHaveBeenCalled()
  })

  it('should handle errors in event handlers', () => {
    const events = new Events()

    events.on('errorEvent', () => {
      throw new Error('An error occurred')
    })

    expect(() => events.emit('errorEvent', {})).not.toThrow()
  })
})
