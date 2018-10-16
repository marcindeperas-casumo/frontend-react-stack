// Rigt now this is just an object that is going to be available
// on the window object in development mode.
// The goal is that certain modules can attach debugging utility
// functions on it.

// Usage:
//     import Debugger from "Utils/Debugger";
//     Debugger.mymodule = {
//         doSomethingFunky: () => {}
//     }
//
// ...
//    In the console:
//    >  Debugger.mymodule.doSomethingFunky();
export default {};
