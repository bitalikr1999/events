# @bitalikrty/events

> Events listener for React apps

[![NPM](https://img.shields.io/npm/v/@bitalikrty/events.svg)](https://www.npmjs.com/package/@bitalikrty/events) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @bitalikrty/events
```

## Usage

### 1. Create interface for events 
Create inteface where write all events and data for each events.
```
// src/shared/events/inteface.ts
interface AppEvents {
    // EVENT NAME
    userCreated: 
    // EVENT PAYLOAD
    {
        user: IUser 
    }
    
    userLogout: {}
    // ...etc
}

```

### 2. Create Events instance 
```
// src/shared/events/index.ts
import { Events } from '@bitalikrty/events'
import { AppEvents } from './inteface.ts'

export const appEvents = new Events<AppEvents>()

```

### 3. Subscribe and send event 

Subscribe 
```
appEvents.on('userCreated', payload => {
    // some action
})
```

Send event 
```
appEvents.emit('userCreated', { user })
```

### 4. (Optional) Create listener hook 

If your want listen some event in react component you should create custom hook ( for better ts support should be create youself ).
Hook 
```
// src/shared/hooks
import {useEffect} from 'react'
import {AppEvents, appEvents} from '../events'

export const useEventsListener = <T extends keyof AppEvents>(
    name: T,
    action: (data: AppEvents[T]) => void,
    dependencies: any[] = [],
) => {
    useEffect(() => {
        const fn = (data: AppEvents[T]) => {
            try {
                action(data)
            } catch (e) {
                console.log('error event', e)
            }
        }
        appEvents.on(name, fn)

        return () => appEvents.off(name, fn)
    }, dependencies)
}

```

And then use this hook in components 
```
const Components = () => {
    useEventsListener('userCreated', (payload) => {
        
    }, [//depends])
}
```
So you can send some event from any place of code, for example from store or from some service and catch it in component.
Can be use when you want send event between components which are far down the component tree 
## License

MIT © [](https://github.com/)
