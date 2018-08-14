var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Animated, Easing } from 'react-native';
import EventEmitter from 'events';
function isPranayamaSequence(pranayama) {
    return pranayama && typeof pranayama["duration"] == "number";
}
export const BoxBreath = (ratio, duration, cycles) => ({
    steps: [
        { breath: "puraka", instruction: "breath in" },
        { breath: "antar-kumbhaka", instruction: "hold" },
        { breath: "rechaka", instruction: "breath out" },
        { breath: "bahya-kumbhaka", instruction: "hold" }
    ],
    ratio, duration, cycles
});
export const guide = (pranayama) => {
    const value = new Animated.ValueXY({ x: 0, y: 0 });
    const instructions = new EventEmitter();
    const next = (pranayama, cyclesRun = 0) => __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const [inn, innHold, out, outHold] = pranayama.ratio;
            const durationPerUnit = pranayama.duration / (inn + innHold + out + outHold);
            for (let step of pranayama.steps) {
                if (isPranayamaSequence(step)) {
                    yield next(step);
                }
                else {
                    let animation = null;
                    switch (step.breath) {
                        case 'puraka':
                            animation = Animated.timing(value, {
                                toValue: { x: 0, y: 1 },
                                useNativeDriver: true,
                                duration: inn * durationPerUnit
                            });
                            break;
                        case 'antar-kumbhaka':
                            animation = Animated.timing(value, {
                                toValue: { x: 1, y: 1 },
                                useNativeDriver: true,
                                easing: Easing.linear,
                                duration: inn * durationPerUnit
                            });
                            break;
                        case 'rechaka':
                            animation = Animated.timing(value, {
                                toValue: { x: 1, y: 0 },
                                useNativeDriver: true,
                                duration: inn * durationPerUnit
                            });
                            break;
                        case 'bahya-kumbhaka':
                            animation = Animated.timing(value, {
                                toValue: { x: 0, y: 0 },
                                useNativeDriver: true,
                                duration: inn * durationPerUnit
                            });
                            break;
                    }
                    instructions.emit("step", step);
                    yield new Promise((resolve) => animation.start(resolve));
                }
            }
            if (cyclesRun + 1 < pranayama.cycles) {
                yield next(pranayama, cyclesRun + 1);
            }
            resolve();
        }));
    });
    const start = () => next(pranayama);
    return {
        value,
        instructions,
        start
    };
};
//# sourceMappingURL=Pranayama.js.map