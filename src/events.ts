export type EventsData = Record<string, Record<string, any>>

export class Events<T extends EventsData> {
  private observers: any[] = []

  public on<K extends keyof T>(event: K, fn: (data: T[K]) => void): void {
    this.observers.push([event, fn])
  }

  public off<K extends keyof T>(event: K, fn: (data: T[K]) => void): void {
    this.observers = this.observers.filter((subscriber) => {
      return subscriber[0] !== event || subscriber[1] !== fn
    })
  }

  public emit<K extends keyof T>(event: K, data: T[K]): void {
    this.observers.forEach((subscriber) => {
      try {
        if (subscriber[0] === event) subscriber[1](data)
      } catch (e) {
        return
      }
    })
  }
}
