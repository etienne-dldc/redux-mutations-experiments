import { CoreState, Core } from 'module/Core';
import { Dispatchable as YDispatchable, Detectors as YDetectors, Detector as YDetector } from 'lib/redux-yarl';
import { State as CounterState } from './Counter';

export type Dispatchable = YDispatchable<CoreState, Core>;
export type Detectors = YDetectors<CoreState, Core>;
export type Detector = YDetector<CoreState, Core>;

export type State = CoreState & CounterState;
