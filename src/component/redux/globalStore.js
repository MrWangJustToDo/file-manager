import { createStore, applyMiddleware } from "redux";
import Axios from "axios";
import { produce } from "immer";

/*
创建应用的全局redux store对象
应该包函的属性:
  filter:   当前显示的过滤函数
  showModel:  当前显示模式  fileModel/echartsModel
  fileModelType: 当前模式的设置  normal/block
  echartsModelType: 当前模式的设置  pie/bar
  ...
*/

// 配置更改全局的filetr
function changeFilter(state, action) {
  state.filter = action.content;
  if (!action.isSamePath) {
    changePath(state, action);
    changeData(state, action);
  }
}

// 配置更改全局显示模式
function changeShowModel(state, action) {
  state.showModel = action.content;
  if (!action.isSamePath) {
    changePath(state, action);
    changeData(state, action);
  }
}

// 配置更改全局file显示模式
function changeFileModelType(state, action) {
  state.fileModelType = action.content;
  if (!action.isSamePath) {
    changePath(state, action);
    changeData(state, action);
  }
}

// 配置更改全局echarts显示模式
function changeEchartsModelType(state, action) {
  state.echartsModelType = action.content;
  if (!action.isSamePath) {
    changePath(state, action);
    changeData(state, action);
  }
}

// 更改当前路径
function changePath(state, action) {
  state.currentRequestPath = action.path;
  state.currentPathArr = pathParse(action.path);
}

// 更新当前路径资源
function changeData(state, action) {
  state.data = action.newData;
  state.isLoading = false;
}

function editorItem(state, action) {
  let path = action.submitPath;
  state.editedItem[path] = action.newContent;
}

// 全局store的reducer处理函数
function listFilterReducer(state, action) {
  if (action.type === "changeFilter") {
    return produce(state, (draftState) => changeFilter(draftState, action));
  } else if (action.type === "changeShowModel") {
    return produce(state, (draftState) => changeShowModel(draftState, action));
  } else if (action.type === "changeFileModelType") {
    return produce(state, (draftState) =>
      changeFileModelType(draftState, action)
    );
  } else if (action.type === "changeEchartsModelType") {
    return produce(state, (draftState) =>
      changeEchartsModelType(draftState, action)
    );
  } else if (action.type === "refresh") {
    if (action.error) {
      return state;
    } else {
      return produce(state, (draftState) => {
        changePath(draftState, action);
        changeData(draftState, action);
      });
    }
  } else if (action.type === "editorItem") {
    return produce(state, (draftState) => {
      editorItem(state, draftState);
    });
  } else {
    return state;
  }
}

// 解析请求路径转换成为数组
function pathParse(path) {
  return path.split(/(?=\/[^/]?)/);
}

// 使用自定义中间件获取异步请求
export default createStore(
  listFilterReducer,
  {
    filter: "filterDefault",
    showModel: "fileModel",
    fileModelType: "normal",
    echartsModelType: "pie",
    currentRequestPath: "",
    isLoading: true,
    currentPathArr: [],
    editedItem: {},
    data: {},
  },
  applyMiddleware(
    (store) => (next) => (action) => {
      // 判断路径的中间件
      if (action.path && action.path !== store.getState().currentRequestPath) {
        return next({ ...action, isSamePath: false });
      } else {
        return next({ ...action, isSamePath: true });
      }
    },
    (store) => (next) => (action) => {
      // 执行请求的中间件
      if (!action.isSamePath) {
        Axios(action.path)
          .then((res) => {
            next({ ...action, newData: res.data });
          })
          .catch((e) => {
            console.log(e);
            next({ ...action, error: e });
          });
      } else {
        next(action);
      }
    }
  )
);
