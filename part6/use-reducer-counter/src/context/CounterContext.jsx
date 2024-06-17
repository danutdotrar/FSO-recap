// React's Context este un fel de global state al aplicatiei, care poate fi accesat de orice componenta a aplicatiei
// React's Context is a kind of a global state that can be accessed from every component of the app
import { createContext } from "react";

const CounterContext = createContext();

export default CounterContext;
