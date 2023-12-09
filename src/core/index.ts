type callBack<T> = (...args: any[]) => void;

type applicationStatus	 = 'errored' | 'running' | 'initializing' | 'inactive';
const createEngine = (): adaptiEngine => {
	const engineInstance = new adaptiEngine();
	return engineInstance
}

export class adaptiEngine {
	public status: applicationStatus;
	private events: { [key: string]: callBack<any>[] };
  private userEvents: string[];
  private appEvents: string[];
  public customEvents: string[];
	constructor (){
		this.status = "inactive"
		this.events = {};
    this.userEvents = ['userLoggedIn', 'userLoggedOut'];
    this.appEvents = ['onInitializing', 'appClosed', "onInit"];
    this.customEvents = [];
	}
	init(){
		this.emit("onInitializing", {})
		this.status = "initializing"
		this.emit("onInit")

		// this.status = "running"
	}
	getEvents(filter = "all"){
    if (filter === "all") {
      return {
        userEvents: this.userEvents,
        appEvents: this.appEvents,
        customEvents: this.customEvents
      };
    } else if (filter === "user") {
      return this.userEvents;
    } else if (filter === "app") {
      return this.appEvents;
    }
  }
	async on(eventName: string, callBack: callBack<any>) {
    if (this.userEvents.includes(eventName) || this.appEvents.includes(eventName)) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callBack);
    } else {
      console.log(`Custom event detected: ${eventName}. Adding to customEvents.`);
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callBack);
      // this.customEvents.push(eventName);
			
    }
  }

  async emit<T>(
    eventName: string,
    data?: T,
    callBack?: callBack<void>
  ): Promise<void> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      await this.invokeCallbacks(eventName, data, resolve, reject);

      if (callBack) {
        callBack();
      } else {
        // Resolve the promise if no callback is provided
        resolve();
      }
    });
  }

	

  private async invokeCallbacks<T>(
    eventName: string,
    data: T | undefined,
    resolve: () => void,
    reject: (reason?: any) => void
  ) {
    const eventCallbacks = this.events[eventName];
    if (eventCallbacks) {
      for (const callBack of eventCallbacks) {
        try {
          if (eventName === 'userLoggedIn' || eventName === 'userLoggedOut') {
            await callBack(data);
          } else if (eventName === 'onInit' || eventName === 'onInitializing') {
						
						const dataa = await callBack(data, this);
						// if (dataa !== null || undefined){
						// 	// @ts-ignore
						// 	for (const prop in dataa) {
						// 		// @ts-ignore
						// 		// eslint-disable-next-line no-prototype-builtins
						// 		if (dataa.hasOwnProperty(prop)) {
						// 			// @ts-ignore
						// 			this[prop] = dataa[prop];
						// 		}
						// 	}
						// }
          } else {
            await callBack(data);
          }
        } catch (error) {
          console.error(`Error in callBack for event ${eventName}:`, error);
          reject(error);
        }
      }	
      resolve();
    }
  }

}	

	
	
export default createEngine;



