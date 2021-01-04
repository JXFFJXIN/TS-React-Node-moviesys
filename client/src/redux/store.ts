// 仓库
import { applyMiddleware, createStore } from "redux";
import { IRootState, rootReducer } from "./reducers/RootReducer";
import logger from "redux-logger";
import thunk, { ThunkMiddleware } from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
/**
 * 利用redux中的createStore创建一个仓库
 * @ 参数rootReducer
 * @ 中间件redux-logger
 */
export const store = createStore(
    rootReducer,
    // thunk写在前面，logger写在最后
    // 由于redux不能准确把握中间件的类型检查，容易使分发时类型不匹配
    // - 直接用类型断言as any
    // - 在定义中间件时使用泛型，thunk自己定义了一个中间件类型ThunkMiddleware
    composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<IRootState>,logger)
    ));