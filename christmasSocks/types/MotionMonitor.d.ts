declare class MotionMonitor {
	constructor(gpio:any);
	StartMonitor(callBack:function):any;
	StopMonitor():any;
	OnMove:Event;
	OnStop:Event;
	OnSleep:Event;
}