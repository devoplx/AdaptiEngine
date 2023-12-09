import 'module-alias/register';
// import createEngine, {adaptiEngine} from '@/core/';
import createEngine, {adaptiEngine} from '../dist/';


export async function main() {
	const engine = await createEngine()
	// console.log(engine.status)
	engine.on('onInit', (data, instance: adaptiEngine) => {
		console.log("oninit ran")
		// instance.status = "errored"

	})
	engine.on('onInitializing', (data, instance: adaptiEngine) => {
		console.log("oninit ran")
	
		
	})
	engine.init();
	console.log(engine.status)
  // console.log(engine.hook.getEvents());
}
main()