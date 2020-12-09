// 仓库
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/RootReducer";
import logger from "redux-logger";
/**
 * 利用redux中的createStore创建一个仓库
 * @ 参数rootReducer
 * @ 中间件redux-logger
 */
export const store = createStore(
    rootReducer,
    applyMiddleware(logger)
    );